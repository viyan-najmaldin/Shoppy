import {
  adaptLahthaProduct,
  adaptMaujodProduct,
} from "../../src/api/productAdapter.js";

// ========================================
// VENDOR APIS
// ========================================

const LAHTHA_API_URL =
  "https://apbackendi.lahtha.store/api/method/lahtha.api.store_public.get_storefront";
const LAHTHA_SLUG = "shoppy";
// Lahtha ignores anything above 50
const LAHTHA_PAGE_SIZE = 50;

const MAUJOD_API_URL = "https://rolemall.com/api";
const MAUJOD_TOKEN = process.env.MAUJOD_TOKEN || "j6c2a0g";
const MAUJOD_PAGE_SIZE = 100;

// How long the merged catalog is reused by a warm function instance
const CACHE_TTL_MS = 10 * 60 * 1000;

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}: ${text.slice(0, 300)}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${url} returned invalid JSON: ${text.slice(0, 300)}`);
  }
};

// ========================================
// LAHTHA
// ========================================

const fetchLahthaPage = (page, categoryId) => {
  const params = new URLSearchParams({
    slug: LAHTHA_SLUG,
    page: String(page),
    page_size: String(LAHTHA_PAGE_SIZE),
  });
  if (categoryId) params.set("category", String(categoryId));

  return fetchJson(`${LAHTHA_API_URL}?${params}`).then((data) => data?.message || {});
};

// Lahtha only says "has_more", so pages have to be walked one by one
const fetchAllLahthaProducts = async (categoryId, firstPage) => {
  const products = [];
  let message = firstPage || (await fetchLahthaPage(1, categoryId));
  let page = 1;

  while (true) {
    products.push(...(Array.isArray(message.products) ? message.products : []));
    if (message.has_more !== true || page >= 100) break;
    page++;
    message = await fetchLahthaPage(page, categoryId);
  }

  return products;
};

const loadLahtha = async () => {
  const firstPage = await fetchLahthaPage(1);

  // "الكل" (All) is the storefront's catch-all, not a real category
  const vendorCategories = (firstPage.categories || []).filter(
    (category) => category.title?.trim() !== "الكل"
  );

  const [allProducts, ...perCategory] = await Promise.all([
    fetchAllLahthaProducts(null, firstPage),
    ...vendorCategories.map((category) =>
      fetchAllLahthaProducts(category.id).catch((error) => {
        console.error(`Lahtha category ${category.id} failed:`, error.message);
        return [];
      })
    ),
  ]);

  const categories = vendorCategories.map((category, index) => ({
    id: `lahtha-${category.id}`,
    name: category.title.trim(),
    supplier: "lahtha",
    productIds: perCategory[index].map((product) => `lahtha-${product.id}`),
  }));

  return {
    products: allProducts.map(adaptLahthaProduct),
    categories,
  };
};

// ========================================
// MAUJOD
// ========================================

const fetchMaujodPage = (page) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(MAUJOD_PAGE_SIZE),
    token: MAUJOD_TOKEN,
  });

  return fetchJson(`${MAUJOD_API_URL}/products?${params}`).then((data) => data?.data || {});
};

const loadMaujod = async () => {
  const [firstPage, categoryData] = await Promise.all([
    fetchMaujodPage(1),
    fetchJson(`${MAUJOD_API_URL}/categories?token=${MAUJOD_TOKEN}`),
  ]);

  // Maujod reports the page count up front, so the rest can load in parallel
  const totalPages = Number(firstPage.pages) || 1;
  const otherPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) => fetchMaujodPage(index + 2))
  );

  const rawProducts = [firstPage, ...otherPages].flatMap((page) =>
    Array.isArray(page.products) ? page.products : []
  );
  const products = rawProducts.map(adaptMaujodProduct);

  const categories = (categoryData?.data?.categories || []).map((category) => ({
    id: `maujod-${category._id}`,
    name: (category.name || "").trim(),
    supplier: "maujod",
    productIds: products
      .filter((product) => product.vendorCategoryId === category._id)
      .map((product) => product.id),
  }));

  return { products, categories };
};

// ========================================
// MERGE
// ========================================

// Lahtha mixes real categories with storefront collections such as
// "🔥 new", "⭐️ featured" or "تخفيضات" (sale)
const isCollectionName = (name) =>
  /\p{Extended_Pictographic}/u.test(name) || name.includes("تخفيض");

// Show both vendors on the first pages instead of one after the other
const interleave = (a, b) => {
  const result = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (i < a.length) result.push(a[i]);
    if (i < b.length) result.push(b[i]);
  }
  return result;
};

const buildCatalog = async () => {
  const [lahtha, maujod] = await Promise.all([loadLahtha(), loadMaujod()]);

  const products = interleave(lahtha.products, maujod.products);
  const byId = new Map(products.map((product) => [product.id, product]));

  // Empty vendor categories are dropped here, so they never reach the UI
  const categories = [...lahtha.categories, ...maujod.categories]
    .map((category) => {
      const productIds = category.productIds.filter((id) => byId.has(id));
      return {
        ...category,
        productIds,
        count: productIds.length,
        isCollection: isCollectionName(category.name),
      };
    })
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count);

  // A product can sit in several vendor categories; a real category beats a
  // collection, and the smallest one is the most specific
  const membership = new Map();
  const mostSpecificFirst = [...categories].sort(
    (a, b) => a.isCollection - b.isCollection || a.count - b.count
  );
  for (const category of mostSpecificFirst) {
    for (const id of category.productIds) {
      if (!membership.has(id)) membership.set(id, []);
      membership.get(id).push(category);
    }
  }

  for (const product of products) {
    const productCategories = membership.get(product.id) || [];
    product.categoryIds = productCategories.map((category) => category.id);
    product.categoryId = productCategories[0]?.id || null;
    product.category = productCategories[0]?.name || "";
  }

  // Categories are pictured with their own products, not vendor icons
  for (const category of categories) {
    const images = category.productIds
      .map((id) => byId.get(id)?.image)
      .filter(Boolean);
    category.previews = [...new Set(images)].slice(0, 3);
  }

  console.log(
    `Catalog built: ${lahtha.products.length} Lahtha + ${maujod.products.length} Maujod products, ${categories.length} categories`
  );

  return { products, byId, categories, builtAt: Date.now() };
};

let cachedCatalog = null;
let pendingCatalog = null;

export const getCatalog = async () => {
  if (cachedCatalog && Date.now() - cachedCatalog.builtAt < CACHE_TTL_MS) {
    return cachedCatalog;
  }

  if (!pendingCatalog) {
    pendingCatalog = buildCatalog()
      .then((catalog) => {
        cachedCatalog = catalog;
        return catalog;
      })
      .catch((error) => {
        // Prefer slightly old data over an error page
        if (cachedCatalog) {
          console.error("Catalog refresh failed, serving stale data:", error);
          return cachedCatalog;
        }
        throw error;
      })
      .finally(() => {
        pendingCatalog = null;
      });
  }

  return pendingCatalog;
};

// ========================================
// QUERY HELPERS
// ========================================

// Make Arabic search forgiving about hamza / taa marbuta / alef maqsura
export const normalizeText = (text) =>
  String(text || "")
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim();

export const toListItem = (product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  oldPrice: product.oldPrice,
  image: product.image,
  category: product.category,
  categoryId: product.categoryId,
  supplier: product.supplier,
});

export const cacheHeaders = {
  "Cache-Control": "public, max-age=60",
  "Netlify-CDN-Cache-Control": "public, durable, s-maxage=600, stale-while-revalidate=86400",
  "Netlify-Vary": "query",
};

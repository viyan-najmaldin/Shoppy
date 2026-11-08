import {
  getCatalog,
  normalizeText,
  toListItem,
  cacheHeaders,
} from "../lib/catalog.mjs";

const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 60;

const errorResponse = (status, message) =>
  Response.json({ error: message }, { status });

// ========================================
// GET /api/products/:id
// ========================================

const getSingleProduct = (catalog, id) => {
  const product = catalog.byId.get(id);

  if (!product) {
    return errorResponse(404, "Product not found");
  }

  return Response.json(product, { headers: cacheHeaders });
};

// ========================================
// GET /api/products?page=&limit=&category=&q=&sort=&maxPrice=
// ========================================

const listProducts = (catalog, searchParams) => {
  const page = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, parseInt(searchParams.get("limit"), 10) || DEFAULT_LIMIT)
  );
  const categoryId = searchParams.get("category") || "All";
  const search = normalizeText(searchParams.get("q"));
  const sort = searchParams.get("sort") || "featured";
  const maxPrice = Number(searchParams.get("maxPrice")) || 0;

  let products = catalog.products;

  if (categoryId !== "All") {
    products = products.filter((product) =>
      product.categoryIds.includes(categoryId)
    );
  }

  if (search) {
    const words = search.split(/\s+/);
    products = products.filter((product) => {
      const text = normalizeText(`${product.name} ${product.category} ${product.description}`);
      return words.every((word) => text.includes(word));
    });
  }

  // The price slider's upper bound, before the price filter itself applies
  const priceMax = products.reduce((max, product) => Math.max(max, product.price), 0);

  if (maxPrice > 0) {
    products = products.filter((product) => product.price <= maxPrice);
  }

  if (sort === "price-low") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    products = [...products].sort((a, b) => b.price - a.price);
  }

  const total = products.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  return Response.json(
    {
      products: products.slice(start, start + limit).map(toListItem),
      total,
      page,
      pages,
      limit,
      priceMax,
    },
    { headers: cacheHeaders }
  );
};

export default async (request, context) => {
  try {
    const catalog = await getCatalog();

    if (context.params?.id) {
      return getSingleProduct(catalog, decodeURIComponent(context.params.id));
    }

    return listProducts(catalog, new URL(request.url).searchParams);
  } catch (error) {
    console.error("PRODUCTS ERROR:", error);
    return errorResponse(500, error?.message || "Failed to fetch products");
  }
};

export const config = {
  path: ["/api/products", "/api/products/:id"],
};

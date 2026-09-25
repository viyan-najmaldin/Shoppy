
// ========================================
// LAHTHA IMAGE BASE URL
// ========================================

const LAHTHA_IMAGE_BASE_URL =
  "https://apbackendi.lahtha.store";


// ========================================
// LAHTHA PRODUCT ADAPTER
// ========================================

export const adaptLahthaProduct = (product) => {
  const title =
    product.title ||
    product.name ||
    "";

  const images = Array.isArray(product.images)
    ? product.images
        .map((image) => {
          if (!image) return "";

          if (
            image.startsWith("http://") ||
            image.startsWith("https://")
          ) {
            return image;
          }

          if (image.startsWith("/")) {
            return `${LAHTHA_IMAGE_BASE_URL}${image}`;
          }

          return `${LAHTHA_IMAGE_BASE_URL}/${image}`;
        })
        .filter(Boolean)
    : [];

  return {
    id: `lahtha-${product.id}`,

    supplier: "lahtha",

    supplierProductId: product.id,

    name: title,

    title,

    price: Number(product.price) || 0,

    oldPrice:
      product.old_price !== null &&
      product.old_price !== undefined
        ? Number(product.old_price)
        : null,

    // Lahtha products
    category: "Electronics",

    image: images[0] || "",

    images,

    description:
      product.description || "",

    tags: Array.isArray(product.tags)
      ? product.tags
      : [],

    variants: Array.isArray(product.variants)
      ? product.variants
      : [],

    createdAt:
      product.created_at || "",

    updatedAt:
      product.updated_at || "",

    color:
      product.color || "",

    rating:
      Number(product.rating) || 0,
  };
};


// ========================================
// MAUJOD CATEGORY MAPPING
// ========================================

const getMaujodCategory = (categoryId) => {
  const categoryMap = {
    // الكترونيات
    1: "Electronics",

    // العاب
    19: "Electronics",

    // ادوات السيارات
    20: "Electronics",

    // اجهزة العناية
    12: "Home & Living",

    // منتجات العناية
    18: "Home & Living",

    // اجهزة المنزل
    5: "Home & Living",

    // اجهزة المطبخ
    6: "Home & Living",

    // عدد وادوات
    21: "Home & Living",

    // اثاث
    23: "Home & Living",

    // انارة واضاءة
    24: "Home & Living",

    // ادوات منزلية
    25: "Home & Living",

    // ادوات مطبخ
    26: "Home & Living",

    // ادوات رياضية
    22: "Sports",
  };

  return categoryMap[Number(categoryId)] || "Home & Living";
};


// ========================================
// MAUJOD PRODUCT ADAPTER
// ========================================

export const adaptMaujodProduct = (product) => {
  const images =
    Array.isArray(product.img)
      ? product.img.filter(Boolean)
      : [];

  const title =
    product.name || "";

  const category =
    getMaujodCategory(product.category);

  const description =
    product.body ||
    product.post_body ||
    "";

  return {
    id: `maujod-${product._id}`,

    supplier: "maujod",

    supplierProductId: product._id,

    name: title,

    title,

    price: Number(product.price) || 0,

    oldPrice: null,

    category,

    image: images[0] || "",

    images,

    description,

    tags: [],

    variants: [],

    createdAt: "",

    updatedAt: "",

    color: "",

    rating: 0,
  };
};

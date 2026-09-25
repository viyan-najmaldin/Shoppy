// src/api/productAdapter.js

const LAHTHA_IMAGE_BASE_URL =
  "https://apbackendi.lahtha.store";


// ------------------------------------
// LAHTHA
// ------------------------------------

export const adaptLahthaProduct = (product) => {
  const title =
    product.title ||
    product.name ||
    "";

  const images = Array.isArray(product.images)
    ? product.images
        .map((image) => {
          if (!image) return "";

          // Already a complete URL
          if (
            image.startsWith("http://") ||
            image.startsWith("https://")
          ) {
            return image;
          }

          // Lahtha image path
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

    price:
      Number(product.price) || 0,

    oldPrice:
      product.old_price !== null &&
      product.old_price !== undefined
        ? Number(product.old_price)
        : null,

    category: "Electronics",

    image: images[0] || "",

    images,

    description:
      product.description || "",

    tags:
      Array.isArray(product.tags)
        ? product.tags
        : [],

    variants:
      Array.isArray(product.variants)
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


// ------------------------------------
// MAUJOD
// ------------------------------------

export const adaptMaujodProduct = (product) => {
  const title =
    product.title ||
    product.name ||
    product.product_name ||
    "";

  let images = [];

  if (Array.isArray(product.images)) {
    images = product.images
      .map((image) => {
        if (!image) return "";

        if (typeof image === "object") {
          return (
            image.url ||
            image.image ||
            ""
          );
        }

        return image;
      })
      .filter(Boolean);
  }

  if (
    images.length === 0 &&
    product.image
  ) {
    images = [product.image];
  }

  return {
    id: `maujod-${product.id}`,

    supplier: "maujod",

    supplierProductId: product.id,

    name: title,

    title,

    price: Number(
      product.price ??
      product.sale_price ??
      product.selling_price ??
      0
    ),

    oldPrice:
      product.old_price !== null &&
      product.old_price !== undefined
        ? Number(product.old_price)
        : null,

    category:
      product.category?.name ||
      product.category_name ||
      product.category ||
      "All",

    image:
      images[0] || "",

    images,

    description:
      product.description || "",

    tags:
      Array.isArray(product.tags)
        ? product.tags
        : [],

    variants:
      Array.isArray(product.variants)
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




// const API_BASE_URL = "";

// const getCategory = (title = "") => {
  
//   const text = title.toLowerCase();

//   const fashionKeywords = [
//     "تيشيرت",
//     "تي شيرت",
//     "قميص",
//     "بنطلون",
//     "جينز",
//     "جاكيت",
//     "فستان",
//     "ملابس",
//     "هودي",
//     "بلوزة",
//     "تنورة",
//     "حذاء",
//     "t-shirt",
//     "tshirt",
//     "shirt",
//     "pants",
//     "jeans",
//     "jacket",
//     "dress",
//     "clothes",
//     "clothing",
//     "hoodie",
//     "blouse",
//     "skirt",
//     "shoes",
//   ];

//   const sportsKeywords = [
//     "كرة",
//     "رياضة",
//     "رياضي",
//     "جيم",
//     "تمارين",
//     "يوغا",
//     "دمبل",
//     "كرة قدم",
//     "كرة سلة",
//     "كرة طائرة",
//     "معدات رياضية",
//     "sport",
//     "sports",
//     "football",
//     "soccer",
//     "basketball",
//     "volleyball",
//     "gym",
//     "yoga",
//     "dumbbell",
//     "fitness",
//     "exercise",
//     "workout",
//   ];

//   const electronicsKeywords = [
//     "لعبة",
//     "ألعاب",
//     "العاب",
//     "بلايستيشن",
//     "بلاي ستيشن",
//     "يد تحكم",
//     "سماعة",
//     "سماعات",
//     "سماعة اذن",
//     "سماعة رأس",
//     "هاتف",
//     "جوال",
//     "موبايل",
//     "شاحن",
//     "باور بانك",
//     "ماوس",
//     "كيبورد",
//     "مايكروفون",
//     "كاميرا",
//     "بلوتوث",
//     "سبيكر",
//     "مكبر صوت",
//     "ساعة",
//     "ساعة ذكية",
//     "مبرد الهاتف",
//     "محول الشحن",
//     "داش كام",
//     "كابل",
//     "كيبل",
//     "شاشة",
//     "راوتر",
//     "game",
//     "games",
//     "gaming",
//     "playstation",
//     "play station",
//     "ps4",
//     "ps5",
//     "xbox",
//     "controller",
//     "headphone",
//     "headphones",
//     "earphone",
//     "earphones",
//     "earbuds",
//     "smartphone",
//     "phone",
//     "mobile",
//     "charger",
//     "power bank",
//     "mouse",
//     "keyboard",
//     "microphone",
//     "camera",
//     "bluetooth",
//     "speaker",
//     "smart watch",
//     "smartwatch",
//     "watch",
//     "phone cooler",
//     "adapter",
//     "dash cam",
//     "cable",
//     "screen",
//     "monitor",
//     "router",
//   ];

//   if (
//     electronicsKeywords.some((keyword) =>
//       text.includes(keyword)
//     )
//   ) {
//     return "Electronics";
//   }

//   if (
//     sportsKeywords.some((keyword) =>
//       text.includes(keyword)
//     )
//   ) {
//     return "Sports";
//   }

//   if (
//     fashionKeywords.some((keyword) =>
//       text.includes(keyword)
//     )
//   ) {
//     return "Fashion";
//   }

//   return "All";
// };



// export const productAdapter = (data) => {

//   const products = Array.isArray(data)
//     ? data
//     : data?.products || [];

//   // console.log("PRODUCTS BEFORE ADAPTER:", products);

//   if (!Array.isArray(products)) {
//     console.error("Products is not an array:", products);
//     return [];
//   }

//   const adaptedProducts = products.map((product) => {

//     const title = product.title || "";

//     return {
//       id: product.id,
//       title: title,
//       price: Number(product.price) || 0,
//       oldPrice: product.old_price
//         ? Number(product.old_price)
//         : null,
//       category: getCategory(title),
//       image: product.images?.[0]
//         ? `https://apbackendi.lahtha.store${product.images[0]}`
//         : "",
//       images: Array.isArray(product.images)
//         ? product.images.map(
//             (image) => `https://apbackendi.lahtha.store${image}`
//           )
//         : [],
//       description: product.description || "",
//       tags: Array.isArray(product.tags)
//         ? product.tags
//         : [],
//       variants: Array.isArray(product.variants)
//         ? product.variants
//         : [],
//       createdAt: product.created_at || "",
//       updatedAt: product.updated_at || "",
//       name: title,
//       color: product.color || "",
//       rating: Number(product.rating) || 0,
//     };
//   });

//   // console.log("ADAPTED PRODUCTS:", adaptedProducts);
//   return adaptedProducts;
// };
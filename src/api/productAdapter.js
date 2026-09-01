const API_BASE_URL = "http://localhost:5000";

const getCategory = (title = "") => {
  
  const text = title.toLowerCase();

  const fashionKeywords = [
    "تيشيرت",
    "تي شيرت",
    "قميص",
    "بنطلون",
    "جينز",
    "جاكيت",
    "فستان",
    "ملابس",
    "هودي",
    "بلوزة",
    "تنورة",
    "حذاء",
    "t-shirt",
    "tshirt",
    "shirt",
    "pants",
    "jeans",
    "jacket",
    "dress",
    "clothes",
    "clothing",
    "hoodie",
    "blouse",
    "skirt",
    "shoes",
  ];

  const sportsKeywords = [
    "كرة",
    "رياضة",
    "رياضي",
    "جيم",
    "تمارين",
    "يوغا",
    "دمبل",
    "كرة قدم",
    "كرة سلة",
    "كرة طائرة",
    "معدات رياضية",
    "sport",
    "sports",
    "football",
    "soccer",
    "basketball",
    "volleyball",
    "gym",
    "yoga",
    "dumbbell",
    "fitness",
    "exercise",
    "workout",
  ];

  const electronicsKeywords = [
    "لعبة",
    "ألعاب",
    "العاب",
    "بلايستيشن",
    "بلاي ستيشن",
    "يد تحكم",
    "سماعة",
    "سماعات",
    "سماعة اذن",
    "سماعة رأس",
    "هاتف",
    "جوال",
    "موبايل",
    "شاحن",
    "باور بانك",
    "ماوس",
    "كيبورد",
    "مايكروفون",
    "كاميرا",
    "بلوتوث",
    "سبيكر",
    "مكبر صوت",
    "ساعة",
    "ساعة ذكية",
    "مبرد الهاتف",
    "محول الشحن",
    "داش كام",
    "كابل",
    "كيبل",
    "شاشة",
    "راوتر",
    "game",
    "games",
    "gaming",
    "playstation",
    "play station",
    "ps4",
    "ps5",
    "xbox",
    "controller",
    "headphone",
    "headphones",
    "earphone",
    "earphones",
    "earbuds",
    "smartphone",
    "phone",
    "mobile",
    "charger",
    "power bank",
    "mouse",
    "keyboard",
    "microphone",
    "camera",
    "bluetooth",
    "speaker",
    "smart watch",
    "smartwatch",
    "watch",
    "phone cooler",
    "adapter",
    "dash cam",
    "cable",
    "screen",
    "monitor",
    "router",
  ];

  if (
    electronicsKeywords.some((keyword) =>
      text.includes(keyword)
    )
  ) {
    return "Electronics";
  }

  if (
    sportsKeywords.some((keyword) =>
      text.includes(keyword)
    )
  ) {
    return "Sports";
  }

  if (
    fashionKeywords.some((keyword) =>
      text.includes(keyword)
    )
  ) {
    return "Fashion";
  }

  return "All";
};



export const productAdapter = (data) => {

  const products = Array.isArray(data)
    ? data
    : data?.products || [];

  // console.log("PRODUCTS BEFORE ADAPTER:", products);

  if (!Array.isArray(products)) {
    console.error("Products is not an array:", products);
    return [];
  }

  const adaptedProducts = products.map((product) => {

    const title = product.title || "";

    return {
      id: product.id,
      title: title,
      price: Number(product.price) || 0,
      oldPrice: product.old_price
        ? Number(product.old_price)
        : null,
      category: getCategory(title),
      image: product.images?.[0]
        ? `https://apbackendi.lahtha.store${product.images[0]}`
        : "",
      images: Array.isArray(product.images)
        ? product.images.map(
            (image) => `https://apbackendi.lahtha.store${image}`
          )
        : [],
      description: product.description || "",
      tags: Array.isArray(product.tags)
        ? product.tags
        : [],
      variants: Array.isArray(product.variants)
        ? product.variants
        : [],
      createdAt: product.created_at || "",
      updatedAt: product.updated_at || "",
      name: title,
      color: product.color || "",
      rating: Number(product.rating) || 0,
    };
  });

  // console.log("ADAPTED PRODUCTS:", adaptedProducts);
  return adaptedProducts;
};
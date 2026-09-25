import { adaptLahthaProduct } from "../../src/api/productAdapter.js";

const LAHTHA_API_URL =
  "https://apbackendi.lahtha.store/api/method/lahtha.api.store_public.get_storefront";

export default async () => {
  try {
    const allProducts = [];

    let page = 1;
    const pageSize = 24;
    let hasMore = true;

    while (hasMore) {
      const params = new URLSearchParams({
        slug: "shoppy",
        page: String(page),
        page_size: String(pageSize),
      });

      const url = `${LAHTHA_API_URL}?${params.toString()}`;

      console.log(`Fetching Lahtha page ${page}...`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          `Lahtha returned HTTP ${response.status}: ${text}`
        );
      }

      const data = JSON.parse(text);

      const products = Array.isArray(data?.message?.products)
        ? data.message.products
        : [];

      console.log(
        `Page ${page}: ${products.length} products`
      );

      // Add this page's products to the complete list
      allProducts.push(...products);

      // Lahtha tells us if another page exists
      hasMore = data?.message?.has_more === true;

      page++;

      // Safety limit
      if (page > 100) {
        console.warn("Stopped after 100 pages.");
        break;
      }
    }

    console.log(
      `Total Lahtha products: ${allProducts.length}`
    );

    // Convert Lahtha products to Shoppy's format
    const adaptedProducts =
      allProducts.map(adaptLahthaProduct);

    return Response.json(adaptedProducts);

  } catch (error) {
    console.error("LAHTHA ERROR:", error);

    return Response.json(
      {
        error: "Failed to fetch Lahtha products",
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

export const config = {
  path: "/api/products",
};
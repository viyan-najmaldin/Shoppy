import {
  adaptLahthaProduct,
  adaptMaujodProduct,
} from "../../src/api/productAdapter.js";


// ========================================
// API URLS
// ========================================

const LAHTHA_API_URL =
  "https://apbackendi.lahtha.store/api/method/lahtha.api.store_public.get_storefront";

const MAUJOD_API_URL =
  "https://rolemall.com/api/products";


// ========================================
// MAUJOD TOKEN
// ========================================

const MAUJOD_TOKEN =
  "j6c2a0g";


// ========================================
// MAIN FUNCTION
// ========================================

export default async () => {
  try {

    // ========================================
    // LAHTHA
    // ========================================

    console.log("=================================");
    console.log("FETCHING LAHTHA PRODUCTS");
    console.log("=================================");

    const lahthaProducts = [];

    let lahthaPage = 1;

    const lahthaPageSize = 24;

    let lahthaHasMore = true;


    while (lahthaHasMore) {

      const params = new URLSearchParams({
        slug: "shoppy",
        page: String(lahthaPage),
        page_size: String(lahthaPageSize),
      });

      const url =
        `${LAHTHA_API_URL}?${params.toString()}`;

      console.log(
        `Fetching Lahtha page ${lahthaPage}...`
      );


      const response = await fetch(url, {
        method: "GET",

        headers: {
          Accept: "*/*",
        },
      });


      const text =
        await response.text();


      if (!response.ok) {
        throw new Error(
          `Lahtha returned HTTP ${response.status}: ${text}`
        );
      }


      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Lahtha returned invalid JSON: ${text.substring(
            0,
            500
          )}`
        );
      }


      const products =
        Array.isArray(
          data?.message?.products
        )
          ? data.message.products
          : [];


      console.log(
        `Lahtha page ${lahthaPage}: ${products.length} products`
      );


      lahthaProducts.push(
        ...products
      );


      lahthaHasMore =
        data?.message?.has_more === true;


      lahthaPage++;


      // Safety limit
      if (lahthaPage > 100) {
        console.log(
          "Lahtha safety limit reached."
        );

        break;
      }
    }


    console.log(
      `Lahtha total products: ${lahthaProducts.length}`
    );


    // ========================================
    // MAUJOD
    // ========================================

    console.log("=================================");
    console.log("FETCHING MAUJOD PRODUCTS");
    console.log("=================================");


    const maujodProducts = [];

    let maujodPage = 1;

    const maujodPageSize = 100;

    let maujodTotalPages = 1;


    while (
      maujodPage <= maujodTotalPages
    ) {

      const params = new URLSearchParams({
        page: String(maujodPage),

        limit: String(maujodPageSize),

        token: MAUJOD_TOKEN,
      });


      const url =
        `${MAUJOD_API_URL}?${params.toString()}`;


      console.log(
        `Fetching Maujod page ${maujodPage}...`
      );


      const response = await fetch(url, {
        method: "GET",

        headers: {
          Accept: "application/json",
        },
      });


      const text =
        await response.text();


      if (!response.ok) {
        throw new Error(
          `Maujod returned HTTP ${response.status}: ${text}`
        );
      }


      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Maujod returned invalid JSON: ${text.substring(
            0,
            500
          )}`
        );
      }


      const products =
        Array.isArray(
          data?.data?.products
        )
          ? data.data.products
          : [];


      console.log(
        `Maujod page ${maujodPage}: ${products.length} products`
      );


      maujodProducts.push(
        ...products
      );


      maujodTotalPages =
        Number(data?.data?.pages) || 1;


      maujodPage++;
    }


    console.log(
      `Maujod total products: ${maujodProducts.length}`
    );


    // ========================================
    // ADAPT PRODUCTS
    // ========================================

    console.log("=================================");
    console.log("ADAPTING PRODUCTS");
    console.log("=================================");


    const adaptedLahthaProducts =
      lahthaProducts.map(
        adaptLahthaProduct
      );


    const adaptedMaujodProducts =
      maujodProducts.map(
        adaptMaujodProduct
      );


    // ========================================
    // COMBINE
    // ========================================

    const allProducts = [
      ...adaptedLahthaProducts,
      ...adaptedMaujodProducts,
    ];


    console.log("=================================");
    console.log(
      "Lahtha total:",
      adaptedLahthaProducts.length
    );

    console.log(
      "Maujod total:",
      adaptedMaujodProducts.length
    );

    console.log(
      "TOTAL PRODUCTS:",
      allProducts.length
    );

    console.log("=================================");


    // ========================================
    // RETURN JSON
    // ========================================

    return Response.json(
      allProducts
    );

  } catch (error) {

    console.error(
      "========== PRODUCTS ERROR =========="
    );

    console.error(error);

    console.error(
      "===================================="
    );


    return Response.json(
      {
        error: "Failed to fetch products",

        message:
          error?.message ||
          "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
};


// ========================================
// NETLIFY FUNCTION ROUTE
// ========================================

export const config = {
  path: "/api/products",
};

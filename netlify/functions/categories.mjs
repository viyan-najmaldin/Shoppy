import { getCatalog, cacheHeaders } from "../lib/catalog.mjs";

// GET /api/categories
// Vendor categories that actually contain products, biggest first
export default async () => {
  try {
    const { categories } = await getCatalog();

    return Response.json(
      categories.map(({ id, name, previews, count, supplier, isCollection }) => ({
        id,
        name,
        previews,
        count,
        supplier,
        isCollection,
      })),
      { headers: cacheHeaders }
    );
  } catch (error) {
    console.error("CATEGORIES ERROR:", error);
    return Response.json(
      { error: error?.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
};

export const config = {
  path: "/api/categories",
};

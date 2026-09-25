const MAUJOD_API_URL = "https://rolemall.com/api/products";

export default async () => {
  try {
    const params = new URLSearchParams({
      page: "1",
      limit: "100",
    });

    const response = await fetch(
      `${MAUJOD_API_URL}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const text = await response.text();

    if (!response.ok) {
      throw new Error(
        `Maujod returned HTTP ${response.status}: ${text}`
      );
    }

    const data = JSON.parse(text);

    console.log("Maujod response:", data);

    return Response.json(data);

  } catch (error) {
    console.error("MAUJOD ERROR:", error);

    return Response.json(
      {
        error: "Failed to fetch Maujod products",
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

export const config = {
  path: "/api/maujod-products",
};
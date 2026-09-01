import productsData from "../../db.json" with { type: "json" };

export default async () => {
  return Response.json(productsData);
};

export const config = {
  path: "/api/products",
};
import axios from "axios";
import { productAdapter } from "./productAdapter";

const API_URL = "/api/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);

  return productAdapter(response.data);
};
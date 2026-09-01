import axios from "axios";
import { productAdapter } from "./productAdapter";

const API_URL = "https://superlative-taiyaki-18919a.netlify.app/api/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);

  return productAdapter(response.data);
};
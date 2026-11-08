// Delivery fee charged by the vendors, in IQD
export const SHIPPING_FEE = 5000;

export const formatPrice = (value) =>
  `${Number(value || 0).toLocaleString("en-US")} IQD`;

export const discountPercent = (product) =>
  product.oldPrice && product.oldPrice > product.price
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

export const productPath = (product) =>
  `/products/${product.categoryId || "All"}/${product.id}`;

import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

const customAxios = axios.create({
  baseURL: API_BASE_URL,
});

const ENDPOINTS = {
  addNewProduct: "/addNewProduct",
  getProducts: `/`,
  getProductById: (productId) => `/${productId}`,
  updateProduct: (productId) => `/updateProduct/${productId}`,
  deleteProduct: (productId) => `/deleteProduct/${productId}`,
};

export const productsApi = {
  getProductById: (productId) => customAxios.get(ENDPOINTS.getProductById(productId)),
  getProducts: (data) => customAxios.get(ENDPOINTS.getProducts, data),
  updateProduct: (productId, data) => customAxios.post(ENDPOINTS.updateProduct(productId), data),
  addNewProduct: (data) => customAxios.post(ENDPOINTS.addNewProduct, data),
  deleteProduct: (productId) => customAxios.delete(ENDPOINTS.deleteProduct(productId)),
};

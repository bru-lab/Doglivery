import { create } from "zustand";
import api from "../lib/axios.js";

export const useProductStore = create((set) => ({
  products: [],
  selectedProduct: null,

  isLoadingProducts: false,
  isLoadingProduct: false,
  isCreatingProduct: false,
  isUpdatingProduct: false,
  isDeletingProduct: false,

  error: null,

  // Get all products
  getProducts: async () => {
    try {
      set({
        isLoadingProducts: true,
        error: null,
      });

      const response = await api.get("/products");

      set({
        products: response.data,
        isLoadingProducts: false,
      });

    } catch (error) {
      console.error("Error getting products:", error);

      set({
        error:
          error.response?.data?.message ||
          "Failed to load products.",
        isLoadingProducts: false,
      });
    }
  },


  // Get product by ID
  getProductById: async (id) => {
    try {
      set({
        isLoadingProduct: true,
        error: null,
      });

      const response = await api.get(`/products/${id}`);

      set({
        selectedProduct: response.data,
        isLoadingProduct: false,
      });

      return response.data;

    } catch (error) {
      console.error("Error getting product:", error);

      set({
        error:
          error.response?.data?.message ||
          "Failed to load product.",
        isLoadingProduct: false,
      });

      return null;
    }
  },


  // Create product
  createProduct: async (productData) => {
    try {
      set({
        isCreatingProduct: true,
        error: null,
      });

      const response = await api.post(
        "/products/create",
        productData
      );

      set((state) => ({
        products: [
          response.data,
          ...state.products,
        ],
        isCreatingProduct: false,
      }));

      return response.data;

    } catch (error) {
      console.error("Error creating product:", error);

      set({
        error:
          error.response?.data?.message ||
          "Failed to create product.",
        isCreatingProduct: false,
      });

      return null;
    }
  },


  // Update product
  updateProduct: async (id, productData) => {
    try {
      set({
        isUpdatingProduct: true,
        error: null,
      });

      const response = await api.put(
        `/products/update/${id}`,
        productData
      );

      set((state) => ({
        products: state.products.map((product) =>
          product._id === id
            ? response.data
            : product
        ),

        selectedProduct:
          state.selectedProduct?._id === id
            ? response.data
            : state.selectedProduct,

        isUpdatingProduct: false,
      }));

      return response.data;

    } catch (error) {
      console.error("Error updating product:", error);

      set({
        error:
          error.response?.data?.message ||
          "Failed to update product.",
        isUpdatingProduct: false,
      });

      return null;
    }
  },


  // Delete product
  deleteProduct: async (id) => {
    try {
      set({
        isDeletingProduct: true,
        error: null,
      });

      await api.delete(
        `/products/delete/${id}`
      );

      set((state) => ({
        products: state.products.filter(
          (product) => product._id !== id
        ),
        isDeletingProduct: false,
      }));

      return true;

    } catch (error) {
      console.error("Error deleting product:", error);

      set({
        error:
          error.response?.data?.message ||
          "Failed to delete product.",
        isDeletingProduct: false,
      });

      return false;
    }
  },


  // Clear selected product
  clearSelectedProduct: () => {
    set({
      selectedProduct: null,
      error: null,
    });
  },


  // Clear error
  clearError: () => {
    set({
      error: null,
    });
  },
}));
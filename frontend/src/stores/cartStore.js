import { create } from "zustand";
import api from "../lib/axios";

export const useCartStore = create((set, get) => ({
  items: [],
  totalPrice: 0,
  isLoading: false,
  updatingProductId: null,

  // Get cart
  getCart: async () => {
    try {
      set({ isLoading: true });

      const response = await api.get("/cart");

      set({
        items: response.data.items || [],
        totalPrice: response.data.totalPrice || 0,
      });
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data || error.message
      );

      set({
        items: [],
        totalPrice: 0,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Add product
  addToCart: async (productId) => {
    try {
      set({
        updatingProductId: productId,
      });

      const response = await api.post(
        `/cart/add/${productId}`
      );

      set({
        items: response.data.items || [],
        totalPrice: response.data.totalPrice || 0,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error.response?.data || error.message
      );

      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Não foi possível adicionar o produto.",
      };
    } finally {
      set({
        updatingProductId: null,
      });
    }
  },

  // Decrease quantity
  decreaseCartItem: async (productId) => {
    try {
      set({
        updatingProductId: productId,
      });

      const response = await api.patch(
        `/cart/decrease/${productId}`
      );

      set({
        items: response.data.items || [],
        totalPrice: response.data.totalPrice || 0,
      });
    } catch (error) {
      console.error(
        "Error decreasing cart item:",
        error.response?.data || error.message
      );
    } finally {
      set({
        updatingProductId: null,
      });
    }
  },

  // Remove product
  removeFromCart: async (productId) => {
    try {
      set({
        updatingProductId: productId,
      });

      const response = await api.delete(
        `/cart/remove/${productId}`
      );

      set({
        items: response.data.items || [],
        totalPrice: response.data.totalPrice || 0,
      });
    } catch (error) {
      console.error(
        "Error removing product:",
        error.response?.data || error.message
      );
    } finally {
      set({
        updatingProductId: null,
      });
    }
  },

  // Clear local cart
  clearCart: () => {
    set({
      items: [],
      totalPrice: 0,
    });
  },

  // Get subtotal
  getSubtotal: () => {
    return get().items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  },

  // Number of products
  getItemCount: () => {
    return get().items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  },
}));
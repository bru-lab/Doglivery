import { create } from "zustand";
import api from "../lib/axios";

export const useOrderStore = create((set) => ({
  orders: [],
  selectedOrder: null,

  isCreatingOrder: false,
  isLoadingOrders: false,
  isLoadingOrder: false,
  error: null,



  getAllOrders: async () => {
    try {
      set({
        isLoadingOrders: true,
        error: null,
      });

      const response = await api.get("/orders/admin");

      console.log("All orders:", response.data);

      set({
        orders: response.data,
      });

      return {
        success: true,
        orders: response.data,
      };
    } catch (error) {
      console.error(
        "Error fetching all orders:",
        error.response?.data || error.message
      );

      const message =
        error.response?.data?.message ||
        "Não foi possível carregar os pedidos.";

      set({
        orders: [],
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    } finally {
      set({
        isLoadingOrders: false,
      });
    }
  },
  // Create order
  createOrder: async ({
    deliveryAddress,
    paymentMethod,
  }) => {
    try {
      set({
        isCreatingOrder: true,
        error: null,
      });

      const response = await api.post(
        "/orders/create-order",
        {
          deliveryAddress,
          paymentMethod,
        }
      );

      return {
        success: true,
        order: response.data,
      };
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response?.data || error.message
      );

      const message =
        error.response?.data?.message ||
        "Não foi possível criar o pedido.";

      set({
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    } finally {
      set({
        isCreatingOrder: false,
      });
    }
  },

  // Get user's orders
  getOrders: async () => {
    try {
      set({
        isLoadingOrders: true,
        error: null,
      });

      const response = await api.get(
        "/orders/my-orders"
      );

      set({
        orders: response.data,
      });

      return {
        success: true,
        orders: response.data,
      };
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );

      const message =
        error.response?.data?.message ||
        "Não foi possível carregar seus pedidos.";

      set({
        orders: [],
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    } finally {
      set({
        isLoadingOrders: false,
      });
    }
  },

  // Get one order
getOrderById: async (orderId) => {
  try {
    set({
      isLoadingOrder: true,
      error: null,
    });

    const response = await api.get(
      `/orders/${orderId}`
    );

    set({
      selectedOrder: response.data,
    });

    return {
      success: true,
      order: response.data,
    };

  } catch (error) {
    console.error(
      "Error fetching order:",
      error.response?.data || error.message
    );

    const message =
      error.response?.data?.message ||
      "Não foi possível carregar o pedido.";

    set({
      selectedOrder: null,
      error: message,
    });

    return {
      success: false,
      error: message,
    };

  } finally {
    set({
      isLoadingOrder: false,
    });
  }
},

  clearError: () => {
    set({
      error: null,
    });
  },

  updateOrderStatus: async (id, orderStatus) => {
  try {
    set({
      isLoadingOrder: true,
      error: null,
    });

    const response = await api.put(
      `/orders/${id}/status`,
      {
        orderStatus,
      }
    );

    // Update the order in the orders array
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === id
          ? response.data
          : order
      ),
    }));

    return {
      success: true,
      order: response.data,
    };

  } catch (error) {
    console.error(
      "Error updating order status:",
      error.response?.data || error.message
    );

    const message =
      error.response?.data?.message ||
      "Failed to update order status";

    set({
      error: message,
    });

    return {
      success: false,
      error: message,
    };

  } finally {
    set({
      isLoadingOrder: false,
    });
  }
},
}));
import { create } from "zustand";
import api from "../lib/axios";

const baseURL = import.meta.env.NODE === "development"? "http://localhost:5000" : "/";

export const useAuthStore = create((set) => ({
  authUser: null,

  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,

  // Check authentication
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });

      const response = await api.get("/auth/check");

      set({
        authUser: response.data,
      });
    } catch (error) {
      console.log(
        "Not authenticated:",
        error.response?.data?.message
      );

      set({
        authUser: null,
      });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  // Signup
  signup: async (userData) => {
    try {
      set({ isSigningUp: true });

      const response = await api.post(
        "/auth/signup",
        userData
      );

      set({
        authUser: response.data,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error(
        "Signup error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Não foi possível criar sua conta.",
      };
    } finally {
      set({
        isSigningUp: false,
      });
    }
  },

  // Login
  login: async (email, password) => {
    try {
      set({ isLoggingIn: true });

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      set({
        authUser: response.data,
      });

      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Email ou senha inválidos.",
      };
    } finally {
      set({
        isLoggingIn: false,
      });
    }
  },

  // Update profile
  // Update profile
updateProfile: async (formData) => {
  try {
    set({ isUpdatingProfile: true });

    const response = await api.patch(
      "/auth/update-profile",
      formData
    );

    set({
      authUser: response.data.user,
    });

    return {
      success: true,
      user: response.data.user,
    };
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );

    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Não foi possível atualizar o perfil.",
    };
  } finally {
    set({ isUpdatingProfile: false });
  }
},

  // Logout
  logout: async () => {
    try {
      set({ isLoggingOut: true });

      await api.post("/auth/logout");

      set({
        authUser: null,
      });
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data || error.message
      );
    } finally {
      set({
        isLoggingOut: false,
      });
    }
  },
}));
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import CreateProductPage from "./pages/admin/CreateProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />


        {/* =========================
            PROTECTED ROUTES
        ========================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/orders"
            element={<OrdersPage />}
          />

          <Route
            path="/orders/:id"
            element={<OrderDetailsPage />}
          />

        </Route>


        {/* =========================
            ADMIN ROUTES
        ========================= */}

        {/* ========================= ADMIN ROUTES ========================= */}
        <Route element={<AdminRoute />}>

          <Route
            path="/admin"
            element={<AdminLayout />} >

            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="products"
              element={<AdminProductsPage />} />

            <Route
              path="orders"
              element={<AdminOrdersPage />}
            />

            <Route
              path="products/create" element={<CreateProductPage />} />
            <Route
              path="products/:id/edit" element={<EditProductPage />}
            />

            <Route
              path="/admin/orders/:id"
              element={<AdminOrderDetailsPage />}
            />
          </Route>



        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;


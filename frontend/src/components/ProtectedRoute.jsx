import { Navigate, Outlet } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

import { useAuthStore } from "../stores/authStore";

export default function ProtectedRoute() {
  const {
    authUser,
    isCheckingAuth,
  } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle
          size={40}
          className="animate-spin text-red-600"
        />
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
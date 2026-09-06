import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      <AdminSidebar />

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>

    </div>
  );
}


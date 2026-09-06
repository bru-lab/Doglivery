import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const links = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "📊",
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: "🌭",
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: "📦",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">
          🌭 DogLivery Admin
        </h1>
      </div>


      {/* Navigation */}
      <nav className="flex-1 p-4">

        <p className="text-xs uppercase tracking-wider text-gray-500 px-3 mb-3">
          Management
        </p>

        <div className="space-y-2">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span>{link.icon}</span>

              <span className="font-medium">
                {link.name}
              </span>
            </NavLink>
          ))}

        </div>

      </nav>


      {/* Bottom */}
      <div className="p-4 border-t border-gray-800">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
        >
          <span>🚪</span>

          <span>
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}


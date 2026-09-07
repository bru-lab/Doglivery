import {
  LogOut,
  ShoppingCart,
  User,
  UserCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";

function Navbar() {

  const navigate = useNavigate();

  const { authUser, logout, isLoggingOut } =
    useAuthStore();

  const items = useCartStore((state) => state.items);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );


  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <span className="text-3xl">🌭</span>

          <span className="text-xl font-bold text-gray-900">
            Dog<span className="text-red-600">Livery</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-medium text-gray-700 transition hover:text-red-600"
          >
            Início
          </Link>

          {authUser && (
            <Link
              to="/orders"
              className="font-medium text-gray-700 transition hover:text-red-600"
            >
              Meus pedidos
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative rounded-full p-2 text-gray-700 transition hover:bg-gray-100 hover:text-red-600"
          >
            <ShoppingCart size={23} />

            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {authUser ? (
            <div className="flex items-center gap-3">

              {/* Profile */}
              <Link
                to="/profile"
                className="hidden items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-gray-100 sm:flex"
              >
                <UserCircle
                  size={23}
                  className="text-red-600"
                />

                <span className="max-w-32 truncate text-sm font-semibold text-gray-700">
                  {authUser.fullName}
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600 sm:flex disabled:opacity-50"
              >
                <LogOut size={18} />

                {isLoggingOut
                  ? "Saindo..."
                  : "Sair"}
              </button>

              {/* Mobile profile icon */}
              <Link
                to="/profile"
                className="rounded-full p-2 text-gray-700 hover:bg-gray-100 sm:hidden"
              >
                <User size={23} />
              </Link>

            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-700"
            >
              <User size={18} />

              <span>Entrar</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
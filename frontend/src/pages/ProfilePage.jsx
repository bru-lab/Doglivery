import { useState } from "react";
import {
  Camera,
  LogOut,
  Mail,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuthStore } from "../stores/authStore";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(null);

  const {
    authUser,
    logout,
    updateProfile,
    isLoggingOut,
    isUpdatingProfile,
  } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Meu perfil
        </h1>

        <p className="mt-2 text-gray-500">
          Gerencie suas informações.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Header */}
          <div className="flex flex-col items-center gap-6 border-b p-8 sm:flex-row">

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={
                    selectedImg ||
                    authUser?.profilePic ||
                    "/avatar.png"
                  }
                  alt="Profile"
                  className="size-32 rounded-full border-4 border-gray-100 object-cover"
                />

                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0
                    cursor-pointer rounded-full
                    bg-gray-900 p-2
                    transition-all duration-200
                    hover:scale-105
                    ${isUpdatingProfile
                      ? "pointer-events-none animate-pulse"
                      : ""
                    }
                  `}
                >
                  <Camera className="h-5 w-5 text-white" />

                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              <p className="text-center text-sm text-gray-400">
                {isUpdatingProfile
                  ? "Atualizando foto..."
                  : "Clique no ícone da câmera para alterar sua foto"}
              </p>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {authUser?.fullName}
              </h2>

              <p className="text-gray-500">
                {authUser?.role === "admin"
                  ? "Administrador"
                  : "Cliente"}
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 text-gray-500">
                <UserCircle size={20} />

                <span className="text-sm">
                  Nome completo
                </span>
              </div>

              <p className="mt-1 font-semibold text-gray-900">
                {authUser?.fullName}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 text-gray-500">
                <Mail size={20} />

                <span className="text-sm">
                  Email
                </span>
              </div>

              <p className="mt-1 font-semibold text-gray-900">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t bg-gray-50 p-6">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="
                flex w-full items-center justify-center gap-2
                rounded-xl border border-red-200
                bg-white py-3 font-semibold text-red-600
                transition hover:bg-red-50
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              <LogOut size={19} />

              {isLoggingOut
                ? "Saindo..."
                : "Sair da conta"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
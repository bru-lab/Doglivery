import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { useAuthStore } from "../stores/authStore";

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    login,
    isLoggingIn,
  } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    const result = await login(
      email,
      password
    );

    if (!result.success) {
      setError(result.error);
      return;
    }

    // ADMIN
    if (result.user.role === "admin") { navigate("/admin"); return; }

    // CUSTOMER
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="text-4xl"
          >
            🌭
          </Link>

          <h1 className="mt-4 text-3xl font-bold">
            Bem-vindo de volta!
          </h1>

          <p className="mt-2 text-gray-500">
            Entre na sua conta para continuar.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="seu@email.com"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Senha
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Sua senha"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingIn ? (
              <>
                <LoaderCircle
                  size={20}
                  className="animate-spin"
                />

                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Ainda não possui uma conta?{" "}
            <Link
              to="/signup"
              className="font-semibold text-red-600 hover:text-red-700"
            >
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuthStore } from "../stores/authStore";

export default function SignupPage() {
  const navigate = useNavigate();

  const {
    signup,
    isSigningUp,
  } = useAuthStore();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError(
        "A senha deve possuir pelo menos 6 caracteres."
      );
      return;
    }

    const result = await signup({
      fullName,
      email,
      password,
    });

    if (!result.success) {
      setError(result.error);
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
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
            Criar conta
          </h1>

          <p className="mt-2 text-gray-500">
            Crie sua conta e peça seu hot dog favorito.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Full name */}
          <div className="mb-5">
            <label className="mb-2 block font-medium text-gray-700">
              Nome completo
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              placeholder="Seu nome"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
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
                placeholder="Mínimo 6 caracteres"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Confirmar senha
            </label>

            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Digite sua senha novamente"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSigningUp}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningUp ? (
              <>
                <LoaderCircle
                  size={20}
                  className="animate-spin"
                />

                Criando conta...
              </>
            ) : (
              "Criar conta"
            )}
          </button>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Já possui uma conta?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-600 hover:text-red-700"
            >
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
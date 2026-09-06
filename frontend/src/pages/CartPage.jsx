import { Link } from "react-router-dom";
import {
  ArrowLeft,
  LoaderCircle,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { useCartStore } from "../stores/cartStore";
import Navbar from "../components/Navbar";

export default function CartPage() {
  const {
    items,
    totalPrice,
    isLoading,
    updatingProductId,
    addToCart,
    decreaseCartItem,
    removeFromCart,
  } = useCartStore();

  if (isLoading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <LoaderCircle
            size={40}
            className="animate-spin text-red-600"
          />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600"
          >
            <ArrowLeft size={18} />

            Continuar comprando
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            Seu carrinho
          </h1>

          <p className="mt-2 text-gray-500">
            Revise seus produtos antes de finalizar.
          </p>
        </div>

        {/* Empty cart */}
        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="text-7xl">
              🛒
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Seu carrinho está vazio
            </h2>

            <p className="mt-2 text-gray-500">
              Adicione alguns hot dogs deliciosos!
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
            >
              Ver cardápio
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* Items */}
            <div className="space-y-4">
              {items.map((item) => {
                const product = item.product;

                const isUpdating =
                  updatingProductId === product._id;

                return (
                  <div
                    key={product._id}
                    className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
                  >
                    {/* Image */}
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-4xl">
                          🌭
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <h2 className="font-bold text-gray-900">
                          {product.name}
                        </h2>

                        <p className="mt-1 font-semibold text-red-600">
                          R$ {Number(product.price).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">

                        {/* Quantity */}
                        <div className="flex items-center rounded-lg border">
                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              decreaseCartItem(
                                product._id
                              )
                            }
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="min-w-8 text-center font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              addToCart(
                                product._id
                              )
                            }
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            removeFromCart(
                              product._id
                            )
                          }
                          className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 size={19} />
                        </button>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Resumo do pedido
              </h2>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span>
                    R$ {Number(totalPrice).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Entrega</span>

                  <span>
                    R$ 5,00
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>

                    <span className="text-red-600">
                      R$ {(Number(totalPrice) + 5).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 block w-full rounded-xl bg-red-600 py-3.5 text-center font-bold text-white transition hover:bg-red-700"
              >
                Finalizar pedido
              </Link>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
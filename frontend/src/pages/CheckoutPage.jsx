import { useState } from "react";
import {
  ArrowLeft,
  LoaderCircle,
  MapPin,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useCartStore } from "../stores/cartStore";
import { useOrderStore } from "../stores/orderStore";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const {
    items,
    totalPrice,
    clearCart,
  } = useCartStore();

  const {
    createOrder,
    isCreatingOrder,
  } = useOrderStore();

  const [deliveryAddress, setDeliveryAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("cash");

  const [error, setError] = useState("");

  const deliveryFee = 5;

  const finalTotal =
    Number(totalPrice) + deliveryFee;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (items.length === 0) {
      setError("Seu carrinho está vazio.");
      return;
    }

    if (!deliveryAddress.trim()) {
      setError(
        "Digite seu endereço de entrega."
      );
      return;
    }

    const orderData = {
      deliveryAddress:
        deliveryAddress.trim(),

      paymentMethod,
    };

    console.log(
      "Creating order:",
      orderData
    );

    const result = await createOrder({
      deliveryAddress: deliveryAddress.trim(),
      paymentMethod,
    });

    if (!result.success) {
      setError(result.error);
      return;
    }

    clearCart();

    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          to="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600"
        >
          <ArrowLeft size={18} />

          Voltar para o carrinho
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">
          Finalizar pedido
        </h1>

        <p className="mt-2 text-gray-500">
          Confira seus dados antes de confirmar.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Checkout form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
          >

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Address */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <MapPin
                    size={20}
                    className="text-red-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Endereço de entrega
                  </h2>

                  <p className="text-sm text-gray-500">
                    Onde devemos entregar seu pedido?
                  </p>
                </div>
              </div>

              <textarea
                value={deliveryAddress}
                onChange={(event) =>
                  setDeliveryAddress(
                    event.target.value
                  )
                }
                placeholder="Rua, número, bairro, cidade, estado e complemento..."
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Payment */}
            <div className="mt-8">
              <h2 className="text-xl font-bold">
                Forma de pagamento
              </h2>

              <div className="mt-4 space-y-3">

                {/* Cash */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${paymentMethod === "cash"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={
                      paymentMethod === "cash"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                    className="accent-red-600"
                  />

                  <span className="text-xl">
                    💵
                  </span>

                  <div>
                    <p className="font-semibold">
                      Dinheiro
                    </p>

                    <p className="text-sm text-gray-500">
                      Pague na entrega
                    </p>
                  </div>
                </label>

                {/* Card */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${paymentMethod === "card"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={
                      paymentMethod === "card"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                    className="accent-red-600"
                  />

                  <span className="text-xl">
                    💳
                  </span>

                  <div>
                    <p className="font-semibold">
                      Cartão
                    </p>

                    <p className="text-sm text-gray-500">
                      Pague na entrega
                    </p>
                  </div>
                </label>

                {/* PIX */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${paymentMethod === "pix"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pix"
                    checked={
                      paymentMethod === "pix"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                    className="accent-red-600"
                  />

                  <span className="text-xl">
                    📱
                  </span>

                  <div>
                    <p className="font-semibold">
                      PIX
                    </p>

                    <p className="text-sm text-gray-500">
                      Pagamento instantâneo
                    </p>
                  </div>
                </label>

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={
                isCreatingOrder ||
                items.length === 0
              }
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-4 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreatingOrder ? (
                <>
                  <LoaderCircle
                    size={20}
                    className="animate-spin"
                  />

                  Criando pedido...
                </>
              ) : (
                <>
                  Confirmar pedido — R${" "}
                  {finalTotal.toFixed(2)}
                </>
              )}
            </button>
          </form>

          {/* Order summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Resumo do pedido
            </h2>

            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold">
                      {item.product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.quantity}x R${" "}
                      {Number(
                        item.product.price
                      ).toFixed(2)}
                    </p>
                  </div>

                  <span className="font-semibold">
                    R${" "}
                    {(
                      item.product.price *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-5">

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>

                <span>
                  R${" "}
                  {Number(totalPrice).toFixed(2)}
                </span>
              </div>

              <div className="mt-3 flex justify-between text-gray-600">
                <span>Entrega</span>

                <span>
                  R$ {deliveryFee.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total</span>

                <span className="text-red-600">
                  R$ {finalTotal.toFixed(2)}
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
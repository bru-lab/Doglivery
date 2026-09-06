import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock,
  LoaderCircle,
  MapPin,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useOrderStore } from "../stores/orderStore";

const statusSteps = [
  {
    key: "pending",
    label: "Pedido recebido",
    description: "Seu pedido foi recebido.",
    icon: Package,
  },
  {
    key: "preparing",
    label: "Preparando",
    description: "Seu hot dog está sendo preparado.",
    icon: Clock,
  },
  {
    key: "on-the-way",
    label: "A caminho",
    description: "Seu pedido saiu para entrega.",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "Entregue",
    description: "Seu pedido foi entregue.",
    icon: Check,
  },
];

const statusOrder = [
  "pending",
  "preparing",
  "on-the-way",
  "delivered",
];

function formatDate(date) {
  return new Date(date).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}

function formatDateTime(date) {
  return new Date(date).toLocaleString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function getCurrentStep(status) {
  return statusOrder.indexOf(status);
}

export default function OrderDetailsPage() {
  const { id } = useParams();

  const {
    getOrderById,
    isLoadingOrder,
  } = useOrderStore();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      setError("");

      const result =
        await getOrderById(id);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setOrder(result.order);
    };

    loadOrder();
  }, [id, getOrderById]);

  if (isLoadingOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <LoaderCircle
            size={40}
            className="animate-spin text-red-600"
          />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600"
          >
            <ArrowLeft size={18} />
            Voltar para meus pedidos
          </Link>

          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
            <XCircle
              size={50}
              className="mx-auto text-red-500"
            />

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Pedido não encontrado
            </h1>

            <p className="mt-2 text-gray-500">
              {error ||
                "Não foi possível carregar este pedido."}
            </p>

            <Link
              to="/orders"
              className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
            >
              Meus pedidos
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const currentStep =
    getCurrentStep(order.orderStatus);

  const isCancelled =
    order.orderStatus === "cancelled";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600"
        >
          <ArrowLeft size={18} />
          Voltar para meus pedidos
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Pedido #
              {order._id
                .slice(-6)
                .toUpperCase()}
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Detalhes do pedido
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Realizado em{" "}
              {formatDateTime(
                order.createdAt
              )}
            </p>
          </div>

          <div
            className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
              isCancelled
                ? "bg-red-100 text-red-700"
                : order.orderStatus ===
                  "delivered"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {isCancelled
              ? "Cancelado"
              : order.orderStatus ===
                "delivered"
              ? "Entregue"
              : order.orderStatus ===
                "on-the-way"
              ? "A caminho"
              : order.orderStatus ===
                "preparing"
              ? "Preparando"
              : "Pedido recebido"}
          </div>
        </div>

        {/* Cancelled */}
        {isCancelled && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3">
              <XCircle
                size={24}
                className="text-red-600"
              />

              <div>
                <h2 className="font-bold text-red-800">
                  Pedido cancelado
                </h2>

                <p className="mt-1 text-sm text-red-700">
                  Este pedido foi cancelado e
                  não será entregue.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tracking */}
        {!isCancelled && (
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
              Acompanhe seu pedido
            </h2>

            <div className="mt-8">
              {statusSteps.map(
                (step, index) => {
                  const Icon = step.icon;

                  const completed =
                    index <= currentStep;

                  const isCurrent =
                    index === currentStep;

                  return (
                    <div
                      key={step.key}
                      className="relative flex gap-4"
                    >
                      {/* Vertical line */}
                      {index <
                        statusSteps.length - 1 && (
                        <div
                          className={`absolute left-5 top-10 h-14 w-0.5 ${
                            index <
                            currentStep
                              ? "bg-red-600"
                              : "bg-gray-200"
                          }`}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          completed
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      {/* Content */}
                      <div className="pb-10">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-semibold ${
                              completed
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </h3>

                          {isCurrent && (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                              Atual
                            </span>
                          )}
                        </div>

                        <p
                          className={`mt-1 text-sm ${
                            completed
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          {step.description}
                        </p>

                        {step.key ===
                          "delivered" &&
                          order.deliveredAt && (
                            <p className="mt-1 text-xs text-gray-400">
                              Entregue em{" "}
                              {formatDateTime(
                                order.deliveredAt
                              )}
                            </p>
                          )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Order items */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Itens do pedido
          </h2>

          <div className="mt-5 divide-y">
            {order.items.map(
              (item, index) => (
                <div
                  key={
                    item.product?._id ||
                    index
                  }
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600">
                      {item.quantity}x
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        R${" "}
                        {Number(
                          item.price
                        ).toFixed(2)}{" "}
                        cada
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    R${" "}
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="mt-5 flex justify-between border-t pt-5">
            <span className="text-lg font-bold">
              Total
            </span>

            <span className="text-xl font-bold text-red-600">
              R${" "}
              {Number(
                order.totalPrice
              ).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Delivery + payment */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {/* Address */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <MapPin
                  size={20}
                  className="text-red-600"
                />
              </div>

              <h2 className="text-lg font-bold">
                Endereço de entrega
              </h2>
            </div>

            <p className="mt-4 leading-relaxed text-gray-600">
              {order.deliveryAddress}
            </p>
          </div>

          {/* Payment */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <span className="text-lg">
                  {order.paymentMethod ===
                  "pix"
                    ? "📱"
                    : order.paymentMethod ===
                      "card"
                    ? "💳"
                    : "💵"}
                </span>
              </div>

              <h2 className="text-lg font-bold">
                Pagamento
              </h2>
            </div>

            <p className="mt-4 capitalize text-gray-600">
              {order.paymentMethod ===
                "pix" && "PIX"}

              {order.paymentMethod ===
                "card" && "Cartão"}

              {order.paymentMethod ===
                "cash" && "Dinheiro"}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Status:{" "}
              <span className="font-medium text-gray-700">
                {order.paymentStatus ===
                "paid"
                  ? "Pago"
                  : "Pendente"}
              </span>
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}


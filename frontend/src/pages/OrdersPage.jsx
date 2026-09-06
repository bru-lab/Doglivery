
import { useEffect } from "react";
import {
    CalendarDays,
    ChevronRight,
    Clock,
    LoaderCircle,
    Package,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useOrderStore } from "../stores/orderStore";

function getStatusInfo(status) {
    const statuses = {
        pending: {
            label: "Pedido recebido",
            className:
                "bg-yellow-100 text-yellow-700",
        },

        preparing: {
            label: "Preparando",
            className:
                "bg-blue-100 text-blue-700",
        },

        "on-the-way": {
            label: "A caminho",
            className:
                "bg-purple-100 text-purple-700",
        },

        delivered: {
            label: "Entregue",
            className:
                "bg-green-100 text-green-700",
        },

        cancelled: {
            label: "Cancelado",
            className:
                "bg-red-100 text-red-700",
        },
    };

    return (
        statuses[status] || {
            label: status,
            className:
                "bg-gray-100 text-gray-700",
        }
    );
}

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

function formatTime(date) {
    return new Date(date).toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    );
}

export default function OrdersPage() {
    const {
        orders,
        getOrders,
        isLoadingOrders,
        error,
    } = useOrderStore();

    useEffect(() => {
        getOrders();
    }, [getOrders]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Meus pedidos
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Acompanhe seus pedidos e veja seu histórico.
                    </p>
                </div>

                {/* Loading */}
                {isLoadingOrders && (
                    <div className="flex min-h-60 items-center justify-center">
                        <LoaderCircle
                            size={40}
                            className="animate-spin text-red-600"
                        />
                    </div>
                )}

                {/* Error */}
                {!isLoadingOrders && error && (
                    <div className="mt-8 rounded-2xl bg-red-50 p-6 text-center text-red-600">
                        <p className="font-semibold">
                            Não foi possível carregar seus pedidos.
                        </p>

                        <p className="mt-1 text-sm">
                            {error}
                        </p>

                        <button
                            onClick={getOrders}
                            className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
                        >
                            Tentar novamente
                        </button>
                    </div>
                )}

                {/* Empty */}
                {!isLoadingOrders &&
                    !error &&
                    orders.length === 0 && (
                        <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                <Package
                                    size={40}
                                    className="text-gray-400"
                                />
                            </div>

                            <h2 className="mt-5 text-xl font-bold text-gray-900">
                                Você ainda não fez nenhum pedido
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Que tal pedir um delicioso hot dog?
                            </p>

                            <Link
                                to="/"
                                className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
                            >
                                Ver cardápio
                            </Link>
                        </div>
                    )}

                {/* Orders */}
                {!isLoadingOrders &&
                    !error &&
                    orders.length > 0 && (
                        <div className="mt-8 space-y-5">

                            {orders.map((order) => {
                                const status =
                                    getStatusInfo(
                                        order.orderStatus
                                    );

                                return (
                                    <div
                                        key={order._id}
                                        className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                                    >

                                        {/* Order header */}
                                        <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Package
                                                        size={20}
                                                        className="text-red-600"
                                                    />

                                                    <h2 className="font-bold text-gray-900">
                                                        Pedido #
                                                        {order._id.slice(-6).toUpperCase()}
                                                    </h2>
                                                </div>

                                                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">

                                                    <span className="flex items-center gap-1.5">
                                                        <CalendarDays size={15} />

                                                        {formatDate(
                                                            order.createdAt
                                                        )}
                                                    </span>

                                                    <span className="flex items-center gap-1.5">
                                                        <Clock size={15} />

                                                        {formatTime(
                                                            order.createdAt
                                                        )}
                                                    </span>

                                                </div>
                                            </div>

                                            <span
                                                className={`w-fit rounded-full px-3 py-1.5 text-sm font-semibold ${status.className}`}
                                            >
                                                {status.label}
                                            </span>

                                        </div>

                                        {/* Items */}
                                        <div className="p-5">

                                            <div className="space-y-3">
                                                {order.items.map(
                                                    (item, index) => (
                                                        <div
                                                            key={
                                                                item.product?._id ||
                                                                index
                                                            }
                                                            className="flex items-center justify-between gap-4"
                                                        >
                                                            <div className="flex items-center gap-3">

                                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600">
                                                                    {item.quantity}x
                                                                </div>

                                                                <div>
                                                                    <p className="font-medium text-gray-900">
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

                                                            <span className="font-semibold text-gray-900">
                                                                R${" "}
                                                                {(
                                                                    item.price *
                                                                    item.quantity
                                                                ).toFixed(2)}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-5 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">

                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Total
                                                    </p>

                                                    <p className="text-xl font-bold text-red-600">
                                                        R${" "}
                                                        {Number(
                                                            order.totalPrice
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>

                                                <Link
                                                    to={`/orders/${order._id}`}
                                                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                >
                                                    Ver pedido

                                                    <ChevronRight
                                                        size={18}
                                                    />
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    )}

            </main>
        </div>
    );
}


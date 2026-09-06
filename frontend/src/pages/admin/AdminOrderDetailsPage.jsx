import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useOrderStore } from "../../stores/orderStore.js";

export default function AdminOrderDetailsPage() {
  const { id } = useParams();

  const {
    selectedOrder,
    isLoadingOrder,
    error,
    getOrderById,
    updateOrderStatus,
  } = useOrderStore();

  useEffect(() => {
    if (id) {
      getOrderById(id);
    }
  }, [id, getOrderById]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;

    if (!selectedOrder) return;

    await updateOrderStatus(
      selectedOrder._id,
      newStatus
    );
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value || 0));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoadingOrder && !selectedOrder) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          Loading order...
        </p>
      </div>
    );
  }

  if (error && !selectedOrder) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-600">
            {error}
          </p>

          <Link
            to="/admin/orders"
            className="inline-block mt-4 text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to orders
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          Order not found.
        </p>

        <Link
          to="/admin/orders"
          className="inline-block mt-4 text-orange-500 hover:text-orange-600 font-medium"
        >
          ← Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <Link
          to="/admin/orders"
          className="text-sm text-gray-500 hover:text-orange-500"
        >
          ← Back to orders
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{selectedOrder._id.slice(-6).toUpperCase()}
            </h1>

            <p className="text-gray-500 mt-1">
              Placed on {formatDate(selectedOrder.createdAt)}
            </p>
          </div>

          {/* Status */}
          <div>
            <select
              value={selectedOrder.orderStatus}
              onChange={handleStatusChange}
              disabled={isLoadingOrder}
              className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="pending">
                Pending
              </option>

              <option value="preparing">
                Preparing
              </option>

              <option value="on-the-way">
                on-the-way
              </option>

              <option value="delivered">
                Delivered
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>
          </div>

        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left */}
        <div className="lg:col-span-2 space-y-6">

          {/* Order Items */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                Order Items
              </h2>
            </div>

            <div className="divide-y divide-gray-100">

              {selectedOrder.items?.map((item) => (
                <div
                  key={item._id}
                  className="p-6 flex items-center gap-4"
                >

                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">

                    {item.product?.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        🌭
                      </div>
                    )}

                  </div>

                  {/* Product Info */}
                  <div className="flex-1">

                    <h3 className="font-semibold text-gray-900">
                      {item.product?.name || "Product"}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {formatCurrency(item.price || item.product?.price)}
                    </p>

                  </div>

                  {/* Quantity */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Quantity
                    </p>

                    <p className="font-semibold text-gray-900 mt-1">
                      {item.quantity}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="text-right min-w-[100px]">

                    <p className="font-semibold text-gray-900">
                      {formatCurrency(
                        Number(
                          item.price ||
                          item.product?.price ||
                          0
                        ) * item.quantity
                      )}
                    </p>

                  </div>

                </div>
              ))}

            </div>

            {/* Order Total */}
            <div className="border-t border-gray-200 p-6">

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-orange-500">
                  {formatCurrency(
                    selectedOrder.totalPrice
                  )}
                </span>
              </div>

            </div>

          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-xl border border-gray-200">

            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                Delivery Information
              </h2>
            </div>

            <div className="p-6">

              <div>
                <p className="text-sm text-gray-500">
                  Delivery Address
                </p>

                <p className="font-medium text-gray-900 mt-1">
                  {selectedOrder.deliveryAddress ||
                    "No address provided"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Right */}
        <div className="space-y-6">

          {/* Customer */}
          <div className="bg-white rounded-xl border border-gray-200">

            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                Customer
              </h2>
            </div>

            <div className="p-6">

              <div className="mb-5">
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-medium text-gray-900 mt-1">
                  {selectedOrder.user?.fullName ||
                    "Customer"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-medium text-gray-900 mt-1 break-all">
                  {selectedOrder.user?.email ||
                    "No email"}
                </p>
              </div>

            </div>

          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl border border-gray-200">

            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                Payment
              </h2>
            </div>

            <div className="p-6">

              <p className="text-sm text-gray-500">
                Payment Method
              </p>

              <p className="font-semibold text-gray-900 mt-1 capitalize">
                {selectedOrder.paymentMethod ||
                  "Not specified"}
              </p>

            </div>

          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl border border-gray-200">

            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                Order Summary
              </h2>
            </div>

            <div className="p-6 space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Items
                </span>

                <span className="font-medium text-gray-900">
                  {selectedOrder.items?.length || 0}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Status
                </span>

                <StatusBadge
                  status={selectedOrder.orderStatus}
                />
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-bold text-gray-900">
                  Total
                </span>

                <span className="font-bold text-orange-500">
                  {formatCurrency(
                    selectedOrder.totalPrice
                  )}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function StatusBadge({ status }) {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    preparing: "bg-blue-100 text-blue-700",
    out_for_delivery: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const statusLabels = {
    pending: "Pending",
    preparing: "Preparing",
    out_for_delivery: "Out for delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
        statusStyles[status] ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}


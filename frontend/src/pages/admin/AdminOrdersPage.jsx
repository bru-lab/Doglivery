import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useOrderStore } from "../../stores/orderStore.js";

export default function AdminOrdersPage() {
  const {
    orders,
    isLoadingOrders,
    error,
    getAllOrders,
  } = useOrderStore();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

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

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" ||
        order.orderStatus === statusFilter;

      const shortId =
        order._id?.slice(-6).toLowerCase() || "";

      const fullId =
        order._id?.toLowerCase() || "";

      const customerName =
        order.user?.fullName?.toLowerCase() || "";

      const customerEmail =
        order.user?.email?.toLowerCase() || "";

      const matchesSearch =
        !normalizedSearch ||
        shortId.includes(normalizedSearch) ||
        fullId.includes(normalizedSearch) ||
        customerName.includes(normalizedSearch) ||
        customerEmail.includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  if (isLoadingOrders) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          View and manage customer orders.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by order, name or email..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="all">
                All orders
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="preparing">
                Preparing
              </option>

              <option value="on-the-way">
                On the way
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

      {/* Results count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {filteredOrders.length} order
          {filteredOrders.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        {filteredOrders.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Order
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Items
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Total
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >

                    {/* Order ID */}
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div>

                        <p className="font-medium text-gray-900">
                          {order.user?.fullName || "Customer"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {order.user?.email || ""}
                        </p>

                      </div>
                    </td>

                    {/* Items */}
                    <td className="px-6 py-4 text-gray-600">
                      {order.items?.reduce(
                        (total, item) =>
                          total + Number(item.quantity || 0),
                        0
                      )}
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {formatCurrency(order.totalPrice)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBadge
                        status={order.orderStatus}
                      />
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>

                    {/* View */}
                    <td className="px-6 py-4 text-right">

                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-orange-500 border border-orange-200 rounded-lg hover:bg-orange-50 transition"
                      >
                        View
                      </Link>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

function StatusBadge({ status }) {
  const statusStyles = {
    pending:
      "bg-yellow-100 text-yellow-700",

    preparing:
      "bg-blue-100 text-blue-700",

    "on-the-way":
      "bg-purple-100 text-purple-700",

    delivered:
      "bg-green-100 text-green-700",

    cancelled:
      "bg-red-100 text-red-700",
  };

  const statusLabels = {
    pending: "Pending",
    preparing: "Preparing",
    "on-the-way": "On the way",
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
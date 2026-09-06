import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useOrderStore } from "../../stores/orderStore.js";

export default function AdminDashboard() {
  const {
    orders,
    isLoadingOrders,
    error,
    getAllOrders,
  } = useOrderStore();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  // Statistics
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus === "pending"
  ).length;

  const completedOrders = orders.filter(
    (order) =>
      order.orderStatus === "delivered"
  ).length;

  const revenue = orders
    .filter(
      (order) =>
        order.orderStatus === "delivered"
    )
    .reduce(
      (total, order) =>
        total + Number(order.totalPrice || 0),
      0
    );

  // Most recent 5 orders
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back. Here's what's happening
          with your store.
        </p>
      </div>


      {/* Loading */}
      {isLoadingOrders && (
        <div className="mb-6 bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-gray-500">
            Loading dashboard...
          </p>
        </div>
      )}


      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      )}


      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon="📦"
        />

        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          icon="⏳"
        />

        <StatCard
          title="Completed Orders"
          value={completedOrders}
          icon="✅"
        />

        <StatCard
          title="Revenue"
          value={formatCurrency(revenue)}
          icon="💰"
        />

      </div>


      {/* Quick Actions */}
      <div className="mt-10">

        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Link
            to="/admin/products/create"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">
              🌭
            </div>

            <h3 className="font-bold text-gray-900">
              Add Product
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Create a new product for your store.
            </p>
          </Link>


          <Link
            to="/admin/orders"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">
              📦
            </div>

            <h3 className="font-bold text-gray-900">
              View Orders
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Check and manage customer orders.
            </p>
          </Link>

        </div>

      </div>


      {/* Recent Orders */}
      <div className="mt-10">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-bold text-gray-900">
            Recent Orders
          </h2>

          <Link
            to="/admin/orders"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            View all
          </Link>

        </div>


        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

          {recentOrders.length === 0 ? (

            <div className="p-8 text-center text-gray-500">
              No orders yet.
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
                      Total
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {recentOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">

                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="font-medium text-orange-500 hover:text-orange-600"
                        >
                          #{order._id.slice(-6).toUpperCase()}
                        </Link>

                      </td>


                      <td className="px-6 py-4">

                        <div>

                          <p className="font-medium text-gray-900">
                            {order.user?.fullName ||
                              "Customer"}
                          </p>

                          <p className="text-sm text-gray-500">
                            {order.user?.email || ""}
                          </p>

                        </div>

                      </td>


                      <td className="px-6 py-4 font-medium text-gray-900">
                        {formatCurrency(
                          Number(order.totalPrice || 0)
                        )}
                      </td>


                      <td className="px-6 py-4">

                        <StatusBadge
                          status={order.orderStatus}
                        />

                      </td>


                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}


function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            {value}
          </p>

        </div>

        <div className="text-3xl">
          {icon}
        </div>

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

    out_for_delivery:
      "bg-purple-100 text-purple-700",

    delivered:
      "bg-green-100 text-green-700",

    cancelled:
      "bg-red-100 text-red-700",
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


import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../stores/productStore.js";

export default function AdminProducts() {
  const {
    products,
    getProducts,
    deleteProduct,
    isLoadingAdminProducts,
    isDeletingProduct,
    error,
  } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value || 0));
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    await deleteProduct(product._id);
  };

  const formatCategory = (category) => {
    const categories = {
      classic: "Classic",
      spicy: "Spicy",
      vegan: "Vegan",
      combo: "Combo",
    };

    return categories[category] || category;
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage the products available in your store.
          </p>
        </div>

        <Link
          to="/admin/products/create"
          className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition"
        >
          <span className="text-xl">+</span>
          Add Product
        </Link>

      </div>


      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      )}


      {/* Loading */}
      {isLoadingAdminProducts ? (

        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500">
            Loading products...
          </p>
        </div>

      ) : products.length === 0 ? (

        /* Empty state */
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

          <div className="text-5xl mb-4">
            🌭
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            No products yet
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            Start by adding your first product to the store.
          </p>

          <Link
            to="/admin/products/create"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition"
          >
            Add Your First Product
          </Link>

        </div>

      ) : (

        /* Products table */
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b border-gray-200">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Product
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Category
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Price
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {products.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
                  >

                    {/* Product */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        {product.image ? (

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                          />

                        ) : (

                          <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                            🌭
                          </div>

                        )}

                        <div>

                          <p className="font-semibold text-gray-900">
                            {product.name}
                          </p>

                          <p className="text-sm text-gray-500 max-w-xs truncate">
                            {product.description}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Category */}
                    <td className="px-6 py-4">

                      <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                        {formatCategory(product.category)}
                      </span>

                    </td>


                    {/* Price */}
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {formatCurrency(product.price)}
                    </td>


                    {/* Status */}
                    <td className="px-6 py-4">

                      {product.available ? (

                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          Active
                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          Unavailable
                        </span>

                      )}

                    </td>


                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex items-center justify-end gap-3">

                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(product)}
                          disabled={isDeletingProduct}
                          className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}

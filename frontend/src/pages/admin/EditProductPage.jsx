import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../../stores/productStore.js";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    selectedProduct,
    getProductById,
    updateProduct,
    isLoadingProduct,
    isUpdatingProduct,
    error,
    clearError,
  } = useProductStore();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "classic",
    available: true,
  });

  // Load product
  useEffect(() => {
    getProductById(id);
  }, [id, getProductById]);

  // Populate form when product is loaded
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price ?? "",
        image: selectedProduct.image || "",
        category: selectedProduct.category || "classic",
        available: selectedProduct.available ?? true,
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      image: formData.image.trim(),
      category: formData.category,
      available: formData.available,
    };

    const updatedProduct = await updateProduct(id, productData);

    if (updatedProduct) {
      navigate("/admin/products");
    }
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

  // Loading product
  if (isLoadingProduct) {
    return (
      <div className="p-8 max-w-4xl mx-auto">

        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500">
            Loading product...
          </p>
        </div>

      </div>
    );
  }

  // Product not found
  if (!selectedProduct && !isLoadingProduct) {
    return (
      <div className="p-8 max-w-4xl mx-auto">

        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">

          <div className="text-5xl mb-4">
            🌭
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Product not found
          </h1>

          <p className="text-gray-500 mt-2 mb-6">
            The product you're trying to edit could not be found.
          </p>

          <Link
            to="/admin/products"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition"
          >
            Back to Products
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-8">

        <Link
          to="/admin/products"
          className="inline-flex items-center text-sm text-gray-500 hover:text-orange-500 mb-4 transition"
        >
          ← Back to Products
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">
          Edit Product
        </h1>

        <p className="text-gray-500 mt-1">
          Update the information for this product.
        </p>

      </div>


      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start justify-between gap-4">

          <p className="text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={clearError}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ×
          </button>

        </div>
      )}


      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 md:p-8"
      >

        {/* Product Information */}
        <div className="mb-8">

          <h2 className="text-lg font-bold text-gray-900 mb-5">
            Product Information
          </h2>


          {/* Name */}
          <div className="mb-5">

            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Product Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Classic Hot Dog"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />

          </div>


          {/* Description */}
          <div className="mb-5">

            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product..."
              rows={4}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />

          </div>


          {/* Price + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Price */}
            <div>

              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Price
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  R$
                </span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />

              </div>

            </div>


            {/* Category */}
            <div>

              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              >

                <option value="classic">
                  Classic
                </option>

                <option value="spicy">
                  Spicy
                </option>

                <option value="vegan">
                  Vegan
                </option>

                <option value="combo">
                  Combo
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* Image */}
        <div className="mb-8">

          <h2 className="text-lg font-bold text-gray-900 mb-5">
            Product Image
          </h2>

          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Image URL
          </label>

          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />


          {/* Image Preview */}
          {formData.image && (
            <div className="mt-4">

              <p className="text-sm text-gray-500 mb-2">
                Preview
              </p>

              <img
                src={formData.image}
                alt="Product preview"
                className="w-40 h-40 object-cover rounded-xl border border-gray-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

            </div>
          )}

        </div>


        {/* Availability */}
        <div className="mb-8">

          <h2 className="text-lg font-bold text-gray-900 mb-5">
            Availability
          </h2>

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="w-5 h-5 accent-orange-500"
            />

            <div>

              <p className="font-medium text-gray-900">
                Product is available
              </p>

              <p className="text-sm text-gray-500">
                Customers can order this product.
              </p>

            </div>

          </label>

        </div>


        {/* Current Product Info */}
        <div className="mb-8 bg-gray-50 rounded-lg p-4">

          <p className="text-sm text-gray-500">
            Category
          </p>

          <p className="font-medium text-gray-900 mt-1">
            {formatCategory(formData.category)}
          </p>

        </div>


        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t border-gray-200">

          <Link
            to="/admin/products"
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold text-center hover:bg-gray-50 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isUpdatingProduct}
            className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdatingProduct
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}


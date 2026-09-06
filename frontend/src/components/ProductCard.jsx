import { LoaderCircle, ShoppingCart } from "lucide-react";

import { useCartStore } from "../stores/cartStore";

function ProductCard({ product }) {
  const {
    addToCart,
    updatingProductId,
  } = useCartStore();

  const isAdding =
    updatingProductId === product._id;

  const handleAddToCart = async () => {
    const result = await addToCart(product._id);

    if (result.success) {
      console.log(
        `${product.name} adicionado ao carrinho`
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      
      {/* Image */}
      <div className="h-52 overflow-hidden bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">
            🌭
          </div>
        )}
      </div>

      {/* Information */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xl font-bold text-red-600">
            R$ {Number(product.price).toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAdding ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />

                Adicionando...
              </>
            ) : (
              <>
                <ShoppingCart size={18} />

                Adicionar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
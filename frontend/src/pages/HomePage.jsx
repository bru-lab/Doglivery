import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useCartStore } from "../stores/cartStore";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../stores/productStore";

const categories = [
  {
    id: "all",
    name: "Todos",
    emoji: "🌭",
  },
  {
    id: "classic",
    name: "Clássicos",
    emoji: "🌭",
  },
  {
    id: "spicy",
    name: "Picantes",
    emoji: "🌶️",
  },
  {
    id: "vegan",
    name: "Veganos",
    emoji: "🥬",
  },
  {
    id: "combo",
    name: "Combos",
    emoji: "🍟",
  },
];

export default function HomePage() {
  const {
    products,
    isLoading,
    error,
    getProducts,
  } = useProductStore();

  const getCart = useCartStore(
    (state) => state.getCart
  );
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  useEffect(() => {
    getProducts();
    getCart();
  }, [getProducts, getCart]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
        (product) =>
          product.category === selectedCategory
      );



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-red-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-16 sm:px-6 md:flex-row lg:px-8">

          <div className="max-w-xl text-center md:text-left">
            <p className="mb-3 text-lg font-semibold text-red-100">
              O melhor hot dog da cidade 🌭
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Seu hot dog favorito,
              <br />
              entregue na sua porta.
            </h1>

            <p className="mt-5 text-lg text-red-100">
              Escolha seu favorito, faça seu pedido
              e aproveite.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="mt-7 rounded-xl bg-white px-6 py-3 font-bold text-red-600 shadow transition hover:bg-gray-100"
            >
              Ver cardápio
            </button>
          </div>

          <div className="text-[150px] leading-none drop-shadow-lg">
            🌭
          </div>
        </div>
      </section>

      {/* Products */}
      <main
        id="products"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Nosso cardápio
          </h2>

          <p className="mt-2 text-gray-500">
            Escolha seu hot dog favorito.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                setSelectedCategory(category.id)
              }
              className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-3 font-semibold transition ${selectedCategory === category.id
                ? "bg-red-600 text-white shadow"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              <span>{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <LoaderCircle
              className="animate-spin text-red-600"
              size={40}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 p-5 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Products */}
        {!isLoading &&
          !error &&
          filteredProducts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}

        {/* Empty */}
        {!isLoading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <div className="text-6xl">🌭</div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                Nenhum produto encontrado
              </h3>

              <p className="mt-2 text-gray-500">
                Não encontramos produtos nessa categoria.
              </p>
            </div>
          )}
      </main>
    </div>
  );
}
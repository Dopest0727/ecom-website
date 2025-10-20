"use client";

import { useState } from "react";
import Stripe from "stripe";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;
    return nameMatch || descriptionMatch;
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Header & Search */}
      <div className="flex flex-col items-center mb-12 space-y-6">
        <h2 className="text-3xl font-semibold text-stone-100">
          Alla produkter
        </h2>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Sök produkter..."
          className="w-full max-w-md rounded-md border border-stone-700 bg-stone-900 px-4 py-2
                     text-stone-100 placeholder-stone-500 focus:outline-none
                     focus:ring-1 focus:ring-stone-500 transition-all"
        />
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-stone-400 mt-12">
          Inga produkter matchar din sökning.
        </p>
      )}
    </section>
  );
};

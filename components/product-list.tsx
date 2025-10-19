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
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Header & Search */}
      <div className="flex flex-col items-center mb-10 space-y-4">
        <h2 className="text-3xl font-semibold text-stone-100">
          Alla produkter
        </h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Sök produkter..."
          className="w-full max-w-md rounded-xs border border-stone-700 bg-stone-900 px-4 py-2 
                     text-stone-100 placeholder-stone-500 focus:outline-none 
                     focus:ring-1 focus:ring-stone-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <li key={index}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-stone-400 mt-10">
          Inga produkter matchar din sökning.
        </p>
      )}
    </section>
  );
};

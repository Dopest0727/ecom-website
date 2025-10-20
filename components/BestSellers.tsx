"use client";

import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";
import { ArrowRight } from "lucide-react";

interface Props {
  products: Stripe.Product[];
}

export const BestSellers = ({ products }: Props) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="mb-8 text-3xl font-semibold text-stone-100">
        Bästsäljare
      </h2>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((product) => {
          const price = product.default_price as Stripe.Price;
          const unitAmount = price?.unit_amount ? price.unit_amount / 100 : 0;

          return (
            <div
              key={product.id}
              className="bg-stone-900 border border-stone-700 rounded-lg shadow-sm 
                         hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              {/* Product image */}
              {product.images?.[0] && (
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square w-full rounded-t-lg overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
              )}

              {/* Product content */}
              <div className="p-5">
                <Link href={`/products/${product.id}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-stone-100 hover:text-red-400 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h5>
                </Link>

                {product.description && (
                  <p className="mb-3 text-stone-400 text-sm line-clamp-2">
                    {product.description}
                  </p>
                )}

                <p className="mb-4 text-lg font-semibold text-red-500">
                  {unitAmount.toFixed(2)} kr
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center 
                             text-stone-900 bg-red-500 rounded-md hover:bg-red-400 focus:ring-2 
                             focus:outline-none focus:ring-red-600 transition-all"
                >
                  Visa produkt
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

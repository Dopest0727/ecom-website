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

  // Filtrera produkter som har metadata.bestseller = "true"
  const featuredProducts = products.filter(
    (product) => product.metadata?.bestseller === "true"
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-10 text-3xl font-semibold text-stone-100">
        Våra bästsäljare
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => {
          const price = product.default_price as Stripe.Price;
          const unitAmount = price?.unit_amount ? price.unit_amount / 100 : 0;

          return (
            <div
              key={product.id}
              className="group relative bg-stone-900 border border-stone-700 
                         rounded-md overflow-hidden shadow-sm 
                         hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              {/* Produktbild */}
              {product.images?.[0] && (
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
              )}

              {/* Produktinfo */}
              <div className="p-5">
                <Link href={`/products/${product.id}`}>
                  <h5 className="mb-2 text-2xl font-semibold text-stone-100 group-hover:text-stone-300 transition-colors">
                    {product.name}
                  </h5>
                </Link>

                {product.description && (
                  <p className="mb-4 text-stone-300 text-sm line-clamp-2">
                    {product.description}
                  </p>
                )}

                <p className="mb-5 text-lg font-light text-stone-100">
                  {unitAmount} kr
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-stone-300 
                             text-stone-100 bg-stone-900 rounded-sm 
                             hover:bg-stone-100 hover:text-stone-900 transition-all"
                >
                  Visa produkt
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

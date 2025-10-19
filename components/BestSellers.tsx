"use client";

import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";

interface Props {
  products: Stripe.Product[];
}

interface Props {
  product: Stripe.Product;
}

export const BestSellers = ({ products }: Props) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="mb-6 text-3xl font-semibold text-stone-100">
        Bästsäljare
      </h2>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product) => {
          const price = product.default_price as Stripe.Price;
          const unitAmount = price?.unit_amount ? price.unit_amount / 100 : 0;

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative rounded-sm border border-stone-700 bg-stone-900 p-3 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              {/* Product image */}
              {product.images?.[0] && (
                <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-stone-800">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Product info */}
              <div className="mt-4 space-y-1 text-left">
                <h3 className="text-lg font-medium text-stone-100 truncate">
                  {product.name}
                </h3>

                <p className="text-base font-medium text-stone-100">
                  {unitAmount.toFixed(2)} kr
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

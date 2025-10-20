"use client";

import Stripe from "stripe";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { Breadcrumbs } from "./Breadcrumbs";
import Link from "next/link";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { addItem } = useCartStore();
  const [selectedQty, setSelectedQty] = useState<number>(1);

  const price = product.default_price as Stripe.Price;
  const unitAmount = price?.unit_amount ? price.unit_amount / 100 : 0;

  const handleIncrease = () => setSelectedQty((prev) => prev + 1);
  const handleDecrease = () =>
    setSelectedQty((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: selectedQty,
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      {/* Breadcrumbs aligned */}
      <div className="mb-6">
        <Breadcrumbs category="Produkter" product={product.name} />
      </div>

      {/* Unified container */}
      <div className="rounded-md border border-stone-700 bg-stone-900 shadow-lg overflow-hidden transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center gap-8 p-6">
          {/* Product Image */}
          {product.images?.[0] && (
            <div className="relative w-full md:w-1/2 aspect-[4/5] overflow-hidden rounded-md bg-stone-800">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          {/* Product Info */}
          <div className="md:w-1/2 space-y-5">
            <h1 className="text-3xl md:text-4xl font-semibold text-stone-100">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-stone-300 leading-relaxed">
                {product.description}
              </p>
            )}

            <p className="text-2xl font-light text-stone-100">
              {unitAmount} kr
            </p>

            {/* Quantity Controls + Add button */}
            <div className="flex items-center gap-3 mt-2">
              <Button
                onClick={handleDecrease}
                className="border border-stone-200 text-stone-100"
              >
                <Minus className="w-5 h-5" />
              </Button>

              <span className="text-lg font-semibold text-stone-100 w-8 text-center">
                {selectedQty}
              </span>

              <Button
                onClick={handleIncrease}
                className="bg-stone-100 text-stone-900"
                variant={"ghost"}
              >
                <Plus className="w-5 h-5" />
              </Button>

              <Button
                onClick={handleAddToCart}
                className="ml-4 bg-stone-100 text-stone-900 hover:bg-stone-200"
              >
                Lägg till
              </Button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/checkout" className="w-full sm:w-auto">
                <Button className="w-full bg-stone-100 text-stone-900 hover:bg-stone-200">
                  Gå till kassan
                </Button>
              </Link>

              <Link href="/products" className="w-full sm:w-auto">
                <Button className="w-full border border-stone-600 text-stone-100 hover:bg-stone-800">
                  Tillbaka till produkter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import Stripe from "stripe";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { Breadcrumbs } from "./breadcrumbs";
import Link from "next/link";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const price = product.default_price as Stripe.Price;
  const unitAmount = price?.unit_amount ? price.unit_amount / 100 : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <>
      <Breadcrumbs category="Produkter" product={product.name} />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Product Image */}
          {product.images && product.images[0] && (
            <div className="relative h-[28rem] w-full md:w-1/2 overflow-hidden rounded-sm border border-stone-700 bg-stone-900 shadow-sm">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          {/* Product Info */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl font-semibold text-stone-100">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-stone-400 leading-relaxed">
                {product.description}
              </p>
            )}

            <p className="text-2xl font-semibold text-red-500">
              {unitAmount.toFixed(2)} kr
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => removeItem(product.id)}
                variant="outline"
                className="border-stone-600 text-stone-200 hover:bg-stone-800 hover:text-red-400"
              >
                −
              </Button>
              <span className="text-lg font-semibold text-stone-100 w-6 text-center">
                {quantity}
              </span>
              <Button
                onClick={onAddItem}
                className="bg-red-600 text-white hover:bg-red-500"
              >
                +
              </Button>
            </div>

            {/* Actions */}
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
      </section>
    </>
  );
};

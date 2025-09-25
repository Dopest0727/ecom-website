"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
      {currentProduct.images?.[0] && (
        <div className="relative h-96 w-full">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            fill
            className="object-contain p-8 transition-opacity duration-700 ease-in-out"
          />
        </div>
      )}
      <CardContent className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-md p-6">
        <div className="flex flex-col items-center space-y-2">
          <CardTitle className="text-2xl font-semibold text-neutral-900">
            {currentProduct.name}
          </CardTitle>
          {price?.unit_amount && (
            <p className="text-lg text-neutral-700">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

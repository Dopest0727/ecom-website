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
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-80 w-full">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            fill
            style={{ objectFit: "contain" }}
            className="transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}
      <CardContent className="absolute inset-0 flex items-center justify-between bg-black bg-opacity-50">
        <div className="bg-yellow-400 h-30 w-auto px-10 items-center flex flex-col justify-center rounded-lg">
          <CardTitle className="text-3xl  font-bold text-black mb-2">
            {currentProduct.name}
          </CardTitle>
          {price && price.unit_amount && (
            <p className="text-xl text-black text-center">
              {(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

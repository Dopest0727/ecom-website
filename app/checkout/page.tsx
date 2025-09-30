"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-neutral-600">
          Browse products to add items to your cart. test
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-12 text-center">Checkout</h1>

      <Card className="max-w-md mx-auto mb-10 border border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-3 border-b border-neutral-200 pb-4"
              >
                <div className="flex justify-between text-neutral-800">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold text-yellow-500">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold text-yellow-500">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-neutral-200 pt-4 text-lg font-semibold flex justify-between">
            <span>Total</span>
            <span className="text-yellow-500">${(total / 100).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <form action={checkoutAction} className="max-w-md mx-auto space-y-4">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-yellow-500 hover:text-black transition-colors"
        >
          Proceed to Payment
        </Button>
        <Button className="w-full bg-black text-white hover:bg-yellow-500 hover:text-black transition-colors">
          <Link href="/products">Go back to products</Link>
        </Button>
      </form>
    </div>
  );
}

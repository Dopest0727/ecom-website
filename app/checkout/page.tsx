"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash, Trash2 } from "lucide-react"; // Trash2 for clear cart

export default function CheckoutPage() {
  const { items, removeItem, addItem, deleteItem, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold mb-4 text-stone-100">
          Din kundvagn är tom
        </h1>
        <p className="text-stone-400">
          Bläddra bland produkter för att lägga till varor i din kundvagn.
        </p>
        <Link href="/products">
          <Button className="mt-6 bg-stone-100 text-stone-900 hover:bg-stone-200 w-48">
            Till Produkter
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-stone-100">Kassa</h1>
        <Button
          onClick={clearCart}
          className="border border-stone-200 text-stone-100 p-2 rounded-md hover:bg-stone-800 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-5 h-5" />
          <span className="text-sm">Rensa kundvagn</span>
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto mb-10 border border-stone-700 bg-stone-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-stone-100">
            Orderöversikt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row md:items-center gap-4 border-b border-stone-700 pb-4"
              >
                {/* Small image */}
                {item.imageUrl && (
                  <div className="w-20 h-20 relative flex-shrink-0 rounded-md bg-stone-800 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Product info */}
                <div className="flex-1 flex flex-col justify-between">
                  <span className="text-stone-100 text-base">{item.name}</span>
                  <span className="text-stone-400 text-sm">
                    {((item.price * item.quantity) / 100).toFixed(2)} kr
                  </span>
                </div>

                {/* Quantity & actions */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => removeItem(item.id)}
                    className="border border-stone-200 text-stone-100 p-2"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>

                  <span className="text-stone-100 text-base w-8 text-center">
                    {item.quantity}
                  </span>

                  <Button
                    onClick={() => addItem({ ...item, quantity: 1 })}
                    className="bg-stone-100 text-stone-900 p-2"
                    variant={"ghost"}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>

                  <Button
                    onClick={() => deleteItem(item.id)}
                    className="border border-stone-200 text-stone-100 p-2 ml-2"
                  >
                    <Trash className="w-5 h-5" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="mt-6 border-t border-stone-700 pt-4 text-lg font-semibold flex justify-between text-stone-100">
            <span>Total</span>
            <span>{(total / 100).toFixed(2)} kr</span>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Actions */}
      <form action={checkoutAction} className="max-w-3xl mx-auto space-y-4">
        <input type="hidden" name="items" value={JSON.stringify(items)} />

        <Button
          type="submit"
          className="w-full bg-stone-100 text-stone-900 hover:bg-stone-200 transition-all"
        >
          Gå till betalning
        </Button>

        <Link href="/products">
          <Button className="w-full border border-stone-600 text-stone-100 hover:bg-stone-800 transition-all">
            Tillbaka till produkter
          </Button>
        </Link>
      </form>
    </section>
  );
}

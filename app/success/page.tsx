"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Betalning Lyckades!</h1>
      <p className="mb-3">Tack för ditt köp. Din order behandlas just nu!</p>
      <Link href="/products" className="text-orange-500 hover:underline">
        Fortsätt Shoppa
      </Link>
    </div>
  );
}

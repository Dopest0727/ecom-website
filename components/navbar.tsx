"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="font-bold text-xl text-yellow-500 hover:text-yellow-400"
        >
          Minimal Rusta
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link
            href="/products"
            className="text-gray-800 hover:text-yellow-500 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/checkout"
            className="text-gray-800 hover:text-yellow-500 transition-colors"
          >
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/checkout"
            className="relative hover:ring-1 hover:ring-yellow-500 rounded-lg transition"
          >
            <ShoppingCartIcon className="h-6 w-6 text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-md shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link
                href="/"
                className="block text-gray-800 hover:text-yellow-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block text-gray-800 hover:text-yellow-500"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="block text-gray-800 hover:text-yellow-500"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};

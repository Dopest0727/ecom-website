"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Menu, X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { name: "Hem", href: "/" },
    { name: "Produkter", href: "/products" },
    { name: "Varukorg", href: "/checkout" },
  ];

  return (
    <nav className=" backdrop-blur-md shadow-sm z-50 bg-stone-900/70">
      <div className="mx-auto grid max-w-7xl grid-cols-[150px_auto_150px] items-center px-6 py-3">
        {/* Left: Logo */}
        <div className="justify-self-start">
          <Link href="/">
            <h1 className="text-xl font-semibold tracking-tight text-stone-100">
              by Maurii<span className="text-red-500 ml-1">.</span>
            </h1>
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="justify-self-center">
          <ul className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-stone-100">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="relative group transition-colors hover:text-red-500"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-red-500 transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Cart + Mobile menu */}
        <div className="justify-self-end flex items-center space-x-4 relative">
          <Link
            href="/checkout"
            className="relative flex items-center justify-center rounded-md border border-stone-600 p-2 hover:border-stone-500 transition"
          >
            <ShoppingCartIcon className="h-5 w-5 text-stone-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu */}

          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden flex items-center justify-center rounded-md border border-stone-600 p-2 transition-colors hover:border-stone-500"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-stone-300" />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="bg-stone-900 px-2 py-1">
              {/* custom close button */}
              <SheetClose asChild>
                <button
                  className="absolute right-4 top-4 text-stone-300 hover:text-red-500 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </SheetClose>

              <SheetHeader className="mt-8">
                <SheetTitle>
                  <h1 className="text-stone-100 text-2xl">
                    by Maurii <span className="text-red-500">.</span>
                  </h1>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-stone-100 text-xl px-4 hover:text-red-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

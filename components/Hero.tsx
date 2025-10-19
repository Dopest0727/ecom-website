"use client";

import Image from "next/image";
import HERO_IMG from "../assets/HERO.jpg";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[65vh] w-full overflow-hidden bg-white dark:bg-stone-950">
      {/* Hero Image */}
      <Image
        src={HERO_IMG}
        alt="Hero background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent dark:from-stone-950 dark:via-stone-950/60 dark:to-transparent" />

      {/* Text Content */}
      <div className="absolute inset-0 flex justify-center">
        <div className="flex w-full max-w-7xl items-center justify-end px-6">
          <div className="max-w-md text-left">
            <h1 className="text-3xl md:text-7xl font-semibold tracking-tight text-white drop-shadow-md">
              by Maurii <span className="text-red-500 ml-1">.</span>
            </h1>
            <p className="mt-3 text-xl text-stone-200">
              Där design möter enkelhet.
            </p>
            <Link
              href="/products"
              className="mt-3 inline-block text-center rounded-xs border border-stone-300/70 bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-xs transition-all hover:border-red-500"
            >
              Visa sortiment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

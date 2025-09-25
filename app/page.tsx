import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      <section className="min-h-[80vh] flex items-center">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Welcome to Minimal Rusta
            </h1>
            <p className="text-lg text-neutral-600">
              Discover the latest products at the best prices.
            </p>
            <Button
              asChild
              className="w-fit rounded-full px-8 py-4 bg-black text-white text-base"
            >
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              alt="Hero Image"
              src={products.data[1].images[0]}
              className="rounded-xl object-contain"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </section>
      <section className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6">
          <Carousel products={products.data} />
        </div>
      </section>
    </div>
  );
}

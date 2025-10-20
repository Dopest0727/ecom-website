import { stripe } from "@/lib/stripe";
import Hero from "@/components/Hero";
import { BestSellers } from "@/components/BestSellers";
import HistoryBento from "@/components/History";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 3,
  });

  return (
    <div>
      <Hero />
      <BestSellers products={products.data} />
      <HistoryBento />
    </div>
  );
}

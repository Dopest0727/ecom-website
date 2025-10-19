import { stripe } from "@/lib/stripe";
import Hero from "@/components/Hero";
import { BestSellers } from "@/components/BestSellers";
import HistoryBento from "@/components/History";
import Footer from "@/components/Footer";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      <Hero />
      <BestSellers products={products.data} />
      <HistoryBento />
      <Footer />
    </div>
  );
}

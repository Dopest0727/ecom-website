import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      <section>
        <div>
          <div>
            <h2>Welcome to minimalistic Rusta</h2>
            <p>Samma produkter, renare hemsida</p>
            <Button asChild variant="default">
              Browse all products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

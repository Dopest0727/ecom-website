import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  const unitAmount = price?.unit_amount ? price.unit_amount / 100 : 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block h-full rounded-md border border-stone-700 bg-stone-900 overflow-hidden 
                 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      {/* Produktbild */}
      {product.images?.[0] && (
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-800">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Produktinfo */}
      <div className="p-5 flex flex-col justify-between space-y-4">
        {/* Namn & beskrivning */}
        <div>
          <h3 className="text-xl font-semibold text-stone-100 group-hover:text-stone-300 transition-colors truncate">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-sm text-stone-400 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Pris & knapp */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-light text-stone-100">
            {unitAmount.toFixed(0)} kr
          </p>

          <span
            className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-sm border border-stone-300 
                       text-stone-100 bg-stone-900 group-hover:bg-stone-100 group-hover:text-stone-900 
                       transition-all duration-300"
          >
            Visa produkt
          </span>
        </div>
      </div>
    </Link>
  );
};

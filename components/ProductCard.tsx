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
      className="group block h-full rounded-xs border border-stone-700 bg-stone-900 p-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      {/* Produktbild */}
      {product.images?.[0] && (
        <div className="relative aspect-square w-full overflow-hidden rounded-xs bg-stone-800">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Produktinfo */}
      <div className="mt-4 flex flex-col justify-between text-left space-y-3">
        {/* Namn & beskrivning */}
        <div>
          <h3 className="text-lg font-medium text-stone-100 truncate">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-stone-400 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Pris & knapp */}
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-stone-100">
            {unitAmount.toFixed(2)} kr
          </p>
          <span className="px-3 py-1 text-sm font-medium rounded-xs bg-stone-800 text-stone-100 border border-stone-700 group-hover:bg-stone-100 group-hover:text-stone-900 transition-colors duration-300">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

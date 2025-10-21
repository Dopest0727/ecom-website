import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface BreadcrumbsProps {
  category?: string;
  product?: string;
}

export const Breadcrumbs = ({ category, product }: BreadcrumbsProps) => {
  return (
    <nav className="text-sm text-stone-300 mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1">
        <li>
          <Link href="/">Home</Link>
        </li>
        {category && (
          <>
            <li>
              <ChevronRightIcon className="h-4 w-4 text-stone-300" />
            </li>
            <li>
              <Link href="/products">{category}</Link>
            </li>
          </>
        )}
        {product && (
          <>
            <li>
              <ChevronRightIcon className="h-4 w-4 text-stone-300" />
            </li>
            <li className="text-stone-500 font-medium">{product}</li>
          </>
        )}
      </ol>
    </nav>
  );
};

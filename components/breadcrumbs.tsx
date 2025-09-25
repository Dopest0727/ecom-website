import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface BreadcrumbsProps {
  category?: string;
  product?: string;
}

export const Breadcrumbs = ({ category, product }: BreadcrumbsProps) => {
  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1">
        <li>
          <Link href="/" className="hover:text-yellow-500">
            Home
          </Link>
        </li>
        {category && (
          <>
            <li>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            </li>
            <li>
              <Link href="/products" className="hover:text-yellow-500">
                {category}
              </Link>
            </li>
          </>
        )}
        {product && (
          <>
            <li>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            </li>
            <li className="text-gray-800 font-medium">{product}</li>
          </>
        )}
      </ol>
    </nav>
  );
};

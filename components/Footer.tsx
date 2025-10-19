"use client";
import Link from "next/link";

export default function Footer() {
  const links = [
    { name: "Om oss", href: "#" },
    { name: "Kontakt", href: "#" },
    { name: "Integritetspolicy", href: "#" },
    { name: "Villkor", href: "#" },
  ];

  return (
    <footer className="mt-20 border-t border-stone-800  bg-stone-950">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Left section */}
        <div>
          <h1 className="text-xl font-semibold text-stone-100">
            by Maurii<span className="text-red-500 ml-1">.</span>
          </h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Där design möter enkelhet.
          </p>
        </div>

        {/* Navigation links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-400">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="transition-colors hover:text-red-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom line */}
      <div className="dark:border-stone-800 py-4 text-center text-xs text-stone-500 dark:text-stone-500">
        © {new Date().getFullYear()} by Maurii. Alla rättigheter förbehållna.
      </div>
    </footer>
  );
}

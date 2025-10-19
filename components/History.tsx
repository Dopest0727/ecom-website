"use client";
import Image from "next/image";
import HIST_1 from "../assets/HIST_1.jpg";
import HIST_2 from "../assets/HIST_2.jpg";

export default function HistoryBento() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 h-[70vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
        {/* LEFT SIDE — 3 separate bento boxes */}
        <div className="grid grid-rows-3 gap-1">
          {/* Top Text */}
          <div className="flex flex-col justify-center rounded-sm border border-stone-600 bg-stone-900 shadow-sm p-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-stone-100">
              Du scrollade ner hit!
            </h2>
            <p className="mt-5 text-stone-100 leading-relaxed">
              Den här är by far den mest komplexa appen jag har byggt hittills.
              Den var egentligen tänkt handla om rislampor. Den hade en hel
              aestethic och känsla to it. Men eftersom IKEA inte tillåter att
              man använder deras bilder på Stripe fick jag tänka om. Så iställer
              blev det... grabbiga 3D bilder (TESTO!). Titta!!! 👉 en bild på
              öknen, jag har någon sorts hatkärlek till öknen.
            </p>
          </div>

          {/* Middle Image */}
          <div className="relative overflow-hidden rounded-sm shadow-sm border border-stone-600">
            <Image
              src={HIST_2}
              alt="Lanterns during festival"
              fill
              className="object-cover brightness-95 object-center"
            />
          </div>

          {/* Bottom Text — Tech Stack */}
          <div className="flex flex-col justify-center rounded-sm border border-stone-600 bg-stone-900 shadow-sm p-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-stone-100">
              Tech Stack
            </h2>
            <p className="my-5 text-stone-100 leading-relaxed">
              Byggd med självförakt och en gnutta koffein.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Stripe",
                "Shadcn UI",
                "Framer Motion",
                "Netlify",
              ].map((tech, i) => (
                <span
                  key={tech}
                  className={`px-3 py-1 text-sm font-medium rounded-sm border border-stone-600 text-stone-100 bg-stone-900/80 backdrop-blur-sm shadow-sm hover:scale-105 hover:bg-red-500 hover:text-white ${
                    i % 2 === 0 ? "animate-float-slow" : "animate-float-reverse"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Single tall image */}
        <div className="relative overflow-hidden rounded-sm shadow-sm border border-stone-600">
          <Image
            src={HIST_1}
            alt="Traditional rice lamp hanging"
            fill
            className="object-cover brightness-95 object-center"
          />
        </div>
      </div>
    </section>
  );
}

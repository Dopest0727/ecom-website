"use client";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";
import HIST_1 from "../assets/HIST_1.jpg";
import HIST_2 from "../assets/HIST_2.jpg";

export default function HistoryBento() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: easeOut } },
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-8 md:h-[70vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
        {/* LEFT SIDE — 3 separate bento boxes */}
        <div className="grid grid-rows-3 gap-3">
          {/* Top Text */}
          <motion.div
            className="flex flex-col justify-center rounded-md border border-stone-600 bg-stone-900 shadow-sm p-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-stone-100">
              Du scrollade ner hit!
            </h2>
            <p className="mt-5 text-stone-100 leading-relaxed">
              Den här är by far den mest komplexa appen jag har byggt hittills.
              Den var egentligen tänkt handla om rislampor. Den hade en hel
              aestethic och känsla to it. Men eftersom IKEA inte tillåter att
              man använder deras bilder på Stripe fick jag tänka om. Så istället
              blev det... grabbiga 3D bilder (TESTO!). Titta!!! 👉 (👇 om du
              kollar på din mobil) en bild på öknen — jag har någon sorts
              hatkärlek till öknen.
            </p>
          </motion.div>

          {/* Middle Image */}
          <motion.div
            className="relative overflow-hidden rounded-sm shadow-sm border border-stone-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src={HIST_2}
              alt="Lanterns during festival"
              fill
              className="object-cover brightness-95 object-center"
              priority
            />
          </motion.div>

          {/* Bottom Text — Tech Stack */}
          <motion.div
            className="flex flex-col justify-center rounded-sm border border-stone-600 bg-stone-900 shadow-sm p-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
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
                  className={`px-3 py-1 text-sm font-medium rounded-sm border border-stone-600 text-stone-100 bg-stone-900/80 backdrop-blur-sm shadow-sm hover:scale-105 hover:bg-red-500 hover:text-white transition-transform duration-300 ${
                    i % 2 === 0 ? "animate-float-slow" : "animate-float-reverse"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE — Single tall image */}
        <motion.div
          className="relative h-[50vh] md:h-[70vh] overflow-hidden rounded-sm shadow-sm border border-stone-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src={HIST_1}
            alt="Traditional rice lamp hanging"
            fill
            className="object-cover brightness-95 object-center"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

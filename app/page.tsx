"use client";

import { motion } from "framer-motion";
import { Flower, Gift, Heart } from "lucide-react";
import Link from "next/link";

const CARDS = [
  {
    id: "flores",
    title: "Flores Azules",
    description: "Un jardín eterno para ti.",
    icon: <Flower className="w-8 h-8 text-cyan-400" />,
    href: "/flores",
    colSpan: "md:col-span-1",
  },
  {
    id: "razones",
    title: "100 Razones",
    description: "Por qué te amo todos los días.",
    icon: <Heart className="w-8 h-8 text-cyan-400" />,
    href: "/100-razones",
    colSpan: "md:col-span-1",
  },
  {
    id: "cumpleanos",
    title: "Cumpleaños",
    description: "Una sorpresa especial por tu día.",
    icon: <Gift className="w-8 h-8 text-cyan-400" />,
    href: "/cumpleanos",
    colSpan: "md:col-span-2",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Retraso suave entre cada iteración
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" as const } 
  },
};

export default function Home() {
  return (
    <main className="min-h-screen py-20 px-6 sm:px-10 max-w-5xl mx-auto flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(0,150,255,0.4)]">
           Nicolle Cielo
        </h1>
        <p className="text-cyan-200 text-lg md:text-xl">
          Para el amor de mi vida
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {CARDS.map((card) => (
          <Link href={card.href} key={card.id} className={`block h-full ${card.colSpan}`}>
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                h-full flex flex-col justify-center p-8 rounded-3xl cursor-pointer
                bg-black/40 backdrop-blur-md 
                border border-cyan-500/30 
                shadow-[0_0_15px_rgba(0,180,255,0.1)] 
                hover:shadow-[0_0_30px_rgba(0,180,255,0.4)] hover:border-cyan-400/80
                transition-all duration-300
              `}
            >
              <div className="bg-cyan-950/40 p-4 rounded-2xl w-max mb-6 ring-1 ring-cyan-500/50">
                {card.icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">
                {card.title}
              </h2>
              <p className="text-cyan-100/60 font-medium">
                {card.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </main>
  );
}

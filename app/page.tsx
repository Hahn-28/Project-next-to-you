"use client";

import { motion } from "framer-motion";
import { Flower, Gift, Heart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center py-20 px-4">
      {/* Patrón de grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none"></div>

      {/* Resplandor central cian */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl z-0 pointer-events-none"></div>

      {/* Animación continua del fondo para dar sensación de nebulosa respirando */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-3xl z-0 pointer-events-none"
      />

      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 mb-16 md:mb-24"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-b from-cyan-300 to-blue-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
          Nicolle Cielo
        </h1>
        <p className="text-slate-300 text-lg md:text-xl font-light">
          Para el amor de mi vida
        </p>
      </motion.div>

      {/* Sección de Tarjetas Asimétricas */}
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-center justify-center z-10 mt-8 md:mt-0 md:h-[400px] gap-8 md:gap-0">
        
        {/* Ondas Universales de Energía Espacial (Universe Waves) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center">
          {[1, 2, 3].map((wave) => (
            <motion.div
              key={wave}
              className="absolute border border-cyan-400/40 rounded-full blur-sm shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              initial={{ width: 200, height: 200, opacity: 0.8 }}
              animate={{ width: 1000, height: 1000, opacity: 0 }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: wave * 1.5,
              }}
            />
          ))}
        </div>

        {/* Tarjeta Izquierda (Flores) */}
        <Link href="/flores" className="md:absolute md:left-4 lg:left-8 md:z-10 hover:z-50 transition-all duration-300 w-[90%] max-w-[320px]">
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            whileHover={{ y: -15, scale: 1.05, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-start text-left p-8 rounded-3xl cursor-pointer bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:border-cyan-400/80 transition-all h-64 justify-center"
          >
            <div className="bg-cyan-950/50 p-4 rounded-2xl w-max mb-6 ring-1 ring-cyan-500/50">
              <Flower className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">Flores Azules</h2>
            <p className="text-cyan-100/60 font-medium">Un jardín eterno para ti.</p>
          </motion.div>
        </Link>

        {/* Tarjeta Central (100 Razones) - Destacada */}
        <Link href="/100-razones" className="md:absolute md:z-30 hover:z-50 transition-all duration-300 w-[95%] max-w-[360px]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{ y: -20, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="flex flex-col items-center text-center p-10 rounded-3xl cursor-pointer bg-slate-900/80 backdrop-blur-lg border border-cyan-400/50 shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] hover:border-cyan-300 transition-all h-72 md:h-[340px] justify-center transform md:scale-110"
          >
            <div className="bg-cyan-950/50 p-4 rounded-2xl w-max mb-6 ring-1 ring-cyan-500/50">
              <Heart className="w-10 h-10 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-wide">100 Razones</h2>
            <p className="text-cyan-100/70 font-medium text-lg">Por qué te amo todos los días.</p>
          </motion.div>
        </Link>

        {/* Tarjeta Derecha (Cumpleaños) */}
        <Link href="/cumpleanos" className="md:absolute md:right-4 lg:right-8 md:z-20 hover:z-50 transition-all duration-300 w-[90%] max-w-[320px]">
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            whileHover={{ y: -15, scale: 1.05, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="flex flex-col items-end text-right p-8 rounded-3xl cursor-pointer bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:border-cyan-400/80 transition-all h-64 justify-center"
          >
            <div className="bg-cyan-950/50 p-4 rounded-2xl w-max mb-6 ring-1 ring-cyan-500/50">
              <Gift className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">Cumpleaños</h2>
            <p className="text-cyan-100/60 font-medium text-pretty sm:whitespace-pre-wrap">Una sorpresa especial por tu día.</p>
          </motion.div>
        </Link>

      </div>

      {/* Partículas Flotantes Decorativas */}
      <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-400 blur-[1px]"></motion.div>
      <motion.div animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-blue-400 blur-[2px]"></motion.div>

    </main>
  );
}

'use client';

import Timer from '@/components/Timer';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

// Reutilizamos el componente de Ondas para darle el estilo de Universo Fucsia a esta vista
const ExpandingWaves = ({ count = 3, borderColor, shadowColor = "transparent", duration = 5, initialSize = 100, finalSize = 1000 }: { count?: number, borderColor: string, shadowColor?: string, duration?: number, initialSize?: number, finalSize?: number }) => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full blur-[2px] ${borderColor}`}
        style={{ boxShadow: shadowColor !== "transparent" ? `0 0 30px ${shadowColor}` : "none" }}
        initial={{ width: initialSize, height: initialSize, opacity: 0.6 }}
        animate={{ width: finalSize, height: finalSize, opacity: 0 }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeOut",
          delay: i * (duration / count),
        }}
      />
    ))}
  </div>
);

export default function Home() {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_#1a0033_0%,_#000000_100%)] relative overflow-hidden selection:bg-fuchsia-900">
      <Link 
        href="/"
        className="fixed top-6 left-6 z-50 p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-pink-500/30 hover:bg-pink-900/50 transition-all shadow-lg hover:shadow-pink-500/50 flex items-center gap-2 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </Link>

      {/* Mostrar Timer en pantalla completa */}
      {showTimer ? (
        <Timer />
      ) : (
        <>
          {/* Ondas del Universo de Cumpleaños */}
          <ExpandingWaves borderColor="border border-fuchsia-500/40" shadowColor="rgba(217,70,239,0.3)" duration={6} initialSize={250} finalSize={1200} />

          {/* Estrellas del fondo originales */}
          <div className={styles.stars}></div>
          <div className={styles.stars2}></div>
          <div className={styles.stars3}></div>

          <main className={styles.main}>
            {/* Título principal */}
            <h1 className={styles.title}>
              De mi para ti mi vida…
            </h1>

            {/* Tortita de cumpleaños */}
            <div className={styles.cakeContainer}>
              <div className={styles.cake}>
                {/* Vela */}
                <div className={styles.candle}>
                  <div className={styles.flame}></div>
                </div>
                {/* Capas del pastel */}
                <div className={styles.layer1}></div>
                <div className={styles.layer2}></div>
                <div className={styles.layer3}></div>
                {/* Decoraciones */}
                <div className={styles.decoration}>🎀</div>
              </div>
            </div>

            {/* Botón para ver el corazón */}
            <button 
              className={styles.birthdayButton}
              onClick={() => setShowTimer(true)}
            >
              🎂 Feliz Cumpleaños 🎂
            </button>
          </main>
        </>
      )}
    </div>
  );
}


'use client';

import Timer from '@/components/Timer';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './page.module.css';
import './cumpleanos.css';

export default function Home() {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Link 
        href="/"
        className="fixed top-6 left-6 z-[9999] p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-pink-500/30 hover:bg-pink-900/50 transition-all shadow-lg hover:shadow-pink-500/50 flex items-center gap-2 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </Link>

      {/* Mostrar Timer en pantalla completa */}
      {showTimer ? (
        <Timer />
      ) : (
        <>
          {/* Estrellas del fondo */}
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>

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

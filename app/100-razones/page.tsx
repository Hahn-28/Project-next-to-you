"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Cat, Heart, Moon, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { reasons } from '../data/reasons';

// Componente Original de Ondas Púrpuras
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

// Estrellas de posición estática para evitar Hydration Error
const FIXED_STARS = [
  { t: "10%", l: "15%", d: 3, dl: 0 }, { t: "25%", l: "80%", d: 4, dl: 1 },
  { t: "50%", l: "10%", d: 5, dl: 2 }, { t: "75%", l: "90%", d: 3.5, dl: 0.5 },
  { t: "85%", l: "30%", d: 4.5, dl: 1.5 }, { t: "15%", l: "60%", d: 3.2, dl: 2.1 },
  { t: "45%", l: "50%", d: 4.1, dl: 0.8 }, { t: "65%", l: "20%", d: 5.2, dl: 1.2 },
  { t: "5%", l: "40%", d: 3.8, dl: 0.3 }, { t: "95%", l: "70%", d: 4.7, dl: 2.5 },
  { t: "35%", l: "35%", d: 3.4, dl: 1.1 }, { t: "80%", l: "55%", d: 4.9, dl: 0.9 },
  { t: "20%", l: "95%", d: 5.5, dl: 3 }, { t: "60%", l: "85%", d: 3.1, dl: 1.7 }
];

const TwinklingStars = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {FIXED_STARS.map((s, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white blur-[1px]"
        style={{ top: s.t, left: s.l, width: "3px", height: "3px" }}
        animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: s.d, repeat: Infinity, ease: "easeInOut", delay: s.dl }}
      />
    ))}
  </div>
);

export default function RazonesPage() {
  const [randomReason, setRandomReason] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [unseenIndices, setUnseenIndices] = useState<number[]>(() => 
    Array.from({ length: reasons.length }, (_, i) => i)
  );

  const totalReasons = reasons.length;
  const seenCount = totalReasons - unseenIndices.length;

  // Funciones
  const handleRandomReason = () => {
    if (unseenIndices.length === 0) {
      setRandomReason("¡Has descubierto todas las razones! Pero inventaría 1000 más solo para ver tu sonrisa. Te amo ❤️✨");
      setCurrentIndex(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * unseenIndices.length);
    const selectedReasonIndex = unseenIndices[randomIndex];
    
    // Lo removemos de la lista de pendientes para que no se repita
    setUnseenIndices(prev => prev.filter((_, i) => i !== randomIndex));
    setRandomReason(reasons[selectedReasonIndex]);
    setCurrentIndex(selectedReasonIndex + 1);
  };

  return (
    <div className="h-dvh bg-slate-950 font-sans relative overflow-hidden selection:bg-purple-600 flex flex-col">
      
      {/* Fondo de Nebulosa Estelar Difusa */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-[#0d0f1a] via-[#1a0e2a] to-[#040814] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] z-0 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] z-0 pointer-events-none animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
      <TwinklingStars />

      {/* Botón de regreso */}
      <div className="absolute top-4 left-4 z-50">
        <Link 
          href="/"
          className="p-3 bg-white/5 backdrop-blur-md rounded-full text-white border border-purple-500/30 hover:bg-purple-900/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center group"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Contenido Central */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-4xl mx-auto h-full z-10 pt-16">
        
        {/* Título */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-10 w-full"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-2 md:mb-4 text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-indigo-200 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            100 Razones
          </h1>
          <p className="text-purple-200 text-sm sm:text-base md:text-xl font-light tracking-wide px-4">
            Por las que te amo, mi NIÑA HERMOSA
          </p>
        </motion.div>

        {/* Botón de la Felicidad con Universe Waves orgánico */}
        <div className="relative flex justify-center items-center mb-6 md:mb-10 shrink-0">
          <ExpandingWaves borderColor="border border-purple-500/30" shadowColor="rgba(168,85,247,0.15)" duration={5} initialSize={120} finalSize={900} />
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="z-10"
          >
            <button 
              onClick={handleRandomReason}
              className="group relative flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 bg-rose-950/60 backdrop-blur-md hover:bg-rose-900/80 rounded-full border border-purple-400/30 shadow-[0_0_25px_rgba(225,29,72,0.3)] hover:shadow-[0_0_40px_rgba(225,29,72,0.5)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
              {/* Sutil animación de palpitación orgánica */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 1, -1, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              >
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-rose-300 fill-rose-400 group-hover:text-rose-100 group-hover:fill-rose-200 transition-all duration-300 drop-shadow-[0_0_15px_rgba(251,113,133,0.6)]" />
              </motion.div>
            </button>
          </motion.div>
        </div>
        
        {/* Frase Aleatoria Mostrada y Contador */}
        <div className="min-h-[140px] md:min-h-[160px] flex flex-col items-center w-full max-w-2xl px-2 text-center shrink-0">
          <AnimatePresence mode="wait">
            {randomReason ? (
              <motion.div
                key={randomReason}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-white/5 backdrop-blur-md border border-purple-400/20 shadow-[0_0_20px_rgba(168,85,247,0.1)] rounded-3xl p-6 sm:p-8 w-full relative mt-4"
              >
                {/* Contador de Razones UI */}
                {seenCount > 0 && unseenIndices.length > 0 && (
                  <div className="absolute -top-4 auto-mx left-1/2 -translate-x-1/2 bg-purple-900 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] px-5 py-1 rounded-full text-xs md:text-sm font-bold text-purple-200 tracking-wider">
                    RAZÓN #{seenCount} DE {totalReasons}
                  </div>
                )}
                
                <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white leading-relaxed text-pretty">
                  {currentIndex ? (
                    <>
                      <span className="text-purple-300 font-bold">TE AMO </span> {randomReason?.charAt(0).toLowerCase() + randomReason?.slice(1)}
                    </>
                  ) : (
                    `"${randomReason}"`
                  )}
                </p>
              </motion.div>
            ) : (
             <div className="h-full flex items-center opacity-60">
                 <p className="text-purple-200/50 text-sm italic">Presiona el corazón...</p>
             </div>
            )}
          </AnimatePresence>
        </div>

        {/* Botón Ver Todo */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAllModal(true)}
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 bg-transparent border-2 border-purple-500/40 text-purple-200 rounded-full font-semibold hover:bg-purple-900/40 hover:border-purple-300 hover:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"
        >
          Leer todas las razones
        </motion.button>
      </main>

      {/* Footer Mágico: Gatito sobre la Luna */}
      <footer className="w-full flex justify-center items-center py-6 pb-8 z-10">
        <motion.div
           animate={{ y: [0, -5, 0] }}
           transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
           className="flex flex-col items-center justify-center gap-2"
        >
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full">
            <Moon className="absolute w-10 h-10 text-indigo-300 drop-shadow-[0_0_10px_rgba(165,180,252,0.8)] fill-indigo-200/20" />
            <Cat className="absolute w-5 h-5 text-purple-200 drop-shadow-[0_0_5px_rgba(216,180,254,0.9)] -mt-2 ml-4" />
          </div>
          <span className="text-purple-200/70 text-xs sm:text-sm font-medium tracking-wider text-center px-4">
            Te amo gatita preciosa, meow...
          </span>
        </motion.div>
      </footer>

      {/* Modal Ver Todo */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl p-4 sm:p-8 flex flex-col"
          >
            {/* Cabecera del modal */}
            <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto w-full pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-200 drop-shadow-md">
                Todas las Razones ({reasons.length})
              </h2>
              <button 
                onClick={() => setShowAllModal(false)}
                className="p-2 sm:p-3 bg-purple-900/50 hover:bg-purple-800 text-white rounded-full transition-colors border border-purple-500/30"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Grid scrolleable */}
            <div className="flex-1 overflow-y-auto pr-2 pb-8 max-w-7xl mx-auto w-full custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {reasons.map((reason, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    key={index}
                    className="bg-purple-950/30 border border-purple-500/20 p-6 rounded-2xl hover:bg-purple-900/40 hover:border-purple-400/50 transition-all group flex flex-col justify-between shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  >
                    <span className="text-purple-400/70 text-sm font-bold mb-3 block group-hover:text-purple-300">
                      Razón #{index + 1}
                    </span>
                    <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
                      {reason}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

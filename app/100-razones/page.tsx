"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Cat, Heart, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { reasons } from '../data/reasons';

export default function RazonesPage() {
  const [randomReason, setRandomReason] = useState<string | null>(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [unseenIndices, setUnseenIndices] = useState<number[]>(() => 
    Array.from({ length: reasons.length }, (_, i) => i)
  );

  // Funciones
  const handleRandomReason = () => {
    if (unseenIndices.length === 0) {
      setRandomReason("¡Has descubierto todas las razones! Pero inventaría 1000 más solo para ver tu sonrisa. Te amo ❤️✨");
      return;
    }

    const randomIndex = Math.floor(Math.random() * unseenIndices.length);
    const selectedReasonIndex = unseenIndices[randomIndex];
    
    // Lo removemos de la lista de pendientes para que no se repita
    setUnseenIndices(prev => prev.filter((_, i) => i !== randomIndex));
    setRandomReason(reasons[selectedReasonIndex]);
  };

  return (
    <div className="h-dvh bg-slate-950 bg-linear-to-br from-purple-900 via-slate-900 to-slate-950 text-white font-sans relative overflow-hidden selection:bg-purple-600 flex flex-col">
      
      {/* Botón de regreso */}
      <div className="absolute top-4 left-4 z-50">
        <Link 
          href="/"
          className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-purple-500/30 hover:bg-purple-900/50 transition-all shadow-lg hover:shadow-purple-500/50 flex items-center justify-center group"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Contenido Central */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-4xl mx-auto h-full">
        
        {/* Título */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-10 w-full mt-4 md:mt-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-2 md:mb-4 text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-purple-100 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            100 Razones
          </h1>
          <p className="text-purple-200 text-sm sm:text-base md:text-xl font-light tracking-wide px-4">
            Por las que te amo, mi Nicolle Cielo 
          </p>
        </motion.div>

        {/* Botón de la Felicidad */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 md:mb-12 shrink-0"
        >
          <button 
            onClick={handleRandomReason}
            className="group relative flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 bg-red-700 hover:bg-red-600 rounded-full border-4 border-amber-400 shadow-[0_0_30px_rgba(185,28,28,0.6)] transition-colors duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white fill-white group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </motion.div>
          </button>
        </motion.div>
        
        {/* Frase Aleatoria Mostrada */}
        <div className="min-h-[120px] md:min-h-[140px] flex items-center justify-center w-full max-w-2xl px-2 text-center shrink-0">
          <AnimatePresence mode="wait">
            {randomReason && (
              <motion.div
                key={randomReason}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="p-4 sm:p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)] w-full"
              >
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-50 leading-relaxed md:leading-relaxed">
                  "{randomReason}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Botón Secundario: Leer Todo */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setShowAllModal(true)}
          className="mt-8 md:mt-12 px-6 sm:px-8 py-2 sm:py-3 bg-slate-900 border border-purple-500/50 rounded-full text-purple-200 text-sm sm:text-base font-medium hover:bg-purple-900/40 hover:text-white hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center gap-2 group cursor-pointer shrink-0"
        >
          Ver todas las razones
          <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
        </motion.button>

      </main>

      {/* Footer de Gatitos */}
      <footer className="w-full pb-4 sm:pb-6 flex flex-col items-center justify-center gap-1 sm:gap-2 shrink-0">
        <motion.div
          animate={{ 
            y: [0, -6, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.2,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5, repeat: Infinity }
          }}
          className="text-amber-400 hover:text-amber-300 cursor-pointer"
        >
          <Cat className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
        </motion.div>
        <p className="text-purple-300 text-xs sm:text-sm font-medium tracking-wide">
          Te amo gatita preciosa, meaw 🐾
        </p>
      </footer>

      {/* Modal: Leer todo (Grid) */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-slate-950/95 backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-purple-500/30 bg-slate-950/50 sticky top-0 z-10 shrink-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-400 to-amber-400 pr-4 truncate">
                100 Razones (bueno, ¡son {reasons.length}!)
              </h2>
              <button 
                onClick={() => setShowAllModal(false)}
                className="p-2 shrink-0 bg-slate-800 hover:bg-red-700 rounded-full transition-colors group cursor-pointer"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-purple-200 group-hover:text-white" />
              </button>
            </div>

            {/* Grid Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 overscroll-contain">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto pb-8">
                {reasons.map((reason, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.02, 0.5) }}
                    className="p-4 sm:p-5 bg-linear-to-br from-slate-900 to-purple-950 border border-purple-500/20 rounded-2xl hover:border-amber-400/50 hover:bg-purple-900/50 transition-colors group"
                  >
                    <span className="text-red-500 font-bold block mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      #{idx + 1}
                    </span>
                    <p className="text-purple-100/90 leading-relaxed text-sm lg:text-base">
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

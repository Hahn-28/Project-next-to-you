"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./flores-greeting.css";

export default function FloresPage() {
  return (
    <div className="flower-greeting relative">
      <Link 
        href="/"
        className="absolute top-6 left-6 z-50 p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-cyan-500/30 hover:bg-cyan-900/50 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </Link>

      <div className="greetings">
        <span>H</span>
        <span>o</span>
        <span>l</span>
        <span>a</span>
        <span>!</span>
      </div>
      
      <div className="description-text">
        <span>ESTE DETALLE ES PARA TI :)</span>
      </div>
      
      <div>
        <Link 
          href="/flores/jardin"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-colors shadow-[0_0_15px_rgba(0,100,255,0.5)] hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
        >
          CLICK AQUÍ
        </Link>
      </div>
    </div>
  );
}

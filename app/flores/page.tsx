"use client";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import './flores-jardin.css';

const phrases = [
  "Ten en cuenta\nKeep in mind",
  "Nunca voy a dejar tu vida por mucho tiempo\nI'm never gonna leave your life ever long",
  "En lo profundo de tu corazón todo el día\n하루 종일 너의 마음 깊은 곳\nharu jong-il neoui ma-eum gipeun got",
  "Déjame quedarme\n계속 머물게 해 줘\ngyesok meomulge hae jwo",
  "En cualquier momento y en cualquier lugar, para que puedas sentirme\n언제라도, 어디에도 날 느낄 수 있게\neonjerado, eodiedo nal neukkil su itge",
  "Estarás bien\nYou'll be okay",
  "Estaré a tu lado, siempre\n난 너의 편이 돼 줄게, 언제나\nnan neoui pyeoni dwae julge, eonjena",
  "El lugar más cercano como ahora, déjame estar a tu lado\n지금처럼 가장 가까운 곳 네 곁에 있게 해 줘\njigeumcheoreom gajang gakkaun got ne gyeote itge hae jwo",
  "Tengo curiosidad por tus heridas, lo conservaré\n너의 상처가 궁금해도 담아둘게\nneoui sangcheoga gunggeumhaedo damadulge",
  "Así que quédate cerca\nSo stay close",
  "Tu verdadero corazón es mío\n너의 진심은 내가 아니까\nneoui jinsimeun naega anikka",
  "Solo da un paso más cerca, para poder contactarte\n한 발짝만 다가와 줘 네게 손 닿을 수 있게\nhan baljjangman dagawa jwo nege son daeul su itge",
  "Así que, nena, te lo prometo\nSo, babe, I promise",
  "Por siempre nunca me iré\nForever I'll never leave",
  "No dudaré de tus torpes expresiones ocasionales\n가끔 서툰 표현도 난 의심 안 할게\ngakkeum seotun pyohyeondo nan uisim an halge",
  "También puedo entender tus duras palabras, tu mirada me basta\n날 선 너의 단어도 이해할 수 있어 너의 눈빛이면 난 충분해\nnal seon neoui daneodo ihaehal su isseo neoui nunbichimyeon nan chungbunhae",
  "No tienes que decir nada\n아무 말 안 해도 돼\namu mal an haedo dwae",
  "Tu corazón, tu silencio, puedo sentirlo\n너의 마음도, 너의 침묵도 느낄 수 있어\nneoui ma-eumdo, neoui chimmukdo neukkil su isseo",
  "Así que mantente cerca\nSo stay close",
  "Tu verdadero corazón es mío\n너의 진심은 내가 아니까\nneoui jinsimeun naega anikka",
  "Solo da un paso más cerca, para poder contactarte\n한 발짝만 다가와 줘 네게 손 닿을 수 있게\nhan baljjangman dagawa jwo nege son daeul su itge",
  "Así que, nena, te lo prometo\nSo, babe, I promise",
  "Nunca me iré\nI won't ever leave",
  "Cuando estás abajo y cayendo\nWhen you're down and falling",
  "Sepa que estaré allí, para que entiendas el significado de las lágrimas\nKnow that I'll be there 눈물의 의미를 알 수 있게\nKnow that I'll be there nunmurui uimireul al su itge",
  "Seré tu paraguas bajo la lluvia torrencial\n쏟아지는 빗속에 너의 우산이 되어 줄게\nssodajineun bitsoge neoui usani doe-eo julge",
  "Por siempre nunca me iré\nForever I'll never leave"
];

// Tiempos (en segundos) exactos para cada bloque de texto de la canción.
// Aquí puedes modificar el número para ajustarlo perfectamente al inicio de cada frase.
// El primer número '6' significa que la primera frase aparecerá en el segundo 6.
const timings = [
  6, 11, 17, 22, 25, // Estrofa 1
  30, 35, 39, 49, // Pre-coro
  55, 60, 67, 73, 77, // Coro 1
  84, 89, 98, 102, // Estrofa 2
  108, 112, 118, 124, 127, // Coro 2
  156, 160, 170, 180 // Puente y final
];

export default function FloresPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [phraseClass, setPhraseClass] = useState("phrase-hidden");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let currentIdx = -1;
    let exitTimeout: NodeJS.Timeout;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;

      // Buscar cuál frase debería mostrarse en este segundo
      let nextIdx = -1;
      for (let i = 0; i < timings.length; i++) {
        if (currentTime >= timings[i]) {
          nextIdx = i;
        } else {
          break;
        }
      }

      // Si entramos al tiempo de una nueva frase
      if (nextIdx !== currentIdx && nextIdx !== -1) {
        currentIdx = nextIdx;
        setCurrentPhrase(phrases[currentIdx]);
        setPhraseClass("phrase-active"); // Aparece

        // Calculamos cuándo debe desintegrarse (1.5 segundos antes de que empiece la siguiente)
        clearTimeout(exitTimeout);
        const nextTime = currentIdx + 1 < timings.length ? timings[currentIdx + 1] : timings[currentIdx] + 6;
        const duration = nextTime - timings[currentIdx];
        const fadeOutDelay = Math.max((duration - 1.5) * 1000, 1000); 

        exitTimeout = setTimeout(() => {
          setPhraseClass("phrase-exit"); // Se desintegra
        }, fadeOutDelay);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    
    // Ocultar titulo (existente)
    const tituloTimeout = setTimeout(() => {
      const titulo = document.querySelector('.titulo') as HTMLElement;
      if (titulo) {
         titulo.style.animation = "fadeOut 3s ease-in-out forwards";
         setTimeout(() => { titulo.style.display = 'none'; }, 3000);
      }
    }, 14000);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      clearTimeout(exitTimeout);
      clearTimeout(tituloTimeout);
    };
  }, []);

  return (
    <div className="flower-jardin-wrapper w-full">
      <Link 
        href="/"
        className="absolute top-6 left-6 z-100 p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-cyan-500/30 hover:bg-cyan-900/50 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </Link>
      
      <audio ref={audioRef} src="/flores_static/sound/Wonstein  Promise  español lyrics (Can this love be translated_ OST).mp3" autoPlay loop></audio>
      
      <div id="lyrics" className={`${phraseClass} text-center`}>
        {currentPhrase.split('\n').map((line, i) => (
          <span key={i} className="block mb-1">
            {line}
          </span>
        ))}
      </div>
      
    <h1 className="titulo">Estas flores amarillas son un reflejo de la alegría que traes a mi vida. <br /> <br />
      Gracias por iluminar mis días con tu presencia.</h1>
  
    <div className="night"></div>
    <div className="flowers">
      <div className="flower flower--1">
        <div className="flower__leafs flower__leafs--1">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>

          <div className="flower__light flower__light--1"></div>
          <div className="flower__light flower__light--2"></div>
          <div className="flower__light flower__light--3"></div>
          <div className="flower__light flower__light--4"></div>
          <div className="flower__light flower__light--5"></div>
          <div className="flower__light flower__light--6"></div>
          <div className="flower__light flower__light--7"></div>
          <div className="flower__light flower__light--8"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
          <div className="flower__line__leaf flower__line__leaf--5"></div>
          <div className="flower__line__leaf flower__line__leaf--6"></div>
        </div>
      </div>

      <div className="flower flower--2">
        <div className="flower__leafs flower__leafs--2">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>

          <div className="flower__light flower__light--1"></div>
          <div className="flower__light flower__light--2"></div>
          <div className="flower__light flower__light--3"></div>
          <div className="flower__light flower__light--4"></div>
          <div className="flower__light flower__light--5"></div>
          <div className="flower__light flower__light--6"></div>
          <div className="flower__light flower__light--7"></div>
          <div className="flower__light flower__light--8"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
        </div>
      </div>

      <div className="flower flower--3">
        <div className="flower__leafs flower__leafs--3">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>

          <div className="flower__light flower__light--1"></div>
          <div className="flower__light flower__light--2"></div>
          <div className="flower__light flower__light--3"></div>
          <div className="flower__light flower__light--4"></div>
          <div className="flower__light flower__light--5"></div>
          <div className="flower__light flower__light--6"></div>
          <div className="flower__light flower__light--7"></div>
          <div className="flower__light flower__light--8"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "1.2s" } as React.CSSProperties}>
        <div className="flower__g-long">
          <div className="flower__g-long__top"></div>
          <div className="flower__g-long__bottom"></div>
        </div>
      </div>

      <div className="growing-grass">
        <div className="flower__grass flower__grass--1">
          <div className="flower__grass--top"></div>
          <div className="flower__grass--bottom"></div>
          <div className="flower__grass__leaf flower__grass__leaf--1"></div>
          <div className="flower__grass__leaf flower__grass__leaf--2"></div>
          <div className="flower__grass__leaf flower__grass__leaf--3"></div>
          <div className="flower__grass__leaf flower__grass__leaf--4"></div>
          <div className="flower__grass__leaf flower__grass__leaf--5"></div>
          <div className="flower__grass__leaf flower__grass__leaf--6"></div>
          <div className="flower__grass__leaf flower__grass__leaf--7"></div>
          <div className="flower__grass__leaf flower__grass__leaf--8"></div>
          <div className="flower__grass__overlay"></div>
        </div>
      </div>

      <div className="growing-grass">
        <div className="flower__grass flower__grass--2">
          <div className="flower__grass--top"></div>
          <div className="flower__grass--bottom"></div>
          <div className="flower__grass__leaf flower__grass__leaf--1"></div>
          <div className="flower__grass__leaf flower__grass__leaf--2"></div>
          <div className="flower__grass__leaf flower__grass__leaf--3"></div>
          <div className="flower__grass__leaf flower__grass__leaf--4"></div>
          <div className="flower__grass__leaf flower__grass__leaf--5"></div>
          <div className="flower__grass__leaf flower__grass__leaf--6"></div>
          <div className="flower__grass__leaf flower__grass__leaf--7"></div>
          <div className="flower__grass__leaf flower__grass__leaf--8"></div>
          <div className="flower__grass__overlay"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "2.4s" } as React.CSSProperties}>
        <div className="flower__g-right flower__g-right--1">
          <div className="leaf"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "2.8s" } as React.CSSProperties}>
        <div className="flower__g-right flower__g-right--2">
          <div className="leaf"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "2.8s" } as React.CSSProperties}>
        <div className="flower__g-front">
          <div
            className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1"
          >
            <div className="flower__g-front__leaf"></div>
          </div>
          <div
            className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2"
          >
            <div className="flower__g-front__leaf"></div>
          </div>
          <div
            className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3"
          >
            <div className="flower__g-front__leaf"></div>
          </div>
          <div
            className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4"
          >
            <div className="flower__g-front__leaf"></div>
          </div>
          <div
            className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5"
          >
            <div className="flower__g-front__leaf"></div>
          </div>
          <div
            className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6"
          >
            <div className="flower__g-front__leaf"></div>
          </div>
          <div
            className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7"
          >
            <div className="flower__g-front__leaf"></div>
          </div>
          <div
            className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8"
          >
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__line"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "3.2s" } as React.CSSProperties}>
        <div className="flower__g-fr">
          <div className="leaf"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
        </div>
      </div>

      <div className="long-g long-g--0">
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "2.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.4s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>

      <div className="long-g long-g--1">
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.8s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>

      <div className="long-g long-g--2">
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.4s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>

      <div className="long-g long-g--3">
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>

      <div className="long-g long-g--4">
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>

      <div className="long-g long-g--5">
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>

      <div className="long-g long-g--6">
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.4s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.6s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.8s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>

      <div className="long-g long-g--7">
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.5s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>
    </div>
    
  </div>  );
}

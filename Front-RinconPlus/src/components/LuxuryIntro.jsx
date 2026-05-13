import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LuxuryIntro({ onSelectSection }) {
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
    }, 4000); // tiempo antes de suavizar animación

    return () => clearTimeout(timer);
  }, []);

  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 12 : 30;

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a]  flex items-center justify-center overflow-hidden">
      {/* ✨ Partículas */}
      <div className="absolute inset-0">
        {[...Array(particleCount)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[3px] h-[3px] bg-yellow-400 rounded-full"
            initial={{
              opacity: 0,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: animateOut ? 0.2 : [0, 1, 0],
              y: animateOut ? "-=50" : "-=150",
            }}
            transition={{
              duration: animateOut ? 4 : 3,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* 🟡 Línea dorada */}
      <motion.div
        className="absolute top-1/2 left-0 h-[1px] bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* 🧠 Texto */}
      <motion.div
        className="text-center px-4 z-10 no-seleccionable"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{
          opacity: 1,
          y: 0, // hace que quede en el centro
          filter: "blur(0px)",
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      >
        <h1
          className="font-serif text-yellow-400 tracking-widest"
          style={{
            fontSize: "clamp(28px, 8vw, 60px)",
          }}
        >
          Rincon Plus
        </h1>

        <p
          className="text-gray-300 mt-3 tracking-[0.3em]"
          style={{
            fontSize: "clamp(10px, 3vw, 14px)",
          }}
        >
          EXPERIENCIA GOURMET
        </p>

        {/* Botón Carta */}
        <button
          className="px-6 py-3 mt-10 border rounded-2xl cursor-pointer border-yellow-500 text-yellow-400 tracking-widest text-sm uppercase 
        hover:bg-yellow-500 hover:text-black transition-all duration-500 w-[200px]"
          onClick={() => onSelectSection("carta")}
        >
          Ver Carta
        </button>

        {/* Botón Agendar */}
        <button
          className="px-6 py-3 bg-yellow-500 border rounded-2xl cursor-pointer text-black tracking-widest text-sm uppercase 
        hover:bg-yellow-400 transition-all duration-500 w-[200px]"
          onClick={() => onSelectSection("reserva")}
        >
          Agendar
        </button>
      </motion.div>
    </div>
  );
}

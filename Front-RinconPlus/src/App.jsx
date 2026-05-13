import { useState, useRef, useEffect } from "react";
import "./App.css";
import LuxuryIntro from "./components/LuxuryIntro";
import Carta from "./components/carta.jsx";

function App() {
  const [section, setSection] = useState(null);
  const contentRef = useRef(null);

  // controlar mas sauve la animación del scroll al seleccionar sección desde el intro
  const smoothScroll = (target, duration = 800) => {
    const start = window.scrollY;
    const end = target;
    const change = end - start;
    const startTime = performance.now();

    const easeInOut = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const animateScroll = (currentTime) => {
      const time = Math.min(1, (currentTime - startTime) / duration);
      const eased = easeInOut(time);

      window.scrollTo(0, start + change * eased);

      if (time < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };
  useEffect(() => {
    if (section && contentRef.current) {
      smoothScroll(contentRef.current.offsetTop, 1000);
    }
  }, [section]);

  return (
    <>
      <LuxuryIntro onSelectSection={setSection} />
      {/* contenido */}
      <div ref={contentRef} className="min-h-screen bg-[#0a0a0a] p-8">
        {section === "carta" && <Carta />}
        {section === "reserva" && <Reserva />}
      </div>
    </>
  );
}

export default App;

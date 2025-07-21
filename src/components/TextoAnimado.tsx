import { useState, useEffect } from 'react';

export default function TextoAnimado() {
  const [line, setLine] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setLine(1), 2000), // muestra la 2da línea después de 2s
      setTimeout(() => setLine(2), 4000), // muestra la 3ra línea después de 4s
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col gap-0 leading-none">
      {line >= 0 && (
        <p className="text-xl text-slate-800 overflow-hidden whitespace-nowrap border-cyan-400 border-r-2 animate-typewriter-blink inline-block">
          Únete a más de 200 mil developers compartiendo sus
        </p>
      )}
      {line >= 1 && (
        <p className="text-xl text-slate-800 overflow-hidden whitespace-nowrap border-cyan-400 border-r-2 animate-typewriter-blink inline-block">
          redes sociales, comparte tu perfil de TikTok, Facebook,
        </p>
      )}
      {line >= 2 && (
        <p className="text-xl text-slate-800 overflow-hidden whitespace-nowrap border-cyan-400 border-r-2 animate-typewriter-blink inline-block">
          Instagram, YouTube, Github y más.
        </p>
      )}
    </div>
  );
}

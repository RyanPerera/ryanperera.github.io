import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<null | "dev" | "art">(null);
  const [entry, setEntry] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setEntry(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col sm:flex-row h-screen w-screen overflow-hidden bg-black text-white font-mono select-none">
      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 w-full h-14 bg-neutral-950 border-b border-neutral-800 flex items-center justify-center z-50">
        <h1 className="text-3xl tracking-widest font-title">Ryan Perera</h1>
      </div>

      {/* Left: Dev Works */}
      <motion.div
        className={`relative flex-1 flex items-center justify-center transition-all duration-500 cursor-pointer group overflow-hidden border-r border-neutral-800 ${
          hovered === "dev" ? "bg-neutral-900" : "bg-neutral-950"
        }`}
        onMouseEnter={() => setHovered("dev")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate("/dev")}
        animate={
          hovered === "dev"
            ? { y: [0, -2, 1, -1, 0], rotate: [0, 0.5, -0.5, 0.5, 0] }
            : { y: 0, rotate: 0 }
        }
      >
        <GlitchText text="Dev Works" active={hovered === "dev" || entry} />
        <GlitchStreak active={hovered === "dev"} />
      </motion.div>

      {/* Right: Art Works */}
      <motion.div
        className={`relative flex-1 flex items-center justify-center transition-all duration-500 cursor-pointer group overflow-hidden border-l border-neutral-800 ${
          hovered === "art" ? "bg-neutral-900" : "bg-neutral-950"
        }`}
        onMouseEnter={() => setHovered("art")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate("/art")}
      >
        <GlitchText text="Art Works" active={hovered === "art" || entry} />
        <GlitchStreak active={hovered === "art"} />
      </motion.div>

      {/* Social Links */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-4 z-40">
        <a
          href="https://github.com/ryanperera"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="w-6 h-6 hover:text-cyan-400 transition-colors duration-300" />
        </a>
        <a
          href="https://linkedin.com/in/ryanperera"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="w-6 h-6 hover:text-cyan-400 transition-colors duration-300" />
        </a>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col gap-4 z-40">
        <a
          href="https://www.instagram.com/ryan.y.perera/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram className="w-6 h-6 hover:text-cyan-400 transition-colors duration-300" />
        </a>
        <a
          href="https://twitter.com/ryanyperera"
          target="_blank"
          rel="noreferrer"
        >
          <FaXTwitter className="w-6 h-6 hover:text-cyan-400 transition-colors duration-300" />
        </a>
        <a
          href="https://www.tiktok.com/@ryan.y.perera"
          target="_blank"
          rel="noreferrer"
        >
          <FaTiktok className="w-6 h-6 hover:text-cyan-400 transition-colors duration-300" />
        </a>
      </div>
    </div>
  );
}

// --- Glitch Text with flicker font ---
function GlitchText({ text, active }: { text: string; active: boolean }) {
  const [flicker, setFlicker] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (active) {
      setFlicker(true);

      const interval = setInterval(() => {
        setPos({
          x: (Math.random() - 0.5) * 10, // ±10px horizontal
          y: (Math.random() - 0.5) * 10, // ±10px vertical
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      setFlicker(false);
      setPos({ x: 0, y: 0 });
    }
  }, [active]);

  return (
    <motion.div
      className={`relative text-5xl sm:text-7xl whitespace-nowrap ${
        flicker ? "font-displayglitch" : "font-display"
      }`}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "tween", duration: 0 }}
    >
      {text}

      {active && (
        <>
          {/* Red/Cyan Streaks */}
          <motion.span
            className={`absolute top-0 left-0 text-red-500 ${
              flicker ? "font-displayglitch" : "font-display"
            }`}
            animate={{ x: pos.x + 2, y: pos.y, opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 0.05,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            {text}
          </motion.span>

          <motion.span
            className={`absolute top-0 left-0 text-cyan-500 ${
              flicker ? "font-displayglitch" : "font-display"
            }`}
            animate={{ x: pos.x - 2, y: pos.y, opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 0.05,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            {text}
          </motion.span>

          {/* Random streaks behind text */}
          <GlitchStreak active={active} />
        </>
      )}
    </motion.div>
  );
}

// --- Short flickering streaks ---
function GlitchStreak({ active }: { active: boolean }) {
  const colors = ["#00ffff", "#ff00ff", "#ff0000", "#ffffff"]; // cyan, magenta, red, white

  return (
    <AnimatePresence>
      {active &&
        Array.from({ length: 12 }).map((_, i) => {
          const side = Math.random() < 0.5 ? "left" : "right";
          const top = Math.random() * 100;
          const width = `${5 + Math.random() * 15}%`; // 5-20%
          const height = 1 + Math.random() * 19; // 1-20px
          const color = colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={i}
              className="absolute mix-blend-screen opacity-0"
              style={{
                top: `${top}%`,
                [side]: `${Math.random() * 20}px`,
                width,
                height,
                backgroundColor: color,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 0.1 + Math.random() * 0.3,
                repeat: Infinity,
                repeatDelay: Math.random() * 0.5,
              }}
            />
          );
        })}
    </AnimatePresence>
  );
}

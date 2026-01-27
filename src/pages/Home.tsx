import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { HomeProps } from "@/App";

export default function Home({ navigateTo }: HomeProps) {
  const [hovered, setHovered] = useState<null | "dev" | "art">(null);
  const [entry, setEntry] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setEntry(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white select-none">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute" }}
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10"
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10"
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      {/* Header */}
      <header className="relative z-40 border-b border-cyan-500/20 bg-black/50 backdrop-blur-md py-4 sm:py-6">
        <div className="px-6 sm:px-8 lg:px-12">
          <motion.h1
            className="text-3xl sm:text-5xl font-light tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            RYAN PERERA
          </motion.h1>
          <motion.p
            className="text-xs sm:text-sm text-cyan-400/70 tracking-wider mt-2 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            &gt; Creative Developer & Digital Artist
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col sm:flex-row overflow-hidden z-10">
        {/* Left: Dev Works */}
        <motion.button
          className={`relative flex-1 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer group overflow-hidden border-b sm:border-b-0 sm:border-r border-cyan-500/20 ${
            hovered === "dev" ? "bg-cyan-500/5" : "bg-transparent"
          }`}
          onMouseEnter={() => setHovered("dev")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigateTo?.("dev")}
          animate={hovered === "dev" ? { scale: 1.05 } : { scale: 1 }}
        >
          {/* Background decoration */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={hovered === "dev" ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-cyan-500/10 blur-xl" />
          </motion.div>

          <div className="relative z-20 space-y-6 text-center px-6">
            <GlitchText text="Dev Works" active={hovered === "dev" || entry} />
            <motion.p
              className="text-sm sm:text-base text-cyan-300/60 font-mono tracking-widest"
              animate={{ opacity: hovered === "dev" ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            >
              Projects & Development
            </motion.p>
          </div>

          {/* Corner accent */}
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={hovered === "dev" ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={hovered === "dev" ? { rotate: -360 } : { rotate: 0 }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <GlitchStreak active={hovered === "dev"} />
        </motion.button>

        {/* Right: Art Works */}
        <motion.button
          className={`relative flex-1 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer group overflow-hidden border-t sm:border-t-0 sm:border-l border-purple-500/20 ${
            hovered === "art" ? "bg-purple-500/5" : "bg-transparent"
          }`}
          onMouseEnter={() => setHovered("art")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigateTo?.("art")}
          animate={hovered === "art" ? { scale: 1.05 } : { scale: 1 }}
        >
          {/* Background decoration */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={hovered === "art" ? { rotate: -360 } : { rotate: 0 }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/10 blur-xl" />
          </motion.div>

          <div className="relative z-20 space-y-6 text-center px-6">
            <GlitchText text="Art Works" active={hovered === "art" || entry} />
            <motion.p
              className="text-sm sm:text-base text-purple-300/60 font-mono tracking-widest"
              animate={{ opacity: hovered === "art" ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            >
              Gallery & Motion
            </motion.p>
          </div>

          {/* Corner accent */}
          <motion.div
            className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={hovered === "art" ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={hovered === "art" ? { rotate: -360 } : { rotate: 0 }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <GlitchStreak active={hovered === "art"} color="purple" />
        </motion.button>
      </div>

      {/* Social Links - Left */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-6 z-40">
        <motion.a
          href="https://github.com/ryanperera"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.2, color: "#00ffff" }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
        >
          <FaGithub className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/ryan-perera"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.2, color: "#00ffff" }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
        >
          <FaLinkedin className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.a>
      </div>

      {/* Social Links - Right */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-6 z-40">
        <motion.a
          href="https://www.instagram.com/ryan.y.perera/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.2, color: "#c084fc" }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
        >
          <FaInstagram className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.a>
        <motion.a
          href="https://twitter.com/ryanyperera"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.2, color: "#c084fc" }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
        >
          <FaXTwitter className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.a>
        <motion.a
          href="https://www.tiktok.com/@ryan.y.perera"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.2, color: "#c084fc" }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
        >
          <FaTiktok className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.a>
      </div>
    </div>
  );
}

// --- Enhanced Glitch Text ---
function GlitchText({
  text,
  active,
  size = "large",
  color = "cyan",
}: {
  text: string;
  active: boolean;
  size?: "large" | "medium";
  color?: "cyan" | "purple";
}) {
  const [flicker, setFlicker] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const sizeClasses =
    size === "large" ? "text-6xl sm:text-8xl" : "text-4xl sm:text-6xl";
  const colorClass = color === "cyan" ? "text-cyan-400" : "text-purple-400";
  const accentColor1 = color === "cyan" ? "#ff00ff" : "#ff0080";
  const accentColor2 = color === "cyan" ? "#00ffff" : "#c084fc";

  useEffect(() => {
    if (active) {
      setFlicker(true);

      const interval = setInterval(() => {
        setPos({
          x: (Math.random() - 0.5) * 12,
          y: (Math.random() - 0.5) * 12,
        });
      }, 40);

      return () => clearInterval(interval);
    } else {
      setFlicker(false);
      setPos({ x: 0, y: 0 });
    }
  }, [active]);

  return (
    <motion.div
      className={`relative font-black tracking-wider drop-shadow-lg ${sizeClasses} ${colorClass}`}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "tween", duration: 0 }}
    >
      {text}

      {active && (
        <>
          {/* Magenta/Cyan Glitch Overlays */}
          <motion.span
            className={`absolute top-0 left-0 font-black tracking-wider`}
            style={{ color: accentColor1 }}
            animate={{ x: pos.x + 3, y: pos.y - 2, opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 0.06,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            {text}
          </motion.span>

          <motion.span
            className={`absolute top-0 left-0 font-black tracking-wider`}
            style={{ color: accentColor2 }}
            animate={{ x: pos.x - 3, y: pos.y + 2, opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 0.06,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            {text}
          </motion.span>

          {/* Additional distortion layer */}
          <motion.span
            className={`absolute top-0 left-0 font-black tracking-wider opacity-50`}
            style={{ color: accentColor1 }}
            animate={{ x: pos.x - 1, y: pos.y + 1 }}
            transition={{
              duration: 0.08,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {text}
          </motion.span>
        </>
      )}
    </motion.div>
  );
}

// --- Enhanced Glitch Streak ---
function GlitchStreak({
  active,
  color = "cyan",
}: {
  active: boolean;
  color?: "cyan" | "purple";
}) {
  const colors =
    color === "cyan"
      ? ["#00ffff", "#ff00ff", "#00ff00", "#ffffff"]
      : ["#c084fc", "#ff0080", "#ff00ff", "#ffffff"];

  return (
    <AnimatePresence>
      {active &&
        Array.from({ length: 16 }).map((_, i) => {
          const side = Math.random() < 0.5 ? "left" : "right";
          const top = Math.random() * 100;
          const width = `${8 + Math.random() * 20}%`;
          const height = 2 + Math.random() * 24;
          const selectedColor =
            colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={i}
              className="absolute mix-blend-screen opacity-0"
              style={{
                top: `${top}%`,
                [side]: `${Math.random() * 30}px`,
                width,
                height,
                backgroundColor: selectedColor,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{
                duration: 0.12 + Math.random() * 0.4,
                repeat: Infinity,
                repeatDelay: Math.random() * 0.6,
              }}
            />
          );
        })}
    </AnimatePresence>
  );
}

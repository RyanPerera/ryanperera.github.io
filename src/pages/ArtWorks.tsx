import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaInstagram, FaTiktok } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Example video imports (replace with your actual video files)
import video1 from "@/assets/videos/distortionworld_final.mp4";
import video2 from "@/assets/videos/Larvitar.mp4";
import { FaXTwitter } from "react-icons/fa6";

const artProjects = [
  {
    title: `Heading into the Distortion World to celebrate the spooky season! 🎃🌌`,
    video: video1,
  },
  {
    title: `Larvitar goes for a little stroll at the foot of Mt. Silver 🗻💚`,
    video: video2,
  },
];

export default function ArtWorks() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    if (visibleCount < artProjects.length) {
      const timer = setTimeout(() => setVisibleCount(visibleCount + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const vid = videoRefs.current[index];
    if (vid) {
      vid.currentTime = 0;
      vid.play();
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    const vid = videoRefs.current[index];
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  };

  return (
    <div className="relative flex flex-col w-full bg-black text-cyan-400 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cyan-700">
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-cyan-100 transition-colors"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft className="w-4 h-4 " />
          <span>Back</span>
        </div>
        <span>ryanperera@portfolio:~/artworks$</span>
      </div>

      {/* Video grid fills remaining space */}
      <div className="flex-1 flex flex-col p-6 bg-gray-800/20">
        <div className="flex flex-1 flex-wrap justify-center items-stretch gap-6 overflow-hidden">
          {artProjects.slice(0, visibleCount).map((proj, index) => (
            <motion.div
              key={index}
              className="relative flex-1 aspect-9/16 min-w-[300px] max-w-[600px] flex flex-col shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              // Handle touch events for mobile interaction
              onTouchStart={() => handleMouseEnter(index)}
              onTouchEnd={() => handleMouseLeave(index)}
              onTouchCancel={() => handleMouseLeave(index)}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={proj.video}
                className="flex-1 w-full h-full object-cover bg-black"
                muted
                loop
                playsInline
                preload="metadata"
                style={{ pointerEvents: "none" }}
                onError={(e) => console.error("Video load error:", e)}
              />

              {/* Info Overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center p-4 bg-gray-900/90 text-center transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="text-xl font-extrabold tracking-wider text-cyan-300 transform transition-transform duration-300 ease-out">
                  {proj.title}
                </span>
              </div>

              {/* Dark overlay when not hovered */}
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-200 ${
                  hoveredIndex === index ? "opacity-0" : "opacity-50"
                }`}
              />
            </motion.div>
          ))}
        </div>
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

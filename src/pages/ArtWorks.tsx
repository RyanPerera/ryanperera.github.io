import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { HomeProps } from "@/App";

import video1 from "@/assets/videos/crystal.mp4";
import video2 from "@/assets/videos/distortionworld_final.mp4";
import video3 from "@/assets/videos/Larvitar.mp4";

interface ArtProject {
  title: string;
  video: string;
}

const ART_PROJECTS: ArtProject[] = [
  {
    title: "Larvitar goes for a little stroll at the foot of Mt. Silver 🗻💚",
    video: video1,
  },
  {
    title:
      "Heading into the Distortion World to celebrate the spooky season! 🎃🌌",
    video: video2,
  },
  {
    title: "Larvitar goes for a little stroll at the foot of Mt. Silver 🗻💚",
    video: video3,
  },
];

export default function ArtWorks({ navigateTo }: HomeProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const expandedVideoRef = useRef<HTMLVideoElement | null>(null);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Progressive loading of projects
  useEffect(() => {
    if (visibleCount < ART_PROJECTS.length) {
      const timer = setTimeout(() => setVisibleCount(visibleCount + 1), 300);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  const handleVideoPlay = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => console.warn("Video play failed"));
    }
  };

  const handleVideoPause = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      setHoveredIndex(index);
      handleVideoPlay(index);
    }
  };

  const handleMouseLeave = (index: number) => {
    if (!isMobile) {
      setHoveredIndex(null);
      handleVideoPause(index);
    }
  };

  const closeExpandedVideo = () => {
    handleVideoPause(selectedVideoIndex!);
    setSelectedVideoIndex(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigateTo?.("home")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium"
            aria-label="Back to home"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <h1 className="text-2xl font-light tracking-wide text-slate-900">
            Gallery
          </h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ART_PROJECTS.slice(0, visibleCount).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={() => setSelectedVideoIndex(index)}
                >
                  {/* Video Container */}
                  <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={project.video}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />

                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 flex items-center justify-center p-4"
                      animate={{
                        opacity: hoveredIndex === index ? 0 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center">
                        <p className="text-white text-sm sm:text-base font-medium leading-relaxed drop-shadow-lg">
                          {project.title}
                        </p>
                      </div>
                    </motion.div>

                    {/* Hover Indicator - Mobile */}
                    {isMobile && (
                      <motion.div
                        className="absolute bottom-4 right-4 text-white text-xs bg-black/50 px-3 py-1 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0,
                        }}
                      >
                        Tap to play
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Fullscreen Video Overlay */}
      <AnimatePresence>
        {selectedVideoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeExpandedVideo}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={expandedVideoRef}
                src={ART_PROJECTS[selectedVideoIndex].video}
                className="w-full h-full object-contain"
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
              />

              {/* Close Button */}
              <button
                onClick={closeExpandedVideo}
                className="absolute top-6 right-6 z-50 text-white hover:text-slate-300 transition-colors duration-200 text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Close video"
              >
                ✕
              </button>

              {/* Video Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 sm:p-8 text-white"
              >
                <p className="text-lg sm:text-xl font-medium">
                  {ART_PROJECTS[selectedVideoIndex].title}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Links Footer */}
      <footer className="w-full border-t border-slate-200 bg-white/50 backdrop-blur-sm py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 sm:gap-10">
            <a
              href="https://www.instagram.com/ryan.y.perera/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://twitter.com/ryanyperera"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@ryan.y.perera"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label="TikTok"
            >
              <FaTiktok className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

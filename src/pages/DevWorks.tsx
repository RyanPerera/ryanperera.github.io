import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaArrowLeft, FaLinkedin } from "react-icons/fa";
import ciphercollector from "@/assets/ciphercollector.png";
import shouldirip from "@/assets/shouldirip.png";
import foodhunterzoro from "@/assets/foodhunterzoro.png";
import type { HomeProps } from "@/App";

const projectsData = [
  {
    title: "ShouldIRip?",
    subtitle: "Pokémon TCG Decision Helper",
    stack: "React.js; Supabase; Tailwind CSS",
    description: [
      "Developed a web application that helps users compare and evaluate card purchase decisions.",
      "Automated daily market data scraping with GitHub Actions to update a Supabase database of cards and prices.",
      "Designed a responsive interface with React.js, Tailwind CSS, and ShadCN components, and visualized trends using Recharts.",
    ],
    link: "https://ryanperera.github.io/shouldirip/",
    github: "https://github.com/RyanPerera/shouldirip",
    img: shouldirip,
  },
  {
    title: "CipherCollector",
    subtitle: "ＴＣＧ ファイアーエムブレム ０",
    stack: "React.js; Supabase; Material UI",
    description: [
      "Built an immersive card viewer and database for a collectible card game.",
      "Used React.js with Supabase as a Backend-as-a-Service to store and query card data.",
    ],
    link: "https://ryanperera.github.io/ciphercollector/",
    github: "https://github.com/RyanPerera/ciphercollector",
    img: ciphercollector,
  },
  {
    title: "Food Hunter ZORO",
    subtitle: "MakeCode Arcade game",
    stack: "MakeCode Arcade; Custom Sprites & Music",
    description: [
      "A fun game made using MakeCode Arcade with custom drawn sprites and music.",
    ],
    link: "https://ryanperera.github.io/Food-Hunter-Zoro/",
    github: "https://github.com/RyanPerera/Food-Hunter-Zoro",
    img: foodhunterzoro,
  },
];

export default function DevWorks({ navigateTo }: HomeProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < projectsData.length) {
      const timer = setTimeout(() => setVisibleCount(visibleCount + 1), 600);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <div className="relative h-screen w-screen bg-black text-cyan-400 font-mono overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cyan-700 sticky top-0 bg-black z-10">
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-cyan-100 transition-colors"
          onClick={() => navigateTo("home")}
        >
          <FaArrowLeft className="w-4 h-4 " />
          <span>Back</span>
        </div>
        <span>ryanperera@portfolio:~/devworks$</span>
      </div>

      <div className="p-6 space-y-6">
        {projectsData.slice(0, visibleCount).map((proj, index) => (
          <motion.div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-black p-4 border border-cyan-700 rounded"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-full md:w-32 h-20 bg-cover bg-center border border-cyan-700"
              style={{ backgroundImage: `url(${proj.img})` }}
            />
            <div className="flex-1 space-y-2">
              <a
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                className="text-xl font-bold text-cyan-300 hover:text-cyan-100 underline"
              >
                {proj.title}
              </a>
              <p className="text-cyan-400 text-sm">{proj.subtitle}</p>
              <p className="text-cyan-200 text-xs italic">
                Tools: {proj.stack}
              </p>
              <ul className="list-disc list-inside text-cyan-400 text-sm">
                {proj.description.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <div className="flex items-center gap-2 mt-1">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-100"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-6 right-6 flex flex-col gap-4 z-40">
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
    </div>
  );
}

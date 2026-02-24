import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaArrowLeft,
  FaLinkedin,
  FaExternalLinkAlt,
} from "react-icons/fa";
import ciphercollector from "@/assets/ciphercollector.png";
import shouldirip from "@/assets/shouldirip.png";
import foodhunterzoro from "@/assets/foodhunterzoro.png";
import fehplanner from "@/assets/fehplanner.png";
import type { HomeProps } from "@/App";

interface Project {
  title: string;
  subtitle: string;
  stack: string;
  description: string[];
  link: string;
  github?: string;
  img: string;
}

const PROJECTS: Project[] = [
  {
    title: "Feh Inheritance Planner",
    subtitle: "Fire Emblem Heroes Inheritance Chain Planner",
    stack: "Next.js, Supabase, Tailwind CSS",
    description: [
      "Built a site to help users plan inheritance chains for the Fire Emblem Heroes mobile game.",
      "Used ShadCN components throughout for quick development and a consistent interface.",
      "Implemented an AI planner with OpenAI's API to thoughtfully optimize inheritance outcomes.",
      "Created an algorithmic planner that finds the best inheritance path based on targets and available units.",
      "Built a custom unit and skill database with Supabase as a Backend-as-a-Service.",
    ],
    link: "https://feh-inheritance-planner.vercel.app/",
    img: fehplanner,
  },
  {
    title: "ShouldIRip?",
    subtitle: "Pokémon TCG Decision Helper",
    stack: "React.js, Supabase, Tailwind CSS, Recharts",
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
    subtitle: "Trading Card Game Database & Viewer",
    stack: "React.js, Supabase, Material UI",
    description: [
      "Built an immersive card viewer and database for a collectible card game.",
      "Used React.js with Supabase as a Backend-as-a-Service to store and query card data.",
      "Created an intuitive UI for browsing and managing a large card collection.",
    ],
    link: "https://ryanperera.github.io/ciphercollector/",
    github: "https://github.com/RyanPerera/ciphercollector",
    img: ciphercollector,
  },
  {
    title: "Food Hunter ZORO",
    subtitle: "MakeCode Arcade Game",
    stack: "MakeCode Arcade, Custom Sprites & Music",
    description: [
      "A fun game made using MakeCode Arcade with custom drawn sprites and music.",
      "Features engaging gameplay mechanics and colorful pixel art design.",
    ],
    link: "https://ryanperera.github.io/Food-Hunter-Zoro/",
    github: "https://github.com/RyanPerera/Food-Hunter-Zoro",
    img: foodhunterzoro,
  },
];

export default function DevWorks({ navigateTo }: HomeProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < PROJECTS.length) {
      const timer = setTimeout(() => setVisibleCount(visibleCount + 1), 300);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 transition-colors duration-500 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm flex-shrink-0">
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
            Projects
          </h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {PROJECTS.slice(0, visibleCount).map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Project Image */}
                <div className="w-full md:w-56 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-slate-100">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Project Info */}
                <div className="flex-1 flex flex-col justify-between p-6 sm:p-8">
                  <div className="space-y-4">
                    {/* Title & Link */}
                    <div className="flex items-start gap-3 group">
                      <div className="flex-1">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-2xl sm:text-3xl font-semibold text-slate-900 hover:text-slate-600 transition-colors duration-200 flex items-center gap-2"
                        >
                          {project.title}
                          <FaExternalLinkAlt className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </a>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg text-slate-600 font-medium">
                      {project.subtitle}
                    </p>

                    {/* Tech Stack */}
                    <div className="pt-2">
                      <p className="text-sm sm:text-base text-slate-500 uppercase tracking-wide font-semibold">
                        Tech Stack
                      </p>
                      <p className="text-base sm:text-lg text-slate-700 mt-1">
                        {project.stack}
                      </p>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 pt-3">
                      {project.description.map((line, i) => (
                        <li
                          key={i}
                          className="text-base sm:text-lg text-slate-700 flex gap-3"
                        >
                          <span className="text-slate-400 mt-1 flex-shrink-0">
                            •
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-100">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-200 text-base font-medium"
                      >
                        <FaGithub className="w-5 h-5" />
                        <span>GitHub</span>
                      </a>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-md border border-slate-300 text-slate-900 hover:bg-slate-50 transition-colors duration-200 text-base font-medium"
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
                      <span>Visit</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Social Links Footer */}
      <footer className="w-full border-t border-slate-200 bg-white/50 backdrop-blur-sm py-6 sm:py-8 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 sm:gap-10">
            <a
              href="https://github.com/ryanperera"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://linkedin.com/in/ryan-perera"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

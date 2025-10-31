import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import DevWorks from "./pages/DevWorks";
import ArtWorks from "./pages/ArtWorks";

export type Page = "home" | "dev" | "art";
export type HomeProps = {
  navigateTo?: (p: Page) => void;
};
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigateTo = (p: Page) => setPage(p);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Home navigateTo={navigateTo} />
          </motion.div>
        )}

        {page === "dev" && (
          <motion.div
            key="dev"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.8, ease: "easeInOut" }} // slower
            className="absolute inset-0"
          >
            <DevWorks navigateTo={navigateTo} />
          </motion.div>
        )}

        {page === "art" && (
          <motion.div
            key="art"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ArtWorks navigateTo={navigateTo} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

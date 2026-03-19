import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MenuBook from "@/components/MenuBook_fixed";

const Index = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleExploreClick = () => {
    setShowMenu(true);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden flex-1">
      <AnimatePresence mode="wait">
        {!showMenu ? (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection onExploreClick={handleExploreClick} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MenuBook />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

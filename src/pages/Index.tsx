import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MenuBook from "@/components/MenuBook";

const Index = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleExploreClick = () => {
    setShowMenu(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {!showMenu ? (
        <HeroSection onExploreClick={handleExploreClick} />
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MenuBook />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Index;

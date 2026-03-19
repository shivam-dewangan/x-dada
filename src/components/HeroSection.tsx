import { motion } from "framer-motion";
import heroBiryani from "@/assets/hero-biryani.jpg";

const HeroSection = ({ onExploreClick }: { onExploreClick: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBiryani}
          alt="Steaming biryani with spices"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Crown icon */}
        <motion.div
          className="text-5xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          👑
        </motion.div>

        {/* Gold decorative line */}
        <motion.div
          className="w-40 h-px mx-auto mb-6"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <motion.p
          className="text-primary font-body tracking-[0.5em] uppercase text-sm mb-4 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Welcome to
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-gold glow-text mb-4 tracking-wider uppercase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Dada Biryani
        </motion.h1>

        <motion.p
          className="font-display text-2xl md:text-3xl text-primary/80 italic mb-2 tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Centre
        </motion.p>

        {/* Gold ornamental divider */}
        <motion.div
          className="flex items-center justify-center gap-3 my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)))" }} />
          <span className="text-primary text-xl">✦</span>
          <div className="w-20 h-px" style={{ background: "linear-gradient(-90deg, transparent, hsl(var(--gold)))" }} />
        </motion.div>

        <motion.p
          className="text-muted-foreground font-body text-lg md:text-xl max-w-xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          Authentic flavors, crafted with love & tradition
        </motion.p>

        <motion.button
          onClick={onExploreClick}
          className="relative px-12 py-4 rounded-lg font-body font-semibold text-primary-foreground text-lg tracking-widest uppercase overflow-hidden group border-gold-solid shadow-gold-intense"
          style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Open Menu 📖</span>
          <div className="absolute inset-0 animate-light-sweep pointer-events-none" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;

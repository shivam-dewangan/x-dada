import { motion } from "framer-motion";
import ornament from "@/assets/ornament.png";

const FooterSection = () => {
  return (
    <footer className="py-2 sm:py-4 md:py-6 lg:py-8 bg-gradient-card border-t border-gold flex items-center justify-center h-full">
      <div className="w-full max-w-md sm:max-w-lg px-2 sm:px-4 text-center flex flex-col items-center justify-center flex-1">
        <motion.img
          src={ornament}
          alt=""
          className="w-24 sm:w-32 md:w-40 mx-auto mb-2 sm:mb-4 opacity-30"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gradient-gold mb-1 sm:mb-2 leading-tight">
          Dada Biryani Centre
        </h2>
        <p className="text-muted-foreground font-body text-xs sm:text-sm mb-3 sm:mb-4 leading-tight">
          Where Every Bite Tells a Story
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground font-body">
          <div className="text-center">
            <span className="text-primary block mb-0.5 sm:mb-1 text-xs sm:text-sm">📍 Location</span>
            <span className="text-xs sm:text-sm">Your Favourite Spot</span>
          </div>
          <div className="text-center">
            <span className="text-primary block mb-0.5 sm:mb-1 text-xs sm:text-sm">📞 Contact</span>
            <span className="text-xs sm:text-sm">Call for Orders</span>
          </div>
          <div className="text-center">
            <span className="text-primary block mb-0.5 sm:mb-1 text-xs sm:text-sm">🕐 Hours</span>
            <span className="text-xs sm:text-sm">11 AM – 11 PM</span>
          </div>
        </div>
        <motion.img
          src={ornament}
          alt=""
          className="w-20 sm:w-28 md:w-36 mx-auto mt-2 sm:mt-4 opacity-20 rotate-180"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <p className="text-muted-foreground/50 text-[10px] sm:text-xs font-body mt-2 sm:mt-4">
          © 2026 Dada Biryani Centre. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;

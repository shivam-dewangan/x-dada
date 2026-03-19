import { motion } from "framer-motion";
import ornament from "@/assets/ornament.png";

const FooterSection = () => {
  return (
    <footer className="py-16 bg-gradient-card border-t border-gold">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.img
          src={ornament}
          alt=""
          className="w-40 mx-auto mb-6 opacity-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
        />
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-gold mb-3">
          Dada Biryani Centre
        </h2>
        <p className="text-muted-foreground font-body mb-6">
          Where Every Bite Tells a Story
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground font-body">
          <div>
            <span className="text-primary block mb-1">📍 Location</span>
            Your Favourite Spot
          </div>
          <div>
            <span className="text-primary block mb-1">📞 Contact</span>
            Call for Orders
          </div>
          <div>
            <span className="text-primary block mb-1">🕐 Hours</span>
            11 AM – 11 PM
          </div>
        </div>
        <motion.img
          src={ornament}
          alt=""
          className="w-40 mx-auto mt-8 opacity-30 rotate-180"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
        />
        <p className="text-muted-foreground/50 text-xs font-body mt-6">
          © 2026 Dada Biryani Centre. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;

import { motion } from "framer-motion";
import { MenuCategory } from "@/data/menuData";

interface MenuSectionProps {
  category: MenuCategory;
  index: number;
  onItemHover: () => void;
}

const MenuSection = ({ category, index, onItemHover }: MenuSectionProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.section
      id={category.id}
      className="py-12 md:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Category Header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ x: isEven ? -40 : 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-4xl md:text-5xl">{category.emoji}</span>
          <div className="flex-1">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-gold">
              {category.title}
            </h2>
            <div className="h-px bg-gradient-to-r from-primary/60 to-transparent mt-2" />
          </div>
        </motion.div>

        {/* Table Header */}
        <motion.div
          className="grid gap-1 mb-3 px-4 text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground"
          style={{
            gridTemplateColumns: category.hasHalfFull
              ? "1fr auto auto"
              : "1fr auto",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span>Item</span>
          {category.hasHalfFull ? (
            <>
              <span className="w-20 text-center">Half</span>
              <span className="w-20 text-center">Full</span>
            </>
          ) : (
            <span className="w-20 text-center">Price</span>
          )}
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-1">
          {category.items.map((item, i) => (
            <motion.div
              key={item.name}
              className="grid gap-1 px-4 py-3 rounded-lg bg-gradient-card border border-border/50 hover:border-primary/30 hover:shadow-gold transition-all duration-300 cursor-default group"
              style={{
                gridTemplateColumns: category.hasHalfFull
                  ? "1fr auto auto"
                  : "1fr auto",
              }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              onMouseEnter={onItemHover}
              whileHover={{ x: 4 }}
            >
              <span className="font-body text-foreground group-hover:text-primary transition-colors duration-300">
                {item.name}
              </span>
              {category.hasHalfFull ? (
                <>
                  <span className="w-20 text-center font-body text-muted-foreground text-sm">
                    ₹{item.half}
                  </span>
                  <span className="w-20 text-center font-body font-semibold text-primary text-sm">
                    ₹{item.full}
                  </span>
                </>
              ) : (
                <span className="w-20 text-center font-body font-semibold text-primary text-sm">
                  ₹{item.price}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default MenuSection;

import { motion } from "framer-motion";
import { MenuCategory } from "@/data/menuData";

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}

const CategoryNav = ({ categories, activeCategory, onCategoryClick }: CategoryNavProps) => {
  return (
    <motion.nav
      className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-gold py-3"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-gold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className="mr-1.5">{cat.emoji}</span>
              {cat.title}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default CategoryNav;

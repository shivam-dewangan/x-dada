import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { menuData } from "@/data/menuData";
import FooterSection from "./FooterSection";

const SWIPE_THRESHOLD = 50;

/* ── Corner Ornaments ── */
const CornerOrnaments = () => (
  <>
    <div className="ornament-corner ornament-corner-tl" style={{ borderColor: "hsl(var(--gold) / 0.4)" }} />
    <div className="ornament-corner ornament-corner-tr" style={{ borderColor: "hsl(var(--gold) / 0.4)" }} />
    <div className="ornament-corner ornament-corner-bl" style={{ borderColor: "hsl(var(--gold) / 0.4)" }} />
    <div className="ornament-corner ornament-corner-br" style={{ borderColor: "hsl(var(--gold) / 0.4)" }} />
  </>
);

/* ── Cover Page (left panel) - REMOVED per user request ── */
const CoverPanel = () => <div className="hidden" />;

/* ── Page flip variants ── */
const enterFromRight = {
  initial: { rotateY: 180, opacity: 0 },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

const enterFromLeft = {
  initial: { rotateY: -180, opacity: 0 },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

const MenuBook = () => {
  const totalPages = menuData.length + 1;
  const [[page, direction], setPage] = useState([0, 0]);
  const [isFlipping, setIsFlipping] = useState(false);

  // Scroll lock
  useEffect(() => {
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    };
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      if (isFlipping) return;
      const nextPage = page + newDirection;
      if (nextPage >= 0 && nextPage < totalPages) {
        setIsFlipping(true);
        setPage([nextPage, newDirection]);
        setTimeout(() => setIsFlipping(false), 750);
      }
    },
    [page, totalPages, isFlipping]
  );

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
        paginate(info.offset.x < 0 ? 1 : -1);
      }
    },
    [paginate]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [paginate]);

  // Removed goToPage - no tabs

  const category = page < menuData.length ? menuData[page] : null;
  const enterVariant = direction > 0 ? enterFromRight : enterFromLeft;

  return (
  <div className="h-dvh w-dvw bg-background flex flex-col overflow-hidden no-scrollbar">  

      {/* Book area - full screen data */}
      <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
        {/* Full screen book - fixed syntax */}
        <div
            className="flex-1 h-full w-screen rounded-none overflow-hidden relative p-2 sm:p-4 md:p-6 lg:p-8"
            style={{ 
              perspective: "2000px",
              boxShadow: `
                0 20px 60px -15px rgba(0,0,0,0.6),
                0 10px 30px -8px rgba(0,0,0,0.4),
                inset 0 1px 0 hsl(var(--gold) / 0.1)
              `,
              border: "2px solid hsl(var(--gold) / 0.2)",
            }}
          >
            {/* Full screen menu content */}
            <div className="relative h-full flex flex-col w-full"
              style={{
                background: "linear-gradient(135deg, hsl(var(--navy)), hsl(var(--navy-light) / 0.5), hsl(var(--navy)))",
                transformStyle: "preserve-3d",
              }}
            >
              <CornerOrnaments />

              {/* Inner gold border */}
              <div className="absolute inset-3 border rounded-lg pointer-events-none z-10" style={{ borderColor: "hsl(var(--gold) / 0.15)" }} />

              {/* Page stack right edge */}
              <div className="absolute right-0 top-4 bottom-4 w-2 z-20 pointer-events-none"
                style={{
                  background: `repeating-linear-gradient(180deg,
                    hsl(var(--navy-light)) 0px,
                    hsl(var(--navy)) 1px,
                    hsl(var(--navy-light)) 2px
                  )`,
                  borderRadius: "0 4px 4px 0",
                  boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
                }}
              />

              {/* Animated page */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={page}
                  variants={enterVariant}
                  initial="initial"
                  animate="animate"
                  style={{
                    transformOrigin: direction > 0 ? "left center" : "right center",
                    backfaceVisibility: "hidden",
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  onDragEnd={handleDragEnd}
                >
                  {/* Page curl shadow */}
                  <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      background: direction > 0
                        ? "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 40%)"
                        : "linear-gradient(-90deg, rgba(0,0,0,0.4) 0%, transparent 40%)",
                    }}
                  />

                  {/* Page content */}
                  <div className="relative z-0 flex-1 flex flex-col overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 h-full no-scrollbar">
                    {category ? (
                      <>
                        {/* Mobile page indicator */}
                        <div className="lg:hidden flex items-center justify-center mb-4">
                          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.2))" }} />
                          <span className="px-3 text-muted-foreground font-body text-xs tracking-[0.3em] uppercase">
                            Page {page + 1} / {totalPages}
                          </span>
                          <div className="h-px flex-1" style={{ background: "linear-gradient(-90deg, transparent, hsl(var(--gold) / 0.2))" }} />
                        </div>

                        {/* Category Header */}
                        <motion.div
                          className="flex items-center gap-4 mb-8"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <span className="text-4xl sm:text-5xl md:text-6xl drop-shadow-lg">{category.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-gold tracking-tight sm:tracking-wider uppercase leading-tight">
                                {category.title}
                              </h2>
                            <div className="h-px mt-2" style={{ background: "linear-gradient(90deg, hsl(var(--gold) / 0.5), transparent)" }} />
                          </div>
                        </motion.div>

                        {/* Table Header */}
                        <motion.div
                          className="grid gap-1 mb-4 px-4 text-xs font-body font-semibold tracking-[0.2em] uppercase text-primary/60"
                          style={{
                            gridTemplateColumns: category.hasHalfFull
                              ? "1fr auto auto"
                              : "1fr auto",
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.35 }}
                        >
                          <span>Item</span>
                          {category.hasHalfFull ? (
                            <>
                              <span className="w-20 text-right">Half</span>
                              <span className="w-20 text-right">Full</span>
                            </>
                          ) : (
                            <span className="w-20 text-right">Price</span>
                          )}
                        </motion.div>

                        {/* Menu Items */}
                        <div className="space-y-1">
                          {category.items.map((item, i) => (
                            <motion.div
                              key={item.name}
                              className="grid gap-0.5 sm:gap-1 px-3 sm:px-4 py-1.5 sm:py-2 md:py-3 rounded-md border border-transparent hover:border-primary/30 transition-all duration-300 cursor-default group gold-glow-hover text-xs sm:text-sm md:text-base"
                              style={{
                                gridTemplateColumns: category.hasHalfFull
                                  ? "1fr auto auto"
                                  : "1fr auto",
                                background: i % 2 === 0 ? "hsl(var(--navy-light) / 0.25)" : "transparent",
                              }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.04, duration: 0.3 }}
                              whileHover={{ x: 4 }}
                            >
                              <span className="font-body text-foreground group-hover:text-primary transition-colors duration-300 text-sm md:text-base">
                                {item.name}
                              </span>
                              {category.hasHalfFull ? (
                                <>
                                  <span className="w-20 text-right font-body text-muted-foreground text-sm">
                                    ₹{item.half}
                                  </span>
                                  <span className="w-20 text-right font-body font-semibold text-primary text-sm">
                                    ₹{item.full}
                                  </span>
                                </>
                              ) : (
                                <span className="w-20 text-right font-body font-semibold text-primary text-sm">
                                  ₹{item.price}
                                </span>
                              )}
                            </motion.div>
                          ))}
                        </div>

                        {/* Page bottom ornament */}
                          <div className="flex items-center justify-center mt-4 sm:mt-6 md:mt-8">
                          <div className="w-12 sm:w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.3))" }} />
                          <span className="px-2 sm:px-3 text-primary/30 text-base sm:text-lg">✦</span>
                          <div className="w-12 sm:w-16 h-px" style={{ background: "linear-gradient(-90deg, transparent, hsl(var(--gold) / 0.3))" }} />
                        </div>
                      </>
                    ) : (
                      <FooterSection />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
      </div>
      </div>

      {/* Compact footer */}
      <div className="py-2 sm:py-3 min-h-[2.5rem] flex items-center justify-center gap-2 sm:gap-3 shrink-0 z-50 bg-gradient-to-r from-navy/90 to-navy/80 backdrop-blur-md border-t border-gold/30 px-4 sm:px-6">
        <span className="text-xs sm:text-sm font-body text-muted-foreground/80 mr-2 sm:mr-3 hidden lg:block min-w-[3.5rem] text-center">
          Pg {page + 1}/{totalPages}
        </span>
        <motion.button
          onClick={() => paginate(-1)}
          disabled={page === 0 || isFlipping}
          className="w-14 h-14 rounded-full flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, hsl(var(--navy-light)), hsl(var(--navy)))",
            border: "2px solid hsl(var(--gold) / 0.4)",
          }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px hsl(43 56% 52% / 0.3)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6 text-primary" />
        </motion.button>
        <motion.button
          onClick={() => paginate(1)}
          disabled={page === totalPages - 1 || isFlipping}
          className="w-14 h-14 rounded-full flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, hsl(var(--navy-light)), hsl(var(--navy)))",
            border: "2px solid hsl(var(--gold) / 0.4)",
          }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px hsl(43 56% 52% / 0.3)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </motion.button>
      </div>

      {/* Swipe hint - moved higher for visibility */}
      {page === 0 && !isFlipping && (
        <motion.div
          className="absolute bottom-[20vh] sm:bottom-[22vh] md:bottom-[25vh] left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 font-body text-base sm:text-lg md:text-xl px-6 py-3 rounded-xl max-w-[85vw] mx-4 shadow-xl backdrop-blur-lg border-2"
          style={{
            background: "hsl(var(--navy) / 0.97)",
            borderColor: "hsl(var(--gold) / 0.4)",
            color: "hsl(var(--cream))",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            👆
          </motion.span>
          Swipe or use arrows to flip pages
        </motion.div>
      )}
    </div>
  );
};

export default MenuBook;

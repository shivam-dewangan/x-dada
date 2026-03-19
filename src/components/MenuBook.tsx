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

/* ── Cover Page (left panel) ── */
const CoverPanel = ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => (
  <div className="hidden lg:flex flex-col items-center justify-center relative p-8 min-h-full"
    style={{ background: "linear-gradient(180deg, hsl(var(--navy)), hsl(var(--navy-dark)))" }}
  >
    <CornerOrnaments />

    {/* Gold border frame */}
    <div className="absolute inset-4 border-2 rounded-lg pointer-events-none" style={{ borderColor: "hsl(var(--gold) / 0.25)" }} />

    {/* Top ornament */}
    <div className="flex items-center gap-2 mb-6">
      <div className="w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.5))" }} />
      <span className="text-primary/60 text-sm">✦</span>
      <div className="w-12 h-px" style={{ background: "linear-gradient(-90deg, transparent, hsl(var(--gold) / 0.5))" }} />
    </div>

    {/* MENU heading */}
    <h2 className="font-display text-3xl font-bold text-gradient-gold tracking-[0.4em] uppercase mb-8">
      Menu
    </h2>

    {/* Circular logo */}
    <div className="relative mb-6">
      <div
        className="w-32 h-32 rounded-full flex items-center justify-center animate-pulse-glow"
        style={{
          border: "2px solid hsl(var(--gold))",
          background: "linear-gradient(135deg, hsl(var(--navy-light)), hsl(var(--navy-dark)))",
        }}
      >
        <div className="text-center">
          <span className="text-3xl">👑</span>
          <p className="font-display text-xs text-primary tracking-[0.2em] uppercase mt-1">Dada</p>
        </div>
      </div>
    </div>

    {/* Brand name */}
    <h3 className="font-display text-xl text-primary tracking-[0.3em] uppercase mb-2">
      Dada Biryani
    </h3>
    <p className="font-body text-muted-foreground text-sm tracking-widest uppercase mb-8">
      Centre
    </p>

    {/* Divider */}
    <div className="w-24 h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.4), transparent)" }} />

    {/* Page indicator */}
    <p className="font-body text-xs text-muted-foreground tracking-widest uppercase">
      Page {currentPage + 1} of {totalPages}
    </p>

    {/* Bottom ornament */}
    <div className="flex items-center gap-2 mt-6">
      <div className="w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.5))" }} />
      <span className="text-primary/60 text-sm">✦</span>
      <div className="w-12 h-px" style={{ background: "linear-gradient(-90deg, transparent, hsl(var(--gold) / 0.5))" }} />
    </div>
  </div>
);

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

  const goToPage = useCallback(
    (idx: number) => {
      if (isFlipping || idx === page) return;
      setIsFlipping(true);
      setPage([idx, idx > page ? 1 : -1]);
      setTimeout(() => setIsFlipping(false), 750);
    },
    [page, isFlipping]
  );

  const category = page < menuData.length ? menuData[page] : null;
  const enterVariant = direction > 0 ? enterFromRight : enterFromLeft;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Category tabs bar */}
      <div className="sticky top-0 z-50 py-3 px-4"
        style={{
          background: "linear-gradient(180deg, hsl(var(--navy) / 0.97), hsl(var(--navy) / 0.92))",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid hsl(var(--gold) / 0.2)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center">
           <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide justify-center">
             {menuData.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => goToPage(i)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-body transition-all duration-300 whitespace-nowrap ${
                  page === i
                    ? "bg-primary text-primary-foreground shadow-gold font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span>{cat.emoji}</span>
                <span className="hidden md:inline">{cat.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Book area */}
      <div className="flex-1 flex items-center justify-center p-3 md:p-6 pb-24">
        <div className="w-full max-w-4xl mx-auto" style={{ perspective: "2000px" }}>
          {/* Book container */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[280px_1fr] rounded-xl overflow-hidden relative"
            style={{
              boxShadow: `
                0 30px 80px -20px rgba(0,0,0,0.7),
                0 15px 40px -10px rgba(0,0,0,0.5),
                inset 0 1px 0 hsl(var(--gold) / 0.1)
              `,
              border: "2px solid hsl(var(--gold) / 0.2)",
            }}
          >
            {/* Left: Cover panel */}
            <CoverPanel currentPage={page} totalPages={totalPages} />

            {/* Spine binding */}
            <div className="hidden lg:block absolute left-[280px] top-0 bottom-0 w-3 z-30 pointer-events-none"
              style={{
                background: `linear-gradient(90deg,
                  rgba(0,0,0,0.5) 0%,
                  hsl(var(--gold) / 0.15) 30%,
                  rgba(0,0,0,0.3) 60%,
                  transparent 100%
                )`,
              }}
            />

            {/* Right: Menu content */}
            <div
              className="relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--navy)), hsl(var(--navy-light) / 0.5), hsl(var(--navy)))",
                minHeight: "75vh",
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
                  <div className="relative z-0 px-6 md:px-10 py-8 md:py-10">
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
                          <span className="text-5xl md:text-6xl drop-shadow-lg">{category.emoji}</span>
                          <div className="flex-1">
                            <h2 className="font-display text-2xl md:text-4xl font-bold text-gradient-gold tracking-wider uppercase">
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
                              className="grid gap-1 px-4 py-3 rounded-lg border border-transparent hover:border-primary/20 transition-all duration-300 cursor-default group gold-glow-hover"
                              style={{
                                gridTemplateColumns: category.hasHalfFull
                                  ? "1fr auto auto"
                                  : "1fr auto",
                                background: i % 2 === 0 ? "hsl(var(--navy-light) / 0.3)" : "transparent",
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
                        <div className="flex items-center justify-center mt-10">
                          <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.3))" }} />
                          <span className="px-3 text-primary/30 text-lg">✦</span>
                          <div className="w-16 h-px" style={{ background: "linear-gradient(-90deg, transparent, hsl(var(--gold) / 0.3))" }} />
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

      {/* Navigation Arrows */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        <span className="text-xs font-body text-muted-foreground mr-2 hidden sm:block">
          {page + 1}/{totalPages}
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

      {/* Swipe hint */}
      {page === 0 && !isFlipping && (
        <motion.div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 font-body text-sm px-4 py-2 rounded-full"
          style={{
            background: "hsl(var(--navy) / 0.9)",
            border: "1px solid hsl(var(--gold) / 0.2)",
            color: "hsl(var(--cream) / 0.6)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
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

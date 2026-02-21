import { motion, useScroll } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X, Home, GraduationCap, Briefcase, Code2 } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest > 300);
    });
  }, [scrollY]);

  const navItems = [
    { label: "Home", icon: Home, href: "#" },
    { label: "Education", icon: GraduationCap, href: "#education" },
    { label: "Experience", icon: Briefcase, href: "#experience" },
    { label: "Skills", icon: Code2, href: "#skills" },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-zinc-900/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-zinc-800 px-8 py-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent cursor-pointer"
                onClick={() => scrollToSection("#")}
              >
                Rujul
              </motion.div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => scrollToSection(item.href)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition-all duration-300 text-slate-300 hover:text-white"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-zinc-800 text-white"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.95,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-20 left-0 right-0 z-40 px-6 md:hidden"
      >
        <motion.div
          className="bg-zinc-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-zinc-800 p-4 overflow-hidden"
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => scrollToSection(item.href)}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition-all duration-300 text-slate-300 hover:text-white text-left"
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}

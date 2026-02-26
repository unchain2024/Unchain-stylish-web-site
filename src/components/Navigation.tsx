import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

const navItems = [
  { label: "ABOUT US", href: "#about" },
  { label: "NEWS", href: "#news" },
  { label: "CAREER", href: "#career" },
  { label: "CONTACT US", href: "#contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-[5vw] flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          className={`font-black text-lg tracking-[0.15em] transition-colors duration-300 ${
            scrolled ? "text-foreground" : "text-background"
          }`}
        >
          UNCHAIN
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-foreground hover:text-primary"
                  : "text-background/90 hover:text-background"
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`transition-colors duration-300 ${
                scrolled ? "text-foreground" : "text-background/90"
              }`}
            >
              <Globe size={18} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 top-8 bg-background rounded-lg shadow-lg border border-border py-2 min-w-[120px]"
                >
                  <button
                    onClick={() => setLangOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLangOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    日本語
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors ${
            scrolled ? "text-foreground" : "text-background"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="w-full px-[5vw] py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                <button className="hover:text-foreground transition-colors">English</button>
                <span>|</span>
                <button className="hover:text-foreground transition-colors">日本語</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/language";
import AnnouncementBar from "./AnnouncementBar";

const navItems = {
  ja: [
    { label: "ABOUT US", href: "/about" },
    { label: "SOLUTIONS", href: "/solutions" },
    { label: "NEWS", href: "/news" },
    { label: "CAREER", href: "/career" },
    { label: "CONTACT US", href: "/contact" },
  ],
  en: [
    { label: "ABOUT US", href: "/about" },
    { label: "SOLUTIONS", href: "/solutions" },
    { label: "NEWS", href: "/news" },
    { label: "CAREER", href: "/career" },
    { label: "CONTACT US", href: "/contact" },
  ],
};

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { lang, toggleLang } = useLang();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 80 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const t = entry.target.getAttribute("data-nav-theme");
            if (t === "light" || t === "dark") setTheme(t);
          }
        }
      },
      { rootMargin: "-0px 0px -90% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const isLight = theme === "light";
  const items = navItems[lang];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-transform duration-300"
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <AnnouncementBar />
      <div className="w-full px-[5vw] flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className={`font-black text-[calc(1.5*var(--vf))] tracking-[0.15em] transition-colors duration-500 ${
            isLight ? "text-foreground" : "text-white"
          }`}
        >
          UNCHAIN
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-[calc(1.1*var(--vf))] font-medium transition-colors duration-500 ${
                isLight
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className={`text-[calc(1*var(--vf))] font-medium px-3 py-1 rounded-full border transition-all duration-300 ${
              isLight
                ? "border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                : "border-white/30 text-white/90 hover:bg-white hover:text-black"
            }`}
          >
            {lang === "ja" ? "EN" : "JP"}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors duration-500 ${
            isLight ? "text-foreground" : "text-white"
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
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleLang}
                className="self-start mt-2 text-sm font-medium px-4 py-1.5 rounded-full border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                {lang === "ja" ? "Switch to English" : "日本語に切替"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;

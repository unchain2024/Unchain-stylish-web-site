import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useLang } from "@/lib/language";

const text = {
  ja: {
    heading: "404",
    subheading: "ページが見つかりません",
    description: "お探しのページは存在しないか、移動した可能性があります。",
    cta: "ホームに戻る",
  },
  en: {
    heading: "404",
    subheading: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    cta: "Back to Home",
  },
};

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLang();
  const t = text[lang];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section data-nav-theme="light" className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center px-[5vw]">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[calc(12*var(--vf))] font-black leading-none text-muted-foreground/10 mb-[1vh] select-none"
          >
            {t.heading}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[calc(3.5*var(--vf))] font-black text-foreground mb-[1vh]"
          >
            {t.subheading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[calc(1.15*var(--vf))] text-muted-foreground max-w-md mx-auto mb-[4vh]"
          >
            {t.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-[calc(1*var(--vf))] font-medium hover:opacity-90 transition-all duration-300"
            >
              {t.cta}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;

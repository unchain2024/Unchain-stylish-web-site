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
        <div className="text-center container-site">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12rem] lg:text-[16rem] font-black leading-none text-muted-foreground/10 mb-3 select-none"
          >
            {t.heading}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="heading-display text-light-heading mb-3"
          >
            {t.subheading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="body-large text-light-body max-w-md mx-auto mb-8"
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
              className="btn-primary inline-flex items-center gap-2"
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

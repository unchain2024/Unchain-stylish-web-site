import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/language";

const heroText = {
  ja: {
    subtitle:
      "すべての組織には解放すべき重要な使命があると信じています。\n技術はその使命に仕えるべきであり — 置き換えるべきではありません。",
    ctaPrimary: "お問い合わせ",
    ctaSecondary: "ソリューション",
  },
  en: {
    subtitle:
      "We believe every organization has a crucial mission to unchain.\nTechnology should serve that mission — not replace it.",
    ctaPrimary: "Get in Touch",
    ctaSecondary: "Solutions",
  },
};

const HeroSection = () => {
  const { lang, localePath } = useLang();
  const t = heroText[lang];

  return (
    <section data-nav-theme="dark" className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-bg-merged.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-fluid-hero font-black text-white hero-letter-spacing text-center"
        >
          UNCHAIN THE WORLD
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="body-large text-white/55 text-center mt-6 max-w-2xl whitespace-pre-line"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-4 mt-10"
        >
          <Link
            to={localePath("/contact")}
            className="btn-primary"
          >
            {t.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to={localePath("/solutions")}
            className="btn-outline border-white/25 text-white hover:bg-white hover:text-black"
          >
            {t.ctaSecondary}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

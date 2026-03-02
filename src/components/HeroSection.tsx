import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/language";

const heroText = {
  ja: { ctaPrimary: "お問い合わせ", ctaSecondary: "ソリューション" },
  en: { ctaPrimary: "Get in Touch", ctaSecondary: "Solutions" },
};

const words = ["UNCHAIN", "THE", "WORLD"];

const HeroSection = () => {
  const { lang, localePath } = useLang();
  const t = heroText[lang];
  const [shimmer, setShimmer] = useState(false);

  let charIndex = 0;
  const totalChars = words.reduce((sum, w) => sum + w.length, 0);
  const revealDone = (totalChars - 1) * 0.05 + 0.8;

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
        {/* Animated title */}
        <div className="relative">
          <h1
            className="text-fluid-hero font-black text-white hero-letter-spacing text-center"
            style={{ perspective: "800px" }}
          >
            {words.map((word, wi) => (
              <span
                key={wi}
                className="inline-block"
                style={{ marginRight: wi < words.length - 1 ? "0.3em" : 0 }}
              >
                {word.split("").map((char) => {
                  const ci = charIndex++;
                  const isUnchain = wi === 0;
                  const isLast = ci === totalChars - 1;
                  return (
                    <motion.span
                      key={ci}
                      initial={{
                        opacity: 0,
                        y: isUnchain ? 100 : 60,
                        rotateX: isUnchain ? -110 : -80,
                        filter: isUnchain ? "blur(16px)" : "blur(8px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.8,
                        delay: ci * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onAnimationComplete={
                        isLast ? () => setShimmer(true) : undefined
                      }
                      className="inline-block origin-bottom"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* Shimmer sweep after reveal */}
          {shimmer && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.08) 60%, transparent 100%)",
                mixBlendMode: "overlay",
              }}
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: revealDone + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-4 mt-10"
        >
          <Link to={localePath("/contact")} className="btn-primary !bg-white !text-black">
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

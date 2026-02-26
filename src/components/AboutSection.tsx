import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import tokyoBg from "@/assets/tokyo-bg.png";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={tokyoBg}
          alt="Tokyo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm font-bold tracking-[0.2em] text-primary-foreground/80 mb-6"
        >
          ABOUT UNCHAIN
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-16"
        >
          世界中にあなたのAIを
        </motion.h2>

        <motion.a
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="#contact"
          className="btn-cta"
        >
          お問い合わせする
        </motion.a>
      </div>
    </section>
  );
};

export default AboutSection;

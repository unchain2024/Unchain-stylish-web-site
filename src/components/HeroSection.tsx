import { motion } from "framer-motion";
import heroMain from "@/assets/hero-main.png";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroMain}
          alt="UNCHAIN THE WORLD"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-fluid-hero font-black text-background hero-letter-spacing text-center"
        >
          UNCHAIN
          <br />
          THE WORLD
        </motion.h1>
      </div>
    </section>
  );
};

export default HeroSection;

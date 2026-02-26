import { motion } from "framer-motion";
import { useRef, useCallback, useState } from "react";

const videos = ["/hero-bg.mp4", "/hero-bg-2.mp4", "/hero-bg-3.mp4", "/hero-bg-4.mp4"];

const HeroSection = () => {
  const frontRef = useRef<HTMLVideoElement>(null);
  const backRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);
  const [frontVisible, setFrontVisible] = useState(true);

  const handleEnded = useCallback(() => {
    const nextIndex = (indexRef.current + 1) % videos.length;
    // Load next video into the hidden (back) layer
    const back = frontVisible ? backRef.current : frontRef.current;
    if (back) {
      back.src = videos[nextIndex];
      back.play();
    }
    // Crossfade: swap which layer is visible
    setFrontVisible((prev) => !prev);
    indexRef.current = nextIndex;
  }, [frontVisible]);

  return (
    <section data-nav-theme="dark" className="relative h-screen w-full overflow-hidden">
      {/* Background videos – two layers for crossfade */}
      <div className="absolute inset-0">
        <video
          ref={frontRef}
          autoPlay
          muted
          playsInline
          onEnded={frontVisible ? handleEnded : undefined}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: frontVisible ? 1 : 0 }}
          src={videos[0]}
        />
        <video
          ref={backRef}
          muted
          playsInline
          onEnded={!frontVisible ? handleEnded : undefined}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: frontVisible ? 0 : 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-fluid-hero font-black text-background hero-letter-spacing text-center"
        >
          UNCHAIN THE WORLD
        </motion.h1>
      </div>
    </section>
  );
};

export default HeroSection;

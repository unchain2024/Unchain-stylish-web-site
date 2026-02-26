import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import neuronVisual from "@/assets/neuron-visual.png";

const CatalogSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="section-light py-20 md:py-28" ref={ref}>
      <div className="container">
        {/* Link banner */}
        <div className="text-center mb-16">
          <a
            href="#solutions"
            className="text-primary font-medium text-sm hover:underline"
          >
            さらに詳しく見る
          </a>
        </div>

        {/* Catalog CTA - like NOT A HOTEL's brochure section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2"
          >
            <img
              src={neuronVisual}
              alt="UNCHAIN Catalog"
              className="w-full rounded-lg shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed mb-6">
              資料請求で今なら
              <br />
              UNCHAIN特製カタログを
              <br />
              無料でお届けします。
            </h3>
            <a href="#contact" className="btn-outline-dark border-foreground text-foreground hover:bg-foreground hover:text-background">
              さらに詳しく
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;

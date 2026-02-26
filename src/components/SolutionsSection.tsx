import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import heroMain from "@/assets/hero-main.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";

const solutions = [
  {
    image: heroMain,
    tag: "Flagship Product",
    title: "NEURON",
    description: "AI-powered Decision Intelligence Platform",
    detail: "組織の知識をキャプチャし、意思決定を支援",
  },
  {
    image: hero2,
    tag: "Platform",
    title: "AI PLATFORM",
    description: "Custom AI Platform Development",
    detail: "データパイプラインから意思決定支援システムまで",
  },
  {
    image: hero3,
    tag: "Consulting",
    title: "CONSULTING",
    description: "Strategy & Rapid Prototyping",
    detail: "ハイインパクトなAI機会の特定とロードマップ策定",
  },
];

const SolutionsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="solutions" className="py-20 md:py-28" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-12"
        >
          ラインナップ
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Card image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium text-background/80 bg-background/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl md:text-3xl font-black text-background hero-letter-spacing">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card description */}
              <p className="text-sm text-foreground font-medium mb-1">
                {item.description}
              </p>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="#contact" className="btn-cta">
            お問い合わせする
          </a>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;

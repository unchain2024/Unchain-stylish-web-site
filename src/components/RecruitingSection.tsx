import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroMain from "@/assets/hero-main.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import neuronVisual from "@/assets/neuron-visual.png";
import tokyoBg from "@/assets/tokyo-bg.png";
import heroBg from "@/assets/hero-bg.png";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const leftPhotos = [heroMain, hero2, hero3, neuronVisual, heroMain, hero2];
const rightPhotos = [hero3, neuronVisual, tokyoBg, heroBg, hero3, neuronVisual];

const sectionText = {
  ja: {
    tag: "Join UNCHAIN",
    heading: "未来を創る\nAIの先駆者になろう",
    description:
      "2030年に2,110億ドル規模になると予測される生成AIは、社会のあらゆるシーンを変革する可能性を秘めています。UNCHAINはプロフェッショナルな技術集団として、業務効率化を超えて社会に新たな価値を創出していきます。\n\nあなたの好奇心と可能性を、UNCHAINで開花させてみませんか？",
    cta: "採用情報を見る",
  },
  en: {
    tag: "Join UNCHAIN",
    heading: "Become a Pioneer\nin AI Innovation",
    description:
      "Generative AI, projected to reach $211 billion by 2030, holds the potential to transform every aspect of society. UNCHAIN, as a professional tech collective, goes beyond operational efficiency to create new value for society.\n\nReady to unlock your curiosity and potential at UNCHAIN?",
    cta: "View Careers",
  },
};

const RecruitingSection = () => {
  const { lang } = useLang();
  const t = sectionText[lang];

  return (
    <section
      id="career"
      data-nav-theme="light"
      className="relative overflow-hidden h-screen flex items-center bg-background"
    >
      <div className="w-full px-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-[4vw] items-center">
          {/* Left – copy */}
          <div>
            <ScrollReveal>
              <p className="text-primary text-[calc(1*var(--vf))] font-semibold tracking-[0.2em] uppercase mb-[2vh]">
                {t.tag}
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-[calc(3.5*var(--vf))] font-black text-foreground leading-tight mb-[2vh] whitespace-pre-line">
                {t.heading}
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-muted-foreground text-[calc(1.15*var(--vf))] leading-relaxed mb-[3vh] max-w-[35vw] whitespace-pre-line">
                {t.description}
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <Link to="/career" className="btn-cta inline-flex items-center gap-[0.5vw] text-[calc(1*var(--vf))]"
                style={{ padding: "clamp(0.5rem, 1vh, 1rem) clamp(1rem, 2vw, 2.5rem)" }}
              >
                {t.cta}
                <ArrowRight size={18} />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right – two columns scrolling */}
          <ScrollReveal y={80} duration={1.4}>
            <div className="relative overflow-hidden rounded-xl h-[70vh]">
              <div className="flex gap-[0.8vw] h-full">
                <div className="flex-1 overflow-hidden relative">
                  <motion.div
                    className="flex flex-col gap-[0.8vw]"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    {[...leftPhotos, ...leftPhotos].map((src, i) => (
                      <div key={i} className="aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0">
                        <img src={src} alt={`Team ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </motion.div>
                </div>

                <div className="flex-1 overflow-hidden relative">
                  <motion.div
                    className="flex flex-col gap-[0.8vw]"
                    style={{ y: "-50%" }}
                    animate={{ y: ["-50%", "0%"] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    {[...rightPhotos, ...rightPhotos].map((src, i) => (
                      <div key={i} className="aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0">
                        <img src={src} alt={`Team ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default RecruitingSection;

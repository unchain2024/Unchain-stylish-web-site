import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroMain from "@/assets/hero-main.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import neuronVisual from "@/assets/neuron-visual.png";
import tokyoBg from "@/assets/tokyo-bg.png";
import heroBg from "@/assets/hero-bg.png";
import ScrollReveal from "./ScrollReveal";

const leftPhotos = [heroMain, hero2, hero3, neuronVisual, heroMain, hero2];
const rightPhotos = [hero3, neuronVisual, tokyoBg, heroBg, hero3, neuronVisual];

const RecruitingSection = () => {
  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden h-screen flex items-center"
      style={{ backgroundColor: "hsl(207 30% 40%)" }}
    >
      <div className="w-full px-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-[4vw] items-center">
          {/* Left – copy */}
          <div>
            <ScrollReveal>
              <p className="text-primary text-[clamp(0.75rem,calc(1*var(--vf)),1rem)] font-semibold tracking-wider mb-[2vh]">
                Join UNCHAIN
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-[clamp(1.75rem,calc(4*var(--vf)),4.5rem)] font-bold text-white leading-tight mb-[2vh]">
                未来を創る
                <br />
                AIの先駆者になろう
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-white/70 text-[clamp(0.8rem,calc(1*var(--vf)),1.125rem)] leading-relaxed mb-[3vh] max-w-[35vw]">
                2030年に2,110億ドル規模になると予測される生成AIは、社会のあらゆるシーンを変革する可能性を秘めています。UNCHAINはプロフェッショナルな技術集団として、業務効率化を超えて社会に新たな価値を創出していきます。
                <br /><br />
                あなたの好奇心と可能性を、UNCHAINで開花させてみませんか？
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <a href="#" className="btn-cta inline-flex items-center gap-[0.5vw] text-[clamp(0.75rem,calc(1*var(--vf)),1rem)]"
                style={{ padding: "clamp(0.5rem, 1vh, 1rem) clamp(1rem, 2vw, 2.5rem)" }}
              >
                採用情報を見る
                <ArrowRight size={18} />
              </a>
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

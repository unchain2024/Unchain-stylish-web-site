import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import r1 from "@/assets/recruiting-1.png";
import r2 from "@/assets/recruiting-2.png";
import r3 from "@/assets/recruiting-3.png";
import r4 from "@/assets/recruiting-4.png";
import r5 from "@/assets/recruiting-5.png";
import r6 from "@/assets/recruiting-6.png";
import r7 from "@/assets/recruiting-7.png";
import r8 from "@/assets/recruiting-8.png";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const leftPhotos = [r1, r2, r3, r4];
const rightPhotos = [r5, r6, r7, r8];

const sectionText = {
  ja: {
    tag: "UNCHAINに参加する",
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
  const { lang, localePath } = useLang();
  const t = sectionText[lang];

  return (
    <section
      id="career"
      data-nav-theme="light"
      className="relative overflow-hidden h-screen flex items-center bg-background"
    >
      <div className="container-site w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left – copy */}
          <div>
            <ScrollReveal>
              <p className="label text-primary mb-6">
                {t.tag}
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="heading-1 text-light-heading mb-6 whitespace-pre-line">
                {t.heading}
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <p className="body-large text-light-body mb-8 max-w-xl whitespace-pre-line">
                {t.description}
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <Link to={localePath("/career")} className="btn-primary">
                {t.cta}
                <ArrowRight size={18} />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right – two columns scrolling */}
          <ScrollReveal y={80} duration={1.4}>
            <div className="relative overflow-hidden rounded-xl h-[70vh]">
              <div className="flex gap-2 h-full">
                <div className="flex-1 overflow-hidden relative">
                  <motion.div
                    className="flex flex-col gap-2"
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
                    className="flex flex-col gap-2"
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

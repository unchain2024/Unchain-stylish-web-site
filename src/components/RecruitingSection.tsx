import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import r1 from "@/assets/recruiting-1.webp";
import r2 from "@/assets/recruiting-2.webp";
import r3 from "@/assets/recruiting-3.webp";
import r4 from "@/assets/recruiting-4.webp";
import r5 from "@/assets/recruiting-5.webp";
import r6 from "@/assets/recruiting-6.webp";
import r7 from "@/assets/recruiting-7.webp";
import r8 from "@/assets/recruiting-8.webp";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const leftPhotos = [r1, r2, r3, r4];
const rightPhotos = [r5, r6, r7, r8];

const sectionText = {
  ja: {
    label: "採用情報",
    heading: "一緒にUNCHAIN\nTHE WORLDしよう",
    description:
      "UNCHAINのミッションは「UNCHAIN THE WORLD」です。世界中の人々や組織が、それぞれのミッションを解き放つためのテクノロジーを構築しています。\n\n私たちはテクノロジーのためにテクノロジーを作るのではありません。新たな発明、発見、そして創造の波を生み出し、より多くの可能性がある世界を形作るために構築しています。",
    cta: "採用情報を見る",
  },
  en: {
    label: "JOIN US",
    heading: "Let's UNCHAIN\nTHE WORLD together",
    description:
      "At UNCHAIN, our mission is \"UNCHAIN THE WORLD.\" We are building technology that enables people and organizations around the globe to unchain their own missions.\n\nWe do not create technology for its own sake. We build it to unlock new inventions, discoveries, and waves of creativity — and to help shape a world where more is possible.",
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
      className="relative overflow-hidden py-16 sm:py-24 lg:py-0 lg:h-screen lg:flex lg:items-center bg-background"
    >
      <div className="container-site w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left – copy */}
          <div>
            <ScrollReveal>
              <span className="label text-light-label mb-4 block">{t.label}</span>
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
            <div className="relative overflow-hidden rounded-xl h-[50vh] lg:h-[70vh]">
              <div className="flex gap-2 h-full">
                <div className="flex-1 overflow-hidden relative">
                  <motion.div
                    className="flex flex-col gap-2"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    {[...leftPhotos, ...leftPhotos].map((src, i) => (
                      <div key={i} className="aspect-[4/4.5] rounded-xl overflow-hidden flex-shrink-0">
                        <img src={src} alt={`Team ${i + 1}`} loading="lazy" className="w-full h-full object-cover object-top" />
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
                      <div key={i} className="aspect-[4/4.5] rounded-xl overflow-hidden flex-shrink-0">
                        <img src={src} alt={`Team ${i + 1}`} loading="lazy" className="w-full h-full object-cover object-top" />
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

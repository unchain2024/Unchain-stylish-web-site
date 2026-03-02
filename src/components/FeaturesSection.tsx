import { BrainCircuit, Blocks, Globe, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const features = {
  ja: [
    {
      num: "01",
      title: "ライフスタイルに合わせた\nAI導入が可能",
      desc: "組織の規模や課題に合わせた柔軟なAIソリューション。段階的な導入で確実な成果を実現します。",
    },
    {
      num: "02",
      title: "資産として保有",
      desc: "「所有権」での構築となるため、カスタマイズ、拡張が可能になります。",
    },
    {
      num: "03",
      title: "全国のUNCHAINが\n利用可能",
      desc: "パートナーになると全国のUNCHAINソリューションを相互利用できます。",
    },
    {
      num: "04",
      title: "維持管理は\nすべて不要",
      desc: "運用・保守にありがちな悩みとは無縁。滞在ごとにチャージを支払う必要もありません。",
    },
  ],
  en: [
    {
      num: "01",
      title: "AI Adoption Tailored\nto Your Lifestyle",
      desc: "Flexible AI solutions matched to your organization's scale and challenges. Step-by-step adoption for reliable results.",
    },
    {
      num: "02",
      title: "Own It as\nan Asset",
      desc: "Built with full ownership, so you can customize and extend freely.",
    },
    {
      num: "03",
      title: "Access UNCHAIN\nNationwide",
      desc: "As a partner, you can mutually access UNCHAIN solutions across the country.",
    },
    {
      num: "04",
      title: "Zero\nMaintenance",
      desc: "No operational headaches. No per-session charges to worry about.",
    },
  ],
};

const sectionText = {
  ja: {
    intro1:
      "すべての組織には解放すべき重要な使命があると私たちは信じています。技術はその使命に仕えるべきであり、それを置き換えるべきではありません。",
    intro2: "今すぐ、あたらしいAIを手に入れよう。",
    videoLink: "⏵ 2分でわかるUNCHAINを見る",
    heading: "UNCHAINの特徴",
  },
  en: {
    intro1:
      "We believe every organization has a crucial mission to unchain. Technology should serve that mission, not replace it.",
    intro2: "Get your new AI today.",
    videoLink: "⏵ Watch UNCHAIN in 2 minutes",
    heading: "UNCHAIN Features",
  },
};

const featureIcons = [BrainCircuit, Blocks, Globe, ShieldCheck];

const FeaturesSection = () => {
  const { lang } = useLang();
  const feats = features[lang];
  const t = sectionText[lang];

  return (
    <section data-nav-theme="light" className="bg-background py-16 sm:py-24 lg:py-32 flex items-center">
      <div className="w-full px-6 sm:px-[7vw]">
        {/* Intro text */}
        <div className="max-w-full sm:max-w-[80vw] lg:max-w-[60vw] mx-auto text-center mb-[4vh]">
          <ScrollReveal>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-[2vh]">
              {t.intro1}
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-[3vh]">
              {t.intro2}
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <a
              href="#"
              className="text-primary font-medium text-sm sm:text-base inline-flex items-center gap-2 hover:underline"
            >
              {t.videoLink}
            </a>
          </ScrollReveal>
        </div>

        {/* Features heading */}
        <ScrollReveal>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-[4vh] mb-[3vh]">
            {t.heading}
          </h3>
        </ScrollReveal>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-[1.5vw]">
          {feats.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <ScrollReveal key={feature.num} delay={i * 0.1}>
                <div
                  className="border border-border rounded-xl p-4 sm:p-[1.5vw] flex flex-col min-h-[180px] sm:min-h-[clamp(220px,28vh,420px)]"
                >
                  <span className="text-sm sm:text-base font-bold text-foreground mb-[2vh]">
                    {feature.num}
                  </span>

                  {/* Visual icon area */}
                  <div className="flex-1 flex items-center justify-center mb-[2vh]">
                    <div className="relative w-[6vw] h-[6vw] min-w-[3.5rem] min-h-[3.5rem] flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
                      <Icon
                        className="relative w-[3.5vw] h-[3.5vw] min-w-[2rem] min-h-[2rem] text-primary/70"
                        strokeWidth={1.2}
                      />
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-foreground mb-[0.5vh] whitespace-pre-line text-center">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

import { BrainCircuit, Blocks, Globe, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
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
];

const featureIcons = [BrainCircuit, Blocks, Globe, ShieldCheck];

const FeaturesSection = () => {
  return (
    <section data-nav-theme="dark" className="section-dark h-screen flex items-center">
      <div className="w-full px-[5vw]">
        {/* Intro text */}
        <div className="max-w-[60vw] mx-auto text-center mb-[4vh]">
          <ScrollReveal>
            <p className="text-[clamp(0.875rem,calc(1.2*var(--vf)),1.25rem)] text-dark-muted leading-relaxed mb-[2vh]">
              すべての組織には解放すべき重要な使命があると私たちは信じています。
              <br />
              技術はその使命に仕えるべきであり、それを置き換えるべきではありません。
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-[clamp(0.875rem,calc(1.2*var(--vf)),1.25rem)] text-dark-muted leading-relaxed mb-[3vh]">
              今すぐ、あたらしいAIを手に入れよう。
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <a
              href="#"
              className="text-primary font-medium text-[clamp(0.8rem,calc(1*var(--vf)),1rem)] inline-flex items-center gap-2 hover:underline"
            >
              ⏵ 2分でわかるUNCHAINを見る
            </a>
          </ScrollReveal>
        </div>

        {/* Features heading */}
        <ScrollReveal>
          <h3 className="text-[clamp(1.25rem,calc(2.2*var(--vf)),2rem)] font-bold text-dark-fg mt-[4vh] mb-[3vh]">
            UNCHAINの特徴
          </h3>
        </ScrollReveal>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.5vw]">
          {features.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <ScrollReveal
                key={feature.num}
                delay={i * 0.1}
              >
                <div
                  className="border border-dark-muted/20 rounded-xl p-[1.5vw] flex flex-col"
                  style={{ minHeight: "clamp(220px, 28vh, 420px)" }}
                >
                  <span className="text-[clamp(0.75rem,calc(1*var(--vf)),1rem)] font-bold text-dark-fg mb-[2vh]">
                    {feature.num}
                  </span>

                  {/* Visual icon area */}
                  <div className="flex-1 flex items-center justify-center mb-[2vh]">
                    <div className="relative w-[6vw] h-[6vw] min-w-[3.5rem] min-h-[3.5rem] flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
                      <Icon className="relative w-[3.5vw] h-[3.5vw] min-w-[2rem] min-h-[2rem] text-primary/70" strokeWidth={1.2} />
                    </div>
                  </div>

                  <h4 className="text-[clamp(0.7rem,calc(0.9*var(--vf)),1rem)] font-bold text-dark-fg mb-[0.5vh] whitespace-pre-line text-center">
                    {feature.title}
                  </h4>
                  <p className="text-[clamp(0.6rem,calc(0.8*var(--vf)),0.875rem)] text-dark-muted leading-relaxed text-center">
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

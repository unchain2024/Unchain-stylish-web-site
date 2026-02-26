import { ArrowRight } from "lucide-react";
import neuronVisual from "@/assets/neuron-visual.png";
import heroMain from "@/assets/hero-main.png";
import hero2 from "@/assets/hero-2.png";
import ScrollReveal from "./ScrollReveal";

const categories = [
  {
    category: "AI SaaS",
    items: [
      {
        image: neuronVisual,
        name: "NEURON",
        description: "PM Decision System of Record",
      },
    ],
  },
  {
    category: "AI Consulting",
    items: [
      {
        image: heroMain,
        name: "AI戦略コンサルティング",
        description:
          "ハイインパクトなAI機会の特定、戦略策定、プロダクション対応ソリューションの実装。",
      },
    ],
  },
  {
    category: "AI Platform",
    items: [
      {
        image: hero2,
        name: "カスタムAIプラットフォーム開発",
        description: "データパイプラインから意思決定支援システムまで。",
      },
    ],
  },
];

const BusinessSection = () => {
  return (
    <section id="solutions" data-nav-theme="light" className="bg-background h-screen flex items-center">
      <div className="w-full px-[5vw]">
        {/* Header */}
        <ScrollReveal>
          <h2 className="text-[clamp(1.5rem,3.5vw,3.75rem)] font-bold text-foreground mb-[3vh]">
            SOLUTIONS / SERVICES
          </h2>
        </ScrollReveal>

        {/* Categories */}
        <div className="space-y-[3vh]">
          {categories.map((cat, ci) => (
            <ScrollReveal key={cat.category} delay={ci * 0.05}>
              <div className="flex flex-col md:flex-row md:items-center gap-[2vw] md:gap-[4vw]">
                <h3 className="text-[clamp(1.75rem,4vw,4.5rem)] font-black text-foreground tracking-tight w-[30vw] flex-shrink-0">
                  {cat.category}
                </h3>

                <div className="flex-1 space-y-[1.5vh]">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-[2vw] group cursor-pointer"
                    >
                      <div className="flex items-center gap-[1.5vw]">
                        <div className="w-[6vw] h-[6vw] rounded-xl overflow-hidden bg-muted flex-shrink-0 shadow-sm">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-[clamp(1rem,1.8vw,2rem)] font-bold text-foreground">
                          {item.name}
                        </h4>
                      </div>

                      <div className="hidden md:flex items-center gap-[1.5vw] flex-shrink-0">
                        <p className="text-[clamp(0.75rem,1vw,1rem)] text-muted-foreground max-w-[22vw]">
                          {item.description}
                        </p>
                        <div className="w-[3vw] h-[3vw] min-w-[2rem] min-h-[2rem] rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {ci < categories.length - 1 && (
                <div className="border-t border-border mt-[2vh]" />
              )}
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="flex justify-end items-center gap-[1vw] mt-[3vh]">
          <span className="text-[clamp(0.75rem,1vw,1rem)] text-foreground font-medium">
            事業内容へ
          </span>
          <div className="w-[3vw] h-[3vw] min-w-[2rem] min-h-[2rem] rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer">
            <ArrowRight size={20} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BusinessSection;

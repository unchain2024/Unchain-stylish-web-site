import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const solutions = {
  ja: [
    {
      category: "AI SaaS",
      name: "NEURON",
      description: "PM Decision System of Record",
      url: "https://neuron-website-self.vercel.app",
      cta: "Learn More",
    },
    {
      category: "AI DX",
      name: "AI Consulting",
      description: "実践的なAIトランスフォーメーション",
      url: "https://the-aiadviser.com",
      cta: "Learn More",
    },
  ],
  en: [
    {
      category: "AI SaaS",
      name: "NEURON",
      description: "PM Decision System of Record",
      url: "https://neuron-website-self.vercel.app",
      cta: "Learn More",
    },
    {
      category: "AI DX",
      name: "AI Consulting",
      description: "Hands-on AI transformation",
      url: "https://the-aiadviser.com",
      cta: "Learn More",
    },
  ],
};

const sectionText = {
  ja: { label: "BUSINESS", heading: "Solutions" },
  en: { label: "BUSINESS", heading: "Solutions" },
};

const BusinessSection = () => {
  const { lang } = useLang();
  const items = solutions[lang];
  const t = sectionText[lang];

  return (
    <section id="solutions" data-nav-theme="light" className="bg-background min-h-screen flex items-center">
      <div className="w-full px-[5vw]">
        {/* Header — left aligned */}
        <div className="mb-[6vh]">
          <ScrollReveal>
            <span className="text-[calc(1*var(--vf))] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {t.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="text-[calc(3.5*var(--vf))] font-black text-foreground mt-[1vh]">
              {t.heading}
            </h2>
          </ScrollReveal>
        </div>

        {/* Solution items */}
        <div>
          {items.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 0.1}>
              <div className="py-[4vh]">
                {/* Category label */}
                <p className="text-[calc(1.5*var(--vf))] font-bold text-muted-foreground/40 mb-[1.5vh]">
                  {item.category}
                </p>

                {/* Item row */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[calc(1.75*var(--vf))] font-black text-foreground">
                      {item.name}
                    </h3>
                    <p className="text-[calc(1.15*var(--vf))] text-muted-foreground mt-[0.3vh]">
                      {item.description}
                    </p>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-foreground/20 text-foreground text-[calc(1*var(--vf))] font-medium hover:bg-foreground hover:text-background transition-all duration-300 flex-shrink-0"
                  >
                    {item.cta}
                    <ArrowRight className="w-[1em] h-[1em]" />
                  </a>
                </div>
              </div>

              {i < items.length - 1 && (
                <div className="border-t border-border" />
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;

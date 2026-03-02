import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const solutions = {
  ja: [
    {
      slug: "neuron",
      category: "AI SaaS",
      name: "NEURON",
      description: "PM意思決定の記録システム",
      cta: "詳しく見る",
    },
    {
      slug: "consulting",
      category: "AI DX",
      name: "AI Consulting",
      description: "実践的なAIトランスフォーメーション",
      cta: "詳しく見る",
    },
  ],
  en: [
    {
      slug: "neuron",
      category: "AI SaaS",
      name: "NEURON",
      description: "PM Decision System of Record",
      cta: "Learn More",
    },
    {
      slug: "consulting",
      category: "AI DX",
      name: "AI Consulting",
      description: "Hands-on AI transformation",
      cta: "Learn More",
    },
  ],
};

const sectionText = {
  ja: { label: "事業内容", heading: "ソリューション" },
  en: { label: "BUSINESS", heading: "Solutions" },
};

const BusinessSection = () => {
  const { lang, localePath } = useLang();
  const items = solutions[lang];
  const t = sectionText[lang];

  return (
    <section id="solutions" data-nav-theme="light" className="bg-secondary section flex items-center min-h-0 md:min-h-screen">
      <div className="container-site w-full">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <ScrollReveal>
            <span className="label text-light-label">{t.label}</span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="heading-1 text-light-heading mt-3">{t.heading}</h2>
          </ScrollReveal>
        </div>

        {/* Solution items */}
        <div>
          {items.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 0.1}>
              <div className="py-8 lg:py-10">
                <div className="flex items-center justify-between">
                  {/* Left – category + name + description */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 lg:gap-14">
                    <p className="heading-3 text-light-body opacity-50 flex-shrink-0 pt-0 sm:pt-2 w-auto sm:w-[120px] lg:w-[160px]">
                      {item.category}
                    </p>
                    <div>
                      <h3 className="heading-3 text-light-heading">{item.name}</h3>
                      <p className="body-large text-light-body mt-1">{item.description}</p>
                      <Link
                        to={`${localePath("/solutions")}?product=${item.slug}`}
                        className="sm:hidden inline-flex items-center gap-1 text-primary text-sm font-medium mt-2 hover:underline"
                      >
                        {item.cta}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <Link
                    to={`${localePath("/solutions")}?product=${item.slug}`}
                    className="hidden md:inline-flex btn-outline border-foreground/20 text-foreground hover:bg-foreground hover:text-background flex-shrink-0"
                  >
                    {item.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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

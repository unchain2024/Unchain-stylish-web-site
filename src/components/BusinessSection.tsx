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

        {/* Solution items grouped by category */}
        <div>
          {Object.entries(
            items.reduce<Record<string, typeof items>>((groups, item) => {
              (groups[item.category] ??= []).push(item);
              return groups;
            }, {})
          ).map(([category, groupItems], gi, groupArr) => (
            <div key={category}>
              <div className="flex flex-col sm:flex-row sm:items-stretch gap-0 sm:gap-8 lg:gap-14">
                {/* Category label – vertically centered across all items in the group */}
                <div className="flex items-center flex-shrink-0 w-auto sm:w-[120px] lg:w-[160px] pb-0 sm:pb-0">
                  <ScrollReveal delay={gi * 0.2}>
                    <p className="heading-3 text-light-body opacity-50 pt-6 sm:pt-0">
                      {category}
                    </p>
                  </ScrollReveal>
                </div>

                {/* Product rows */}
                <div className="flex-1">
                  {groupItems.map((item, i) => (
                    <ScrollReveal key={item.name} delay={gi * 0.2 + (i + 1) * 0.1}>
                      <div className="py-8 lg:py-10">
                        <div className="flex items-center justify-between">
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

                          <Link
                            to={`${localePath("/solutions")}?product=${item.slug}`}
                            className="hidden md:inline-flex btn-outline border-foreground/20 text-foreground hover:bg-foreground hover:text-background flex-shrink-0"
                          >
                            {item.cta}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      {i < groupItems.length - 1 && (
                        <div className="border-t border-border" />
                      )}
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {gi < groupArr.length - 1 && (
                <div className="border-t border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;

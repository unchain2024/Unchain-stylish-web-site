import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const newsItems = {
  ja: [
    {
      date: "2026年2月24日",
      tags: ["プレスリリース", "注目"],
      title: "UNCHAINがプレシードラウンドで3,500万円を調達",
      excerpt:
        "East VenturesとANOBAKAが主導するプレシードラウンドで3,500万円を調達しました…",
    },
    {
      date: "2025年11月12日",
      tags: [],
      title: "UNCHAIN CEO Christian Parkが日米協議会年次カンファレンス2025で登壇",
      excerpt:
        "共同創業者兼CEOのSunwoo \"Christian\" Parkが日米協議会の舞台に立ちました…",
    },
    {
      date: "2025年11月12日",
      tags: [],
      title:
        "Microsoft for Startupsに公式採択 — クラウドの力でグローバル展開を加速",
      excerpt:
        "Microsoft for Startupsに公式採択され、クラウドの力でグローバル展開を加速します…",
    },
  ],
  en: [
    {
      date: "FEB 24, 2026",
      tags: ["PRESS RELEASE", "FEATURED"],
      title: "UNCHAIN Raises ¥35 Million in Pre-Seed Round",
      excerpt:
        "UNCHAIN has raised ¥35 million in a pre-seed round led by East Ventures and ANOBAKA to...",
    },
    {
      date: "NOV 12, 2025",
      tags: [],
      title:
        "UNCHAIN CEO Christian Park Takes the Stage at U.S.–Japan Council Annual Conference 2025",
      excerpt:
        'Sunwoo "Christian" Park, Co-founder and CEO of UNCHAIN, took the stage at the U.S.–Japan...',
    },
    {
      date: "NOV 12, 2025",
      tags: [],
      title:
        "Official Selection for Microsoft for Startups — Advancing Globally Through the Power of Cloud and...",
      excerpt:
        "Official Selection for Microsoft for Startups — Advancing Globally Through the Power of Cloud and A...",
    },
  ],
};

const sectionText = {
  ja: { label: "LATEST", heading: "News & Insights", viewAll: "すべてのニュース" },
  en: { label: "LATEST", heading: "News & Insights", viewAll: "View All News" },
};

const NewsSection = () => {
  const { lang } = useLang();
  const items = newsItems[lang];
  const t = sectionText[lang];

  return (
    <section
      id="news"
      data-nav-theme="light"
      className="bg-background min-h-screen flex items-center"
    >
      <div className="w-full px-[5vw]">
        {/* Header */}
        <div className="flex items-end justify-between mb-[6vh]">
          <div>
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

          <ScrollReveal>
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-2 text-[calc(1*var(--vf))] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.viewAll}
              <ArrowRight className="w-[1em] h-[1em]" />
            </a>
          </ScrollReveal>
        </div>

        {/* News list */}
        <div>
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <a href="#" className="group block py-[4vh]">
                <div className="flex items-start gap-[3vw]">
                  {/* Number */}
                  <span className="text-[calc(3.5*var(--vf))] font-black text-muted-foreground/15 leading-none flex-shrink-0 w-[6vw]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Date + tags */}
                    <div className="flex items-center gap-[0.8vw] mb-[1vh] flex-wrap">
                      <span className="text-[calc(0.9*var(--vf))] text-muted-foreground">
                        {item.date}
                      </span>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[calc(0.75*var(--vf))] font-medium text-muted-foreground border border-border rounded-full px-3 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-[calc(1.75*var(--vf))] font-black text-foreground mb-[0.8vh] line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[calc(1.15*var(--vf))] text-muted-foreground line-clamp-1">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 pt-[3vh]">
                    <ArrowRight className="w-[1.5vw] h-[1.5vw] min-w-[1.2rem] min-h-[1.2rem] text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              </a>

              {i < items.length - 1 && (
                <div className="border-t border-border" />
              )}
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile view all */}
        <ScrollReveal className="md:hidden text-center mt-[3vh]">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[calc(1*var(--vf))] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.viewAll}
            <ArrowRight className="w-[1em] h-[1em]" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsSection;

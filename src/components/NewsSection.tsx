import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const newsItems = {
  ja: [
    {
      date: "2026年2月24日",
      tags: ["プレスリリース", "注目"],
      title: "UNCHAINがプレシードラウンドで3,500万円を調達",
      excerpt: "East VenturesとANOBAKAが主導するプレシードラウンドで3,500万円を調達しました…",
      url: "https://prtimes.jp/main/html/rd/p/000000001.000177392.html",
    },
    {
      date: "2025年11月12日",
      tags: [],
      title: "UNCHAIN CEO Christian Parkが日米協議会年次カンファレンス2025で登壇",
      excerpt: "共同創業者兼CEOのSunwoo \"Christian\" Parkが日米協議会の舞台に立ちました…",
      url: "https://medium.com/@unchain_the_world/unchain-ceo-christian-park-takes-the-stage-at-u-s-japan-council-annual-conference-2025-d45b6a4a168b",
    },
    {
      date: "2025年11月12日",
      tags: [],
      title: "Microsoft for Startupsに公式採択 — クラウドの力でグローバル展開を加速",
      excerpt: "Microsoft for Startupsに公式採択され、クラウドの力でグローバル展開を加速します…",
      url: "https://medium.com/@unchain_the_world/official-selection-for-microsoft-for-startups-advancing-globally-through-the-power-of-cloud-and-403ae4c0fd76",
    },
  ],
  en: [
    {
      date: "FEB 24, 2026",
      tags: ["PRESS RELEASE", "FEATURED"],
      title: "UNCHAIN Raises ¥35 Million in Pre-Seed Round",
      excerpt: "UNCHAIN has raised ¥35 million in a pre-seed round led by East Ventures and ANOBAKA to...",
      url: "https://prtimes.jp/main/html/rd/p/000000001.000177392.html",
    },
    {
      date: "NOV 12, 2025",
      tags: [],
      title: "UNCHAIN CEO Christian Park Takes the Stage at U.S.–Japan Council Annual Conference 2025",
      excerpt: 'Sunwoo "Christian" Park, Co-founder and CEO of UNCHAIN, took the stage at the U.S.–Japan...',
      url: "https://medium.com/@unchain_the_world/unchain-ceo-christian-park-takes-the-stage-at-u-s-japan-council-annual-conference-2025-d45b6a4a168b",
    },
    {
      date: "NOV 12, 2025",
      tags: [],
      title: "Official Selection for Microsoft for Startups — Advancing Globally Through the Power of Cloud",
      excerpt: "UNCHAIN has been officially selected for Microsoft for Startups, leveraging Azure cloud to accelerate global expansion.",
      url: "https://medium.com/@unchain_the_world/official-selection-for-microsoft-for-startups-advancing-globally-through-the-power-of-cloud-and-403ae4c0fd76",
    },
  ],
};

const sectionText = {
  ja: { label: "最新情報", heading: "ニュース", viewAll: "すべてのニュース" },
  en: { label: "LATEST", heading: "News & Insights", viewAll: "View All News" },
};

const NewsSection = () => {
  const { lang, localePath } = useLang();
  const items = newsItems[lang];
  const t = sectionText[lang];

  return (
    <section id="news" data-nav-theme="light" className="bg-background section flex items-center min-h-screen">
      <div className="container-site w-full">
        <div className="flex items-end justify-between mb-12 lg:mb-16">
          <div>
            <ScrollReveal>
              <span className="label text-light-label">{t.label}</span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="heading-1 text-light-heading mt-3">{t.heading}</h2>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <Link to={localePath("/news")} className="hidden md:inline-flex items-center gap-2 body text-light-body hover:text-foreground transition-colors">
              {t.viewAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>

        <div>
          {items.map((item, i) => {
            const hasUrl = "url" in item && item.url;
            const Wrapper = hasUrl ? "a" : Link;
            const linkProps = hasUrl
              ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
              : { to: localePath("/news") };
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Wrapper {...(linkProps as any)} className="group block py-8">
                  <div className="flex items-start gap-6 lg:gap-10">
                    <span className="heading-1 text-light-heading opacity-10 leading-none flex-shrink-0 w-16 lg:w-20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="body text-light-body">{item.date}</span>
                        {item.tags.map((tag) => (
                          <span key={tag} className="label text-light-label border border-border rounded-full px-3 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="heading-3 text-light-heading mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="body text-light-body line-clamp-1">{item.excerpt}</p>
                    </div>
                    <div className="flex-shrink-0 pt-6">
                      <ArrowRight className="w-5 h-5 text-light-body group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </Wrapper>
                {i < items.length - 1 && <div className="border-t border-border" />}
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="md:hidden text-center mt-8">
          <Link to={localePath("/news")} className="inline-flex items-center gap-2 body text-light-body hover:text-foreground transition-colors">
            {t.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsSection;

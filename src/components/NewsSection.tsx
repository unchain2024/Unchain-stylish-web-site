import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
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
  const [items, setItems] = useState(newsItems[lang]);
  const [loading, setLoading] = useState(false);
  const t = sectionText[lang];

  useEffect(() => {
    let isMounted = true;
    setItems(newsItems[lang]);
    setLoading(true);

    const fetchMeta = async () => {
      const updatedItems = await Promise.all(
        newsItems[lang].map(async (item) => {
          if (!("url" in item) || !item.url) return item;
          try {
            const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(item.url as string)}`;
            const res = await fetch(apiUrl);
            const data = await res.json();
            
            if (data.status === "success" && data.data) {
              
              // Map microlink date to a localized format if available
              let localizedDate = item.date;
              if (data.data.date) {
                const dateObj = new Date(data.data.date);
                if (!isNaN(dateObj.getTime())) {
                   localizedDate = lang === "ja" 
                     ? `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`
                     : dateObj.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }).toUpperCase();
                }
              }

              return {
                ...item,
                title: data.data.title || item.title,
                excerpt: data.data.description || item.excerpt,
                date: localizedDate
              };
            }
            return item;
          } catch (err) {
            console.error("Failed to fetch metadata for", item.url, err);
            return item;
          }
        })
      );
      if (isMounted) {
        setItems(updatedItems);
        setLoading(false);
      }
    };

    fetchMeta();

    return () => {
      isMounted = false;
    };
  }, [lang]);

  return (
    <section id="news" data-nav-theme="light" className="bg-background section flex items-center min-h-0 md:min-h-screen">
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

        <div className="relative min-h-[200px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10 backdrop-blur-[1px]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          {items.map((item, i) => {
            const hasUrl = "url" in item && item.url;
            const Wrapper = hasUrl ? "a" : Link;
            const linkProps = hasUrl
              ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
              : { to: localePath("/news") };
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Wrapper {...(linkProps as any)} className="group block py-6">
                  <div className="flex items-start gap-6 lg:gap-8">
                    <div className="flex-shrink-0 w-12 lg:w-16 pt-1">
                      <span className="text-5xl md:text-6xl font-black text-light-heading opacity-10 leading-none hidden sm:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-xs text-light-body">{item.date}</span>
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-light-label border border-border rounded-full px-2 py-0.5 whitespace-nowrap">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-light-heading mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-light-body line-clamp-1">{item.excerpt}</p>
                    </div>
                    <div className="hidden sm:block flex-shrink-0 pt-4">
                      <ArrowRight className="w-4 h-4 text-light-body group-hover:text-foreground transition-colors" />
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

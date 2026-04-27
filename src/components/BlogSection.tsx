import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const blogItems = {
  ja: [
    {
      date: "2026年3月15日",
      tags: ["テック", "AI"],
      title: "AIが変える次世代の組織構造：Artificial Organizational Intelligenceの可能性",
      excerpt: "UNCHAINが提唱するAOIがどのように企業のデジタルツインを実現し、意思決定を加速させるのか…",
      url: "https://medium.com/@unchain_the_world/christian-park-takes-the-stage-at-u-s-japan-council-annual-conference-2025-d45b6a4a168b",
    },
    {
      date: "2026年3月01日",
      tags: ["カルチャー", "働き方"],
      title: "グローバルチームの作り方：東京とサンフランシスコを繋ぐUNCHAINの挑戦",
      excerpt: "国境を越えたコラボレーションを支える文化とツールについて、CEOのChristianが語ります…",
      url: "https://medium.com/@unchain_the_world/official-selection-for-microsoft-for-startups-advancing-globally-through-the-power-of-cloud-and-403ae4c0fd76",
    },
    {
      date: "2026年2月10日",
      tags: ["プロダクト", "NEURON"],
      title: "NEURON開発秘話：PMの意思決定をデータで支援するプラットフォームの舞台裏",
      excerpt: "フラッグシップ製品NEURONの構想から開発、そして今後の展望について解説します…",
      url: "https://medium.com/@unchain_the_world/unchain-raises-35-million-in-pre-seed-round-403ae4c0fd76",
    },
  ],
  en: [
    {
      date: "MAR 15, 2026",
      tags: ["TECH", "AI"],
      title: "The Future of Organizational Structure: The Potential of AOI",
      excerpt: "How UNCHAIN's AOI creates digital twins of companies and accelerates decision-making...",
      url: "https://medium.com/@unchain_the_world/christian-park-takes-the-stage-at-u-s-japan-council-annual-conference-2025-d45b6a4a168b",
    },
    {
      date: "MAR 01, 2026",
      tags: ["CULTURE", "WORK"],
      title: "Building a Global Team: Connecting Tokyo and San Francisco",
      excerpt: "CEO Christian discusses the culture and tools that support cross-border collaboration...",
      url: "https://medium.com/@unchain_the_world/official-selection-for-microsoft-for-startups-advancing-globally-through-the-power-of-cloud-and-403ae4c0fd76",
    },
    {
      date: "FEB 10, 2026",
      tags: ["PRODUCT", "NEURON"],
      title: "Behind NEURON: Empowering PM Decisions with Data",
      excerpt: "Exploring the vision, development, and future of our flagship product, NEURON...",
      url: "https://medium.com/@unchain_the_world/unchain-raises-35-million-in-pre-seed-round-403ae4c0fd76",
    },
  ],
};

const sectionText = {
  ja: { label: "ブログ", heading: "ブログ＆インサイト", viewAll: "すべてのブログ" },
  en: { label: "BLOG", heading: "Blog & Insights", viewAll: "View All Blog" },
};

const BlogSection = () => {
  const { lang, localePath } = useLang();
  const [items, setItems] = useState(blogItems[lang]);
  const [loading, setLoading] = useState(false);
  const t = sectionText[lang];

  useEffect(() => {
    let isMounted = true;
    setItems(blogItems[lang]);
    setLoading(true);

    const fetchMeta = async () => {
      const updatedItems = await Promise.all(
        blogItems[lang].map(async (item) => {
          if (!("url" in item) || !item.url) return item;
          try {
            const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(item.url as string)}`;
            const res = await fetch(apiUrl);
            const data = await res.json();
            
            if (data.status === "success" && data.data) {
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
    <section id="blog" data-nav-theme="light" className="bg-background section flex items-center min-h-0 md:min-h-screen border-t border-border/50">
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
            <Link to={localePath("/blog")} className="hidden md:inline-flex items-center gap-2 body text-light-body hover:text-foreground transition-colors">
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
              : { to: localePath("/blog") };
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
          <Link to={localePath("/blog")} className="inline-flex items-center gap-2 body text-light-body hover:text-foreground transition-colors">
            {t.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BlogSection;

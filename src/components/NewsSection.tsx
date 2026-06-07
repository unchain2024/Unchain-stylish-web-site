import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";
import { supabase } from "@/lib/supabase";

interface Article {
  id: string;
  category?: string;
  title: string;
  description: string;
  title_en?: string;
  description_en?: string;
  created_at: string;
  is_draft: boolean;
  is_external?: boolean;
  external_url?: string;
}

const getLocalized = (article: Article, field: "title" | "description", lang: "ja" | "en") => {
  const valCurrent = lang === "en" ? article[`${field}_en` as keyof Article] : article[field];
  if (valCurrent && typeof valCurrent === "string" && valCurrent.trim() !== "") {
    return valCurrent;
  }
  const valOther = lang === "en" ? article[field] : article[`${field}_en` as keyof Article];
  return (valOther as string) || "";
};

const sectionText = {
  ja: { label: "最新情報", heading: "ニュース", viewAll: "すべてのニュース" },
  en: { label: "LATEST", heading: "News & Insights", viewAll: "View All News" },
};

const NewsSection = () => {
  const { lang, localePath } = useLang();
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const t = sectionText[lang];

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("is_draft", false)
          .eq("is_hidden", false)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        if (isMounted) {
          setItems(data || []);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticles();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (lang === "ja") {
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
    return date
      .toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      .toUpperCase();
  };

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
            const isExternal = item.is_external && item.external_url;
            const Wrapper = isExternal ? "a" : Link;
            const linkProps = isExternal
              ? { href: item.external_url, target: "_blank", rel: "noopener noreferrer" }
              : { to: localePath("/news") };
              
            const tags = item.category ? item.category.split(",").map(c => c.trim()).filter(c => c.toLowerCase() !== "external") : [];
            const title = getLocalized(item, "title", lang);
            const excerpt = getLocalized(item, "description", lang);

            return (
              <ScrollReveal key={item.id || i} delay={i * 0.08}>
                <Wrapper {...(linkProps as any)} className="group block py-6">
                  <div className="flex items-start gap-6 lg:gap-8">
                    <div className="flex-shrink-0 w-12 lg:w-16 pt-1">
                      <span className="text-5xl md:text-6xl font-black text-light-heading opacity-10 leading-none hidden sm:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-xs text-light-body font-medium">{formatDate(item.created_at)}</span>
                        {tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-light-label border border-border rounded-full px-2 py-0.5 whitespace-nowrap uppercase">
                            {tag}
                          </span>
                        ))}
                        {isExternal && (
                          <span className="text-[10px] font-bold border rounded-full px-2 py-0.5 whitespace-nowrap uppercase bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                            <ExternalLink className="w-2.5 h-2.5" />
                            {lang === "ja" ? "外部サイト" : "External"}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-light-heading mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      <p className="text-sm text-light-body line-clamp-1">{excerpt}</p>
                    </div>
                    <div className="hidden sm:block flex-shrink-0 pt-4">
                      {isExternal ? (
                        <ExternalLink className="w-4 h-4 text-amber-500 group-hover:text-amber-600 transition-colors" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-light-body group-hover:text-foreground transition-colors" />
                      )}
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

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, Loader2, Search, Filter, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/language";
import { supabase } from "@/lib/supabase";
import { Helmet } from "react-helmet-async";
import PressReleaseRenderer, { parsePressRelease } from "@/components/PressReleaseRenderer";
import { getCategoryColor } from "./NewsPage";

const heroText = {
  ja: {
    label: "ブログ＆インサイト",
    heading: "ブログ",
    description:
      "UNCHAINのメンバーによる、AI、組織、テクノロジーに関する最新の考察をお届けします。",
    searchPlaceholder: "キーワードで記事を検索...",
    allCategories: "すべてのカテゴリ",
    noResults: "条件に一致する記事が見つかりませんでした。",
    externalBadge: "外部サイト",
    allLanguages: "すべての言語",
    langJapanese: "日本語のみ",
    langEnglish: "英語のみ",
  },
  en: {
    label: "BLOG & INSIGHTS",
    heading: "Insights from our team",
    description:
      "Deep dives into AI, organization, and technology from the minds at UNCHAIN.",
    searchPlaceholder: "Search articles by keyword...",
    allCategories: "All Categories",
    noResults: "No articles found matching your criteria.",
    externalBadge: "External",
    allLanguages: "All Languages",
    langJapanese: "Japanese Only",
    langEnglish: "English Only",
  },
};

interface Article {
  id: string;
  category?: string;
  title: string;
  description: string;
  content: string;
  title_en?: string;
  description_en?: string;
  content_en?: string;
  image_url: string;
  author_first_name: string;
  author_last_name: string;
  created_at: string;
  is_draft: boolean;
  content_type?: string;
  custom_html?: string;
  custom_html_en?: string;
  additional_media?: { url: string; type: string }[];
  is_external?: boolean;
  external_url?: string;
}

const getLocalized = (article: Article | null, field: "title" | "description" | "content", lang: "ja" | "en") => {
  if (!article) return "";
  const valCurrent = lang === "en" ? article[`${field}_en` as keyof Article] : article[field];
  if (valCurrent && typeof valCurrent === "string" && valCurrent.trim() !== "") {
    return valCurrent;
  }
  const valOther = lang === "en" ? article[field] : article[`${field}_en` as keyof Article];
  return (valOther as string) || "";
};

const getLocalizedCustomHtml = (article: Article, lang: "ja" | "en") => {
  if (lang === "en" && article.custom_html_en) return article.custom_html_en;
  return article.custom_html || "";
};

const BlogPage = () => {
  const { lang } = useLang();
  const hero = heroText[lang];

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "ja" | "en">("all");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_draft", false)
        .eq("is_hidden", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (err: any) {
      console.error("Error fetching articles:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article: Article) => {
    if (article.is_external && article.external_url) {
      window.open(article.external_url, "_blank", "noopener,noreferrer");
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedArticle(article);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackToBlog = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedArticle(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsTransitioning(false);
    }, 300);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (lang === "ja") {
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toUpperCase();
  };

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    articles.forEach((article) => {
      if (article.category) {
        article.category.split(",").forEach((c) => {
          const trimmed = c.trim();
          if (trimmed) {
            cats.add(trimmed);
          }
        });
      }
    });
    return Array.from(cats).sort();
  }, [articles]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      if (lang === "ja" && (!article.title || article.title.trim() === "")) return false;
      if (lang === "en" && (!article.title_en || article.title_en.trim() === "")) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const title = getLocalized(article, "title", lang).toLowerCase();
        const desc = getLocalized(article, "description", lang).toLowerCase();
        if (!title.includes(query) && !desc.includes(query)) return false;
      }

      if (selectedCategories.length > 0) {
        if (!article.category) return false;
        const articleCats = article.category.split(",").map((c) => c.trim());
        const matchesCat = selectedCategories.some((cat) => articleCats.includes(cat));
        if (!matchesCat) return false;
      }

      if (selectedLanguage === "ja" && (!article.title || article.title.trim() === "")) return false;
      if (selectedLanguage === "en" && (!article.title_en || article.title_en.trim() === "")) return false;

      return true;
    });
  }, [articles, searchQuery, selectedCategories, selectedLanguage, lang]);

  const currentTitle = selectedArticle
    ? `${getLocalized(selectedArticle, "title", lang)} | UNCHAIN`
    : `${hero.label} | UNCHAIN`;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-mono">
      <Helmet>
        <title>{currentTitle}</title>
      </Helmet>
      <Navigation />

      <div className={`transition-opacity duration-300 relative z-10 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {!selectedArticle ? (
          <>
            <section data-nav-theme="light" className="bg-background pt-32 pb-4 sm:pt-40 sm:pb-8">
              <div className="container-site">
                <ScrollReveal>
                  <span className="label text-light-label">{hero.label}</span>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <h1 className="heading-1 text-light-heading mt-3">{hero.heading}</h1>
                </ScrollReveal>

                {!loading && !error && articles.length > 0 && (
                  <ScrollReveal delay={0.1} className="mt-12 space-y-6">
                    <div className="relative max-w-xl">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-light-body">
                        <Search className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-3 sm:py-4 bg-secondary/50 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none text-sm sm:text-base placeholder:text-light-body/50"
                        placeholder={hero.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 items-center">
                        <Filter className="w-4 h-4 text-light-body mr-1 hidden sm:block" />
                        {[
                          { id: "all", label: hero.allLanguages },
                          { id: "ja", label: hero.langJapanese },
                          { id: "en", label: hero.langEnglish },
                        ].map((lOpt) => (
                          <button
                            key={lOpt.id}
                            onClick={() => setSelectedLanguage(lOpt.id as "all" | "ja" | "en")}
                            className={`text-xs sm:text-sm px-4 py-2 rounded-full border transition-all ${
                              selectedLanguage === lOpt.id
                                ? "bg-primary text-primary-foreground border-primary font-medium"
                                : "bg-secondary/50 text-light-heading border-border/50 hover:bg-secondary hover:border-border"
                            }`}
                          >
                            {lOpt.label}
                          </button>
                        ))}
                      </div>

                      {availableCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                          <Filter className="w-4 h-4 text-light-body mr-1 hidden sm:block opacity-0" />
                          <button
                            onClick={() => setSelectedCategories([])}
                            className={`text-xs sm:text-sm px-4 py-2 rounded-full border transition-all ${
                              selectedCategories.length === 0
                                ? "bg-primary text-primary-foreground border-primary font-medium"
                                : "bg-secondary/50 text-light-heading border-border/50 hover:bg-secondary hover:border-border"
                            }`}
                          >
                            {hero.allCategories}
                          </button>
                          <div className="w-px h-6 bg-border mx-1 hidden sm:block"></div>
                          {availableCategories.map((cat) => {
                            const isSelected = selectedCategories.includes(cat);
                            const colorClasses = getCategoryColor(cat);
                            return (
                              <button
                                key={cat}
                                onClick={() => toggleCategory(cat)}
                                className={`text-xs sm:text-sm px-4 py-2 rounded-full border transition-all duration-300 uppercase ${
                                  isSelected
                                    ? `${colorClasses} ring-2 ring-primary/20 shadow-sm font-semibold`
                                    : "bg-secondary/50 text-light-body border-border/50 hover:bg-secondary hover:border-border"
                                }`}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </section>

            <section data-nav-theme="light" className="bg-background pb-24 lg:pb-32 xl:pb-40 py-8">
              <div className="container-site">
                <div className="border-t border-border mb-8" />
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  </div>
                ) : error ? (
                  <div className="text-center py-32 bg-red-50 p-8 rounded-xl">
                    <p className="text-red-500">Failed to load articles: {error}</p>
                  </div>
                ) : !articles || articles.length === 0 ? (
                  <div className="text-center py-24">
                    <p className="heading-3 mb-2">NO POSTS YET</p>
                    <p className="body text-light-body">Check back later for updates.</p>
                  </div>
                ) : filteredArticles.length === 0 ? (
                  <div className="text-center py-24 border border-border/50 border-dashed rounded-2xl bg-secondary/30">
                    <Search className="w-10 h-10 text-light-body/30 mx-auto mb-4" />
                    <p className="heading-3 text-light-heading mb-2">{hero.noResults}</p>
                    <button
                      onClick={() => { setSearchQuery(""); setSelectedCategories([]); setSelectedLanguage("all"); }}
                      className="text-primary hover:underline font-medium text-sm mt-2"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  filteredArticles.map((article, i) => {
                    const articleCats = article.category
                      ? article.category.split(",").map((c) => c.trim()).filter(c => c.toLowerCase() !== "external" && c.toLowerCase() !== "blog")
                      : ["INSIGHT"];
                    const isExternal = article.is_external && !!article.external_url;

                    return (
                      <ScrollReveal key={article.id} delay={i * 0.08}>
                        <button
                          onClick={() => handleArticleClick(article)}
                          className="group block py-6 w-full text-left focus:outline-none"
                        >
                          <div className="flex items-start gap-6 lg:gap-8">
                            <div className="flex-shrink-0 w-12 lg:w-16 pt-1">
                              <span className="text-5xl md:text-6xl font-black text-light-heading opacity-10 leading-none hidden sm:block">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <span className="text-xs text-light-body font-medium">
                                  {formatDate(article.created_at)}
                                </span>
                                <div className="flex gap-1.5 flex-wrap items-center">
                                  {articleCats.map((cat, idx) => (
                                    <span
                                      key={idx}
                                      className={`text-[10px] font-bold border rounded-full px-2 py-0.5 whitespace-nowrap uppercase ${getCategoryColor(cat)}`}
                                    >
                                      {cat}
                                    </span>
                                  ))}
                                  {isExternal && (
                                    <span className="text-[10px] font-bold border rounded-full px-2 py-0.5 whitespace-nowrap uppercase bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                                      <ExternalLink className="w-2.5 h-2.5" />
                                      {hero.externalBadge}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <h3 className="text-2xl md:text-3xl font-bold text-light-heading mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                {getLocalized(article, "title", lang)}
                              </h3>

                              {getLocalized(article, "description", lang) && (
                                <p className="text-sm text-light-body line-clamp-1">
                                  {getLocalized(article, "description", lang)}
                                </p>
                              )}
                            </div>

                            <div className="hidden sm:block flex-shrink-0 pt-4">
                              {isExternal ? (
                                <ExternalLink className="w-4 h-4 text-amber-500 group-hover:text-amber-600 transition-colors" />
                              ) : (
                                <ArrowRight className="w-4 h-4 text-light-body group-hover:text-foreground transition-colors" />
                              )}
                            </div>
                          </div>
                        </button>

                        {i < filteredArticles.length - 1 && (
                          <div className="border-t border-border" />
                        )}
                      </ScrollReveal>
                    );
                  })
                )}
                <div className="border-t border-border mt-8" />
              </div>
            </section>
          </>
        ) : (
          <article className="pt-32 pb-32 sm:pt-40 container-site max-w-4xl relative z-10">
            <button
              onClick={handleBackToBlog}
              className="mb-12 flex items-center gap-2 body text-light-body hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </button>

            <div className="mb-12 relative">
              <div className="flex items-center gap-4 mb-5 flex-wrap">
                <span className="body text-light-body font-medium">
                  {formatDate(selectedArticle.created_at)}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {(selectedArticle.category ? selectedArticle.category.split(",") : ["INSIGHT"]).map((cat, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-bold border rounded-full px-2.5 py-1 whitespace-nowrap uppercase shadow-sm ${getCategoryColor(cat.trim())}`}
                    >
                      {cat.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <h1 className="heading-display text-light-heading mb-8">
                {getLocalized(selectedArticle, "title", lang)}
              </h1>

              {getLocalized(selectedArticle, "description", lang) && (
                <p className="body-large text-light-body mb-8 border-l-2 border-primary pl-4">
                  {getLocalized(selectedArticle, "description", lang)}
                </p>
              )}

              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center heading-4 text-light-heading">
                  {selectedArticle.author_first_name?.charAt(0) || "U"}
                </div>
                <div className="body text-light-body">
                  <div className="text-light-heading font-bold">
                    {selectedArticle.author_first_name} {selectedArticle.author_last_name}
                  </div>
                  <div className="text-sm">Writer</div>
                </div>
              </div>
            </div>

            {selectedArticle.content_type !== "custom_html" && selectedArticle.image_url && (
              <div className="w-full mb-12 rounded-xl overflow-hidden bg-secondary shadow-sm border border-border/50">
                {selectedArticle.image_url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={selectedArticle.image_url} className="w-full h-full max-h-[60vh] object-contain bg-black/5" controls />
                ) : (
                  <img src={selectedArticle.image_url} alt={selectedArticle.title} className="w-full h-full max-h-[60vh] object-contain bg-black/5" />
                )}
              </div>
            )}

            {selectedArticle.content_type === "press_release" ? (
              (() => {
                const targetContent = lang === "en" && selectedArticle.content_en 
                  ? selectedArticle.content_en 
                  : selectedArticle.content || "";
                const prData = parsePressRelease(targetContent);
                return prData
                  ? <PressReleaseRenderer data={prData} className="" />
                  : <p className="text-light-body/50 italic">No content available.</p>;
              })()
            ) : selectedArticle.content_type === "custom_html" ? (
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: getLocalizedCustomHtml(selectedArticle, lang) || "<p><em>No content available.</em></p>" }}
              />
            ) : (
              <div className="body-large text-light-body leading-loose">
                {getLocalized(selectedArticle, "content", lang).split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-8 whitespace-pre-wrap">{paragraph}</p>
                ))}
              </div>
            )}
          </article>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;

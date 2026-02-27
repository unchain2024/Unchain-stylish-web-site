import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/language";

const heroText = {
  ja: {
    label: "ニュース＆インサイト",
    heading: "最新情報",
    description:
      "プロダクトアップデート、ソートリーダーシップ、企業ニュースなど、チームからの最新情報をお届けします。",
  },
  en: {
    label: "NEWS & INSIGHTS",
    heading: "Stay in the loop",
    description:
      "The latest from our team — product updates, thought leadership, and company news.",
  },
};

const newsArticles = {
  ja: [
    {
      date: "2026年2月24日",
      tags: ["プレスリリース", "注目"],
      title: "UNCHAINがプレシードラウンドで3,500万円を調達",
      excerpt:
        "East VenturesとANOBAKAが主導するプレシードラウンドで3,500万円を調達しました。AIを活用したプロジェクトマネジメントプラットフォーム「NEURON」の開発を加速してまいります。",
      url: "https://prtimes.jp/main/html/rd/p/000000001.000177392.html",
    },
    {
      date: "2025年11月12日",
      tags: [],
      title:
        "UNCHAIN CEO Christian Parkが日米協議会年次カンファレンス2025で登壇",
      excerpt:
        "共同創業者兼CEOのSunwoo \"Christian\" Parkが日米協議会の舞台に立ち、AIとスタートアップの未来について語りました。",
      url: "https://medium.com/@unchain_the_world/unchain-ceo-christian-park-takes-the-stage-at-u-s-japan-council-annual-conference-2025-d45b6a4a168b",
    },
    {
      date: "2025年11月12日",
      tags: [],
      title:
        "Microsoft for Startupsに公式採択 — クラウドの力でグローバル展開を加速",
      excerpt:
        "Microsoft for Startupsに公式採択され、Azureクラウドの力でグローバル展開を加速します。",
      url: "https://medium.com/@unchain_the_world/official-selection-for-microsoft-for-startups-advancing-globally-through-the-power-of-cloud-and-403ae4c0fd76",
    },
    {
      date: "2025年9月1日",
      tags: [],
      title: "NVIDIAインセプションプログラムに公式採択",
      excerpt:
        "NVIDIAインセプションプログラムへの参加が決定し、GPU技術を活用したAI開発を加速してまいります。",
      url: "https://medium.com/@unchain_the_world/unchain-officially-selected-for-the-nvidia-inception-program-2575d05568d8",
    },
  ],
  en: [
    {
      date: "FEB 24, 2026",
      tags: ["PRESS RELEASE", "FEATURED"],
      title: "UNCHAIN Raises ¥35 Million in Pre-Seed Round",
      excerpt:
        "UNCHAIN has raised ¥35 million in a pre-seed round led by East Ventures and ANOBAKA to accelerate the development of NEURON, our AI-powered project management platform.",
      url: "https://prtimes.jp/main/html/rd/p/000000001.000177392.html",
    },
    {
      date: "NOV 12, 2025",
      tags: [],
      title:
        "UNCHAIN CEO Christian Park Takes the Stage at U.S.–Japan Council Annual Conference 2025",
      excerpt:
        'Sunwoo "Christian" Park, Co-founder and CEO of UNCHAIN, took the stage at the U.S.–Japan Council to discuss AI and the future of startups.',
      url: "https://medium.com/@unchain_the_world/unchain-ceo-christian-park-takes-the-stage-at-u-s-japan-council-annual-conference-2025-d45b6a4a168b",
    },
    {
      date: "NOV 12, 2025",
      tags: [],
      title:
        "Official Selection for Microsoft for Startups — Advancing Globally Through the Power of Cloud",
      excerpt:
        "UNCHAIN has been officially selected for Microsoft for Startups, leveraging Azure cloud to accelerate global expansion.",
      url: "https://medium.com/@unchain_the_world/official-selection-for-microsoft-for-startups-advancing-globally-through-the-power-of-cloud-and-403ae4c0fd76",
    },
    {
      date: "SEP 1, 2025",
      tags: [],
      title: "Officially Selected for NVIDIA Inception Program",
      excerpt:
        "UNCHAIN joins the NVIDIA Inception Program to accelerate AI development with GPU technology.",
      url: "https://medium.com/@unchain_the_world/unchain-officially-selected-for-the-nvidia-inception-program-2575d05568d8",
    },
  ],
};

const NewsPage = () => {
  const { lang } = useLang();
  const hero = heroText[lang];
  const articles = newsArticles[lang];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section data-nav-theme="light" className="bg-background pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="w-full px-[5vw]">
          <ScrollReveal>
            <span className="text-[calc(1*var(--vf))] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {hero.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="text-[calc(3.5*var(--vf))] font-black text-foreground mt-[2vh] mb-[3vh]">
              {hero.heading}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[calc(1.15*var(--vf))] text-muted-foreground max-w-[45vw] leading-relaxed">
              {hero.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles */}
      <section data-nav-theme="light" className="bg-secondary pb-[10vh] pt-[4vh]">
        <div className="w-full px-[5vw]">
          {articles.map((article, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-[4vh]"
              >
                <div className="flex items-start gap-[3vw]">
                  {/* Number */}
                  <span className="text-[calc(3.5*var(--vf))] font-black text-muted-foreground/15 leading-none flex-shrink-0 w-[6vw]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-[0.8vw] mb-[1vh] flex-wrap">
                      <span className="text-[calc(0.9*var(--vf))] text-muted-foreground">
                        {article.date}
                      </span>
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[calc(0.75*var(--vf))] font-medium text-muted-foreground border border-border rounded-full px-3 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-[calc(1.75*var(--vf))] font-black text-foreground mb-[0.8vh] line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-[calc(1.15*var(--vf))] text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 pt-[3vh]">
                    <ArrowRight className="w-[1.5vw] h-[1.5vw] min-w-[1.2rem] min-h-[1.2rem] text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              </a>

              {i < articles.length - 1 && (
                <div className="border-t border-border" />
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsPage;

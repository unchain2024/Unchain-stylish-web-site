import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/language";

const heroText = {
  ja: {
    label: "ソリューション",
    heading: "ミッションに仕えるAI",
    description:
      "フラッグシッププロダクトからハンズオンコンサルティングまで、組織がより良い意思決定をより速く行うためのAI活用を支援します。",
  },
  en: {
    label: "SOLUTIONS",
    heading: "AI that serves\nyour mission",
    description:
      "From flagship products to hands-on consulting, we help organizations harness AI to make better decisions, faster.",
  },
};

interface Product {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  features: { title: string; desc: string }[];
  link: string;
}

const productsData: Record<string, Record<string, Product[]>> = {
  ja: {
    "AI SaaS": [
      {
        slug: "neuron",
        name: "NEURON",
        tagline: "PM意思決定の記録システム",
        desc: "NEURONは当社のフラッグシッププロダクトです。プロジェクトマネージャーとエンタープライズリーダーシップ向けに設計されたAI搭載の意思決定インテリジェンスプラットフォームで、組織知識を捕捉し、実行可能なインサイトを表面化させ、すべての重要な意思決定の生きた記録システムを構築します。",
        features: [
          { title: "意思決定インテリジェンス", desc: "組織全体からのシグナルを集約し、より良い意思決定のために適切な情報を適切なタイミングで表面化させます。" },
          { title: "ナレッジキャプチャ", desc: "会議、ドキュメント、ワークフローから組織の知識を自動的に捕捉し、見落としを防ぎます。" },
          { title: "エンタープライズセキュリティ", desc: "SOC 2準拠を念頭に構築。保存時と転送時の完全な暗号化で、データの所有権を保証します。" },
          { title: "シームレスな統合", desc: "Slack、Jira、Notion、Google Workspaceなどと接続。ワークフローを中断することなく導入できます。" },
        ],
        link: "https://neuron-website-self.vercel.app/",
      },
    ],
    "AI DX": [
      {
        slug: "consulting",
        name: "AIコンサルティング",
        tagline: "ハンズオンAIトランスフォーメーション",
        desc: "コンサルティングチームが組織と直接協力し、最もインパクトの高いAI機会を特定、カスタマイズされた戦略を設計、本番対応ソリューションを実装します。すべて数ヶ月ではなく数週間で。",
        features: [
          { title: "AI戦略＆ロードマップ", desc: "ワークフローを分析し、ボトルネックを特定、初日から価値を提供する段階的なAI導入計画を設計します。" },
          { title: "チームイネーブルメント", desc: "AIベストプラクティスのトレーニング、内部能力の構築、エンゲージメント後も持続可能な導入を保証します。" },
          { title: "ラピッドプロトタイピング", desc: "長い報告書の代わりに、チームが1週間以内にテストできるワーキングプロトタイプを構築。スケーリング前に価値を証明します。" },
        ],
        link: "https://the-aiadviser.com/",
      },
    ],
  },
  en: {
    "AI SaaS": [
      {
        slug: "neuron",
        name: "NEURON",
        tagline: "PM Decision System of Record",
        desc: "NEURON is our flagship product — an AI-powered decision intelligence platform designed for project managers and enterprise leadership. It captures organizational knowledge, surfaces actionable insights, and creates a living system of record for every critical decision.",
        features: [
          { title: "Decision Intelligence", desc: "Aggregates signals from across your organization to surface the right information at the right time for better decisions." },
          { title: "Knowledge Capture", desc: "Automatically captures institutional knowledge from meetings, documents, and workflows so nothing falls through the cracks." },
          { title: "Enterprise Security", desc: "Built with SOC 2 compliance in mind. Your data stays yours with full encryption at rest and in transit." },
          { title: "Seamless Integration", desc: "Connects with Slack, Jira, Notion, Google Workspace, and more — with zero workflow disruption." },
        ],
        link: "https://neuron-website-self.vercel.app/",
      },
    ],
    "AI DX": [
      {
        slug: "consulting",
        name: "AI Consulting",
        tagline: "Hands-on AI transformation",
        desc: "Our consulting team works hands-on with your organization to identify the highest-impact AI opportunities, design tailored strategies, and implement production-ready solutions — all in weeks, not months.",
        features: [
          { title: "AI Strategy & Roadmap", desc: "We analyze your workflows, identify bottlenecks, and design a phased AI adoption plan that delivers value from day one." },
          { title: "Team Enablement", desc: "We train your teams on AI best practices, build internal capability, and ensure sustainable adoption beyond our engagement." },
          { title: "Rapid Prototyping", desc: "Instead of lengthy reports, we build working prototypes your team can test within a week — proving value before scaling." },
        ],
        link: "https://the-aiadviser.com/",
      },
    ],
  },
};

const ctaText = {
  ja: {
    heading: "始める準備はできましたか？",
    description: "UNCHAINが組織のミッションにどう貢献できるか、お話しましょう。",
    cta: "お問い合わせ",
  },
  en: {
    heading: "Ready to get started?",
    description: "Let's explore how UNCHAIN can serve your organization's mission.",
    cta: "Contact Us",
  },
};

const learnMoreText = { ja: "詳しく見る", en: "Learn More" };

const SolutionsPage = () => {
  const { lang } = useLang();
  const hero = heroText[lang];
  const businessData = productsData[lang];
  const cta = ctaText[lang];
  const learnMore = learnMoreText[lang];

  const [activeProduct, setActiveProduct] = useState<string | null>(null);

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
            <h1 className="text-[calc(3.5*var(--vf))] font-black text-foreground mt-[2vh] mb-[3vh] whitespace-pre-line leading-[1.1]">
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

      {/* Products */}
      <section data-nav-theme="light" className="bg-background py-[10vh]">
        <div className="w-full px-[5vw]">
          {Object.entries(businessData).map(([group, items], gi) => (
            <div key={group} className="mb-[8vh] last:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-[3vw] items-start">
                {/* Category label */}
                <ScrollReveal delay={gi * 0.1}>
                  <div className="md:sticky md:top-24 text-[calc(1.5*var(--vf))] font-bold text-muted-foreground/30">
                    {group}
                  </div>
                </ScrollReveal>

                {/* Product rows */}
                <div>
                  {items.map((item, i) => (
                    <ScrollReveal key={item.slug} delay={gi * 0.1 + i * 0.1}>
                      <button
                        onClick={() => setActiveProduct(activeProduct === item.slug ? null : item.slug)}
                        className="w-full text-left"
                      >
                        <div className="group flex items-center gap-[1.5vw] w-full border-b border-border py-[3vh] cursor-pointer">
                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[calc(1.75*var(--vf))] font-black text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-[calc(1.15*var(--vf))] text-muted-foreground mt-[0.3vh]">
                              {item.tagline}
                            </p>
                          </div>

                          {/* Arrow toggle */}
                          <div
                            className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                              activeProduct === item.slug
                                ? "border-primary/40 text-primary rotate-90"
                                : "border-border text-muted-foreground/40 group-hover:border-primary/40 group-hover:text-primary group-hover:translate-x-1"
                            }`}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </button>

                      {/* Expandable detail panel */}
                      <AnimatePresence>
                        {activeProduct === item.slug && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="py-[3vh] pl-0 md:pl-[2vw]">
                              <div className="rounded-2xl border border-border/50 p-[2vw]">
                                <p className="text-[calc(1.15*var(--vf))] text-muted-foreground leading-relaxed mb-[3vh] max-w-2xl">
                                  {item.desc}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2vw] mb-[3vh]">
                                  {item.features.map((f, fi) => (
                                    <motion.div
                                      key={fi}
                                      initial={{ opacity: 0, y: 12 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: fi * 0.1 }}
                                    >
                                      <h4 className="text-[calc(1*var(--vf))] font-bold text-foreground mb-[0.5vh]">
                                        {f.title}
                                      </h4>
                                      <p className="text-[calc(0.9*var(--vf))] text-muted-foreground leading-relaxed">
                                        {f.desc}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>

                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-[calc(1*var(--vf))] font-medium hover:opacity-90 transition-all"
                                >
                                  {learnMore}
                                  <ArrowRight className="w-[1em] h-[1em]" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section data-nav-theme="light" className="bg-background py-[10vh]">
        <div className="w-full px-[5vw] text-center">
          <ScrollReveal>
            <h2 className="text-[calc(3.5*var(--vf))] font-black text-foreground mb-[2vh]">
              {cta.heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="text-[calc(1.15*var(--vf))] text-muted-foreground max-w-xl mx-auto mb-[4vh]">
              {cta.description}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-[calc(1*var(--vf))] font-medium hover:opacity-90 transition-all duration-300"
            >
              {cta.cta}
              <ArrowRight className="w-[1em] h-[1em]" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionsPage;

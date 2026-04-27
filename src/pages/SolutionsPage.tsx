import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/language";

const heroText = {
  ja: {
    label: "ソリューション",
    heading: "UNCHAINはどのような\nAIソリューションを提供しますか？",
    description:
      "AIが人に寄り添うとき、組織も個人も、本当に成し遂げたいことをUNCHAINできるようになります。",
  },
  en: {
    label: "SOLUTIONS",
    heading: "What AI Solutions\nDoes UNCHAIN Provide?",
    description:
      "When AI stands by people, it enables organizations and individuals to UNCHAIN what they truly set out to achieve.",
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
        link: "https://www.the-neuron.com/ja",
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
        link: "https://www.the-neuron.com/en",
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
  const { lang, localePath } = useLang();
  const hero = heroText[lang];
  const businessData = productsData[lang];
  const cta = ctaText[lang];
  const learnMore = learnMoreText[lang];

  const [searchParams] = useSearchParams();
  const [activeProduct, setActiveProduct] = useState<string | null>(
    searchParams.get("product")
  );

  useEffect(() => {
    const product = searchParams.get("product");
    if (product) {
      setActiveProduct(product);
      setTimeout(() => {
        document.getElementById(`product-${product}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [searchParams]);

  const faqSchemaData = Object.values(businessData).flat().map((item) => ({
    question: `What is ${item.name}?`,
    answer: item.desc,
  }));

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${hero.label} | UNCHAIN`} 
        description={hero.description}
        type="faq"
        faqData={faqSchemaData}
      />
      <Navigation />

      {/* Hero */}
      <section data-nav-theme="light" className="bg-background pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="container-site">
          <ScrollReveal>
            <span className="label text-light-label">
              {hero.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="heading-display text-light-heading mt-4 mb-6 whitespace-pre-line leading-[1.1]">
              {hero.heading}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="body-large text-light-body max-w-xl leading-relaxed">
              {hero.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Products */}
      <section data-nav-theme="light" className="bg-secondary section">
        <div className="container-site">
          {Object.entries(businessData).map(([group, items], gi) => (
            <div key={group} className="mb-20 last:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 lg:gap-8 items-start">
                {/* Category label */}
                <ScrollReveal delay={gi * 0.1}>
                  <div className="md:sticky md:top-24 heading-3 text-light-label">
                    {group}
                  </div>
                </ScrollReveal>

                {/* Product rows */}
                <div>
                  {items.map((item, i) => (
                    <ScrollReveal key={item.slug} delay={gi * 0.1 + i * 0.1}>
                      <button
                        id={`product-${item.slug}`}
                        onClick={() => setActiveProduct(activeProduct === item.slug ? null : item.slug)}
                        className="w-full text-left"
                      >
                        <div className="group flex items-center gap-4 w-full border-b border-border py-6 cursor-pointer">
                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <h3 className="heading-2 text-light-heading group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <p className="body-large text-light-body mt-1">
                              {item.tagline}
                            </p>
                          </div>

                          {/* Arrow toggle */}
                          <div
                            className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                              activeProduct === item.slug
                                ? "border-primary/40 text-primary rotate-90"
                                : "border-border text-light-label group-hover:border-primary/40 group-hover:text-primary group-hover:translate-x-1"
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
                            <div className="py-6 pl-0 md:pl-8">
                              <div className="card border border-border/50">
                                <p className="body-large text-light-body leading-relaxed mb-6 max-w-2xl">
                                  {item.desc}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                  {item.features.map((f, fi) => (
                                    <motion.div
                                      key={fi}
                                      initial={{ opacity: 0, y: 12 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: fi * 0.1 }}
                                    >
                                      <h4 className="body font-bold text-light-heading mb-1">
                                        {f.title}
                                      </h4>
                                      <p className="body text-light-body leading-relaxed">
                                        {f.desc}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>

                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-primary inline-flex items-center gap-2"
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
      <section data-nav-theme="dark" className="bg-black section">
        <div className="container-site text-center">
          <ScrollReveal>
            <h2 className="heading-1 text-dark-heading mb-4">
              {cta.heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="body-large text-dark-body max-w-xl mx-auto mb-8">
              {cta.description}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link
              to={localePath("/contact")}
              className="btn-primary !bg-white !text-black inline-flex items-center gap-2"
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

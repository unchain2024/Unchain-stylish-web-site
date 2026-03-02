import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/language";

const heroText = {
  ja: {
    label: "採用情報",
    heading: "私たちと未来を創ろう",
    description:
      "人々が本当に成し遂げたいことをUNCHAINするテクノロジーを作る、そんな志を持つチームを構築しています。",
  },
  en: {
    label: "CAREER",
    heading: "Build the future\nwith us",
    description:
      "We are building a team committed to making technology that UNCHAIN what people truly want to achieve.",
  },
};

const whyText = {
  ja: { label: "UNCHAINで働く理由", heading: "私たちの特徴" },
  en: { label: "WHY UNCHAIN", heading: "What makes us different" },
};

const whyCards = {
  ja: [
    { title: "ミッションドリブン", desc: "すべてのプロジェクトは、実際の組織と人々への影響で評価されます。虚栄心の指標ではありません。" },
    { title: "柔軟な働き方", desc: "東京とサンフランシスコにオフィスを構えるリモートファースト。最高のパフォーマンスを発揮できる場所で働いてください。" },
    { title: "充実したエクイティ", desc: "すべてのフルタイムメンバーに意味のあるエクイティを付与。共に成功します。" },
  ],
  en: [
    { title: "Mission-Driven Work", desc: "Every project is measured by its impact on real organizations and real people — not vanity metrics." },
    { title: "Flexible by Default", desc: "Remote-first with offices in Tokyo and San Francisco. Work where you do your best work." },
    { title: "Competitive Equity", desc: "Every full-time team member receives meaningful equity. We succeed together." },
  ],
};

type Department = "all" | "engineering" | "sales" | "management" | "design";

interface Job {
  id: string;
  title: string;
  department: string;
  departmentKey: Department;
  salary: string;
  location: string;
  type: string;
  japaneseRequired: boolean;
  description: string;
  whatYoullDo: string[];
  mustHave: string[];
  niceToHave: string[];
}

const jobsData: Record<string, Job[]> = {
  ja: [
    {
      id: "pm", title: "プロジェクトマネージャー", department: "マネジメント", departmentKey: "management",
      salary: "600万円〜1,000万円 + ストックオプション", location: "東京", type: "Full-time", japaneseRequired: true,
      description: "AIおよび自動化プロジェクトのデリバリーを統括し、クライアントの目標を達成可能なタスクに分解します。",
      whatYoullDo: ["プロジェクトのエンドツーエンド管理", "顧客の目標をチケットに変換", "アジャイルの実践運営"],
      mustHave: ["プロジェクト管理経験3年以上", "アジャイル/スクラムの知識", "日本語ネイティブ"],
      niceToHave: ["AIプロジェクトの経験", "英語力"],
    },
    {
      id: "ml", title: "機械学習エンジニア", department: "エンジニアリング", departmentKey: "engineering",
      salary: "600万円〜900万円", location: "東京 / リモート", type: "Full-time", japaneseRequired: false,
      description: "自動化・インテリジェンス機能の基盤となるMLシステムを構築します。",
      whatYoullDo: ["MLモデルの設計・実装", "データパイプラインの構築", "モデルの評価と改善"],
      mustHave: ["Python/PyTorchの実務経験", "MLシステムの構築経験", "コンピュータサイエンスの基礎"],
      niceToHave: ["LLMの実務経験", "プロダクション環境でのML運用経験"],
    },
    {
      id: "sec", title: "サイバーセキュリティエンジニア", department: "エンジニアリング", departmentKey: "engineering",
      salary: "600万円〜1,000万円", location: "東京 / リモート", type: "Full-time", japaneseRequired: false,
      description: "セキュリティはプロダクトの中核であり、後付けではありません。",
      whatYoullDo: ["セキュリティアーキテクチャの設計", "脆弱性診断と対策", "セキュリティポリシーの策定"],
      mustHave: ["セキュリティエンジニアリング経験3年以上", "クラウドセキュリティの知識", "セキュリティフレームワークの理解"],
      niceToHave: ["CISSP等の資格", "AI/MLセキュリティの知識"],
    },
    {
      id: "sales-head", title: "セールス責任者", department: "セールス", departmentKey: "sales",
      salary: "500万円〜800万円 + コミッション + ストックオプション", location: "東京", type: "Full-time", japaneseRequired: true,
      description: "パイプラインの構築から戦略的案件のクロージングまで、収益を統括します。",
      whatYoullDo: ["営業戦略の策定・実行", "パイプラインの構築・管理", "重要案件のクロージング"],
      mustHave: ["BtoB営業経験5年以上", "チームマネジメント経験", "日本語ネイティブ"],
      niceToHave: ["SaaS営業の経験", "AI関連の知識"],
    },
    {
      id: "sales-assoc", title: "セールスアソシエイト", department: "セールス", departmentKey: "sales",
      salary: "300万円〜600万円", location: "東京", type: "Full-time", japaneseRequired: true,
      description: "パイプラインのエンジンとして、見込み客の発掘と営業活動を推進します。",
      whatYoullDo: ["見込み客の発掘・アプローチ", "デモの実施", "CRMの管理"],
      mustHave: ["営業経験1年以上", "コミュニケーション能力", "日本語ネイティブ"],
      niceToHave: ["BtoB SaaS営業の経験", "英語力"],
    },
    {
      id: "design", title: "デザイン責任者", department: "デザイン", departmentKey: "design",
      salary: "400万円〜700万円", location: "東京", type: "Full-time", japaneseRequired: true,
      description: "プロダクト、ブランド、顧客に届けるすべてにおいて、UNCHAINのルック&フィールを定義します。",
      whatYoullDo: ["プロダクトデザインのリード", "ブランドガイドラインの策定", "ユーザーリサーチの実施"],
      mustHave: ["UIデザイン経験5年以上", "Figmaの実務経験", "日本語ネイティブ"],
      niceToHave: ["SaaSプロダクトのデザイン経験", "フロントエンド開発の知識"],
    },
  ],
  en: [
    {
      id: "pm", title: "Project Manager", department: "Management", departmentKey: "management",
      salary: "$40K – $65K + Stock Options", location: "Tokyo", type: "Full-time", japaneseRequired: true,
      description: "You'll own delivery across our AI and automation projects, turning customer goals into actionable tasks.",
      whatYoullDo: ["Lead projects end-to-end", "Turn customer goals into tickets", "Run agile rituals"],
      mustHave: ["3+ years project management experience", "Agile/Scrum knowledge", "Native Japanese"],
      niceToHave: ["Experience with AI projects", "English proficiency"],
    },
    {
      id: "ml", title: "Machine Learning Engineer", department: "Engineering", departmentKey: "engineering",
      salary: "$40K – $60K", location: "Tokyo / Remote", type: "Full-time", japaneseRequired: false,
      description: "You'll build the ML systems behind our automation and intelligence features.",
      whatYoullDo: ["Design and implement ML models", "Build data pipelines", "Evaluate and improve models"],
      mustHave: ["Production Python/PyTorch experience", "ML system building experience", "CS fundamentals"],
      niceToHave: ["LLM experience", "Production ML ops experience"],
    },
    {
      id: "sec", title: "Cybersecurity Engineer", department: "Engineering", departmentKey: "engineering",
      salary: "$40K – $65K", location: "Tokyo / Remote", type: "Full-time", japaneseRequired: false,
      description: "Security is a core part of our product, not an afterthought.",
      whatYoullDo: ["Design security architecture", "Conduct vulnerability assessments", "Define security policies"],
      mustHave: ["3+ years security engineering", "Cloud security knowledge", "Security framework understanding"],
      niceToHave: ["CISSP or similar certifications", "AI/ML security knowledge"],
    },
    {
      id: "sales-head", title: "Head of Sales", department: "Sales", departmentKey: "sales",
      salary: "$35K – $55K + Commission + Stock Options", location: "Tokyo", type: "Full-time", japaneseRequired: true,
      description: "You'll own revenue from pipeline building to closing strategic deals.",
      whatYoullDo: ["Define and execute sales strategy", "Build and manage pipeline", "Close key deals"],
      mustHave: ["5+ years B2B sales experience", "Team management experience", "Native Japanese"],
      niceToHave: ["SaaS sales experience", "AI domain knowledge"],
    },
    {
      id: "sales-assoc", title: "Sales Associate", department: "Sales", departmentKey: "sales",
      salary: "$20K – $40K", location: "Tokyo", type: "Full-time", japaneseRequired: true,
      description: "You'll be the engine behind our pipeline, discovering prospects and driving sales activity.",
      whatYoullDo: ["Prospect discovery and outreach", "Conduct demos", "Manage CRM"],
      mustHave: ["1+ years sales experience", "Strong communication skills", "Native Japanese"],
      niceToHave: ["B2B SaaS sales experience", "English proficiency"],
    },
    {
      id: "design", title: "Head of Design", department: "Design", departmentKey: "design",
      salary: "$25K – $45K", location: "Tokyo", type: "Full-time", japaneseRequired: true,
      description: "You'll define what UNCHAIN looks and feels like across product, brand, and everything we ship.",
      whatYoullDo: ["Lead product design", "Define brand guidelines", "Conduct user research"],
      mustHave: ["5+ years UI design experience", "Production Figma experience", "Native Japanese"],
      niceToHave: ["SaaS product design experience", "Frontend development knowledge"],
    },
  ],
};

const filtersText = {
  ja: { all: "すべて", engineering: "エンジニアリング", sales: "セールス", management: "マネジメント", design: "デザイン" },
  en: { all: "All", engineering: "Engineering", sales: "Sales", management: "Management", design: "Design" },
};

const rolesText = {
  ja: { label: "募集中のポジション", heading: "あなたの役割を見つけよう" },
  en: { label: "OPEN ROLES", heading: "Find your role" },
};

const processText = {
  ja: { label: "選考プロセス", heading: "採用の流れ" },
  en: { label: "SELECTION PROCESS", heading: "How we hire" },
};

const processSteps = {
  ja: [
    { step: "01", title: "書類選考", desc: "履歴書とUNCHAINに興味を持った理由を簡潔にお送りください。" },
    { step: "02", title: "カジュアル面談", desc: "チームメンバーとの30分間の会話で、お互いを知りましょう。" },
    { step: "03", title: "創業者面談＆オファー", desc: "創業者とお会いいただきます。フィットすれば、48時間以内に結果をお伝えします。" },
  ],
  en: [
    { step: "01", title: "Application", desc: "Submit your resume and a brief note about what excites you about UNCHAIN." },
    { step: "02", title: "Intro Call", desc: "A 30-minute conversation with a team member to learn about each other." },
    { step: "03", title: "Founder Meeting & Offer", desc: "Meet a founder. If it's a fit, expect a decision within 48 hours." },
  ],
};

const ctaText = {
  ja: {
    heading: "該当するポジションがない場合",
    description: "常に優秀な人材を探しています。UNCHAINにどのような貢献ができるか、ぜひお聞かせください。",
    cta: "お問い合わせ",
  },
  en: {
    heading: "Don't see your role?",
    description: "We're always looking for exceptional people. Reach out and tell us what you'd bring to UNCHAIN.",
    cta: "Get in Touch",
  },
};

const detailLabels = {
  ja: { whatYoullDo: "業務内容", mustHave: "必須スキル", niceToHave: "歓迎スキル", apply: "このポジションに応募する", jpRequired: "日本語必須" },
  en: { whatYoullDo: "What you'll do", mustHave: "Must-have", niceToHave: "Nice to have", apply: "Apply for this role", jpRequired: "Japanese Required" },
};

const CareerPage = () => {
  const { lang, localePath } = useLang();
  const hero = heroText[lang];
  const why = whyText[lang];
  const cards = whyCards[lang];
  const roles = rolesText[lang];
  const filters = filtersText[lang];
  const jobs = jobsData[lang];
  const process = processText[lang];
  const steps = processSteps[lang];
  const cta = ctaText[lang];
  const labels = detailLabels[lang];

  const [filter, setFilter] = useState<Department>("all");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applyingFor, setApplyingFor] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", role: "", coverNote: "", privacy: false });

  const filteredJobs = filter === "all" ? jobs : jobs.filter((j) => j.departmentKey === filter);

  const openApplyForm = (job: Job) => {
    setApplyingFor(job.id);
    setSubmitted(false);
    setForm({ name: "", email: "", role: job.title, coverNote: "", privacy: false });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "dadc5e81-7afc-4929-bcbb-a92765419252",
          subject: `Job Application: ${form.role} — ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          role: form.role,
          cover_note: form.coverNote,
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else alert(data.message || "Something went wrong. Please try again.");
    } catch {
      alert("Failed to submit application. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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

      {/* Why UNCHAIN */}
      <section data-nav-theme="light" className="bg-secondary section">
        <div className="container-site">
          <ScrollReveal>
            <span className="label text-light-label">
              {why.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="heading-1 text-light-heading mt-3 mb-12 lg:mb-16">
              {why.heading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.15}>
                <div className="card h-full border border-border/50 hover:border-border transition-colors duration-300">
                  <h3 className="heading-3 text-light-heading mb-4">
                    {card.title}
                  </h3>
                  <p className="body-large text-light-body leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section data-nav-theme="light" className="bg-background section">
        <div className="container-site">
          <ScrollReveal>
            <span className="label text-light-label">
              {roles.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="heading-1 text-light-heading mt-3 mb-8">
              {roles.heading}
            </h2>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-8">
              {(Object.keys(filters) as Department[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-5 py-2.5 rounded-full body font-medium transition-all duration-300 ${
                    filter === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-light-body hover:bg-muted border border-border/50"
                  }`}
                >
                  {filters[key]}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Job list */}
          <div className="space-y-4">
            {filteredJobs.map((job, i) => {
              const isExpanded = expandedJob === job.id;
              return (
                <ScrollReveal key={job.id} delay={i * 0.05}>
                  <motion.div
                    layout
                    className="border border-border/50 rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer hover:border-border"
                    onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                  >
                    <div className="p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center gap-4">
                      <span className="body font-bold text-light-label shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="body-large font-bold text-light-heading">
                            {job.title}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-light-body border border-border/50">
                            {job.department}
                          </span>
                          {job.japaneseRequired && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                              {labels.jpRequired}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 label text-light-label">
                          <span>{job.location}</span>
                          <span>{job.type}</span>
                          <span className="font-medium text-primary/70">{job.salary}</span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
                      >
                        <svg className="w-5 h-5 text-light-label" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0 border-t border-border">
                            <div className="pt-4 space-y-6">
                              <p className="body text-light-body leading-relaxed">
                                {job.description}
                              </p>

                              <div>
                                <p className="label text-primary/60 mb-3">
                                  {labels.whatYoullDo}
                                </p>
                                <ul className="space-y-1.5">
                                  {job.whatYoullDo.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 body text-light-body leading-relaxed">
                                      <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full shrink-0 bg-primary/30" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="label text-primary/60 mb-3">
                                  {labels.mustHave}
                                </p>
                                <ul className="space-y-1.5">
                                  {job.mustHave.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 body text-light-body leading-relaxed">
                                      <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full shrink-0 bg-primary/30" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="label text-light-label mb-3">
                                  {labels.niceToHave}
                                </p>
                                <ul className="space-y-1.5">
                                  {job.niceToHave.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 body text-light-label leading-relaxed">
                                      <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full shrink-0 bg-muted-foreground/20" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <button
                                onClick={(e) => { e.stopPropagation(); openApplyForm(job); }}
                                className="btn-primary inline-flex items-center gap-2 mt-3"
                              >
                                {labels.apply}
                                <ArrowRight className="w-[1em] h-[1em]" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Apply form */}
          <AnimatePresence>
            {applyingFor && (
              <motion.div
                ref={formRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mt-8"
              >
                <div className="card border border-border">
                  {submitted ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/10 border border-primary/20">
                        <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="heading-2 text-light-heading mb-3">
                        {lang === "ja" ? "応募を受け付けました" : "Application received"}
                      </h3>
                      <p className="body-large text-light-body">
                        {lang === "ja" ? "ご応募ありがとうございます。5営業日以内に選考結果をご連絡いたします。" : "Thank you for applying. We'll review your application and get back to you within 5 business days."}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="heading-3 text-light-heading">
                          {lang === "ja" ? "このポジションに応募" : "Apply for this position"}
                        </h3>
                        <button onClick={() => setApplyingFor(null)} className="text-light-body hover:text-light-heading transition-colors">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                          <div>
                            <label className="block label text-light-label mb-3">
                              {lang === "ja" ? "氏名" : "Full Name"} <span className="text-primary">*</span>
                            </label>
                            <input
                              type="text" required value={form.name}
                              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                              placeholder={lang === "ja" ? "お名前" : "Your full name"}
                              className="w-full bg-transparent border-0 border-b-2 border-border pb-3 body-large text-light-heading outline-none transition-all duration-300 placeholder:text-muted-foreground/30 focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block label text-light-label mb-3">
                              {lang === "ja" ? "メールアドレス" : "Email"} <span className="text-primary">*</span>
                            </label>
                            <input
                              type="email" required value={form.email}
                              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                              placeholder="you@email.com"
                              className="w-full bg-transparent border-0 border-b-2 border-border pb-3 body-large text-light-heading outline-none transition-all duration-300 placeholder:text-muted-foreground/30 focus:border-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block label text-light-label mb-3">
                            {lang === "ja" ? "カバーレター" : "Cover Note"}
                          </label>
                          <textarea
                            value={form.coverNote}
                            onChange={(e) => setForm((p) => ({ ...p, coverNote: e.target.value }))}
                            placeholder={lang === "ja" ? "このポジションに興味を持った理由をお聞かせください..." : "Tell us why you're interested in this role..."}
                            rows={4}
                            className="w-full bg-transparent border-0 border-b-2 border-border pb-3 body-large text-light-heading outline-none transition-all duration-300 resize-none placeholder:text-muted-foreground/30 focus:border-primary"
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative mt-0.5">
                              <input type="checkbox" required checked={form.privacy}
                                onChange={(e) => setForm((p) => ({ ...p, privacy: e.target.checked }))}
                                className="sr-only" />
                              <div className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center ${
                                form.privacy ? "border-primary bg-primary/20" : "border-border group-hover:border-foreground/30"
                              }`}>
                                {form.privacy && (
                                  <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <span className="body text-light-label group-hover:text-light-body transition-colors">
                              {lang === "ja" ? "個人情報の取り扱いに同意します" : "I agree to the handling of my personal information"}
                            </span>
                          </label>

                          <button
                            type="submit" disabled={sending}
                            className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {sending ? (
                              <>
                                <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground/80 rounded-full animate-spin" />
                                {lang === "ja" ? "送信中..." : "Submitting..."}
                              </>
                            ) : (
                              <>
                                {lang === "ja" ? "応募する" : "Submit Application"}
                                <ArrowRight className="w-[1em] h-[1em]" />
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Process */}
      <section data-nav-theme="light" className="bg-secondary section">
        <div className="container-site">
          <ScrollReveal>
            <span className="label text-light-label">
              {process.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="heading-1 text-light-heading mt-3 mb-12 lg:mb-16">
              {process.heading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.15}>
                <div className="relative">
                  <div className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-2xl flex items-center justify-center mb-4 border border-border bg-muted/30">
                    <span className="body-large font-bold text-primary">{step.step}</span>
                  </div>
                  <h3 className="heading-3 text-light-heading mb-3">
                    {step.title}
                  </h3>
                  <p className="body-large text-light-body leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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

export default CareerPage;

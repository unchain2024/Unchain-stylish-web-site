import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  Database,
  Lock,
  Workflow,
  Compass,
  Map,
  GraduationCap,
  Zap,
  Layers,
  Target,
  Cpu,
  Check,
} from "lucide-react";
import { useLang } from "@/lib/language";
import { PageHero, Heading, Reveal, CtaBand, toolLogos } from "@/components/yapp/chrome";

const copy = {
  ja: {
    hero: { label: "ソリューション", title: "UNCHAINのAIソリューション", sub: "フラッグシップのNEURONを中心に、コンサルティングからプラットフォーム開発まで。組織のミッションに合わせて選べます。" },
    neuron: {
      tag: "フラッグシップ・サービス",
      name: "NEURON",
      tagline: "PM意思決定の記録システム",
      desc: "NEURONはUNCHAINのフラッグシップサービスです。プロジェクトマネージャーと経営層のために設計された、AIによる意思決定インテリジェンス基盤。組織の知識をキャプチャし、実用的なインサイトを提示し、重要な意思決定の「生きた記録」を残します。",
      features: [
        { t: "意思決定インテリジェンス", d: "組織横断のシグナルを集約し、より良い意思決定のために最適なタイミングで必要な情報を提示します。", Icon: BrainCircuit },
        { t: "ナレッジキャプチャ", d: "会議・ドキュメント・ワークフローから組織知を自動で蓄積。こぼれ落ちる情報をなくします。", Icon: Database },
        { t: "エンタープライズセキュリティ", d: "SOC 2準拠を前提に設計。保存時・通信時ともに完全暗号化。データの所有権はあなたに。", Icon: Lock },
        { t: "シームレスな連携", d: "Slack・Jira・Notion・Google Workspaceなど既存ツールと、業務を妨げず接続します。", Icon: Workflow },
      ],
    },
    consulting: {
      tag: "AI DX",
      name: "AI Consulting",
      desc: "コンサルティングチームが現場に入り込み、最もインパクトの大きいAI機会を特定。戦略を設計し、本番運用可能なソリューションを実装します。数か月ではなく、数週間で。",
      caps: [
        { t: "AI戦略・ロードマップ", d: "ワークフローを分析しボトルネックを特定。初日から価値を生む段階的な導入計画を設計します。", Icon: Map },
        { t: "チームの内製化支援", d: "AIのベストプラクティスを教え、社内能力を構築。私たちの関与後も続く定着を実現します。", Icon: GraduationCap },
        { t: "高速プロトタイピング", d: "長大なレポートではなく、1週間で試せる動くプロトタイプを。スケール前に価値を証明します。", Icon: Zap },
      ],
    },
    pillars: {
      label: "私たちの提供価値",
      heading: "UNCHAINが行うこと",
      items: [
        { t: "AIプラットフォーム開発", d: "データパイプラインから意思決定支援システムまで、カスタムAIプラットフォームを構築します。", Icon: Layers },
        { t: "戦略コンサルティング", d: "ハイインパクトなAI機会の特定、導入ロードマップ、リスクの最小化を支援します。", Icon: Target },
        { t: "業界特化プロダクト", d: "NEURONをはじめ、特定業界向けに作り込まれた目的特化型AIを提供します。", Icon: Cpu },
      ],
    },
    integrations: {
      label: "連携",
      heading: "既存のツールとシームレスに連携",
      sub: "NEURONは日々の業務を妨げず、使い慣れたツールと接続します。",
      tools: ["Slack", "Jira", "Notion", "Google Workspace"],
    },
    learnMore: "詳しく見る",
  },
  en: {
    hero: { label: "Solutions", title: "UNCHAIN's AI solutions", sub: "Led by our flagship NEURON — from consulting to platform development. Pick what fits your organization's mission." },
    neuron: {
      tag: "Flagship service",
      name: "NEURON",
      tagline: "PM Decision System of Record",
      desc: "NEURON is UNCHAIN's flagship service — an AI-powered decision-intelligence platform built for project managers and enterprise leadership. It captures organizational knowledge, surfaces actionable insights, and creates a living system of record for every critical decision.",
      features: [
        { t: "Decision Intelligence", d: "Aggregates signals from across your organization to surface the right information at the right time for better decisions.", Icon: BrainCircuit },
        { t: "Knowledge Capture", d: "Automatically captures institutional knowledge from meetings, documents, and workflows so nothing falls through the cracks.", Icon: Database },
        { t: "Enterprise-Grade Security", d: "Built for SOC 2 with full encryption at rest and in transit. Your data stays yours.", Icon: Lock },
        { t: "Seamless Integration", d: "Connects with Slack, Jira, Notion, Google Workspace, and more — with zero workflow disruption.", Icon: Workflow },
      ],
    },
    consulting: {
      tag: "AI DX",
      name: "AI Consulting",
      desc: "Our consulting team works hands-on with your organization to identify the highest-impact AI opportunities, design tailored strategies, and implement production-ready solutions — all in weeks, not months.",
      caps: [
        { t: "AI Strategy & Roadmap", d: "We analyze your workflows, identify bottlenecks, and design a phased adoption plan that delivers value from day one.", Icon: Map },
        { t: "Team Enablement", d: "We train your teams on AI best practices and build internal capability that lasts beyond our engagement.", Icon: GraduationCap },
        { t: "Rapid Prototyping", d: "Instead of lengthy reports, we build working prototypes you can test within a week — proving value before scaling.", Icon: Zap },
      ],
    },
    pillars: {
      label: "What we offer",
      heading: "What UNCHAIN does",
      items: [
        { t: "AI Platform Development", d: "Custom AI platforms, from data pipelines to decision-support systems.", Icon: Layers },
        { t: "Strategy Consulting", d: "High-impact AI opportunity identification, adoption roadmaps, and de-risking.", Icon: Target },
        { t: "Industry-Specific Products", d: "Purpose-built AI for specific verticals, including NEURON.", Icon: Cpu },
      ],
    },
    integrations: {
      label: "Integrations",
      heading: "Connects seamlessly with your tools",
      sub: "NEURON plugs into the tools you already use, without disrupting your workflow.",
      tools: ["Slack", "Jira", "Notion", "Google Workspace"],
    },
    learnMore: "Learn more",
  },
} as const;

export default function YappSolutions() {
  const { lang, localePath } = useLang();
  const t = copy[lang];

  return (
    <>
      <PageHero label={t.hero.label} title={t.hero.title} subtitle={t.hero.sub} />

      {/* NEURON */}
      <section id="neuron" className="yapp-section scroll-mt-28">
        <div className="yapp-container">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <span className="yapp-pill mb-5">{t.neuron.tag}</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t.neuron.name}</h2>
              <div className="mt-2 text-lg font-semibold text-[#00a9e0]">{t.neuron.tagline}</div>
              <p className="mt-5 yapp-secondary leading-relaxed">{t.neuron.desc}</p>
              <Link to={localePath("/yapp/contact")} className="yapp-btn yapp-btn-primary mt-8">
                {lang === "ja" ? "デモを依頼する" : "Request a demo"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {t.neuron.features.map((f, i) => (
                <Reveal key={f.t} i={i}>
                  <div className="yapp-card yapp-card-hover h-full p-6">
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                      <f.Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold leading-snug">{f.t}</h3>
                    <p className="mt-2 text-sm yapp-secondary leading-relaxed">{f.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Consulting */}
      <section id="consulting" className="yapp-section yapp-section-alt scroll-mt-28">
        <div className="yapp-container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="yapp-pill mb-5">{t.consulting.tag}</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t.consulting.name}</h2>
            <p className="mt-4 yapp-secondary leading-relaxed">{t.consulting.desc}</p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {t.consulting.caps.map((c, i) => (
              <Reveal key={c.t} i={i}>
                <div className="yapp-card yapp-card-hover h-full p-7">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{c.t}</h3>
                  <p className="mt-2 text-sm yapp-secondary leading-relaxed">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="platform" className="yapp-section scroll-mt-28">
        <div className="yapp-container">
          <Heading label={t.pillars.label}>{t.pillars.heading}</Heading>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {t.pillars.items.map((p, i) => (
              <Reveal key={p.t} i={i}>
                <div className="yapp-card yapp-card-hover h-full p-8">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                    <p.Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{p.t}</h3>
                  <p className="mt-2 text-sm yapp-secondary leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="yapp-section yapp-section-alt">
        <div className="yapp-container">
          <Heading label={t.integrations.label} sub={t.integrations.sub}>{t.integrations.heading}</Heading>
          <Reveal className="mt-12">
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
              {t.integrations.tools.map((tool) => (
                <span key={tool} className="inline-flex items-center gap-2.5 rounded-lg border border-[#e0e3ea] bg-white px-4 py-2.5 text-sm font-medium">
                  {toolLogos[tool] ? (
                    <img src={toolLogos[tool]} alt={tool} className="h-5 w-5 object-contain" loading="lazy" />
                  ) : (
                    <Check className="h-4 w-4 text-[#00a9e0]" />
                  )}
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

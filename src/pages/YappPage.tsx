import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  BrainCircuit,
  Blocks,
  Globe,
  ShieldCheck,
  Check,
  Menu,
  X,
  Award,
  ChevronDown,
  Cpu,
  Compass,
  Layers,
  Target,
  Zap,
  Lock,
  GraduationCap,
  Workflow,
  MessageSquare,
  FileText,
  Database,
  Users,
  Building2,
  Mail,
} from "lucide-react";
import { useLang } from "@/lib/language";
import { toolLogos } from "@/components/yapp/chrome";
import "@/styles/yapp.css";

import logoBlack from "@/assets/logo-black.webp";
import awsLogo from "@/assets/partners/aws.webp";
import microsoftLogo from "@/assets/partners/microsoft.webp";
import cicLogo from "@/assets/partners/cic.webp";
import jstarxLogo from "@/assets/partners/jstarx.webp";
import ibiLogo from "@/assets/partners/ibi.webp";
import nvidiaLogo from "@/assets/partners/nvidia.webp";
import ucbLogo from "@/assets/partners/ucberkeley.png";
import r1 from "@/assets/recruiting-1.webp";
import r2 from "@/assets/recruiting-2.webp";
import r3 from "@/assets/recruiting-3.webp";
import r5 from "@/assets/recruiting-5.webp";
import r6 from "@/assets/recruiting-6.webp";
import r7 from "@/assets/recruiting-7.webp";
import founderSunwoo from "@/assets/founder-sunwoo.webp";
import founderLui from "@/assets/founder-lui.webp";
import founderTaizo from "@/assets/founder-taizo.webp";

/* ─────────────────────────── content (bilingual, sourced from UNCHAIN_REFERENCE.md) ─────────────────────────── */
const copy = {
  ja: {
    announce: { text: "UNCHAINがプレシードで3500万円を調達（East Ventures・ANOBAKA）", cta: "詳しく見る" },
    nav: {
      about: "UNCHAINとは",
      mission: "ミッション",
      solutions: "ソリューション",
      features: "特徴",
      team: "チーム",
      cases: "活用例",
      news: "ニュース",
      careers: "採用",
      contact: "お問い合わせ",
    },
    navSolutionsMenu: [
      { name: "NEURON", desc: "PM意思決定の記録システム", to: "/yapp/solutions" },
      { name: "AI Consulting", desc: "実践的なAIトランスフォーメーション", to: "/yapp/solutions" },
      { name: "AI Platform 開発", desc: "データ基盤から意思決定支援まで", to: "/yapp/solutions" },
    ],
    langToggle: "EN",
    requestDemo: "お問い合わせ",
    secondaryCta: "私たちについて",
    hero: {
      eyebrow: "組織型AI（A.O.I）",
      lead: "組織のミッションを",
      highlight: "解き放つ",
      tail: "AI",
      subtitle:
        "すべての組織には解放すべき重要な使命があると私たちは信じています。技術はその使命に仕えるべきであり、それを置き換えるべきではありません。",
      ctaPrimary: "お問い合わせ",
      ctaSecondary: "ソリューションを見る",
      trustLine: "世界トップクラスのパートナーに支えられています",
      stats: [
        { value: "2025", label: "東京で創業" },
        { value: "¥35M", label: "プレシード調達（East Ventures・ANOBAKA）" },
        { value: "Tokyo · SF", label: "リモートファースト、2拠点" },
      ],
    },
    partnersHeading: "世界トップクラスのパートナーに支えられています",
    about: {
      label: "UNCHAINについて",
      heading: "私たちは、組織のためのAIをつくる会社です",
      lead: "UNCHAINは「世界をUNCHAINする」を使命に、組織型AI（A.O.I）を構築するスタートアップです。NEURONをはじめとするプロダクトとコンサルティングで、組織のミッションを解き放ちます。",
      cards: [
        { title: "A.O.I — 組織型AI", desc: "Artificial Organizational Intelligence。組織を理解するAIを構築しています。", Icon: BrainCircuit },
        { title: "私たちのビジョン", desc: "企業のデジタルツインを創り出すために。", Icon: Cpu },
        { title: "すべては日本から", desc: "東京を拠点に、世界へ。すべては日本から始まります。", Icon: Globe },
      ],
    },
    crew: {
      label: "リーダーシップ",
      heading: "UNCHAINのクルー",
      sub: "国境を越えたバックグラウンドを持つ共同創業者たち。",
      members: [
        { name: "朴 善優", role: "Co-Founder & CEO", bio: "人工知能分野で豊富な経験を持つ起業家。AIスタートアップを共同創業し、国内でいち早くプロンプトハッキングの手法を実証。東京大学松尾研究室にも携わる。" },
        { name: "蛯名 瑠偉", role: "Co-Founder & CTO", bio: "中学卒業後すぐに業界へスカウト。NTT西日本の全国規模データパイプラインや、政府記録をデジタル化するB2B基盤を主導してきたエンジニアリングリーダー。" },
        { name: "原田 大蔵", role: "Co-Founder & COO", bio: "15歳でアウトドア用品会社を設立し4年でM&A。高校時代に渡米し、Fortune 500主催のピッチで複数回優勝。Protivitiでのインターン経験を持つ。" },
      ],
    },
    dei: {
      label: "DE&I",
      heading: "多様性は、私たちの土台です",
      sub: "ダイバーシティ・エクイティ・インクルージョンは、私たちの構築・採用・運営の前提です。",
      items: [
        { t: "Diversity", d: "日本・米国をまたぐ国際的なチーム。最高のアイデアは多様な視点から生まれます。" },
        { t: "Equity", d: "公正で透明性のある報酬体系。背景に関わらず機会は平等に。" },
        { t: "Inclusion", d: "誰もが歓迎され、尊重され、力を発揮できる場所を。心理的安全性は革新の前提です。" },
        { t: "Commitment", d: "採用・報酬・文化を定期的に見直し、改善し続けます。" },
      ],
    },
    lineup: {
      label: "ソリューション",
      heading: "UNCHAINのソリューション",
      sub: "フラッグシップのNEURONを中心とするプロダクトと、実践的なAIコンサルティング。組織に合わせて選べます。",
      items: [
        { tag: "フラッグシップ", name: "NEURON", desc: "UNCHAINのフラッグシップサービス。PM意思決定の記録システムとして、組織の知識をキャプチャします。", Icon: BrainCircuit },
        { tag: "AI DX", name: "AI Consulting", desc: "実践的なAIトランスフォーメーション。数か月ではなく数週間で本番導入へ。", Icon: Compass },
        { tag: "Platform", name: "AI Platform 開発", desc: "データパイプラインから意思決定支援システムまで、カスタムAI基盤を構築。", Icon: Layers },
        { tag: "Strategy", name: "Strategy Consulting", desc: "ハイインパクトなAI機会の特定、導入ロードマップ、リスクの最小化。", Icon: Target },
        { tag: "Vertical", name: "Industry Products", desc: "特定業界向けに作り込まれた目的特化型AI（NEURONを含む）。", Icon: Cpu },
      ],
    },
    blocks: {
      label: "機能・特徴",
      heading: "UNCHAINでできること",
      sub: "プロダクトとコンサルティング、そして私たちの原則。組織に合わせて段階的に導入できます。",
      groups: [
        {
          name: "NEURON",
          tagline: "意思決定インテリジェンス",
          items: [
            { t: "意思決定インテリジェンス", d: "組織横断のシグナルを集約し、最適なタイミングで必要な情報を提示。" },
            { t: "ナレッジキャプチャ", d: "会議・ドキュメント・ワークフローから知見を自動で蓄積。" },
            { t: "エンタープライズセキュリティ", d: "SOC 2準拠を前提に設計。保存時・通信時ともに暗号化。" },
            { t: "シームレスな連携", d: "Slack・Jira・Notion・Google Workspaceと既存業務を妨げず接続。" },
          ],
        },
        {
          name: "AI Consulting",
          tagline: "数週間で価値を",
          items: [
            { t: "AI戦略・ロードマップ", d: "ワークフローを分析し、初日から価値を生む段階的な導入計画を設計。" },
            { t: "チームの内製化支援", d: "ベストプラクティスを教え、社内に持続可能な能力を構築。" },
            { t: "高速プロトタイピング", d: "長大なレポートではなく、1週間で試せる動くプロトタイプを。" },
            { t: "本番導入", d: "数か月ではなく数週間で、本番運用可能なソリューションを実装。" },
          ],
        },
        {
          name: "Why UNCHAIN",
          tagline: "選ばれる理由",
          items: [
            { t: "組織に合わせたAI導入", d: "規模や課題に合わせた柔軟なAI。段階導入で確実な成果。" },
            { t: "資産として保有", d: "「所有権」での構築。カスタマイズ・拡張が自在。" },
            { t: "全国で相互利用", d: "パートナーになると全国のUNCHAINソリューションを相互利用可能。" },
            { t: "維持管理は不要", d: "運用・保守の悩みとは無縁。滞在ごとのチャージも不要。" },
          ],
        },
        {
          name: "Principles",
          tagline: "私たちの原則",
          items: [
            { t: "Mission-First", d: "すべての判断をミッションに照らす。売上も成長も技術も手段。" },
            { t: "Radical Clarity", d: "率直かつ正確に伝える。曖昧さはチームを遅くする。" },
            { t: "Build to Last", d: "場当たり的な解決ではなく、信頼でき保守できる解を。" },
            { t: "Human at the Center", d: "AIは人を置き換えるのではなく、人の能力を拡張するために。" },
          ],
        },
      ],
    },
    stats: {
      heading: "数字で見るUNCHAIN",
      items: [
        { value: "6", label: "メンバー（業務委託含む）" },
        { value: "3", label: "共同創業者" },
        { value: "7", label: "世界トップクラスのパートナー" },
        { value: "2", label: "拠点（東京・サンフランシスコ）" },
      ],
    },
    cases: {
      label: "活用例",
      heading: "UNCHAINの活用シーン",
      sub: "組織が抱える課題に対し、NEURONとコンサルティングがどう応えるか。",
      items: [
        { tag: "意思決定", title: "PMの意思決定を、すべて記録に残す", desc: "なぜその判断に至ったのか。背景・前提・根拠をNEURONがキャプチャし、組織の記憶として残します。" },
        { tag: "スピード", title: "数か月ではなく、数週間でAIを立ち上げる", desc: "高速プロトタイピングで、スケール前に価値を証明。動くものを1週間で。" },
        { tag: "オーナーシップ", title: "AIを「資産」として保有する", desc: "所有権ベースの構築だから、カスタマイズも拡張も自在。維持管理の悩みもありません。" },
      ],
    },
    integrations: {
      label: "連携",
      heading: "既存のツールとシームレスに連携",
      sub: "NEURONは日々の業務を妨げず、使い慣れたツールと接続します。",
      groups: [
        { cat: "コミュニケーション", tools: ["Slack"] },
        { cat: "プロジェクト管理", tools: ["Jira"] },
        { cat: "ナレッジ", tools: ["Notion"] },
        { cat: "生産性", tools: ["Google Workspace"] },
      ],
    },
    news: {
      label: "ニュース",
      heading: "最新ニュース",
      viewAll: "一覧を見る",
      pinned: {
        category: "プレスリリース",
        date: "2026年2月25日",
        title: "UNCHAIN、プレシードラウンドで3500万円の資金調達を実施",
        desc: "East VenturesおよびANOBAKAをリード投資家として、3500万円を調達しました。",
      },
      secondary: [
        { category: "ブログ", title: "組織型AI（A.O.I）という考え方", desc: "なぜ私たちは「組織を理解するAI」を作るのか。" },
        { category: "ニュース", title: "UNCHAINのこれまでとこれから", desc: "MediumとnoteでUNCHAINの最新情報を発信しています。" },
      ],
    },
    resources: {
      label: "ダウンロード資料",
      heading: "資料・お役立ちコンテンツ",
      sub: "UNCHAINやNEURONについてさらに詳しく。",
      items: [
        { tag: "会社情報", title: "UNCHAINについて", desc: "ミッション、ビジョン、そしてA.O.Iという考え方。", to: "/yapp/about" },
        { tag: "プロダクト", title: "NEURON ソリューション", desc: "PM意思決定の記録システムの詳細はこちら。", to: "/yapp/solutions" },
        { tag: "ニュース", title: "最新のお知らせ", desc: "プレスリリースやブログ記事をまとめてチェック。", to: "/yapp/news" },
      ],
    },
    ctaBlocks: {
      heading: "次の一歩を、一緒に",
      items: [
        { tag: "お問い合わせ", title: "UNCHAINで組織を解き放つ", desc: "AIがあなたのミッションにどう貢献できるか、お話ししましょう。", cta: "お問い合わせ", to: "/yapp/contact", Icon: MessageSquare },
        { tag: "採用", title: "一緒にUNCHAIN THE WORLD", desc: "ミッションドリブンな仲間を募集しています。", cta: "採用情報を見る", to: "/yapp/careers", Icon: Users },
        { tag: "会社情報", title: "私たちについて知る", desc: "UNCHAINのチームと考え方をご紹介します。", cta: "私たちについて", to: "/yapp/about", Icon: Building2 },
      ],
    },
    footer: {
      tagline: "組織型AI（A.O.I）の力で世界をUNCHAINする",
      cols: [
        { title: "ソリューション", links: [ { t: "NEURON", to: "/yapp/solutions" }, { t: "AI Consulting", to: "/yapp/solutions" }, { t: "AI Platform 開発", to: "/yapp/solutions" }, { t: "Strategy Consulting", to: "/yapp/solutions" } ] },
        { title: "会社情報", links: [ { t: "私たちについて", to: "/yapp/about" }, { t: "ミッション", to: "/yapp/about" }, { t: "採用情報", to: "/yapp/careers" }, { t: "お問い合わせ", to: "/yapp/contact" } ] },
        { title: "リソース", links: [ { t: "ニュース", to: "/yapp/news" }, { t: "ブログ", to: "/yapp/news" }, { t: "活用例", to: "/yapp" } ] },
        { title: "ポリシー", links: [ { t: "プライバシーポリシー", to: "/yapp/privacy" }, { t: "利用規約", to: "/yapp/terms" } ] },
      ],
      companyHeading: "会社概要",
      company: [
        ["企業名", "UNCHAIN株式会社"],
        ["代表取締役社長", "朴 善優"],
        ["設立", "2025年7月"],
        ["所在地", "東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F-C"],
      ],
      copyright: "© 2026 UNCHAIN株式会社 All rights reserved.",
    },
  },
  en: {
    announce: { text: "UNCHAIN raises ¥35M in Pre-Seed (East Ventures & ANOBAKA)", cta: "Read more" },
    nav: {
      about: "About",
      mission: "Mission",
      solutions: "Solutions",
      features: "Features",
      team: "Team",
      cases: "Use Cases",
      news: "News",
      careers: "Careers",
      contact: "Contact",
    },
    navSolutionsMenu: [
      { name: "NEURON", desc: "PM Decision System of Record", to: "/yapp/solutions" },
      { name: "AI Consulting", desc: "Hands-on AI transformation", to: "/yapp/solutions" },
      { name: "AI Platform Development", desc: "From data pipelines to decisions", to: "/yapp/solutions" },
    ],
    langToggle: "日本語",
    requestDemo: "Get in Touch",
    secondaryCta: "About Us",
    hero: {
      eyebrow: "Organizational AI (A.O.I)",
      lead: "AI that ",
      highlight: "unchains",
      tail: " your mission",
      subtitle:
        "We believe every organization has a crucial mission to unchain. Technology should serve that mission, not replace it.",
      ctaPrimary: "Get in Touch",
      ctaSecondary: "Explore Solutions",
      trustLine: "Backed by world-class partners",
      stats: [
        { value: "2025", label: "Founded in Tokyo, Japan" },
        { value: "¥35M", label: "Pre-Seed (East Ventures & ANOBAKA)" },
        { value: "Tokyo · SF", label: "Remote-first, two hubs" },
      ],
    },
    partnersHeading: "Backed by world-class partners",
    about: {
      label: "About UNCHAIN",
      heading: "We're a company building AI for organizations",
      lead: "UNCHAIN is a startup on a mission to UNCHAIN THE WORLD, building Organizational AI (A.O.I). Through products like NEURON and hands-on consulting, we unchain what your organization is here to do.",
      cards: [
        { title: "A.O.I — Organizational AI", desc: "Artificial Organizational Intelligence — AI that ultimately understands the organization.", Icon: BrainCircuit },
        { title: "Our Vision", desc: "To create the digital twin of the company.", Icon: Cpu },
        { title: "Born in Japan", desc: "Based in Tokyo, building for the world. Everything starts from Japan.", Icon: Globe },
      ],
    },
    crew: {
      label: "Leadership",
      heading: "Meet the UNCHAIN crew",
      sub: "Co-founders with backgrounds that cross borders.",
      members: [
        { name: "Sunwoo Park", role: "Co-Founder & CEO", bio: "Seasoned entrepreneur with a strong AI background. Co-founded an AI startup and was among the earliest to demonstrate prompt-hacking techniques. Worked with the Matsuo Lab at the University of Tokyo." },
        { name: "Lui Ebina", role: "Co-Founder & CTO", bio: "Recruited into the industry straight out of school. Built nationwide data pipelines for NTT West Japan and a B2B platform digitizing government records, from concept to production." },
        { name: "Taizo Harada", role: "Co-Founder & COO", bio: "Founded an outdoor-goods company at 15 and exited in four years. Moved to the US in high school, winning multiple Fortune 500 pitch competitions. Previously interned at Protiviti." },
      ],
    },
    dei: {
      label: "DE&I",
      heading: "Diversity is a foundation, not an initiative",
      sub: "Diversity, equity, and inclusion are foundations of how we build, hire, and operate.",
      items: [
        { t: "Diversity", d: "An international team spanning Japan and the US. The best ideas emerge from diverse viewpoints." },
        { t: "Equity", d: "Fair, transparent compensation. Equal access to opportunity regardless of background." },
        { t: "Inclusion", d: "A place where every person is welcomed, respected, and empowered. Psychological safety is a prerequisite for innovation." },
        { t: "Commitment", d: "We regularly review hiring, pay equity, and culture — and keep improving." },
      ],
    },
    lineup: {
      label: "Solutions",
      heading: "The UNCHAIN solutions",
      sub: "Our flagship NEURON, a family of products, and hands-on AI consulting — pick what fits your organization.",
      items: [
        { tag: "Flagship", name: "NEURON", desc: "UNCHAIN's flagship service. A PM Decision System of Record that captures organizational knowledge.", Icon: BrainCircuit },
        { tag: "AI DX", name: "AI Consulting", desc: "Hands-on AI transformation — production-ready in weeks, not months.", Icon: Compass },
        { tag: "Platform", name: "AI Platform Development", desc: "Custom AI platforms, from data pipelines to decision-support systems.", Icon: Layers },
        { tag: "Strategy", name: "Strategy Consulting", desc: "High-impact AI opportunity identification, adoption roadmaps, and de-risking.", Icon: Target },
        { tag: "Vertical", name: "Industry Products", desc: "Purpose-built AI for specific verticals, including NEURON.", Icon: Cpu },
      ],
    },
    blocks: {
      label: "Features",
      heading: "What you can do with UNCHAIN",
      sub: "Products, consulting, and the principles behind them — adopted step by step to fit your organization.",
      groups: [
        {
          name: "NEURON",
          tagline: "Decision intelligence",
          items: [
            { t: "Decision Intelligence", d: "Aggregates signals across your org to surface the right information at the right time." },
            { t: "Knowledge Capture", d: "Automatically captures knowledge from meetings, documents, and workflows." },
            { t: "Enterprise-Grade Security", d: "Designed for SOC 2, with full encryption at rest and in transit." },
            { t: "Seamless Integration", d: "Connects with Slack, Jira, Notion, and Google Workspace with zero disruption." },
          ],
        },
        {
          name: "AI Consulting",
          tagline: "Value in weeks",
          items: [
            { t: "AI Strategy & Roadmap", d: "We analyze workflows and design a phased plan that delivers value from day one." },
            { t: "Team Enablement", d: "We train your teams and build sustainable internal capability." },
            { t: "Rapid Prototyping", d: "Working prototypes you can test within a week — not lengthy reports." },
            { t: "Production-Ready", d: "Implement production-ready solutions in weeks, not months." },
          ],
        },
        {
          name: "Why UNCHAIN",
          tagline: "Why teams choose us",
          items: [
            { t: "AI adoption tailored to you", d: "Flexible AI matched to your scale and challenges, with reliable step-by-step results." },
            { t: "Own it as an asset", d: "Built with full ownership, so you can customize and extend freely." },
            { t: "Access UNCHAIN nationwide", d: "As a partner, mutually access UNCHAIN solutions across the country." },
            { t: "Zero maintenance", d: "No operational headaches, and no per-session charges." },
          ],
        },
        {
          name: "Principles",
          tagline: "Our principles",
          items: [
            { t: "Mission-First", d: "Every decision is weighed against our mission. Revenue, growth, and tech are means." },
            { t: "Radical Clarity", d: "We communicate with directness and precision. Ambiguity slows teams down." },
            { t: "Build to Last", d: "Durable, reliable, maintainable solutions over quick fixes." },
            { t: "Human at the Center", d: "AI exists to augment human capability, not replace it." },
          ],
        },
      ],
    },
    stats: {
      heading: "UNCHAIN by the numbers",
      items: [
        { value: "6", label: "Team members (incl. contractors)" },
        { value: "3", label: "Co-founders" },
        { value: "7", label: "World-class partners" },
        { value: "2", label: "Hubs (Tokyo & San Francisco)" },
      ],
    },
    cases: {
      label: "Use Cases",
      heading: "Where UNCHAIN goes to work",
      sub: "How NEURON and our consulting answer the problems organizations actually face.",
      items: [
        { tag: "Decisions", title: "Keep a record of every PM decision", desc: "Why did you decide what you decided? NEURON captures the context, assumptions, and evidence as organizational memory." },
        { tag: "Speed", title: "Stand up AI in weeks, not months", desc: "Prove value before you scale with rapid prototyping — something working in a week." },
        { tag: "Ownership", title: "Own your AI as an asset", desc: "Ownership-based builds mean you can customize and extend freely, with no maintenance headaches." },
      ],
    },
    integrations: {
      label: "Integrations",
      heading: "Connects seamlessly with your tools",
      sub: "NEURON plugs into the tools you already use, without disrupting your workflow.",
      groups: [
        { cat: "Communication", tools: ["Slack"] },
        { cat: "Project Management", tools: ["Jira"] },
        { cat: "Knowledge", tools: ["Notion"] },
        { cat: "Productivity", tools: ["Google Workspace"] },
      ],
    },
    news: {
      label: "News",
      heading: "Latest news",
      viewAll: "View all",
      pinned: {
        category: "Press Release",
        date: "Feb 25, 2026",
        title: "UNCHAIN Raises ¥35 Million in Pre-Seed Round",
        desc: "UNCHAIN has raised ¥35 million in a pre-seed round led by East Ventures and ANOBAKA.",
      },
      secondary: [
        { category: "Blog", title: "What we mean by Organizational AI (A.O.I)", desc: "Why we build AI that understands the organization." },
        { category: "News", title: "UNCHAIN, so far and ahead", desc: "We share our latest updates on Medium and note." },
      ],
    },
    resources: {
      label: "Resources",
      heading: "Resources & guides",
      sub: "Learn more about UNCHAIN and NEURON.",
      items: [
        { tag: "Company", title: "About UNCHAIN", desc: "Our mission, vision, and the idea of A.O.I.", to: "/yapp/about" },
        { tag: "Product", title: "The NEURON solution", desc: "Dig into the PM Decision System of Record.", to: "/yapp/solutions" },
        { tag: "News", title: "Latest announcements", desc: "Press releases and blog posts in one place.", to: "/yapp/news" },
      ],
    },
    ctaBlocks: {
      heading: "Let's take the next step together",
      items: [
        { tag: "Contact", title: "Unchain your organization", desc: "Let's talk about how AI can serve your mission.", cta: "Get in Touch", to: "/yapp/contact", Icon: MessageSquare },
        { tag: "Careers", title: "Let's UNCHAIN THE WORLD", desc: "We're hiring mission-driven people.", cta: "View Careers", to: "/yapp/careers", Icon: Users },
        { tag: "Company", title: "Get to know us", desc: "Meet the UNCHAIN team and how we think.", cta: "About Us", to: "/yapp/about", Icon: Building2 },
      ],
    },
    footer: {
      tagline: "Unchaining the world through the power of Organizational AI (A.O.I).",
      cols: [
        { title: "Solutions", links: [ { t: "NEURON", to: "/yapp/solutions" }, { t: "AI Consulting", to: "/yapp/solutions" }, { t: "AI Platform Development", to: "/yapp/solutions" }, { t: "Strategy Consulting", to: "/yapp/solutions" } ] },
        { title: "Company", links: [ { t: "About Us", to: "/yapp/about" }, { t: "Mission", to: "/yapp/about" }, { t: "Careers", to: "/yapp/careers" }, { t: "Contact", to: "/yapp/contact" } ] },
        { title: "Resources", links: [ { t: "News", to: "/yapp/news" }, { t: "Blog", to: "/yapp/news" }, { t: "Use Cases", to: "/yapp" } ] },
        { title: "Policies", links: [ { t: "Privacy Policy", to: "/yapp/privacy" }, { t: "Terms of Use", to: "/yapp/terms" } ] },
      ],
      companyHeading: "Company",
      company: [
        ["Company", "UNCHAIN Co., Ltd."],
        ["CEO", "Sunwoo Park"],
        ["Established", "July 2025"],
        ["Address", "2F-C Shibuya Dogenzaka Tokyu Bldg, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo"],
      ],
      copyright: "© 2026 UNCHAIN Co., Ltd. All rights reserved.",
    },
  },
} as const;

const partners = [
  { name: "AWS Startups", logo: awsLogo },
  { name: "Microsoft for Startups", logo: microsoftLogo },
  { name: "CIC", logo: cicLogo },
  { name: "J-StarX", logo: jstarxLogo },
  { name: "IBI", logo: ibiLogo },
  { name: "NVIDIA", logo: nvidiaLogo },
  { name: "UC Berkeley", logo: ucbLogo },
];
const galleryPhotos = [r1, r2, r3, r5, r6, r7];
const crewPhotos = [founderSunwoo, founderLui, founderTaizo];
const blockIcons = [BrainCircuit, Compass, ShieldCheck, Target];
const blockSubIcons = [Zap, Database, Lock, Workflow, GraduationCap, Blocks, Globe, Check];

/* ─────────────────────────── motion helper ─────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Reveal({ children, i = 0, className = "" }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className={className}>
      {children}
    </motion.div>
  );
}

function Heading({ label, sub, children }: { label?: string; sub?: string; children: React.ReactNode }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      {label && (
        <span className="yapp-pill mb-5">
          <Sparkles className="h-3.5 w-3.5" />
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{children}</h2>
      {sub && <p className="mt-4 yapp-secondary leading-relaxed">{sub}</p>}
    </Reveal>
  );
}

/* ─────────────────────────── page ─────────────────────────── */
const YappPage = () => {
  const { lang, localePath } = useLang();
  const t = copy[lang];

  return (
    <>
        {/* ── Hero ── */}
        <section id="top" className="relative pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="yapp-container grid lg:grid-cols-2 items-center gap-12">
            <div>
              <Reveal>
                <span className="yapp-pill">
                  <span className="yapp-dot" />
                  {t.hero.eyebrow}
                </span>
              </Reveal>
              <Reveal i={1} className="mt-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
                  {t.hero.lead}
                  <span className="yapp-grad">{t.hero.highlight}</span>
                  {t.hero.tail}
                </h1>
              </Reveal>
              <Reveal i={2} className="mt-6">
                <p className="text-lg yapp-secondary max-w-xl leading-relaxed">{t.hero.subtitle}</p>
              </Reveal>
              <Reveal i={3} className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to={localePath("/yapp/contact")} className="yapp-btn yapp-btn-primary">
                  {t.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#solutions" className="yapp-btn yapp-btn-ghost">
                  {t.hero.ctaSecondary}
                </a>
              </Reveal>
              <Reveal i={4} className="mt-9">
                <div className="grid grid-cols-3 gap-4 border-t border-[#e0e3ea] pt-6">
                  {t.hero.stats.map((s) => (
                    <div key={s.label}>
                      <div className="yapp-stat-value text-xl md:text-2xl">{s.value}</div>
                      <div className="mt-1 text-[11px] leading-snug yapp-secondary">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <HeroVisual lang={lang} />
          </div>
        </section>

        {/* ── Partners marquee ── */}
        <section className="yapp-section-alt border-y border-[#e0e3ea] py-12">
          <p className="yapp-secondary mb-8 text-center text-sm font-medium">{t.partnersHeading}</p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <motion.div className="yapp-marquee gap-4" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
              {[...partners, ...partners].map((p, i) => (
                <div key={i} className="flex h-16 w-44 shrink-0 items-center justify-center rounded-[10px] border border-[#e0e3ea] bg-white px-6 shadow-[0_8px_24px_-18px_rgba(28,36,56,0.25)]">
                  <img src={p.logo} alt={p.name} className="max-h-8 max-w-[80%] object-contain" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Mission ── */}
        <section id="mission" className="yapp-section">
          <div className="yapp-container grid lg:grid-cols-2 items-center gap-12">
            <Reveal>
              <span className="yapp-pill mb-5">{lang === "ja" ? "私たちの使命" : "Our Mission"}</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{lang === "ja" ? "UNCHAINのミッション" : "UNCHAIN Your Mission"}</h2>
              <p className="mt-6 yapp-secondary leading-relaxed max-w-lg">
                {lang === "ja"
                  ? "世界中の人々や組織が、それぞれのミッションを解き放つためのテクノロジーを構築しています。新たな発明、発見、そして創造の波を生み出し、より多くの可能性がある世界を形作るために。"
                  : "We are building technology that enables people and organizations around the globe to unchain their own missions — to unlock new inventions, discoveries, and waves of creativity, and shape a world where more is possible."}
              </p>
              <Link to={localePath("/yapp/about")} className="yapp-btn yapp-btn-ghost mt-8">
                {lang === "ja" ? "私たちについて" : "Learn more about us"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal i={1}>
              <div className="relative">
                <div className="absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-2xl" style={{ background: "radial-gradient(circle, rgba(0,169,224,0.18), transparent 70%)" }} />
                <div className="yapp-card overflow-hidden p-2">
                  <video src="/mission-video.mp4" autoPlay loop muted playsInline className="aspect-[4/3] w-full rounded-[6px] object-cover" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── About UNCHAIN (A.O.I concept) ── */}
        <section id="about" className="yapp-section yapp-section-alt">
          <div className="yapp-container">
            <Heading label={t.about.label} sub={t.about.lead}>{t.about.heading}</Heading>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {t.about.cards.map((c, i) => (
                <Reveal key={c.title} i={i}>
                  <div className="yapp-card yapp-card-hover h-full p-8 text-center">
                    <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                      <c.Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold">{c.title}</h3>
                    <p className="mt-2 text-sm yapp-secondary leading-relaxed">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Product lineup ── */}
        <section id="solutions" className="yapp-section">
          <div className="yapp-container">
            <Heading label={t.lineup.label} sub={t.lineup.sub}>{t.lineup.heading}</Heading>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.lineup.items.map((s, i) => (
                <Reveal key={s.name} i={i}>
                  <Link to={`${localePath("/yapp/solutions")}?product=${s.name.toLowerCase()}`} className="yapp-card yapp-card-hover group flex h-full flex-col p-7">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="grid h-11 w-11 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                        <s.Icon className="h-5 w-5" />
                      </div>
                      <span className="yapp-pill">{s.tag}</span>
                    </div>
                    <h3 className="text-xl font-bold">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm yapp-secondary leading-relaxed">{s.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00a9e0]">
                      {lang === "ja" ? "詳しく見る" : "Learn more"}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature blocks (4 groups × 4 sub-features) ── */}
        <section id="features" className="yapp-section yapp-section-alt">
          <div className="yapp-container">
            <Heading label={t.blocks.label} sub={t.blocks.sub}>{t.blocks.heading}</Heading>
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {t.blocks.groups.map((g, gi) => {
                const Icon = blockIcons[gi];
                return (
                  <Reveal key={g.name} i={gi}>
                    <div className="yapp-card h-full p-7">
                      <div className="mb-6 flex items-center gap-4 border-b border-[#e0e3ea] pb-5">
                        <div className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold leading-tight">{g.name}</h3>
                          <p className="text-xs yapp-secondary">{g.tagline}</p>
                        </div>
                      </div>
                      <ul className="space-y-4">
                        {g.items.map((it, ii) => {
                          const SubIcon = blockSubIcons[(gi * 4 + ii) % blockSubIcons.length];
                          return (
                            <li key={it.t} className="flex gap-3">
                              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#f4f5f7] text-[#00a9e0]">
                                <SubIcon className="h-3.5 w-3.5" />
                              </span>
                              <div>
                                <div className="text-sm font-semibold">{it.t}</div>
                                <div className="text-sm yapp-secondary leading-relaxed">{it.d}</div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Stats band ── */}
        <section className="yapp-stats-band">
          <div className="yapp-container">
            <Reveal>
              <h2 className="text-center text-2xl md:text-3xl font-bold text-white">{t.stats.heading}</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
              {t.stats.items.map((s, i) => (
                <Reveal key={s.label} i={i} className="text-center">
                  <div className="text-3xl md:text-5xl font-bold text-white">{s.value}</div>
                  <div className="mt-2 text-sm text-white/70 leading-snug">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership / Crew ── */}
        <section id="team" className="yapp-section">
          <div className="yapp-container">
            <Heading label={t.crew.label} sub={t.crew.sub}>{t.crew.heading}</Heading>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {t.crew.members.map((m, i) => (
                <Reveal key={m.name} i={i}>
                  <div className="yapp-card yapp-card-hover h-full overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden bg-[#f4f5f7]">
                      <img src={crewPhotos[i]} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold">{m.name}</h3>
                      <div className="mt-0.5 text-sm font-semibold text-[#00a9e0]">{m.role}</div>
                      <p className="mt-3 text-sm yapp-secondary leading-relaxed">{m.bio}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases (substitute for case studies) ── */}
        <section id="cases" className="yapp-section yapp-section-alt">
          <div className="yapp-container">
            <Heading label={t.cases.label} sub={t.cases.sub}>{t.cases.heading}</Heading>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {t.cases.items.map((c, i) => (
                <Reveal key={c.title} i={i}>
                  <div className="yapp-card yapp-card-hover flex h-full flex-col overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <img src={galleryPhotos[i]} alt="" loading="lazy" className="h-full w-full object-cover" />
                      <span className="yapp-pill absolute left-4 top-4 bg-white/90">{c.tag}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-base font-bold leading-snug">{c.title}</h3>
                      <p className="mt-2 flex-1 text-sm yapp-secondary leading-relaxed">{c.desc}</p>
                      <Link to={localePath("/yapp/solutions")} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00a9e0]">
                        {lang === "ja" ? "詳しく見る" : "Learn more"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Integrations ── */}
        <section className="yapp-section">
          <div className="yapp-container">
            <Heading label={t.integrations.label} sub={t.integrations.sub}>{t.integrations.heading}</Heading>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {t.integrations.groups.map((g, i) => (
                <Reveal key={g.cat} i={i}>
                  <div className="yapp-card h-full p-6">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#00a9e0]">{g.cat}</div>
                    <div className="yapp-rule my-4" />
                    <div className="flex flex-wrap gap-2">
                      {g.tools.map((tool) => (
                        <span key={tool} className="inline-flex items-center gap-2 rounded-lg border border-[#e0e3ea] bg-white px-3 py-1.5 text-sm font-medium">
                          {toolLogos[tool] ? (
                            <img src={toolLogos[tool]} alt={tool} className="h-5 w-5 object-contain" loading="lazy" />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00a9e0]" />
                          )}
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── News + Resources ── */}
        <section id="news" className="yapp-section yapp-section-alt">
          <div className="yapp-container">
            <div className="flex items-end justify-between">
              <Reveal>
                <span className="yapp-pill mb-4">{t.news.label}</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.news.heading}</h2>
              </Reveal>
              <Link to={localePath("/yapp/news")} className="hidden items-center gap-1.5 text-sm font-semibold text-[#00a9e0] sm:inline-flex">
                {t.news.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {/* pinned */}
              <Reveal className="lg:col-span-2">
                <Link to={localePath("/yapp/news")} className="yapp-card yapp-card-hover flex h-full flex-col justify-between gap-6 p-8 md:flex-row md:items-center">
                  <div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-[#00a9e0] px-2.5 py-1 font-semibold text-white">{t.news.pinned.category}</span>
                      <span className="yapp-muted">{t.news.pinned.date}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold leading-snug md:text-2xl">{t.news.pinned.title}</h3>
                    <p className="mt-3 yapp-secondary leading-relaxed">{t.news.pinned.desc}</p>
                  </div>
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#00a9e0]/10 text-[#00a9e0]">
                    <ArrowUpRight className="h-6 w-6" />
                  </div>
                </Link>
              </Reveal>
              {/* secondary list */}
              <div className="flex flex-col gap-6">
                {t.news.secondary.map((n, i) => (
                  <Reveal key={n.title} i={i + 1} className="flex-1">
                    <Link to={localePath("/yapp/news")} className="yapp-card yapp-card-hover flex h-full flex-col p-6">
                      <span className="text-xs font-semibold text-[#00a9e0]">{n.category}</span>
                      <h3 className="mt-2 text-base font-bold leading-snug">{n.title}</h3>
                      <p className="mt-2 text-sm yapp-secondary leading-relaxed">{n.desc}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Resources */}
            <Reveal className="mt-16">
              <div className="flex items-end justify-between">
                <div>
                  <span className="yapp-pill mb-4">{t.resources.label}</span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t.resources.heading}</h2>
                  <p className="mt-3 yapp-secondary">{t.resources.sub}</p>
                </div>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {t.resources.items.map((rsc, i) => (
                <Reveal key={rsc.title} i={i}>
                  <Link to={localePath(rsc.to)} className="yapp-card yapp-card-hover group flex h-full flex-col p-6">
                    <div className="mb-4 grid h-10 w-10 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-[#00a9e0]">{rsc.tag}</span>
                    <h3 className="mt-1 text-base font-bold leading-snug">{rsc.title}</h3>
                    <p className="mt-2 flex-1 text-sm yapp-secondary leading-relaxed">{rsc.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00a9e0]">
                      {lang === "ja" ? "見る" : "Open"}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Careers gallery + DE&I ── */}
        <section id="careers" className="yapp-section">
          <div className="yapp-container grid lg:grid-cols-2 items-center gap-12">
            <Reveal>
              <span className="yapp-pill mb-5">{lang === "ja" ? "採用情報" : "Join Us"}</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{lang === "ja" ? "一緒にUNCHAIN THE WORLDしよう" : "Let's UNCHAIN THE WORLD together"}</h2>
              <p className="mt-6 yapp-secondary leading-relaxed max-w-xl">
                {lang === "ja"
                  ? "私たちはテクノロジーのためにテクノロジーを作るのではありません。新たな発明、発見、そして創造の波を生み出し、より多くの可能性がある世界を形作るために構築しています。"
                  : "We do not create technology for its own sake. We build it to unlock new inventions, discoveries, and waves of creativity — and to help shape a world where more is possible."}
              </p>
              <Link to={localePath("/yapp/careers")} className="yapp-btn yapp-btn-primary mt-8">
                {lang === "ja" ? "採用情報を見る" : "View Careers"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal i={1}>
              <div className="grid grid-cols-3 gap-3">
                {galleryPhotos.map((src, i) => (
                  <div key={i} className={`overflow-hidden rounded-[10px] border border-[#e0e3ea] ${i % 2 ? "translate-y-4" : ""}`}>
                    <img src={src} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* DE&I */}
          <div className="yapp-container mt-20">
            <Reveal>
              <span className="yapp-pill mb-4">{t.dei.label}</span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{t.dei.heading}</h2>
              <p className="mt-3 max-w-2xl yapp-secondary leading-relaxed">{t.dei.sub}</p>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {t.dei.items.map((it, i) => (
                <Reveal key={it.t} i={i}>
                  <div className="yapp-card h-full p-6">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#00a9e0]">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className="mt-2 text-base font-bold">{it.t}</h3>
                    <p className="mt-2 text-sm yapp-secondary leading-relaxed">{it.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Triple CTA blocks ── */}
        <section id="contact" className="yapp-section yapp-section-alt">
          <div className="yapp-container">
            <Heading>{t.ctaBlocks.heading}</Heading>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {t.ctaBlocks.items.map((c, i) => (
                <Reveal key={c.title} i={i}>
                  <div className="yapp-cta-card group flex h-full flex-col p-8">
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-[10px] bg-white/15 text-white">
                      <c.Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-white/70">{c.tag}</span>
                    <h3 className="mt-1 text-xl font-bold text-white">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/80">{c.desc}</p>
                    <Link to={localePath(c.to)} className="mt-6 inline-flex items-center gap-2 rounded-[5px] bg-white px-5 py-2.5 text-sm font-bold text-[#1c2438] transition-transform group-hover:-translate-y-0.5">
                      {c.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

    </>
  );
};

/* ─────────────────────────── hero visual ─────────────────────────── */
function HeroVisual({ lang }: { lang: "ja" | "en" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const rows =
    lang === "ja"
      ? [
          { t: "組織の知識 — 蓄積中", w: "92%" },
          { t: "意思決定の記録 — 1,284件", w: "74%" },
          { t: "ミッション整合性 — 94%", w: "94%" },
        ]
      : [
          { t: "Organizational knowledge — capturing", w: "92%" },
          { t: "Decisions on record — 1,284", w: "74%" },
          { t: "Mission alignment — 94%", w: "94%" },
        ];

  return (
    <Reveal i={2} className="relative">
      <div ref={ref} className="relative">
        <div className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl" style={{ background: "radial-gradient(circle at 50% 40%, rgba(0,169,224,0.16), transparent 65%)" }} />
        <div className="yapp-card p-5">
          <div className="flex items-center gap-2 pb-4">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
            <span className="yapp-muted ml-3 text-xs">A.O.I · {lang === "ja" ? "組織型AI" : "Organizational AI"}</span>
          </div>
          <div className="yapp-rule mb-4" />
          <div className="space-y-4">
            {rows.map((r, i) => (
              <div key={i}>
                <div className="mb-1 text-xs yapp-secondary">{r.t}</div>
                <div className="h-2 overflow-hidden rounded-full bg-[#eef1f9]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#23b3e3] to-[#00a9e0]"
                    initial={{ width: 0 }}
                    animate={inView ? { width: r.w } : {}}
                    transition={{ duration: 1.1, delay: 0.3 + i * 0.15 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="yapp-rule my-4" />
          <div className="flex flex-wrap gap-2">
            {["NEURON", "AI Consulting", "AI Platform", "Strategy"].map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-lg border border-[#e0e3ea] bg-[#f4f5f7] px-2.5 py-1 text-xs yapp-secondary">
                <Check className="h-3 w-3 text-[#00a9e0]" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default YappPage;

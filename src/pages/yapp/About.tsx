import {
  BrainCircuit,
  Cpu,
  Globe,
  Target,
  MessageSquare,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { useLang } from "@/lib/language";
import { PageHero, Heading, Reveal, CtaBand, partners } from "@/components/yapp/chrome";
import founderSunwoo from "@/assets/founder-sunwoo.webp";
import founderLui from "@/assets/founder-lui.webp";
import founderTaizo from "@/assets/founder-taizo.webp";

const crewPhotos = [founderSunwoo, founderLui, founderTaizo];
const principleIcons = [Target, MessageSquare, ShieldCheck, HeartHandshake];

const copy = {
  ja: {
    hero: { label: "UNCHAINとは", title: "世界を、UNCHAINする。", sub: "UNCHAINは「世界をUNCHAINする」を使命に、組織型AI（A.O.I）を構築するスタートアップです。" },
    mission: {
      label: "私たちの使命",
      heading: "UNCHAINのミッション",
      body: "すべての組織には解放すべき重要な使命があると私たちは信じています。技術はその使命に仕えるべきであり、それを置き換えるべきではありません。私たちは世界中の人々や組織が、それぞれのミッションを解き放つためのテクノロジーを構築しています。",
    },
    concepts: {
      label: "私たちの考え方",
      heading: "A.O.I という発想",
      cards: [
        { title: "A.O.I — 組織型AI", desc: "Artificial Organizational Intelligence。最終的に「組織を理解するAI」を構築しています。", Icon: BrainCircuit },
        { title: "ビジョン", desc: "企業のデジタルツインを創り出すために。", Icon: Cpu },
        { title: "すべては日本から", desc: "東京を拠点に、世界へ。すべては日本から始まります。", Icon: Globe },
      ],
    },
    principles: {
      label: "私たちの原則",
      heading: "UNCHAINの4つの原則",
      items: [
        { t: "Mission-First", d: "すべての判断をミッションに照らします。売上・成長・技術は、目的のための手段です。" },
        { t: "Radical Clarity", d: "率直かつ正確に伝えます。曖昧さはチームを遅くします。" },
        { t: "Build to Last", d: "場当たり的な解決ではなく、信頼でき・保守でき・堅牢な解を。" },
        { t: "Human at the Center", d: "AIは人を置き換えるのではなく、人の能力を拡張するために存在します。" },
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
    overview: {
      label: "会社概要",
      heading: "会社情報",
      rows: [
        ["企業名", "UNCHAIN株式会社"],
        ["代表取締役社長", "朴 善優"],
        ["設立", "2025年7月"],
        ["従業員数", "6名（業務委託含む）"],
        ["主要取引銀行", "住信SBIネット銀行"],
        ["所在地", "東京都渋谷区道玄坂1丁目10番8号 渋谷道玄坂東急ビル2F-C"],
      ],
    },
    partnersHeading: "世界トップクラスのパートナーに支えられています",
  },
  en: {
    hero: { label: "About UNCHAIN", title: "We unchain the world.", sub: "UNCHAIN is a startup on a mission to UNCHAIN THE WORLD, building Organizational AI (A.O.I)." },
    mission: {
      label: "Our Mission",
      heading: "UNCHAIN your mission",
      body: "We believe every organization has a crucial mission to unchain. Technology should serve that mission, not replace it. We build technology that enables people and organizations around the globe to unchain their own missions.",
    },
    concepts: {
      label: "How we think",
      heading: "The idea of A.O.I",
      cards: [
        { title: "A.O.I — Organizational AI", desc: "Artificial Organizational Intelligence — AI that ultimately understands the organization.", Icon: BrainCircuit },
        { title: "Our Vision", desc: "To create the digital twin of the company.", Icon: Cpu },
        { title: "Born in Japan", desc: "Based in Tokyo, building for the world. Everything starts from Japan.", Icon: Globe },
      ],
    },
    principles: {
      label: "Our Principles",
      heading: "The four UNCHAIN principles",
      items: [
        { t: "Mission-First", d: "Every decision is weighed against our mission. Revenue, growth, and technology are means to an end." },
        { t: "Radical Clarity", d: "We communicate with directness and precision. Ambiguity slows teams down." },
        { t: "Build to Last", d: "Durable, reliable, maintainable solutions over quick fixes." },
        { t: "Human at the Center", d: "AI exists to augment human capability, not replace it." },
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
    overview: {
      label: "Company",
      heading: "Company overview",
      rows: [
        ["Company Name", "UNCHAIN Co., Ltd."],
        ["CEO", "Sunwoo Park"],
        ["Established", "July 2025"],
        ["Employees", "6 (including business contractors)"],
        ["Main Bank", "SBI Sumishin Net Bank"],
        ["Address", "2F-C Shibuya Dogenzaka Tokyu Building, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo"],
      ],
    },
    partnersHeading: "Backed by world-class partners",
  },
} as const;

export default function YappAbout() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <>
      <PageHero label={t.hero.label} title={t.hero.title} subtitle={t.hero.sub} />

      {/* Mission */}
      <section className="yapp-section">
        <div className="yapp-container max-w-3xl text-center">
          <Reveal>
            <span className="yapp-pill mb-5">{t.mission.label}</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t.mission.heading}</h2>
            <p className="mt-6 yapp-secondary leading-relaxed">{t.mission.body}</p>
          </Reveal>
        </div>
      </section>

      {/* Concepts */}
      <section className="yapp-section yapp-section-alt">
        <div className="yapp-container">
          <Heading label={t.concepts.label}>{t.concepts.heading}</Heading>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {t.concepts.cards.map((c, i) => (
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

      {/* Principles */}
      <section className="yapp-section">
        <div className="yapp-container">
          <Heading label={t.principles.label}>{t.principles.heading}</Heading>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.principles.items.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <Reveal key={p.t} i={i}>
                  <div className="yapp-card h-full p-6">
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs yapp-muted">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className="mt-1 text-base font-bold">{p.t}</h3>
                    <p className="mt-2 text-sm yapp-secondary leading-relaxed">{p.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Crew */}
      <section id="team" className="yapp-section yapp-section-alt">
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

      {/* Company overview */}
      <section className="yapp-section">
        <div className="yapp-container max-w-3xl">
          <Heading label={t.overview.label}>{t.overview.heading}</Heading>
          <Reveal className="mt-12">
            <div className="yapp-card overflow-hidden">
              <dl>
                {t.overview.rows.map(([k, v], i) => (
                  <div key={k} className={`flex flex-col gap-1 p-5 sm:flex-row sm:gap-6 ${i ? "border-t border-[#e0e3ea]" : ""}`}>
                    <dt className="w-full shrink-0 text-sm font-semibold sm:w-48">{k}</dt>
                    <dd className="text-sm yapp-secondary">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partners */}
      <section className="yapp-section yapp-section-alt">
        <div className="yapp-container">
          <p className="yapp-secondary mb-10 text-center text-sm font-medium">{t.partnersHeading}</p>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {partners.map((p) => (
              <div key={p.name} className="flex h-20 items-center justify-center rounded-[10px] border border-[#e0e3ea] bg-white px-6">
                <img src={p.logo} alt={p.name} className="max-h-9 max-w-[80%] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

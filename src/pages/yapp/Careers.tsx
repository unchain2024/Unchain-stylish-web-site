import { Link } from "react-router-dom";
import { ArrowRight, Compass, Globe2, BadgeDollarSign } from "lucide-react";
import { useLang } from "@/lib/language";
import { PageHero, Heading, Reveal, CtaBand } from "@/components/yapp/chrome";
import r1 from "@/assets/recruiting-1.webp";
import r2 from "@/assets/recruiting-2.webp";
import r3 from "@/assets/recruiting-3.webp";
import r5 from "@/assets/recruiting-5.webp";

const gallery = [r1, r2, r3, r5];
const whyIcons = [Compass, Globe2, BadgeDollarSign];

const copy = {
  ja: {
    hero: { label: "採用情報", title: "一緒に\nUNCHAIN THE WORLD", sub: "私たちはテクノロジーのためにテクノロジーを作るのではありません。より多くの可能性がある世界を形作るために構築しています。" },
    why: {
      label: "なぜUNCHAINか",
      heading: "UNCHAINで働く理由",
      items: [
        { t: "ミッションドリブンな仕事", d: "すべてのプロジェクトを、実在する組織と人々へのインパクトで測ります。" },
        { t: "柔軟な働き方", d: "リモートファースト。東京とサンフランシスコにオフィスがあります。" },
        { t: "意味のあるエクイティ", d: "フルタイムのメンバー全員に、意味のあるストックオプションを付与します。" },
      ],
    },
    roles: {
      label: "募集職種",
      heading: "オープンポジション",
      items: [
        { title: "プロジェクトマネージャー", dept: "マネジメント", salary: "600万円〜1,000万円 + ストックオプション" },
        { title: "機械学習エンジニア", dept: "エンジニアリング", salary: "600万円〜900万円" },
        { title: "サイバーセキュリティエンジニア", dept: "エンジニアリング", salary: "600万円〜1,000万円" },
        { title: "セールス責任者", dept: "セールス", salary: "500万円〜800万円 + コミッション + SO" },
        { title: "セールスアソシエイト", dept: "セールス", salary: "300万円〜600万円" },
        { title: "デザイン責任者", dept: "デザイン", salary: "400万円〜700万円" },
      ],
      apply: "応募する",
    },
    process: {
      label: "選考プロセス",
      heading: "3つのステップ",
      steps: [
        { t: "応募", d: "履歴書と、あなたがワクワクすることについての短いメモをお送りください。" },
        { t: "カジュアル面談", d: "チームメンバーとの30分間の会話。" },
        { t: "創業者面談・オファー", d: "創業者と面談し、48時間以内に結果をお伝えします。" },
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
  },
  en: {
    hero: { label: "Careers", title: "Let's UNCHAIN\nTHE WORLD together", sub: "We do not create technology for its own sake. We build it to help shape a world where more is possible." },
    why: {
      label: "Why UNCHAIN",
      heading: "Why work with us",
      items: [
        { t: "Mission-Driven Work", d: "Every project is measured by its impact on real organizations and people." },
        { t: "Flexible by Default", d: "Remote-first, with offices in Tokyo and San Francisco." },
        { t: "Competitive Equity", d: "Every full-time team member receives meaningful equity." },
      ],
    },
    roles: {
      label: "Open Roles",
      heading: "Open positions",
      items: [
        { title: "Project Manager", dept: "Management", salary: "$40K – $65K + Stock Options" },
        { title: "Machine Learning Engineer", dept: "Engineering", salary: "$40K – $60K" },
        { title: "Cybersecurity Engineer", dept: "Engineering", salary: "$40K – $65K" },
        { title: "Head of Sales", dept: "Sales", salary: "$35K – $55K + Commission + Options" },
        { title: "Sales Associate", dept: "Sales", salary: "$20K – $40K" },
        { title: "Head of Design", dept: "Design", salary: "$25K – $45K" },
      ],
      apply: "Apply",
    },
    process: {
      label: "Selection Process",
      heading: "Three steps",
      steps: [
        { t: "Application", d: "Submit your resume and a brief note about what excites you." },
        { t: "Intro Call", d: "A 30-minute conversation with a team member." },
        { t: "Founder Meeting & Offer", d: "Meet a founder and get a decision within 48 hours." },
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
  },
} as const;

export default function YappCareers() {
  const { lang, localePath } = useLang();
  const t = copy[lang];

  return (
    <>
      <PageHero label={t.hero.label} title={t.hero.title} subtitle={t.hero.sub} />

      {/* Why + gallery */}
      <section className="yapp-section">
        <div className="yapp-container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="yapp-pill mb-5">{t.why.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.why.heading}</h2>
            <ul className="mt-8 space-y-6">
              {t.why.items.map((it, i) => {
                const Icon = whyIcons[i];
                return (
                  <li key={it.t} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-base font-bold">{it.t}</div>
                      <p className="mt-1 text-sm yapp-secondary leading-relaxed">{it.d}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal i={1}>
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((src, i) => (
                <div key={i} className={`overflow-hidden rounded-[10px] border border-[#e0e3ea] ${i % 2 ? "translate-y-4" : ""}`}>
                  <img src={src} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Roles */}
      <section className="yapp-section yapp-section-alt">
        <div className="yapp-container">
          <Heading label={t.roles.label}>{t.roles.heading}</Heading>
          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {t.roles.items.map((r, i) => (
              <Reveal key={r.title} i={i}>
                <Link to={localePath("/yapp/contact")} className="yapp-card yapp-card-hover flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="yapp-pill">{r.dept}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold">{r.title}</h3>
                    <p className="mt-1 text-sm yapp-secondary">{r.salary}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#00a9e0]">
                    {t.roles.apply}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="yapp-section">
        <div className="yapp-container">
          <Heading label={t.process.label}>{t.process.heading}</Heading>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {t.process.steps.map((s, i) => (
              <Reveal key={s.t} i={i}>
                <div className="yapp-card h-full p-8">
                  <div className="yapp-stat-value text-3xl">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm yapp-secondary leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DE&I */}
      <section className="yapp-section yapp-section-alt">
        <div className="yapp-container">
          <Heading label={t.dei.label} sub={t.dei.sub}>{t.dei.heading}</Heading>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      <CtaBand />
    </>
  );
}

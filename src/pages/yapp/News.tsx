import { ArrowUpRight, FileText } from "lucide-react";
import { useLang } from "@/lib/language";
import { PageHero, Reveal, CtaBand } from "@/components/yapp/chrome";

const copy = {
  ja: {
    hero: { label: "ニュース", title: "UNCHAINの最新情報", sub: "プレスリリース、ブログ、メディア掲載。UNCHAINのこれまでとこれからをお届けします。" },
    pinned: {
      category: "プレスリリース", date: "2026年2月25日",
      title: "UNCHAIN、プレシードラウンドで3500万円の資金調達を実施",
      desc: "East VenturesおよびANOBAKAをリード投資家として、3500万円のプレシード資金調達を実施しました。組織型AI（A.O.I）の開発と組織体制の強化を進めてまいります。",
      href: "https://prtimes.jp/main/html/rd/p/000000001.000177392.html",
    },
    feedHeading: "もっと見る",
    feeds: [
      { tag: "Medium（英語）", title: "@unchain_the_world", desc: "英語での最新アップデートはMediumで発信しています。", href: "https://medium.com/@unchain_the_world" },
      { tag: "note（日本語）", title: "unchain_world", desc: "日本語での最新情報はnoteで発信しています。", href: "https://note.com/unchain_world" },
    ],
  },
  en: {
    hero: { label: "News", title: "The latest from UNCHAIN", sub: "Press releases, blog posts, and media — where UNCHAIN has been and where it's headed." },
    pinned: {
      category: "Press Release", date: "Feb 25, 2026",
      title: "UNCHAIN Raises ¥35 Million in Pre-Seed Round",
      desc: "UNCHAIN has raised ¥35 million in a pre-seed round led by East Ventures and ANOBAKA, accelerating development of Organizational AI (A.O.I) and strengthening the team.",
      href: "https://prtimes.jp/main/html/rd/p/000000001.000177392.html",
    },
    feedHeading: "Read more",
    feeds: [
      { tag: "Medium (EN)", title: "@unchain_the_world", desc: "We share our latest updates in English on Medium.", href: "https://medium.com/@unchain_the_world" },
      { tag: "note (JA)", title: "unchain_world", desc: "We share our latest updates in Japanese on note.", href: "https://note.com/unchain_world" },
    ],
  },
} as const;

export default function YappNews() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <>
      <PageHero label={t.hero.label} title={t.hero.title} subtitle={t.hero.sub} />

      <section className="yapp-section">
        <div className="yapp-container">
          {/* Pinned */}
          <Reveal>
            <a href={t.pinned.href} target="_blank" rel="noopener noreferrer" className="yapp-card yapp-card-hover flex flex-col justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-[#00a9e0] px-2.5 py-1 font-semibold text-white">{t.pinned.category}</span>
                  <span className="yapp-muted">{t.pinned.date}</span>
                </div>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold leading-snug">{t.pinned.title}</h2>
                <p className="mt-3 yapp-secondary leading-relaxed">{t.pinned.desc}</p>
              </div>
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#00a9e0]/10 text-[#00a9e0]">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </a>
          </Reveal>

          {/* Feeds */}
          <h2 className="mt-16 text-2xl font-bold tracking-tight">{t.feedHeading}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {t.feeds.map((f, i) => (
              <Reveal key={f.title} i={i}>
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="yapp-card yapp-card-hover group flex h-full flex-col p-7">
                  <div className="mb-4 grid h-10 w-10 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#00a9e0]">{f.tag}</span>
                  <h3 className="mt-1 text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 flex-1 text-sm yapp-secondary leading-relaxed">{f.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00a9e0]">
                    {lang === "ja" ? "開く" : "Open"}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X, Globe, Mail, Sparkles } from "lucide-react";
import { useLang } from "@/lib/language";
import "@/styles/yapp.css";

import logoBlack from "@/assets/logo-black.webp";
import awsLogo from "@/assets/partners/aws.webp";
import microsoftLogo from "@/assets/partners/microsoft.webp";
import cicLogo from "@/assets/partners/cic.webp";
import jstarxLogo from "@/assets/partners/jstarx.webp";
import ibiLogo from "@/assets/partners/ibi.webp";
import nvidiaLogo from "@/assets/partners/nvidia.webp";
import ucbLogo from "@/assets/partners/ucberkeley.png";
import slackLogo from "@/assets/integrations/slack.svg";
import jiraLogo from "@/assets/integrations/jira.svg";
import notionLogo from "@/assets/integrations/notion.svg";
import googleWsLogo from "@/assets/integrations/google-workspace.svg";

/* ─────────────────────────── shared data ─────────────────────────── */
/* real brand logos (gilbarbara/logos, MIT) keyed by display name */
export const toolLogos: Record<string, string> = {
  Slack: slackLogo,
  Jira: jiraLogo,
  Notion: notionLogo,
  "Google Workspace": googleWsLogo,
};

export const partners = [
  { name: "AWS Startups", logo: awsLogo },
  { name: "Microsoft for Startups", logo: microsoftLogo },
  { name: "CIC", logo: cicLogo },
  { name: "J-StarX", logo: jstarxLogo },
  { name: "IBI", logo: ibiLogo },
  { name: "NVIDIA", logo: nvidiaLogo },
  { name: "UC Berkeley", logo: ucbLogo },
];

const chrome = {
  ja: {
    announce: { text: "UNCHAINがプレシードで3500万円を調達（East Ventures・ANOBAKA）", cta: "詳しく見る" },
    nav: { about: "UNCHAINとは", solutions: "ソリューション", careers: "採用", news: "ニュース", contact: "お問い合わせ" },
    solutionsMenu: [
      { name: "NEURON", desc: "PM意思決定の記録システム", hash: "neuron" },
      { name: "AI Consulting", desc: "実践的なAIトランスフォーメーション", hash: "consulting" },
      { name: "AI Platform 開発", desc: "データ基盤から意思決定支援まで", hash: "platform" },
    ],
    langToggle: "EN",
    requestDemo: "お問い合わせ",
    secondaryCta: "私たちについて",
    footer: {
      tagline: "組織型AI（A.O.I）の力で世界をUNCHAINする",
      cols: [
        { title: "ソリューション", links: [ { t: "NEURON", to: "/yapp/solutions" }, { t: "AI Consulting", to: "/yapp/solutions" }, { t: "AI Platform 開発", to: "/yapp/solutions" }, { t: "Strategy Consulting", to: "/yapp/solutions" } ] },
        { title: "会社情報", links: [ { t: "UNCHAINとは", to: "/yapp/about" }, { t: "ミッション", to: "/yapp/about" }, { t: "採用情報", to: "/yapp/careers" }, { t: "お問い合わせ", to: "/yapp/contact" } ] },
        { title: "リソース", links: [ { t: "ニュース", to: "/yapp/news" }, { t: "活用例", to: "/yapp" } ] },
        { title: "ポリシー", links: [ { t: "プライバシーポリシー", to: "/yapp/privacy" }, { t: "情報セキュリティ基本方針", to: "/yapp/terms" } ] },
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
    nav: { about: "About", solutions: "Solutions", careers: "Careers", news: "News", contact: "Contact" },
    solutionsMenu: [
      { name: "NEURON", desc: "PM Decision System of Record", hash: "neuron" },
      { name: "AI Consulting", desc: "Hands-on AI transformation", hash: "consulting" },
      { name: "AI Platform Development", desc: "From data pipelines to decisions", hash: "platform" },
    ],
    langToggle: "日本語",
    requestDemo: "Get in Touch",
    secondaryCta: "About Us",
    footer: {
      tagline: "Unchaining the world through the power of Organizational AI (A.O.I).",
      cols: [
        { title: "Solutions", links: [ { t: "NEURON", to: "/yapp/solutions" }, { t: "AI Consulting", to: "/yapp/solutions" }, { t: "AI Platform Development", to: "/yapp/solutions" }, { t: "Strategy Consulting", to: "/yapp/solutions" } ] },
        { title: "Company", links: [ { t: "About Us", to: "/yapp/about" }, { t: "Mission", to: "/yapp/about" }, { t: "Careers", to: "/yapp/careers" }, { t: "Contact", to: "/yapp/contact" } ] },
        { title: "Resources", links: [ { t: "News", to: "/yapp/news" }, { t: "Use Cases", to: "/yapp" } ] },
        { title: "Policies", links: [ { t: "Privacy Policy", to: "/yapp/privacy" }, { t: "Information Security Policy", to: "/yapp/terms" } ] },
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

/* ─────────────────────────── motion helpers ─────────────────────────── */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Reveal({ children, i = 0, className = "" }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className={className}>
      {children}
    </motion.div>
  );
}

export function Heading({ label, sub, children }: { label?: string; sub?: string; children: React.ReactNode }) {
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

/* inner-page hero band */
export function PageHero({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <section className="yapp-page-hero relative pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="yapp-container max-w-3xl text-center">
        <Reveal>
          <span className="yapp-pill mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            {label}
          </span>
        </Reveal>
        <Reveal i={1}>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight whitespace-pre-line">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal i={2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg yapp-secondary leading-relaxed">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* final CTA band, reused across inner pages */
export function CtaBand() {
  const { lang, localePath } = useLang();
  const t = lang === "ja"
    ? { heading: "UNCHAINで組織を解き放ちませんか？", sub: "AIがあなたのミッションにどう貢献できるか、お話ししましょう。", primary: "お問い合わせ", secondary: "私たちについて" }
    : { heading: "Ready to unchain your organization?", sub: "Let's talk about how AI can serve your mission.", primary: "Get in Touch", secondary: "About Us" };
  return (
    <section className="yapp-section">
      <div className="yapp-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[#e0e3ea] p-10 text-center md:p-16">
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(70% 130% at 50% 0%, rgba(0,169,224,0.12), transparent 60%), linear-gradient(180deg, #f4f9ff, #ffffff)" }} />
            <h2 className="text-3xl md:text-5xl font-bold">{t.heading}</h2>
            <p className="mx-auto mt-4 max-w-xl yapp-secondary">{t.sub}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to={localePath("/yapp/contact")} className="yapp-btn yapp-btn-primary">
                {t.primary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to={localePath("/yapp/about")} className="yapp-btn yapp-btn-ghost">
                {t.secondary}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── nav ─────────────────────────── */
function YappNav() {
  const { lang, toggleLang, localePath } = useLang();
  const t = chrome[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [announceOpen, setAnnounceOpen] = useState(true);

  const navLinks = [
    { label: t.nav.about, to: "/yapp/about" },
    { label: t.nav.solutions, to: "/yapp/solutions", menu: t.solutionsMenu },
    { label: t.nav.careers, to: "/yapp/careers" },
    { label: t.nav.news, to: "/yapp/news" },
    { label: t.nav.contact, to: "/yapp/contact" },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-1 text-sm font-medium transition-colors ${isActive ? "text-[#00a9e0]" : "yapp-secondary hover:text-[#00a9e0]"}`;

  return (
    <>
      {announceOpen && (
        <div className="yapp-announce">
          <div className="yapp-container flex items-center justify-center gap-3 py-2 text-center text-xs sm:text-sm">
            <span className="yapp-announce-tag">NEWS</span>
            <span className="truncate">{t.announce.text}</span>
            <Link to={localePath("/yapp/news")} className="hidden shrink-0 items-center gap-1 font-semibold underline-offset-2 hover:underline sm:inline-flex">
              {t.announce.cta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button className="ml-2 shrink-0 opacity-80 hover:opacity-100" onClick={() => setAnnounceOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <header className="yapp-nav sticky top-0 z-50">
        <div className="yapp-container flex h-16 items-center justify-between">
          <Link to={localePath("/yapp")} className="flex items-center gap-2">
            <img src={logoBlack} alt="UNCHAIN" className="h-6 w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <div key={l.to} className="group relative">
                <NavLink to={localePath(l.to)} className={linkClass}>
                  {l.label}
                  {l.menu && <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />}
                </NavLink>
                {l.menu && (
                  <div className="yapp-dropdown">
                    {l.menu.map((m) => (
                      <Link key={m.name} to={`${localePath("/yapp/solutions")}#${m.hash}`} className="yapp-dropdown-item">
                        <div className="text-sm font-semibold text-[#1c2438]">{m.name}</div>
                        <div className="text-xs yapp-secondary">{m.desc}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={toggleLang} className="text-sm font-semibold yapp-secondary hover:text-[#00a9e0] transition-colors">
              {t.langToggle}
            </button>
            <Link to={localePath("/yapp/about")} className="yapp-btn yapp-btn-ghost text-sm yapp-btn-sm">
              {t.secondaryCta}
            </Link>
            <Link to={localePath("/yapp/contact")} className="yapp-btn yapp-btn-primary text-sm yapp-btn-sm">
              {t.requestDemo}
            </Link>
          </div>
          <button className="lg:hidden text-[#1c2438]" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden yapp-container flex flex-col gap-4 border-t border-[#e0e3ea] pb-5 pt-4">
            {navLinks.map((l) => (
              <Link key={l.to} to={localePath(l.to)} className="text-sm yapp-secondary" onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
            <button onClick={toggleLang} className="text-left text-sm font-semibold yapp-secondary">
              {t.langToggle}
            </button>
            <Link to={localePath("/yapp/contact")} className="yapp-btn yapp-btn-primary justify-center text-sm" onClick={() => setMenuOpen(false)}>
              {t.requestDemo}
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

/* ─────────────────────────── footer ─────────────────────────── */
function YappFooter() {
  const { lang, toggleLang, localePath } = useLang();
  const t = chrome[lang].footer;
  return (
    <footer className="yapp-footer">
      <div className="yapp-container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <img src={logoBlack} alt="UNCHAIN" className="h-6 w-auto" />
            <p className="mt-4 max-w-xs text-sm yapp-secondary leading-relaxed">{t.tagline}</p>
            <button onClick={toggleLang} className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e0e3ea] px-3 py-1.5 text-xs font-semibold yapp-secondary hover:border-[#00a9e0] hover:text-[#00a9e0]">
              <Globe className="h-3.5 w-3.5" />
              {chrome[lang].langToggle}
            </button>
          </div>
          {t.cols.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-bold">{col.title}</div>
              <ul className="mt-4 space-y-3">
                {col.links.map((lk) => (
                  <li key={lk.t}>
                    <Link to={localePath(lk.to)} className="text-sm yapp-secondary hover:text-[#00a9e0] transition-colors">
                      {lk.t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#e0e3ea] pt-8">
          <div className="text-sm font-bold">{t.companyHeading}</div>
          <dl className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {t.company.map(([k, v]) => (
              <div key={k} className="flex gap-3 text-sm">
                <dt className="w-28 shrink-0 yapp-muted">{k}</dt>
                <dd className="yapp-secondary">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#e0e3ea] pt-8 sm:flex-row">
          <p className="yapp-muted text-xs">{t.copyright}</p>
          <a href="mailto:contact@the-unchain.com" className="inline-flex items-center gap-1.5 text-xs font-semibold yapp-secondary hover:text-[#00a9e0]">
            <Mail className="h-3.5 w-3.5" />
            contact@the-unchain.com
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── layout ─────────────────────────── */
export default function YappLayout() {
  const location = useLocation();

  // Smooth-scroll to a section when the URL has a hash (e.g. /yapp/solutions#consulting).
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    // wait for the target page/section to render, then scroll (overrides ScrollToTop)
    const t = setTimeout(scroll, 120);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <div className="yapp-root">
      <div className="yapp-bg-field" />
      <div className="yapp-grid" />
      <div className="relative z-10">
        <YappNav />
        <div key={location.pathname}>
          <Outlet />
        </div>
        <YappFooter />
      </div>
    </div>
  );
}

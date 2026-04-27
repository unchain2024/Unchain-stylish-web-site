import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/language";

import founderSunwoo from "@/assets/founder-sunwoo.webp";
import founderLui from "@/assets/founder-lui.webp";
import founderTaizo from "@/assets/founder-taizo.webp";

const founderPhotos = [
  { src: founderSunwoo, className: "w-full h-full object-cover object-top" },
  { src: founderLui, className: "w-full h-full object-cover object-top" },
  { src: founderTaizo, className: "w-full h-full object-cover object-[center_20%]" },
];

const heroText = {
  ja: {
    label: "UNCHAINについて",
    heading: "すべては日本から\n始まります。",
    description:
      "すべての組織には解放すべき重要な使命があると私たちは信じています。技術はその使命に仕えるべきであり、それを置き換えるべきではありません。",
  },
  en: {
    label: "ABOUT UNCHAIN",
    heading: "Everything starts\nfrom Japan.",
    description:
      "We believe every organization has a crucial mission to unchain. Technology should serve that mission, not replace it.",
  },
};

const principlesText = {
  ja: {
    label: "私たちの原則",
    heading: "私たちが大切にすること",
  },
  en: {
    label: "OUR PRINCIPLES",
    heading: "What we stand for",
  },
};

const principlesData = {
  ja: [
    { num: "01", title: "ミッション・ファースト", desc: "すべての意思決定はミッションに照らして評価されます。収益、成長、技術は手段であり、目的そのものではありません。" },
    { num: "02", title: "徹底的な明確さ", desc: "直接的かつ正確なコミュニケーションを行います。曖昧さはチームの速度を落とします。私たちはそれを排除します。" },
    { num: "03", title: "長く残るものを作る", desc: "応急処置ではなく、持続的なソリューションを選択します。信頼性があり、保守可能で、回復力のあるものを構築します。" },
    { num: "04", title: "人間を中心に", desc: "AIは人間の能力を拡張するために存在し、置き換えるためではありません。すべてのプロダクトで人間をループに保ちます。" },
  ],
  en: [
    { num: "01", title: "Mission-First", desc: "Every decision is evaluated against our mission. Revenue, growth, and technology are means to an end -- never the end itself." },
    { num: "02", title: "Radical Clarity", desc: "We communicate with directness and precision. Ambiguity slows teams down -- we eliminate it." },
    { num: "03", title: "Build to Last", desc: "We choose durable solutions over quick fixes. Everything we build is reliable, maintainable, and resilient." },
    { num: "04", title: "Human at the Center", desc: "AI exists to augment human capability, not replace it. Every product we build keeps people in the loop." },
  ],
};

const foundersText = {
  ja: { label: "リーダーシップ", heading: "私たちのチームを紹介します" },
  en: { label: "LEADERSHIP", heading: "Meet our Team" },
};

const foundersData = {
  ja: [
    {
      name: "朴善優",
      title: "共同創業者 & CEO",
      bio: "Forbesが選出した「日本のAI企業トップ50」に選出されたAIスタートアップを共同創業。国内でいち早くプロンプトハッキングの手法を実証し、AIセキュリティに関する研究成果がForbesに掲載された。現在は東京大学松尾研究室の社長室にてAI研究プロジェクトに従事している。さらに、孫正義氏の後継者育成機関であるソフトバンクアカデミアに最年少の18歳で採択。米日カウンシルのパネリストとしても登壇経験を持つ。",
    },
    {
      name: "蛯名瑠偉",
      title: "共同創業者 & CTO",
      bio: "中学卒業後すぐにIT業界へスカウトされ、ゼロから大規模データプラットフォームを構築。NTT西日本の全国規模データパイプラインや、政府記録のデジタル化を推進するB2Bプラットフォーム開発を主導した。現在はMachine LearningおよびLLM領域の研究にも取り組んでいる。",
    },
    {
      name: "原田大蔵",
      title: "共同創業者 & COO",
      bio: "15歳でアウトドア用品会社を共同設立し、4年間で販売網を400店舗以上に拡大。加えて、大手企業CMの作曲・プロデュースも手掛けるなど、クリエイティブとマーケティング双方の実務経験を有する。Fortune 500企業主催のビジネスピッチコンテストでは複数回優勝し、賞金総額1万ドルを獲得。Protivitiでのインターンシップ経験も持つ。",
    },
  ],
  en: [
    {
      name: "Sunwoo Park",
      title: "Co-Founder & CEO",
      bio: "Co-founded an AI startup recognized by Forbes as one of Japan's Top 50 AI companies. Among the earliest to demonstrate prompt hacking techniques in Japan, with AI security research featured in Forbes. Currently engaged in AI research projects at the University of Tokyo's Matsuo Lab. Additionally, accepted into SoftBank Academia — Masayoshi Son's successor development program — at the youngest age of 18. Also served as a panelist for the U.S.–Japan Council.",
    },
    {
      name: "Lui Ebina",
      title: "Co-Founder & CTO",
      bio: "Recruited into the IT industry straight out of middle school, building large-scale data platforms from the ground up. Led the development of a nationwide data pipeline system for NTT West Japan and a B2B platform driving the digitization of government records. Currently also pursuing research in Machine Learning and LLMs.",
    },
    {
      name: "Taizo Harada",
      title: "Co-Founder & COO",
      bio: "Co-founded an outdoor goods company at 15, expanding its retail network to over 400 stores within four years. Also composed and produced commercials for major corporations, bringing hands-on experience in both creative and marketing disciplines. Won multiple business pitch competitions hosted by Fortune 500 companies, earning over $10,000 in total prize money. Also completed an internship at Protiviti.",
    },
  ],
};

const deiText = {
  ja: {
    label: "DE&Iポリシー",
    heading: "ダイバーシティ・エクイティ・\nインクルージョンは基盤です",
    intro: "UNCHAINにおいて、多様性、公平性、包摂性は取り組みではなく、私たちがどのように構築し、採用し、運営するかの基盤です。",
  },
  en: {
    label: "DE&I POLICY",
    heading: "Diversity, equity, and inclusion\naren't initiatives — they're foundations",
    intro: "At UNCHAIN, diversity, equity, and inclusion aren't initiatives — they're foundations of how we build, hire, and operate.",
  },
};

const deiData = {
  ja: [
    { title: "ダイバーシティ", desc: "日本、アメリカ、そしてそれ以外の国々にまたがるチーム。多様な視点が交わるところから最高のアイデアが生まれると信じています。" },
    { title: "エクイティ", desc: "公正で透明な報酬体系。バックグラウンド、アイデンティティ、地理に関わらず、機会への平等なアクセスを保証します。" },
    { title: "インクルージョン", desc: "すべての人が歓迎され、尊重され、力を与えられます。心理的安全性はイノベーションの前提条件です。" },
    { title: "私たちのコミットメント", desc: "採用慣行、報酬の公平性、チーム文化を定期的に見直します。継続的な改善に取り組んでいます。" },
  ],
  en: [
    { title: "Diversity", desc: "Our team spans Japan, the United States, and beyond. We believe the best ideas emerge when diverse viewpoints converge." },
    { title: "Equity", desc: "Fair and transparent compensation structures. Equal access to opportunity regardless of background, identity, or geography." },
    { title: "Inclusion", desc: "Every person is welcomed, respected, and empowered. Psychological safety is a prerequisite for innovation." },
    { title: "Our Commitment", desc: "We regularly review our hiring practices, pay equity, and team culture. We are committed to continuous improvement." },
  ],
};

const companyText = {
  ja: { label: "会社概要", heading: "企業情報" },
  en: { label: "COMPANY OVERVIEW", heading: "Corporate Information" },
};

const companyData = {
  ja: [
    { label: "企業名", value: "UNCHAIN株式会社" },
    { label: "代表取締役社長", value: "朴 善優" },
    { label: "設立", value: "2025年7月" },
    { label: "従業員数", value: "6名（業務委託含む）" },
    { label: "主要取引銀行", value: "住信SBIネット銀行" },
    { label: "住所", value: "東京都渋谷区道玄坂１丁目１０番８号渋谷道玄坂東急ビル２Ｆ－Ｃ" },
    { label: "顧問弁護士", value: "AZX総合法律事務所" },
  ],
  en: [
    { label: "Company Name", value: "UNCHAIN Co., Ltd." },
    { label: "CEO", value: "Sunwoo Park" },
    { label: "Established", value: "July 2025" },
    { label: "Employees", value: "6 people (including business contractors)" },
    { label: "Main Bank", value: "SBI Sumishin Net Bank" },
    { label: "Address", value: "2F-C Shibuya Dogenzaka Tokyu Building, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo" },
    { label: "Legal Advisor", value: "AZX Sogо Law Office" },
  ],
};

const AboutPage = () => {
  const { lang } = useLang();
  const hero = heroText[lang];
  const princ = principlesText[lang];
  const principles = principlesData[lang];
  const fText = foundersText[lang];
  const founders = foundersData[lang];
  const dei = deiText[lang];
  const deiItems = deiData[lang];
  const comp = companyText[lang];
  const companyInfo = companyData[lang];

  const [activePrinciple, setActivePrinciple] = useState(0);
  const [activeFounder, setActiveFounder] = useState<number | null>(null);
  const [activeDei, setActiveDei] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`${hero.label} | UNCHAIN`} description={hero.description} organization />
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

      {/* Principles */}
      <section data-nav-theme="light" className="bg-secondary section">
        <div className="container-site">
          <ScrollReveal>
            <span className="label text-light-label">
              {princ.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="heading-1 text-light-heading mt-3 mb-12 lg:mb-16">
              {princ.heading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left -- Interactive list */}
            <div className="flex flex-col">
              {principles.map((p, i) => {
                const isActive = activePrinciple === i;
                return (
                  <ScrollReveal key={p.num} delay={i * 0.08}>
                    <button
                      className="w-full text-left group"
                      onMouseEnter={() => setActivePrinciple(i)}
                      onClick={() => setActivePrinciple(i)}
                    >
                      <div className="relative py-5 border-b border-border">
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-primary"
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          style={{ transformOrigin: "top" }}
                        />

                        <div className={`pl-6 transition-all duration-500 ${isActive ? "translate-x-2" : ""}`}>
                          <div className="flex items-center gap-4 mb-1">
                            <span
                              className="label font-bold tracking-[0.3em] transition-colors duration-500"
                              style={{ color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.3)" }}
                            >
                              {p.num}
                            </span>
                            <h3 className={`heading-3 transition-colors duration-500 ${
                              isActive ? "text-light-heading" : "text-light-label"
                            }`}>
                              {p.title}
                            </h3>
                          </div>

                          <AnimatePresence mode="wait">
                            {isActive && (
                              <motion.p
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="body-large text-light-body leading-relaxed overflow-hidden pl-[calc(0.3em*11+16px)]"
                              >
                                {p.desc}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Right -- Large principle number */}
            <ScrollReveal delay={0.2}>
              <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePrinciple}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center"
                  >
                    <span className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-black text-muted-foreground/10 leading-none select-none">
                      {principles[activePrinciple].num}
                    </span>
                    <p className="heading-2 text-light-heading -mt-16">
                      {principles[activePrinciple].title}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section data-nav-theme="light" className="bg-background section">
        <div className="container-site">
          <ScrollReveal>
            <span className="label text-light-label">
              {fText.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="heading-1 text-light-heading mt-3 mb-12 lg:mb-16">
              {fText.heading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {founders.map((f, i) => {
              const isActive = activeFounder === i;
              return (
                <ScrollReveal key={f.name} delay={i * 0.12}>
                  <div
                    onMouseEnter={() => setActiveFounder(i)}
                    onMouseLeave={() => setActiveFounder(null)}
                    className="cursor-default"
                  >
                    <motion.div
                      animate={{ y: isActive ? -4 : 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative rounded-2xl border overflow-hidden transition-colors duration-500 ${
                        isActive ? "border-border bg-muted/30" : "border-border/50 bg-transparent"
                      }`}
                    >
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-[2px] bg-primary"
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: "left" }}
                      />

                      {/* Headshot */}
                      <div className="aspect-[4/3] overflow-hidden bg-muted/20">
                        <img
                          src={founderPhotos[i].src}
                          alt={f.name}
                          className={founderPhotos[i].className}
                        />
                      </div>

                      <div className="p-6 sm:p-8">
                        <h3 className="heading-3 text-light-heading">
                          {f.name}
                        </h3>

                        <p className="label mt-2 text-light-label">
                          {f.title}
                        </p>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-border">
                                <p className="body text-light-body leading-relaxed">
                                  {f.bio}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* DE&I */}
      <section data-nav-theme="light" className="bg-secondary section">
        <div className="container-site">
          <ScrollReveal>
            <span className="label text-light-label">
              {dei.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="heading-1 text-light-heading mt-3 mb-3 whitespace-pre-line leading-[1.1]">
              {dei.heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="body-large text-light-body max-w-2xl mb-12 lg:mb-16">
              {dei.intro}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
              {/* Left -- Tab list */}
              <div className="flex flex-col">
                {deiItems.map((item, i) => {
                  const isActive = activeDei === i;
                  return (
                    <button
                      key={item.title}
                      className="w-full text-left group"
                      onMouseEnter={() => setActiveDei(i)}
                      onClick={() => setActiveDei(i)}
                    >
                      <div className="relative py-4 border-b border-border">
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-primary"
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          style={{ transformOrigin: "top" }}
                        />
                        <div className={`pl-5 transition-transform duration-300 ${isActive ? "translate-x-1" : ""}`}>
                          <span className={`body-large font-bold transition-colors duration-300 ${
                            isActive ? "text-light-heading" : "text-light-label"
                          }`}>
                            {item.title}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right -- Content panel */}
              <div className="relative min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDei}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="md:pt-4"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "3rem" }}
                      transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-[2px] rounded-full bg-primary mb-4"
                    />
                    <h3 className="heading-2 text-light-heading mb-3">
                      {deiItems[activeDei].title}
                    </h3>
                    <p className="body-large text-light-body leading-relaxed max-w-xl">
                      {deiItems[activeDei].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Company Overview */}
      <section data-nav-theme="light" className="bg-background section">
        <div className="container-site">
          <ScrollReveal>
            <span className="label text-light-label">
              {comp.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="heading-1 text-light-heading mt-3 mb-12 lg:mb-16">
              {comp.heading}
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl">
            {companyInfo.map((row, i) => (
              <ScrollReveal key={row.label} delay={i * 0.06}>
                <div className="group grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 lg:gap-8 py-4 border-b border-border hover:border-foreground/20 transition-colors duration-300">
                  <span className="sm:col-span-4 body font-medium tracking-wide text-light-label group-hover:text-primary transition-colors duration-300">
                    {row.label}
                  </span>
                  <span className="sm:col-span-8 body-large text-light-body group-hover:text-light-heading transition-colors duration-300">
                    {row.value}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

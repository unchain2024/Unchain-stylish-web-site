import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/language";

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
      bio: "人工知能分野における豊富な経験を持つ起業家。Forbesが選出した「日本のAI企業トップ50」に選ばれたAIスタートアップを共同創業し、国内でいち早くプロンプトハッキングの手法を実証。東京大学松尾研究室にてAI研究プロジェクトに携わったほか、米日カウンシルのパネリストとしても登壇経験を持つ。",
    },
    {
      name: "蛯名瑠偉",
      title: "共同創業者 & CTO",
      bio: "卓越した技術力とリーダーシップで数々のプロジェクトを牽引してきたエンジニアリングリーダー。中学卒業後すぐに業界にスカウトされ、ゼロから大規模データプラットフォームを構築。NTT西日本の全国規模データパイプラインや、政府記録をデジタル化するB2Bプラットフォームの開発を主導。",
    },
    {
      name: "原田大蔵",
      title: "共同創業者 & COO",
      bio: "15歳でアウトドア用品会社を設立し、4年間でM&Aにより売却。高校時代に渡米し、複数の奨学金を獲得。Fortune 500企業開催のビジネスピッチコンテストで複数回優勝。大学在学中にはProtivitiでのインターンシップを経験。",
    },
  ],
  en: [
    {
      name: "Sunwoo Christian Park",
      title: "Co-Founder & CEO",
      bio: "Seasoned entrepreneur with a strong background in artificial intelligence. Co-founded an AI startup recognized by Forbes as one of Japan's Top 50 AI companies and was among the earliest to demonstrate prompt hacking techniques. Previously worked with the Matsuo Lab at the University of Tokyo and served as a panelist for the U.S.–Japan Council.",
    },
    {
      name: "Lui Ebina",
      title: "Co-Founder & CTO",
      bio: "Brilliant technologist and engineering leader who was recruited into the industry straight out of high school. Built large-scale data platforms from the ground up, including a nationwide data pipeline system for NTT West Japan and a B2B platform digitizing government records.",
    },
    {
      name: "Taizo Harada",
      title: "Co-Founder & COO",
      bio: "Founded an outdoor goods company in Japan at 15 and exited after four years. Moved to the United States during high school, earning multiple scholarships and winning several business pitch competitions hosted by Fortune 500 companies.",
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
  ],
  en: [
    { label: "Company Name", value: "UNCHAIN Co., Ltd." },
    { label: "CEO", value: "Sunwoo Park" },
    { label: "Established", value: "July 2025" },
    { label: "Employees", value: "6 people (including business contractors)" },
    { label: "Main Bank", value: "SBI Sumishin Net Bank" },
    { label: "Address", value: "2F-C Shibuya Dogenzaka Tokyu Building, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo" },
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

      {/* Principles */}
      <section data-nav-theme="light" className="bg-secondary py-[10vh]">
        <div className="w-full px-[5vw]">
          <ScrollReveal>
            <span className="text-[calc(1*var(--vf))] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {princ.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="text-[calc(3.5*var(--vf))] font-black text-foreground mt-[1vh] mb-[6vh]">
              {princ.heading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4vw]">
            {/* Left — Interactive list */}
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
                      <div className="relative py-[2.5vh] border-b border-border">
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-primary"
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          style={{ transformOrigin: "top" }}
                        />

                        <div className={`pl-6 transition-all duration-500 ${isActive ? "translate-x-2" : ""}`}>
                          <div className="flex items-center gap-4 mb-[0.5vh]">
                            <span
                              className="text-[calc(0.75*var(--vf))] font-bold tracking-[0.3em] transition-colors duration-500"
                              style={{ color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.3)" }}
                            >
                              {p.num}
                            </span>
                            <h3 className={`text-[calc(1.5*var(--vf))] font-bold transition-colors duration-500 ${
                              isActive ? "text-foreground" : "text-muted-foreground/40"
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
                                className="text-[calc(1.15*var(--vf))] text-muted-foreground leading-relaxed overflow-hidden pl-[calc(0.3em*11+16px)]"
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

            {/* Right — Large principle number */}
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
                    <span className="text-[calc(12*var(--vf))] font-black text-muted-foreground/10 leading-none select-none">
                      {principles[activePrinciple].num}
                    </span>
                    <p className="text-[calc(1.75*var(--vf))] font-black text-foreground -mt-[4vh]">
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
      <section data-nav-theme="light" className="bg-background py-[10vh]">
        <div className="w-full px-[5vw]">
          <ScrollReveal>
            <span className="text-[calc(1*var(--vf))] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {fText.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="text-[calc(3.5*var(--vf))] font-black text-foreground mt-[1vh] mb-[6vh]">
              {fText.heading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2vw]">
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

                      <div className="p-[2vw]">
                        <div className="mb-[2vh]">
                          <span className="text-[calc(2*var(--vf))] font-bold leading-none select-none text-muted-foreground/10">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="text-[calc(1.5*var(--vf))] font-bold text-foreground">
                          {f.name}
                        </h3>

                        <p className="text-[calc(0.75*var(--vf))] font-semibold tracking-[0.2em] uppercase mt-[0.5vh] text-muted-foreground/50">
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
                              <div className="mt-[2vh] pt-[2vh] border-t border-border">
                                <p className="text-[calc(0.9*var(--vf))] text-muted-foreground leading-relaxed">
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
      <section data-nav-theme="light" className="bg-secondary py-[10vh]">
        <div className="w-full px-[5vw]">
          <ScrollReveal>
            <span className="text-[calc(1*var(--vf))] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {dei.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="text-[calc(3.5*var(--vf))] font-black text-foreground mt-[1vh] mb-[1vh] whitespace-pre-line leading-[1.1]">
              {dei.heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[calc(1.15*var(--vf))] text-muted-foreground max-w-[50vw] mb-[6vh]">
              {dei.intro}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] gap-[4vw]">
              {/* Left — Tab list */}
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
                      <div className="relative py-[1.5vh] border-b border-border">
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-primary"
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          style={{ transformOrigin: "top" }}
                        />
                        <div className={`pl-5 transition-transform duration-300 ${isActive ? "translate-x-1" : ""}`}>
                          <span className={`text-[calc(1.15*var(--vf))] font-bold transition-colors duration-300 ${
                            isActive ? "text-foreground" : "text-muted-foreground/40"
                          }`}>
                            {item.title}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right — Content panel */}
              <div className="relative min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDei}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="md:pt-[1.5vh]"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "3rem" }}
                      transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-[2px] rounded-full bg-primary mb-[2vh]"
                    />
                    <h3 className="text-[calc(1.75*var(--vf))] font-black text-foreground mb-[1vh]">
                      {deiItems[activeDei].title}
                    </h3>
                    <p className="text-[calc(1.15*var(--vf))] text-muted-foreground leading-relaxed max-w-xl">
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
      <section data-nav-theme="light" className="bg-background py-[10vh]">
        <div className="w-full px-[5vw]">
          <ScrollReveal>
            <span className="text-[calc(1*var(--vf))] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {comp.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="text-[calc(3.5*var(--vf))] font-black text-foreground mt-[1vh] mb-[6vh]">
              {comp.heading}
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl">
            {companyInfo.map((row, i) => (
              <ScrollReveal key={row.label} delay={i * 0.06}>
                <div className="group grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-[3vw] py-[2vh] border-b border-border hover:border-foreground/20 transition-colors duration-300">
                  <span className="sm:col-span-4 text-[calc(0.9*var(--vf))] font-medium tracking-wide text-muted-foreground/50 group-hover:text-primary transition-colors duration-300">
                    {row.label}
                  </span>
                  <span className="sm:col-span-8 text-[calc(1.15*var(--vf))] text-foreground/80 group-hover:text-foreground transition-colors duration-300">
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

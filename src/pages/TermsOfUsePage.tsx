import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/language";

const heroText = {
  ja: {
    label: "情報セキュリティ基本方針",
    heading: "情報セキュリティ\n基本方針",
    date: "2026年3月1日制定",
  },
  en: {
    label: "SECURITY POLICY",
    heading: "Information Security\nPolicy",
    date: "Established: March 1, 2026",
  },
};

const content = {
  ja: {
    intro:
      "UNCHAIN株式会社（以下、当社）は、「AIセキュリティで、自律型AIエージェントを守る。」を理念とし、事業を行っています。当社の事業の中で取り扱う、お客様の情報をはじめとする情報資産は、当社の経営基盤として極めて重要なものです。漏洩、き損、滅失等のリスクから、情報資産を保護することの重要性を認識した役員や従業員を含めた、情報資産を扱う者が本方針を遵守し、情報資産の機密性、完全性、可用性といった情報セキュリティを維持するための活動を実践します。",
    policyHeading: "基本方針",
    principles: [
      "情報資産を保護するために、情報セキュリティ方針ならびに、それにまつわる規程類を策定し、これに従って業務を行うとともに、情報セキュリティに関連する法令、規制その他の規範、及び、お客様との契約事項を遵守いたします。",
      "情報資産に対して存在する漏洩、き損、滅失等のリスクを分析、評価するための基準を明確にし、体系的なリスクアセスメント方法を確立するとともに、定期的にリスクアセスメントを実施いたします。また、その結果に基づき、必要かつ適切なセキュリティ対策を実施いたします。",
      "担当役員を中心とした情報セキュリティ体制を確立するとともに、情報セキュリティに関する権限および責任を明確にいたします。また、すべての従業者が、情報セキュリティの重要性を認識し、情報資産の適切な取り扱いを確実にするために、定期的に教育、訓練および啓発を行います。",
      "情報セキュリティポリシーの遵守状況及び情報資産の取扱いについて、定期的に点検及び監査を行い、発見された不備や改善項目については、速やかに是正処置を講じます。",
      "情報セキュリティ上のイベントやインシデントの発生に対する適切な処置を講じるとともに、万一それらが発生した場合に際して、あらかじめ、被害を最小限に留めるための対応手順を確立し、有事の際には、速やかに対応するとともに、適切な是正処置を講じます。また、特に、業務中断に関わるようなインシデントについては、その管理の枠組みを確立し、定期的に見直しを行うことにより、当社の事業継続を確実にいたします。",
      "基本理念を実現するための目標を定めた情報セキュリティマネジメントシステムを確立し、これを実行するとともに、継続的に見直し、改善を行います。",
    ],
    signature: "UNCHAIN株式会社　代表取締役",
    contactLabel: "脆弱性報告などセキュリティにまつわるお問い合わせ先",
  },
  en: {
    intro:
      "UNCHAIN Co., Ltd. (hereinafter referred to as \"the Company\") operates its business under the philosophy of \"Protecting autonomous AI agents through AI security.\" The information assets handled in the course of our business, including customer information, are critically important as the foundation of our management. All persons who handle information assets — including officers and employees who recognize the importance of protecting information assets from risks such as leakage, damage, and loss — shall comply with this policy and practice activities to maintain the confidentiality, integrity, and availability of information assets.",
    policyHeading: "Basic Policy",
    principles: [
      "To protect information assets, we shall establish an information security policy and related regulations, conduct business in accordance with them, and comply with laws, regulations, and other standards related to information security, as well as contractual obligations with our customers.",
      "We shall establish clear criteria for analyzing and evaluating risks such as leakage, damage, and loss that exist for information assets, establish a systematic risk assessment methodology, and conduct regular risk assessments. Based on the results, we shall implement necessary and appropriate security measures.",
      "We shall establish an information security framework centered on designated officers and clarify the authority and responsibilities related to information security. We shall also conduct regular education, training, and awareness activities to ensure that all employees recognize the importance of information security and handle information assets appropriately.",
      "We shall regularly inspect and audit the status of compliance with the information security policy and the handling of information assets, and promptly take corrective action on any deficiencies or areas for improvement that are identified.",
      "We shall take appropriate measures against information security events and incidents, and establish response procedures in advance to minimize damage in the event of such occurrences, responding promptly and taking appropriate corrective action. In particular, for incidents that may cause business interruption, we shall establish a management framework, review it regularly, and ensure our business continuity.",
      "We shall establish an information security management system with defined objectives to realize our basic philosophy, implement it, and continuously review and improve it.",
    ],
    signature: "UNCHAIN Co., Ltd. — Representative Director",
    contactLabel: "For security-related inquiries, including vulnerability reports",
  },
};

const TermsOfUsePage = () => {
  const { lang } = useLang();
  const hero = heroText[lang];
  const c = content[lang];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section data-nav-theme="light" className="bg-background pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="container-site">
          <ScrollReveal>
            <span className="label text-light-label">{hero.label}</span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="heading-display text-light-heading mt-4 mb-6 whitespace-pre-line leading-[1.1]">
              {hero.heading}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="body-large text-light-body">{hero.date}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section data-nav-theme="light" className="bg-secondary section">
        <div className="container-site max-w-3xl">
          <div className="space-y-12">
            {/* Intro */}
            <ScrollReveal>
              <p className="body text-light-body leading-relaxed">{c.intro}</p>
            </ScrollReveal>

            {/* Principles */}
            <ScrollReveal>
              <div>
                <h2 className="heading-2 text-light-heading mb-8">{c.policyHeading}</h2>
                <ol className="list-none space-y-8">
                  {c.principles.map((text, i) => (
                    <li key={i}>
                      <p className="body text-light-body leading-relaxed">
                        <span className="font-semibold text-light-heading">{i + 1}.</span>{" "}
                        {text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            {/* Signature */}
            <ScrollReveal>
              <div className="pt-4">
                <p className="body text-light-heading font-medium">{c.signature}</p>
              </div>
            </ScrollReveal>

            {/* Contact */}
            <ScrollReveal>
              <div className="pt-4 border-t border-border">
                <p className="body text-light-body mb-2">{c.contactLabel}</p>
                <p className="body text-light-body">
                  <a
                    href="mailto:contact@the-unchain.com"
                    className="underline hover:text-primary transition-colors"
                  >
                    contact@the-unchain.com
                  </a>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfUsePage;

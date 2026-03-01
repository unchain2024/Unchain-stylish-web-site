import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/language";

const heroText = {
  ja: {
    label: "プライバシーポリシー",
    heading: "プライバシーポリシー",
    date: "制定日：2026年3月1日",
  },
  en: {
    label: "PRIVACY POLICY",
    heading: "Privacy Policy",
    date: "Effective: March 1, 2026",
  },
};

const content = {
  ja: {
    intro:
      "UNCHAIN株式会社（以下「当社」といいます。）は、当社が取得する個人情報（個人情報の保護に関する法律（平成十五年法律第五十七号、以下「個人情報保護法」といいます。）にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別できるもの又は個人識別符号が含まれるものを指します。）の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。",
    sections: [
      {
        title: "1. 個人情報取り扱いに関する基本方針",
        body: null,
        items: [
          "事業の内容および規模を考慮した適切な個人情報の取得、利用および提供を定めた社内規則を遵守します。",
          "個人情報の漏えい、滅失またはき損の防止措置を講ずると共に、万一の発生時には速やかな是正対策を実施します。",
          "個人情報の取扱いに関する法令、国が定める指針その他の規範を遵守します。",
          "お客様からの個人情報に関する苦情および相談に、誠実かつ迅速に対応します。",
          "個人情報管理の仕組みを継続的に改善します。",
        ],
        footer: null,
      },
      {
        title: "2. 個人情報等の取得",
        body: "当社は、個人情報保護法等その他の規範を遵守し、適法かつ公正な手段によってお客様から個人情報等を取得いたします。また、当社は、お客様の個人情報等を取得するときは、個人情報の利用目的等の必要事項について明示した上、当社の事業の範囲内で、その目的の達成に必要な限度において、適切な方法により個人情報等を取得いたします。なお、当社は機微情報を取得いたしません。",
        items: null,
        footer: null,
      },
      {
        title: "3. 個人情報の利用目的",
        body: "当社は、お客様から個人情報をご提供いただく場合には、お客様から承諾を得た場合又は関係法令等により例外と認められる場合を除き、以下の各号に定める当社事業目的の範囲において利用いたします。",
        items: [
          "ご登録またはお申し込みいただいたサービスなどを提供するため（社会的慣習による御通知・御挨拶、サービス提供に必要な関係者との連絡を含みます。）",
          "展示会、セミナーなどのイベントへのご案内のため",
          "当社が提供する商品・サービス及びキャンペーン等のご案内（電子メール、チラシ、その他ダイレクトメールの送付を含みます）のため",
          "広告・宣伝等その他マーケティング活動（広告効果の測定を含みます）を行うため",
          "アンケートやイベントなどにご協力・ご参加いただいた方に結果などを報告するため",
          "当社商品等の開発等に必要な需要動向、リサーチ情報等、各種情報の提供のため",
          "お客様からのお問い合わせに回答するため",
          "法令上の義務を履行するため",
          "当社が利用するシステムの開発及び改善のため",
          "その他、お客様との取引を適切かつ円滑に履行するために当社が必要と判断する業務のため",
          "前各号に附帯関連する目的達成のために必要な範囲で第三者に個人情報を提供するため（なお、ご本人からのお申し出がありましたら、第三者への提供は取り止めさせていただきます。）",
        ],
        footer: "なお当社は、お客様との通話を録音することがあります。",
      },
      {
        title: "4. 個人情報の安全管理",
        body: "当社は、個人情報の紛失、破壊、改ざん及び漏洩などのリスクに対して、個人情報の安全管理が図られるよう、内部規律の整備、組織体制の整備、従業員に対する適切な監督、不正アクセス等の防止などの対策を講じています。",
        items: null,
        footer: null,
      },
      {
        title: "5. 個人情報の取扱いの委託",
        body: "当社は、当社の業務の一部を外部に委託する場合があります。当該業務委託に伴いお客様の個人情報の取扱いの全部または一部を第三者に委託する場合、業務委託先において適切な保護措置が講じられていることを確認し、業務委託先に対して必要かつ適切な監督を行います。",
        items: null,
        footer: null,
      },
      {
        title: "6. 第三者開示及び提供",
        body: "当社は、「3. 個人情報の利用目的」「5. 個人情報の取扱いの委託」に規定する場合又は以下のいずれかに該当する場合を除き、お客様の個人情報を第三者へ開示又は提供いたしません。",
        items: [
          "お客様の同意がある場合",
          "法令に基づく場合",
          "人の生命、身体又は財産の保護のため必要な場合であって、お客様の同意を得ることが困難であるとき",
          "公衆衛生の向上又は児童の健全な育成の推進のために特に必要な場合であって、お客様の同意を得ることが困難であるとき",
          "国の機関若しくは地方公共団体又はその委託を受けた者が法令に定める事務を遂行することに対して協力する必要がある場合であって、お客様の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき",
          "合併、会社分割、営業譲渡その他の事由によってお客様の個人情報の提供を含む当社の事業の承継が行われるとき",
        ],
        footer: null,
      },
      {
        title: "7. ご登録内容の開示、修正および利用中止",
        body: null,
        items: [
          "当社では、ご本人のお申し出により、個人情報をご本人に開示します。その場合、当社所定の方法によって本人確認を行わせていただきます。ただし、開示することにより次のいずれかに該当する場合は、その全部又は一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。ご本人又は第三者の生命、身体、財産その他の権利利益を害するおそれがある場合、当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合、その他法令に違反することとなる場合",
          "ご本人に開示した個人情報に事実と異なる内容があった場合、ご本人の請求により、当社ではこれを直ちに修正します。",
          "当社は、ご本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、又は不正の手段により取得されたものであるという理由により、その利用の停止又は消去（以下、「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行い、その結果に基づき、個人情報の利用停止等を行い、その旨ご本人に通知します。但し、個人情報の利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって、ご本人の権利利益を保護するために必要なこれに代わるべき措置を採れる場合は、この代替策を講じます。",
        ],
        footer: null,
      },
      {
        title: "8. 通知・公表、本ポリシーの変更",
        body: "当社は、本ポリシーを当社ウェブサイト上に掲示、公表しています。当社は、利用者情報の取扱いに関する運用状況を適宜見直し、継続的な改善に努めるものとし、必要に応じて、本ポリシーを変更することがあります。変更した場合には、当社ウェブサイト上に掲載いたします。変更された本ポリシーは、掲載を開始した時点から適用されるものとします。なお、法令上利用者の同意が必要となるような内容の変更の場合は、当社所定の方法で利用者の同意を得るものとします。",
        items: null,
        footer: null,
      },
      {
        title: "9. お問い合わせ窓口",
        body: "ご意見、ご質問等のお申出その他利用者情報の取扱いに関するお問い合わせについては、下記の窓口までお願い致します。",
        items: null,
        footer: null,
        contact: { name: "UNCHAIN株式会社　プライバシーポリシー担当窓口", email: "contact@the-unchain.com" },
      },
      {
        title: "10. セキュリティ",
        body: "当社では、個人情報の管理にあたり相当の注意を尽くしますが、インターネットや電子メールの性質上、個人情報の秘密性を完全に保証することはできません。この点に留意してウェブサイトおよび電子メールをご利用ください。",
        items: null,
        footer: null,
      },
      {
        title: "11. アクセス履歴の取得",
        body: "当社ウェブサイトでは、ウェブサイトの保守やサービス改善を目的とし、お客様のアクセス履歴（アクセスログ）を記録しております。",
        items: null,
        footer: null,
      },
    ],
  },
  en: {
    intro:
      "UNCHAIN Co., Ltd. (hereinafter referred to as \"the Company\") hereby establishes this Privacy Policy (hereinafter referred to as \"this Policy\") regarding the handling of personal information (as defined under the Act on the Protection of Personal Information (Act No. 57 of 2003, hereinafter referred to as the \"Personal Information Protection Act\"), meaning information about a living individual that can identify a specific individual by name, date of birth, or other descriptions contained therein, or that includes a personal identification code) acquired by the Company.",
    sections: [
      {
        title: "1. Basic Policy on Handling Personal Information",
        body: null,
        items: [
          "We comply with internal rules that define the appropriate collection, use, and provision of personal information in consideration of the nature and scale of our business.",
          "We take measures to prevent the leakage, loss, or damage of personal information, and in the event of such an occurrence, we will promptly implement corrective measures.",
          "We comply with laws, government guidelines, and other standards relating to the handling of personal information.",
          "We respond sincerely and promptly to complaints and inquiries from customers regarding personal information.",
          "We continuously improve our personal information management systems.",
        ],
        footer: null,
      },
      {
        title: "2. Collection of Personal Information",
        body: "The Company complies with the Personal Information Protection Act and other standards, and collects personal information from customers through lawful and fair means. When collecting personal information, we clearly state the purpose of use and other necessary matters, and collect personal information by appropriate methods only to the extent necessary to achieve such purposes within the scope of our business. The Company does not collect sensitive information.",
        items: null,
        footer: null,
      },
      {
        title: "3. Purpose of Use of Personal Information",
        body: "When personal information is provided by customers, the Company uses it within the scope of the following business purposes, except where consent has been obtained from the customer or where exceptions are permitted by applicable laws and regulations.",
        items: [
          "To provide services that have been registered or applied for (including customary notifications and greetings, and communication with relevant parties necessary for service provision)",
          "To provide information about exhibitions, seminars, and other events",
          "To provide information about products, services, and campaigns offered by the Company (including sending emails, flyers, and other direct mail)",
          "To conduct advertising, promotional, and other marketing activities (including measuring advertising effectiveness)",
          "To report results to those who have cooperated with or participated in surveys, events, etc.",
          "To provide demand trends, research information, and other information necessary for the development of the Company's products",
          "To respond to customer inquiries",
          "To fulfill legal obligations",
          "To develop and improve systems used by the Company",
          "For other operations that the Company deems necessary to appropriately and smoothly fulfill transactions with customers",
          "To provide personal information to third parties to the extent necessary to achieve purposes incidental to the foregoing items (please note that if you request us to do so, we will cease providing your information to third parties)",
        ],
        footer: "Please note that the Company may record telephone conversations with customers.",
      },
      {
        title: "4. Security Management of Personal Information",
        body: "The Company takes measures to ensure the secure management of personal information against risks such as loss, destruction, alteration, and leakage, including establishing internal rules, organizing management structures, appropriately supervising employees, and preventing unauthorized access.",
        items: null,
        footer: null,
      },
      {
        title: "5. Outsourcing of Personal Information Handling",
        body: "The Company may outsource part of its operations to external parties. When outsourcing the handling of customer personal information in whole or in part to a third party in connection with such outsourcing, the Company confirms that appropriate protective measures are in place at the outsourcing partner and exercises necessary and appropriate supervision over such partner.",
        items: null,
        footer: null,
      },
      {
        title: "6. Disclosure and Provision to Third Parties",
        body: "The Company will not disclose or provide customer personal information to third parties except as provided in \"3. Purpose of Use of Personal Information\" and \"5. Outsourcing of Personal Information Handling,\" or in any of the following cases.",
        items: [
          "When the customer has given consent",
          "When required by law",
          "When necessary for the protection of life, body, or property of an individual and it is difficult to obtain the customer's consent",
          "When particularly necessary for improving public health or promoting the sound development of children and it is difficult to obtain the customer's consent",
          "When it is necessary to cooperate with a national or local government body or a person entrusted by such body in performing duties prescribed by law, and obtaining the customer's consent may impede the performance of such duties",
          "When the Company's business, including the provision of customer personal information, is transferred due to a merger, corporate split, business transfer, or other reason",
        ],
        footer: null,
      },
      {
        title: "7. Disclosure, Correction, and Suspension of Use of Registered Information",
        body: null,
        items: [
          "Upon request by the individual, the Company will disclose personal information to that individual. In such cases, we will verify the identity of the individual by the Company's prescribed method. However, if disclosure falls under any of the following, we may choose not to disclose all or part of the information, and will notify the individual without delay if we decide not to disclose: cases where there is a risk of harm to the life, body, property, or other rights and interests of the individual or a third party; cases where there is a risk of significantly impeding the proper conduct of the Company's business; or cases where disclosure would violate the law.",
          "If the personal information disclosed to the individual contains content that differs from the facts, the Company will promptly correct it upon the individual's request.",
          "If the individual requests the suspension or deletion of use (hereinafter referred to as \"suspension of use, etc.\") of personal information on the grounds that it has been handled beyond the scope of the purpose of use or that it was obtained by improper means, the Company will conduct a necessary investigation without delay and, based on the results, will suspend the use of the personal information and notify the individual accordingly. However, if the suspension of use involves significant costs or is otherwise difficult, and alternative measures can be taken to protect the individual's rights and interests, such alternative measures will be implemented.",
        ],
        footer: null,
      },
      {
        title: "8. Notification, Publication, and Changes to This Policy",
        body: "The Company posts and publishes this Policy on the Company's website. The Company will review the operational status of user information handling as appropriate and strive for continuous improvement, and may change this Policy as necessary. Any changes will be posted on the Company's website. The revised Policy shall take effect from the time it is posted. In the event of changes that require user consent under applicable law, the Company will obtain user consent by its prescribed method.",
        items: null,
        footer: null,
      },
      {
        title: "9. Contact",
        body: "For any opinions, questions, or other inquiries regarding the handling of user information, please contact the following.",
        items: null,
        footer: null,
        contact: { name: "UNCHAIN Co., Ltd. — Privacy Policy Inquiry Desk", email: "contact@the-unchain.com" },
      },
      {
        title: "10. Security",
        body: "While the Company exercises due care in the management of personal information, due to the nature of the internet and email, we cannot fully guarantee the confidentiality of personal information. Please be aware of this when using our website and email.",
        items: null,
        footer: null,
      },
      {
        title: "11. Access Logs",
        body: "The Company's website records customer access history (access logs) for the purpose of website maintenance and service improvement.",
        items: null,
        footer: null,
      },
    ],
  },
};

const PrivacyPolicyPage = () => {
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
            <h1 className="heading-display text-light-heading mt-4 mb-6">
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

            {/* Sections */}
            {c.sections.map((s, i) => (
              <ScrollReveal key={i}>
                <div>
                  <h2 className="heading-3 text-light-heading mb-4">{s.title}</h2>
                  {s.body && (
                    <p className={`body text-light-body leading-relaxed${s.items ? " mb-4" : ""}`}>
                      {s.body}
                    </p>
                  )}
                  {s.items && (
                    <ul className="list-disc pl-6 space-y-2">
                      {s.items.map((item, j) => (
                        <li key={j} className="body text-light-body leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.footer && (
                    <p className="body text-light-body leading-relaxed mt-4">{s.footer}</p>
                  )}
                  {s.contact && (
                    <div className="mt-4">
                      <p className="body text-light-heading font-medium">{s.contact.name}</p>
                      <p className="body text-light-body">
                        <a
                          href={`mailto:${s.contact.email}`}
                          className="underline hover:text-primary transition-colors"
                        >
                          {s.contact.email}
                        </a>
                      </p>
                    </div>
                  )}
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

export default PrivacyPolicyPage;

import { useState } from "react";
import { ArrowRight, Check, Mail, MapPin } from "lucide-react";
import { useLang } from "@/lib/language";
import { PageHero, Reveal } from "@/components/yapp/chrome";

const copy = {
  ja: {
    hero: { label: "お問い合わせ", title: "お気軽にご相談ください", sub: "初めてAIを検討される方も、既存の取り組みを拡大したい方も、お力になります。" },
    name: "お名前", company: "会社名", email: "メールアドレス", category: "お問い合わせ内容", message: "メッセージ",
    messagePh: "プロジェクトやご質問についてお聞かせください...",
    privacy: "個人情報の取り扱いに同意します",
    submit: "送信する", sending: "送信中...",
    successTitle: "送信完了", successMsg: "お問い合わせありがとうございます。2営業日以内にご連絡いたします。",
    categories: [
      { value: "services", label: "サービス＆ソリューション" },
      { value: "partnerships", label: "パートナーシップ＆コラボレーション" },
      { value: "seminar", label: "セミナー＆イベント参加" },
      { value: "other", label: "メディア＆その他" },
    ],
    infoHeading: "その他の連絡先",
    addressLabel: "所在地",
    address: "東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F-C",
    err: "送信に失敗しました。時間をおいて再度お試しください。",
  },
  en: {
    hero: { label: "Contact", title: "Let's talk", sub: "Whether you're exploring AI for the first time or scaling an existing initiative, we're here to help." },
    name: "Name", company: "Company", email: "Email", category: "What can we help with?", message: "Message",
    messagePh: "Tell us about your project or question...",
    privacy: "I agree to the handling of my personal information",
    submit: "Send Message", sending: "Sending...",
    successTitle: "Message sent", successMsg: "Thank you for reaching out. We'll get back to you within 2 business days.",
    categories: [
      { value: "services", label: "Services & Solutions" },
      { value: "partnerships", label: "Partnerships & Collaboration" },
      { value: "seminar", label: "Seminar & Event Registration" },
      { value: "other", label: "Media & Other" },
    ],
    infoHeading: "Other ways to reach us",
    addressLabel: "Address",
    address: "2F-C Shibuya Dogenzaka Tokyu Bldg, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo",
    err: "Failed to send message. Please try again later.",
  },
} as const;

export default function YappContact() {
  const { lang } = useLang();
  const t = copy[lang];
  const [form, setForm] = useState({ name: "", company: "", email: "", category: "", message: "", privacy: false });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string | boolean) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "dadc5e81-7afc-4929-bcbb-a92765419252",
          subject: `New Contact: ${form.category || "General"} — ${form.name}`,
          from_name: form.name,
          name: form.name,
          company: form.company,
          email: form.email,
          category: form.category,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else alert(data.message || t.err);
    } catch {
      alert(t.err);
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-[8px] border border-[#e0e3ea] bg-white px-4 py-3 text-sm text-[#1c2438] outline-none transition-colors placeholder:text-[#acb4c1] focus:border-[#00a9e0]";
  const labelCls = "mb-2 block text-sm font-semibold";

  if (submitted) {
    return (
      <>
        <section className="yapp-section flex min-h-[60vh] items-center">
          <div className="yapp-container max-w-xl text-center">
            <Reveal>
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#00a9e0]/10 text-[#00a9e0]">
                <Check className="h-8 w-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{t.successTitle}</h1>
              <p className="mt-4 yapp-secondary">{t.successMsg}</p>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero label={t.hero.label} title={t.hero.title} subtitle={t.hero.sub} />

      <section className="yapp-section">
        <div className="yapp-container grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <Reveal>
            <form onSubmit={handleSubmit} className="yapp-card space-y-6 p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>{t.name} <span className="text-[#00a9e0]">*</span></label>
                  <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder={t.name} />
                </div>
                <div>
                  <label className={labelCls}>{t.company} <span className="text-[#00a9e0]">*</span></label>
                  <input type="text" required value={form.company} onChange={(e) => update("company", e.target.value)} className={inputCls} placeholder={t.company} />
                </div>
              </div>
              <div>
                <label className={labelCls}>{t.email} <span className="text-[#00a9e0]">*</span></label>
                <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} placeholder="you@company.com" />
              </div>
              <div>
                <label className={labelCls}>{t.category}</label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {t.categories.map((c) => (
                    <label key={c.value} className={`flex cursor-pointer items-center gap-2.5 rounded-[8px] border px-3 py-2.5 text-sm transition-colors ${form.category === c.label ? "border-[#00a9e0] bg-[#00a9e0]/5 text-[#1c2438]" : "border-[#e0e3ea] yapp-secondary hover:border-[#00a9e0]"}`}>
                      <input type="radio" name="category" value={c.label} checked={form.category === c.label} onChange={(e) => update("category", e.target.value)} className="accent-[#00a9e0]" />
                      {c.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelCls}>{t.message} <span className="text-[#00a9e0]">*</span></label>
                <textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className={inputCls} placeholder={t.messagePh} />
              </div>
              <label className="flex items-start gap-2.5 text-sm yapp-secondary">
                <input type="checkbox" required checked={form.privacy} onChange={(e) => update("privacy", e.target.checked)} className="mt-0.5 accent-[#00a9e0]" />
                {t.privacy}
              </label>
              <button type="submit" disabled={sending} className="yapp-btn yapp-btn-primary w-full justify-center disabled:opacity-60">
                {sending ? t.sending : t.submit}
                {!sending && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </Reveal>

          {/* Info */}
          <Reveal i={1}>
            <div className="yapp-card h-full p-8">
              <h2 className="text-lg font-bold">{t.infoHeading}</h2>
              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Email</div>
                    <a href="mailto:contact@the-unchain.com" className="text-sm text-[#00a9e0] hover:underline">contact@the-unchain.com</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-[#00a9e0]/10 text-[#00a9e0]">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{t.addressLabel}</div>
                    <p className="text-sm yapp-secondary leading-relaxed">{t.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

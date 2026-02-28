import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/language";

const heroText = {
  ja: {
    label: "お問い合わせ",
    heading: "お気軽にご相談ください",
    description:
      "ぜひお気軽にお問い合わせください。初めてAIを検討される方も、既存の取り組みを拡大したい方も、お力になります。",
  },
  en: {
    label: "CONTACT",
    heading: "Let's talk",
    description:
      "We'd love to hear from you. Whether you're exploring AI for the first time or scaling an existing initiative, we're here to help.",
  },
};

const formLabels = {
  ja: {
    name: "お名前",
    namePlaceholder: "お名前",
    company: "会社名",
    companyPlaceholder: "会社名",
    email: "メールアドレス",
    emailPlaceholder: "you@company.com",
    category: "お問い合わせ内容",
    message: "メッセージ",
    messagePlaceholder: "プロジェクトやご質問についてお聞かせください...",
    privacy: "個人情報の取り扱いに同意します",
    submit: "送信する",
    sending: "送信中...",
    successTitle: "送信完了",
    successMessage: "お問い合わせありがとうございます。2営業日以内にご連絡いたします。",
  },
  en: {
    name: "Name",
    namePlaceholder: "Your name",
    company: "Company",
    companyPlaceholder: "Your company",
    email: "Email",
    emailPlaceholder: "you@company.com",
    category: "What can we help with?",
    message: "Message",
    messagePlaceholder: "Tell us about your project or question...",
    privacy: "I agree to the handling of my personal information",
    submit: "Send Message",
    sending: "Sending...",
    successTitle: "Message sent",
    successMessage: "Thank you for reaching out. We'll get back to you within 2 business days.",
  },
};

const categoriesData = {
  ja: [
    { value: "services", label: "サービス＆ソリューション" },
    { value: "partnerships", label: "パートナーシップ＆コラボレーション" },
    { value: "seminar", label: "セミナー＆イベント参加" },
    { value: "other", label: "メディア＆その他" },
  ],
  en: [
    { value: "services", label: "Services & Solutions" },
    { value: "partnerships", label: "Partnerships & Collaboration" },
    { value: "seminar", label: "Seminar & Event Registration" },
    { value: "other", label: "Media & Other" },
  ],
};

const ContactPage = () => {
  const { lang } = useLang();
  const hero = heroText[lang];
  const labels = formLabels[lang];
  const categories = categoriesData[lang];

  const [form, setForm] = useState({
    name: "", company: "", email: "", category: "", message: "", privacy: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

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
      else alert(data.message || "Something went wrong. Please try again.");
    } catch {
      alert("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section data-nav-theme="light" className="bg-background min-h-[80vh] flex items-center">
          <div className="container-site text-center">
            <ScrollReveal>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/10 border border-primary/20"
              >
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h1 className="heading-display text-light-heading mb-3">
                {labels.successTitle}
              </h1>
              <p className="body-large text-light-body max-w-md mx-auto">
                {labels.successMessage}
              </p>
            </ScrollReveal>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section data-nav-theme="light" className="bg-background pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="container-site max-w-3xl text-center">
          <ScrollReveal>
            <span className="label text-light-label">
              {hero.label}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="heading-display text-light-heading mt-4 mb-6">
              {hero.heading}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="body-large text-light-body leading-relaxed">
              {hero.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form */}
      <section data-nav-theme="light" className="bg-background pb-24 lg:pb-32 xl:pb-40">
        <div className="container-site max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name + Company */}
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <label className="block label text-light-label mb-3">
                    {labels.name} <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder={labels.namePlaceholder}
                    className="w-full bg-transparent border-0 border-b-2 border-border pb-3 body-large text-light-heading outline-none transition-all duration-300 placeholder:text-muted-foreground/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block label text-light-label mb-3">
                    {labels.company} <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text" required value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder={labels.companyPlaceholder}
                    className="w-full bg-transparent border-0 border-b-2 border-border pb-3 body-large text-light-heading outline-none transition-all duration-300 placeholder:text-muted-foreground/30 focus:border-primary"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal delay={0.05}>
              <div>
                <label className="block label text-light-label mb-3">
                  {labels.email} <span className="text-primary">*</span>
                </label>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder={labels.emailPlaceholder}
                  className="w-full bg-transparent border-0 border-b-2 border-border pb-3 body-large text-light-heading outline-none transition-all duration-300 placeholder:text-muted-foreground/30 focus:border-primary"
                />
              </div>
            </ScrollReveal>

            {/* Category */}
            <ScrollReveal delay={0.1}>
              <div>
                <label className="block label text-light-label mb-4">
                  {labels.category} <span className="text-primary">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => {
                    const selected = form.category === cat.value;
                    return (
                      <label key={cat.value} className="cursor-pointer">
                        <input type="radio" name="category" value={cat.value}
                          checked={selected}
                          onChange={(e) => update("category", e.target.value)}
                          className="sr-only" required />
                        <span className={`inline-block px-5 py-2.5 rounded-full body font-medium border transition-all duration-300 ${
                          selected
                            ? "border-primary/50 bg-primary/10 text-primary"
                            : "border-border text-light-label hover:border-foreground/20 hover:text-light-body"
                        }`}>
                          {cat.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Message */}
            <ScrollReveal delay={0.15}>
              <div>
                <label className="block label text-light-label mb-3">
                  {labels.message} <span className="text-primary">*</span>
                </label>
                <textarea
                  required value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder={labels.messagePlaceholder}
                  rows={5}
                  className="w-full bg-transparent border-0 border-b-2 border-border pb-3 body-large text-light-heading outline-none transition-all duration-300 resize-none placeholder:text-muted-foreground/30 focus:border-primary"
                />
              </div>
            </ScrollReveal>

            {/* Privacy + Submit */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input type="checkbox" required checked={form.privacy}
                      onChange={(e) => update("privacy", e.target.checked)}
                      className="sr-only" />
                    <div className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center ${
                      form.privacy ? "border-primary bg-primary/20" : "border-border group-hover:border-foreground/30"
                    }`}>
                      {form.privacy && (
                        <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="body text-light-label group-hover:text-light-body transition-colors">
                    {labels.privacy}
                  </span>
                </label>

                <button
                  type="submit" disabled={sending}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground/80 rounded-full animate-spin" />
                      {labels.sending}
                    </>
                  ) : (
                    <>
                      {labels.submit}
                      <ArrowRight className="w-[1em] h-[1em]" />
                    </>
                  )}
                </button>
              </div>
            </ScrollReveal>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const sectionText = {
  ja: {
    label: "お問い合わせ",
    heading: "UNCHAINで組織を\n解き放ちませんか？",
    subtitle: "AIがあなたのミッションにどう貢献できるか、お話ししましょう。",
    ctaPrimary: "お問い合わせ",
    ctaSecondary: "私たちについて",
  },
  en: {
    label: "CONTACT",
    heading: "Ready to UNCHAIN your\norganization?",
    subtitle: "Let's talk about how AI can serve your mission.",
    ctaPrimary: "Contact Us",
    ctaSecondary: "Learn more about us",
  },
};

const ContactSection = () => {
  const { lang } = useLang();
  const t = sectionText[lang];

  return (
    <section
      id="contact"
      data-nav-theme="light"
      className="bg-secondary min-h-screen flex items-center"
    >
      <div className="container-site w-full">
        <div className="text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="label text-light-label">
              {t.label}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="heading-1 text-light-heading mt-6 mb-8 whitespace-pre-line leading-[1.1]">
              {t.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="body-large text-light-body mb-12">
              {t.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/contact"
                className="btn-primary"
              >
                {t.ctaPrimary}
                <ArrowRight className="w-[1em] h-[1em]" />
              </Link>
              <Link
                to="/about"
                className="btn-outline border-foreground/20 text-light-heading hover:bg-foreground hover:text-background"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

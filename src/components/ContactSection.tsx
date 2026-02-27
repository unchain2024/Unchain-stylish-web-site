import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const sectionText = {
  ja: {
    label: "CONTACT",
    heading: "Ready to UNCHAIN your\norganization?",
    subtitle: "AIがあなたのミッションにどう貢献できるか、お話ししましょう。",
    ctaPrimary: "Contact Us",
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
      className="bg-background min-h-screen flex items-center"
    >
      <div className="w-full px-[5vw]">
        <div className="text-center max-w-[60vw] mx-auto">
          <ScrollReveal>
            <span className="text-[calc(1*var(--vf))] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {t.label}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-[calc(3.5*var(--vf))] font-black text-foreground mt-[2vh] mb-[3vh] whitespace-pre-line leading-[1.1]">
              {t.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-[calc(1.15*var(--vf))] text-muted-foreground mb-[5vh]">
              {t.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex items-center justify-center gap-[1.5vw] flex-wrap">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-[calc(1*var(--vf))] font-medium hover:opacity-90 transition-all duration-300"
              >
                {t.ctaPrimary}
                <ArrowRight className="w-[1em] h-[1em]" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-foreground/20 text-foreground text-[calc(1*var(--vf))] font-medium hover:bg-foreground hover:text-background transition-all duration-300"
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

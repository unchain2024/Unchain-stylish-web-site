import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const content = {
  ja: {
    label: "OUR MISSION",
    heading: "UNCHAIN Your\nMission",
    description:
      "すべての組織には解放すべき重要な使命があると私たちは信じています。技術はその使命に仕えるべきであり、それを置き換えるべきではありません。",
    cta: "私たちについて",
  },
  en: {
    label: "OUR MISSION",
    heading: "UNCHAIN Your\nMission",
    description:
      "We believe every organization has a crucial mission to unchain. Technology should serve that mission, not replace it.",
    cta: "Learn more about us",
  },
};

const MissionSection = () => {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section
      id="mission"
      data-nav-theme="light"
      className="bg-background min-h-screen flex items-center"
    >
      <div className="w-full px-[5vw]">
        <div className="flex flex-col md:flex-row items-center gap-[4vw]">
          {/* Left — text content */}
          <div className="flex-1 md:max-w-[50%]">
            <ScrollReveal>
              <span className="text-[calc(1*var(--vf))] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {t.label}
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-[calc(3.5*var(--vf))] font-black text-foreground leading-[1.05] mt-[2vh] mb-[3vh] whitespace-pre-line">
                {t.heading}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[calc(1.15*var(--vf))] text-muted-foreground leading-relaxed mb-[4vh] max-w-[38vw]">
                {t.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-foreground/20 text-foreground text-[calc(1*var(--vf))] font-medium hover:bg-foreground hover:text-background transition-all duration-300"
              >
                {t.cta}
                <ArrowRight className="w-[1.2em] h-[1.2em]" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right — video */}
          <div className="flex-1 md:max-w-[50%]">
            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <video
                  src="/mission-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

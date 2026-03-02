import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const content = {
  ja: {
    label: "私たちの使命",
    heading: "UNCHAINの\nミッション",
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
  const { lang, localePath } = useLang();
  const t = content[lang];

  return (
    <section
      id="mission"
      data-nav-theme="light"
      className="bg-background section flex items-center min-h-0 md:min-h-screen"
    >
      <div className="container-site w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 md:max-w-[50%]">
            <ScrollReveal>
              <span className="label text-light-label">{t.label}</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-1 text-light-heading mt-4 mb-6 whitespace-pre-line">
                {t.heading}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="body-large text-light-body mb-8 max-w-lg">{t.description}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <Link
                to={localePath("/about")}
                className="btn-outline border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
              >
                {t.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
          <div className="flex-1 md:max-w-[50%]">
            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <video src="/mission-video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

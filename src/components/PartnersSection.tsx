import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

const partnersRow1 = [
  "AWS Startups",
  "Microsoft for Startups Founders Hub",
  "CIC",
  "J-StarX",
  "Institute for Business Innovation",
  "NVIDIA",
];

const partnersRow2 = [
  "Microsoft for Startups Founders Hub",
  "AWS Startups",
  "NVIDIA",
  "Institute for Business Innovation",
  "J-StarX",
  "CIC",
];

const sectionText = {
  ja: { label: "ECOSYSTEM", heading: "世界トップクラスのパートナー" },
  en: { label: "ECOSYSTEM", heading: "Backed by world-class partners" },
};

const PartnerCard = ({ name }: { name: string }) => (
  <div className="flex-shrink-0 w-[14vw] min-w-[160px] h-[5vw] min-h-[60px] rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center px-4">
    <span className="text-[calc(0.9*var(--vf))] font-semibold text-muted-foreground text-center leading-tight">
      {name}
    </span>
  </div>
);

const PartnersSection = () => {
  const { lang } = useLang();
  const t = sectionText[lang];

  return (
    <section data-nav-theme="light" className="bg-background py-[10vh] overflow-hidden">
      <div className="w-full px-[5vw] mb-[6vh]">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-[calc(1*var(--vf))] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {t.label}
            </span>
            <h2 className="text-[calc(3.5*var(--vf))] font-black text-foreground mt-[1vh]">
              {t.heading}
            </h2>
          </div>
        </ScrollReveal>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-[1.5vw]">
        <motion.div
          className="flex gap-[1.5vw]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...partnersRow1, ...partnersRow1].map((name, i) => (
            <PartnerCard key={`r1-${i}`} name={name} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right */}
      <div>
        <motion.div
          className="flex gap-[1.5vw]"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...partnersRow2, ...partnersRow2].map((name, i) => (
            <PartnerCard key={`r2-${i}`} name={name} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;

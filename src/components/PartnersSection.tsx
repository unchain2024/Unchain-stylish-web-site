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
  ja: { label: "エコシステム", heading: "世界トップクラスのパートナー" },
  en: { label: "ECOSYSTEM", heading: "Backed by world-class partners" },
};

const PartnerCard = ({ name }: { name: string }) => (
  <div className="flex-shrink-0 w-[14vw] min-w-[160px] h-[5vw] min-h-[60px] rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center px-4">
    <span className="body font-semibold text-light-body text-center leading-tight">
      {name}
    </span>
  </div>
);

const PartnersSection = () => {
  const { lang } = useLang();
  const t = sectionText[lang];

  return (
    <section data-nav-theme="light" className="bg-secondary section overflow-hidden">
      <div className="container-site mb-12 lg:mb-16">
        <ScrollReveal>
          <div className="text-center">
            <span className="label text-light-label">
              {t.label}
            </span>
            <h2 className="heading-1 text-light-heading mt-3">
              {t.heading}
            </h2>
          </div>
        </ScrollReveal>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4">
        <motion.div
          className="flex gap-4"
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
          className="flex gap-4"
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

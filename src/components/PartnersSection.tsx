import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

import awsLogo from "@/assets/partners/aws.webp";
import microsoftLogo from "@/assets/partners/microsoft.webp";
import cicLogo from "@/assets/partners/cic.webp";
import jstarxLogo from "@/assets/partners/jstarx.webp";
import ibiLogo from "@/assets/partners/ibi.webp";
import nvidiaLogo from "@/assets/partners/nvidia.webp";
import ucbLogo from "@/assets/partners/ucberkeley.png";

const partnersRow1 = [
  { name: "AWS Startups", logo: awsLogo },
  { name: "Microsoft for Startups", logo: microsoftLogo },
  { name: "CIC", logo: cicLogo },
  { name: "J-StarX", logo: jstarxLogo },
  { name: "IBI", logo: ibiLogo },
  { name: "NVIDIA", logo: nvidiaLogo },
  { name: "UC Berkeley", logo: ucbLogo },
];

const partnersRow2 = [
  { name: "Microsoft for Startups", logo: microsoftLogo },
  { name: "AWS Startups", logo: awsLogo },
  { name: "NVIDIA", logo: nvidiaLogo },
  { name: "IBI", logo: ibiLogo },
  { name: "J-StarX", logo: jstarxLogo },
  { name: "CIC", logo: cicLogo },
  { name: "UC Berkeley", logo: ucbLogo },
];

const sectionText = {
  ja: { label: "エコシステム", heading: "世界トップクラスのパートナー" },
  en: { label: "ECOSYSTEM", heading: "Backed by world-class partners" },
};

const PartnerCard = ({ name, logo }: { name: string; logo: string }) => (
  <div className="flex-shrink-0 w-[40vw] sm:w-[14vw] min-w-[130px] sm:min-w-[160px] h-[12vw] sm:h-[5vw] min-h-[50px] sm:min-h-[60px] rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center px-6">
    <img src={logo} alt={name} className="max-h-[70%] max-w-[80%] object-contain" />
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
          {[...partnersRow1, ...partnersRow1].map((p, i) => (
            <PartnerCard key={`r1-${i}`} name={p.name} logo={p.logo} />
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
          {[...partnersRow2, ...partnersRow2].map((p, i) => (
            <PartnerCard key={`r2-${i}`} name={p.name} logo={p.logo} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;

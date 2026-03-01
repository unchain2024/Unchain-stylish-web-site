import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";
import logoWhite from "@/assets/logo-white.png";

const footerLinks = {
  ja: [
    { label: "会社概要", href: "/about" },
    { label: "採用情報", href: "/career" },
    { label: "お問い合わせ", href: "/contact" },
    { label: "プライバシーポリシー", href: "#" },
    { label: "利用規約", href: "#" },
  ],
  en: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/career" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
  ],
};

const copyrightText = {
  ja: "UNCHAIN株式会社",
  en: "UNCHAIN Inc.",
};

const Footer = () => {
  const { lang } = useLang();
  const links = footerLinks[lang];

  return (
    <footer data-nav-theme="dark" className="bg-black flex flex-col justify-center py-16 lg:py-20">
      {/* Top area – logo + socials */}
      <div className="container-site flex flex-col items-center pb-10">
        <ScrollReveal>
          <img src={logoWhite} alt="UNCHAIN" className="h-14 w-auto mb-10" />
        </ScrollReveal>

        <div className="flex items-center gap-6">
          <a href="#" className="text-dark-label hover:text-white transition-colors">
            <Twitter size={28} />
          </a>
          <a href="#" className="text-dark-label hover:text-white transition-colors">
            <Instagram size={28} />
          </a>
          <a href="#" className="text-dark-label hover:text-white transition-colors">
            <Youtube size={28} />
          </a>
          <a href="#" className="text-dark-label hover:text-white transition-colors">
            <Linkedin size={28} />
          </a>
        </div>
      </div>

      {/* Links row */}
      <div className="border-t border-white/10">
        <div className="container-site py-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="body text-dark-label hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="body text-dark-label hover:text-white transition-colors"
              >
                {link.label}
              </a>
            )
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="container-site pb-4 pt-2 text-center">
        <p className="body text-dark-label">
          Copyright {new Date().getFullYear()} {copyrightText[lang]} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

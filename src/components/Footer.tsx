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
    { label: "プライバシーポリシー", href: "/privacy-policy" },
    { label: "利用規約", href: "/terms-of-use" },
  ],
  en: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/career" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
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
          {/* X (Twitter) */}
          <a href="https://x.com/theunchainai" target="_blank" rel="noopener noreferrer" className="text-dark-label hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* Medium */}
          <a href="https://medium.com/@unchain_the_world" target="_blank" rel="noopener noreferrer" className="text-dark-label hover:text-white transition-colors">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/company/unchain-inc/" target="_blank" rel="noopener noreferrer" className="text-dark-label hover:text-white transition-colors">
            <Linkedin size={24} />
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

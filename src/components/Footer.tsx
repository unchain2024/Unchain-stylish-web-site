import { Link } from "react-router-dom";
import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/language";

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
    <footer data-nav-theme="dark" className="bg-black flex flex-col justify-center py-[8vh]">
      {/* Top area – logo + socials */}
      <div className="w-full px-[5vw] flex flex-col items-center pb-[4vh]">
        <ScrollReveal>
          <p className="font-black text-[calc(3.5*var(--vf))] tracking-[0.2em] text-white mb-[5vh]">
            UNCHAIN
          </p>
        </ScrollReveal>

        <div className="flex items-center gap-[2vw]">
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Twitter size={28} />
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Instagram size={28} />
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Youtube size={28} />
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Linkedin size={28} />
          </a>
        </div>
      </div>

      {/* Links row */}
      <div className="border-t border-white/10">
        <div className="w-full px-[5vw] py-[2vh] flex flex-wrap justify-center gap-x-[2vw] gap-y-2">
          {links.map((link) => (
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-[calc(0.9*var(--vf))] text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-[calc(0.9*var(--vf))] text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            )
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full px-[5vw] pb-[2vh] pt-[1vh] text-center">
        <p className="text-[calc(0.9*var(--vf))] text-white/30">
          Copyright {new Date().getFullYear()} {copyrightText[lang]} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

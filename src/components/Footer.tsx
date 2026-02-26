import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const footerLinks = [
  "会社概要",
  "採用情報",
  "お問い合わせ",
  "プライバシーポリシー",
  "利用規約",
];

const Footer = () => {
  return (
    <footer className="section-dark h-screen flex flex-col justify-center">
      {/* Top area – logo + socials */}
      <div className="w-full px-[5vw] flex flex-col items-center flex-1 justify-center">
        <p className="font-black text-[clamp(2rem,4vw,4rem)] tracking-[0.2em] text-dark-fg mb-[5vh]">
          UNCHAIN
        </p>

        <div className="flex items-center gap-[2vw] mb-[5vh]">
          <a href="#" className="text-dark-muted hover:text-dark-fg transition-colors">
            <Twitter size={28} />
          </a>
          <a href="#" className="text-dark-muted hover:text-dark-fg transition-colors">
            <Instagram size={28} />
          </a>
          <a href="#" className="text-dark-muted hover:text-dark-fg transition-colors">
            <Youtube size={28} />
          </a>
          <a href="#" className="text-dark-muted hover:text-dark-fg transition-colors">
            <Linkedin size={28} />
          </a>
        </div>
      </div>

      {/* Links row */}
      <div className="border-t border-dark-muted/20">
        <div className="w-full px-[5vw] py-[2vh] flex flex-wrap justify-center gap-x-[2vw] gap-y-2">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[clamp(0.6rem,0.8vw,0.875rem)] text-dark-muted hover:text-dark-fg transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full px-[5vw] pb-[2vh] pt-[1vh] text-center">
        <p className="text-[clamp(0.6rem,0.8vw,0.875rem)] text-dark-muted">
          Copyright {new Date().getFullYear()} UNCHAIN株式会社 All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useLang } from "@/lib/language";

const barText = {
  ja: {
    message: "UNCHAINがプレシードで3500万円を調達",
    cta: "詳しく見る →",
  },
  en: {
    message: "UNCHAIN raises ¥35M in Pre-Seed",
    cta: "Read more →",
  },
};

const AnnouncementBar = ({ onVisibilityChange }: { onVisibilityChange?: (visible: boolean) => void }) => {
  const { lang, localePath } = useLang();
  const t = barText[lang];
  const [dismissed, setDismissed] = useState(() =>
    sessionStorage.getItem("announcement-dismissed") === "true"
  );

  if (dismissed) return null;

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    sessionStorage.setItem("announcement-dismissed", "true");
    onVisibilityChange?.(false);
  };

  return (
    <div className="relative bg-black h-10">
      <Link
        to={localePath("/news")}
        className="flex items-center justify-center h-full px-12 hover:opacity-80 transition-opacity"
      >
        <span className="text-sm font-semibold text-white tracking-wide">
          {t.message}
        </span>
        <span className="text-xs text-white/60 ml-4">
          {t.cta}
        </span>
      </Link>
      <button
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default AnnouncementBar;

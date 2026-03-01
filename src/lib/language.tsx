import { createContext, useContext, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Lang = "ja" | "en";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  localePath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ja",
  toggleLang: () => {},
  localePath: (p) => p,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const lang: Lang = location.pathname.startsWith("/en") ? "en" : "ja";

  const localePath = (path: string) => {
    if (lang === "en") {
      return path === "/" ? "/en" : `/en${path}`;
    }
    return path;
  };

  const toggleLang = () => {
    const currentPath = location.pathname;
    if (lang === "en") {
      // Strip /en prefix to go to Japanese
      const jaPath = currentPath.replace(/^\/en/, "") || "/";
      navigate(jaPath);
    } else {
      // Add /en prefix to go to English
      const enPath = currentPath === "/" ? "/en" : `/en${currentPath}`;
      navigate(enPath);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, localePath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);

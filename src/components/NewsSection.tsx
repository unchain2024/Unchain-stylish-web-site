import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroMain from "@/assets/hero-main.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import neuronVisual from "@/assets/neuron-visual.png";
import tokyoBg from "@/assets/tokyo-bg.png";

const newsItems = [
  {
    image: heroMain,
    title: "UNCHAIN、Forbes Japan AI 50に選出",
    subtitle: "ファイナリスト10作品と学生賞を発表",
  },
  {
    image: hero2,
    title: "NEURONプラットフォーム正式リリース",
    subtitle: "クリエイティブアドバイザーに就任",
  },
  {
    image: hero3,
    title: "NVIDIAインセプションプログラムに採択",
    subtitle: "新ミッションに掲げ、さらなる挑戦へ",
  },
  {
    image: neuronVisual,
    title: "シリーズAラウンド完了のお知らせ",
    subtitle: "新プロジェクト始動、企業賞計17個占める",
  },
  {
    image: tokyoBg,
    title: "AI戦略コンサルティング事業を開始",
    subtitle: "組織型AIの社会実装を加速",
  },
];

const NewsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="news" className="bg-background h-[70vh] flex items-center overflow-hidden" ref={ref}>
      <div className="w-full px-[5vw]">
        {/* Header */}
        <div className="flex items-center justify-between mb-[3vh]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[clamp(1.5rem,3.5vw,3.75rem)] font-bold text-foreground"
          >
            NEWS
          </motion.h2>

          <div className="flex gap-[0.5vw]">
            <button
              onClick={() => scroll("left")}
              className="w-[3vw] h-[3vw] min-w-[2rem] min-h-[2rem] rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-[3vw] h-[3vw] min-w-[2rem] min-h-[2rem] rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-[1.5vw] overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {newsItems.map((item, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex-shrink-0 cursor-pointer group"
              style={{ width: "clamp(200px, 22vw, 480px)" }}
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-[1vh]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-[clamp(0.75rem,1vw,1.125rem)] font-medium mb-[0.5vh] line-clamp-2 text-foreground">
                {item.title}
              </p>
              <p className="text-[clamp(0.6rem,0.8vw,0.875rem)] text-muted-foreground line-clamp-1">
                {item.subtitle}
              </p>
            </motion.a>
          ))}
        </div>

        {/* "See all" link */}
        <div className="text-center mt-[3vh]">
          <a
            href="#"
            className="text-[clamp(0.75rem,0.9vw,1rem)] font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            すべて見る
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import neuronVisual from "@/assets/neuron-visual.png";

const features = [
  {
    num: "01",
    title: "ライフスタイルに合わせた\nAI導入が可能",
    desc: "組織の規模や課題に合わせた柔軟なAIソリューション。段階的な導入で確実な成果を実現します。",
  },
  {
    num: "02",
    title: "資産として保有",
    desc: "「所有権」での構築となるため、カスタマイズ、拡張が可能になります。",
  },
  {
    num: "03",
    title: "全国のUNCHAINが\n利用可能",
    desc: "パートナーになると全国のUNCHAINソリューションを相互利用できます。",
  },
  {
    num: "04",
    title: "維持管理は\nすべて不要",
    desc: "運用・保守にありがちな悩みとは無縁。滞在ごとにチャージを支払う必要もありません。",
  },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="section-dark h-screen flex items-center" ref={ref}>
      <div className="w-full px-[5vw]">
        {/* Intro text */}
        <div className="max-w-[60vw] mx-auto text-center mb-[4vh]">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[clamp(0.875rem,1.2vw,1.25rem)] text-dark-muted leading-relaxed mb-[2vh]"
          >
            すべての組織には解放すべき重要な使命があると私たちは信じています。
            <br />
            技術はその使命に仕えるべきであり、それを置き換えるべきではありません。
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(0.875rem,1.2vw,1.25rem)] text-dark-muted leading-relaxed mb-[3vh]"
          >
            今すぐ、あたらしいAIを手に入れよう。
          </motion.p>

          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#"
            className="text-primary font-medium text-[clamp(0.8rem,1vw,1rem)] inline-flex items-center gap-2 hover:underline"
          >
            ⏵ 2分でわかるUNCHAINを見る
          </motion.a>
        </div>

        {/* Features heading */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[clamp(1.25rem,2.2vw,2rem)] font-bold text-dark-fg mt-[4vh] mb-[3vh]"
        >
          UNCHAINの特徴
        </motion.h3>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.5vw]">
          {features.map((feature, i) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }}
              className="border border-dark-muted/20 rounded-xl p-[1.5vw] flex flex-col"
              style={{ minHeight: "clamp(220px, 28vh, 420px)" }}
            >
              <span className="text-[clamp(0.75rem,1vw,1rem)] font-bold text-dark-fg mb-[2vh]">
                {feature.num}
              </span>

              {/* Visual placeholder area */}
              <div className="flex-1 flex items-center justify-center mb-[2vh]">
                {i === 0 && (
                  <div className="w-[8vw] h-[8vw] min-w-[4rem] min-h-[4rem] rounded-full border-2 border-primary/50 flex items-center justify-center">
                    <span className="text-[clamp(1rem,1.8vw,2rem)] font-bold text-dark-fg">
                      A.O.I
                    </span>
                  </div>
                )}
                {i === 1 && (
                  <div className="space-y-[1vh]">
                    <div className="flex items-center gap-[0.5vw]">
                      <div className="w-[1vw] h-[1vw] min-w-[0.75rem] min-h-[0.75rem] rounded-full border border-dark-muted/40" />
                      <span className="text-[clamp(0.7rem,0.9vw,1rem)] text-dark-muted">カスタマイズ</span>
                    </div>
                    <div className="flex items-center gap-[0.5vw]">
                      <div className="w-[1vw] h-[1vw] min-w-[0.75rem] min-h-[0.75rem] rounded-full border border-dark-muted/40" />
                      <span className="text-[clamp(0.7rem,0.9vw,1rem)] text-dark-muted">拡張</span>
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className="text-[clamp(2rem,4vw,4rem)] text-dark-muted/30">🗾</div>
                )}
                {i === 3 && (
                  <div className="w-[7vw] h-[7vw] min-w-[4rem] min-h-[4rem] rounded-lg overflow-hidden">
                    <img
                      src={neuronVisual}
                      alt="NEURON"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <h4 className="text-[clamp(0.7rem,0.9vw,1rem)] font-bold text-dark-fg mb-[0.5vh] whitespace-pre-line text-center">
                {feature.title}
              </h4>
              <p className="text-[clamp(0.6rem,0.8vw,0.875rem)] text-dark-muted leading-relaxed text-center">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

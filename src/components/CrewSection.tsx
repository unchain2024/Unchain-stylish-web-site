import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const crew = [
  {
    name: "Sunwoo Christian Park",
    nameJa: "朴 善優",
    role: "Co-Founder & CEO",
    bio: "Forbes選出「日本のAI企業トップ50」AIスタートアップ共同創業者。東京大学松尾研究室にてAI研究に従事。",
    initial: "S",
  },
  {
    name: "Lui Ebina",
    nameJa: "蛯名 瑠偉",
    role: "Co-Founder & CTO",
    bio: "NTT西日本の全国規模データパイプラインや政府記録デジタル化B2Bプラットフォームを主導。",
    initial: "L",
  },
  {
    name: "Taizo Harada",
    nameJa: "原田 大蔵",
    role: "Co-Founder & COO",
    bio: "15歳でアウトドア用品会社を設立。渡米後、Fortune 500企業ピッチコンテストで複数回優勝。",
    initial: "T",
  },
];

const CrewSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="crew" className="section-dark py-20 md:py-28" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-dark-fg mb-12"
        >
          UNCHAINでつくる人
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crew.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Avatar placeholder */}
              <div className="aspect-square rounded-lg bg-dark-muted/10 mb-4 flex items-center justify-center overflow-hidden">
                <span className="text-6xl font-black text-dark-muted/30">
                  {member.initial}
                </span>
              </div>
              <h3 className="text-base font-semibold text-dark-fg">
                {member.name}
              </h3>
              <p className="text-sm text-dark-muted mb-1">{member.nameJa}</p>
              <p className="text-xs text-primary font-medium mb-3">
                {member.role}
              </p>
              <p className="text-xs text-dark-muted leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="#contact" className="btn-cta">
            お問い合わせする
          </a>
        </div>
      </div>
    </section>
  );
};

export default CrewSection;

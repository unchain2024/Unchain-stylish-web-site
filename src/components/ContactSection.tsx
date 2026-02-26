import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="contact" className="section-dark py-16" ref={ref}>
      <div className="container text-center">
        <motion.a
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          href="mailto:contact@unchain.co.jp"
          className="btn-cta"
        >
          お問い合わせする
        </motion.a>
      </div>
    </section>
  );
};

export default ContactSection;

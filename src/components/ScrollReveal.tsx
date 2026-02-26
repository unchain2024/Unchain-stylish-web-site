import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
  as?: "div" | "p" | "h2" | "h3" | "h4" | "a" | "span";
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  y = 50,
  duration = 1,
  amount = 0.3,
  as = "div",
  style,
  ...rest
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;

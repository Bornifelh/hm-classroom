import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router";
import { motion } from 'framer-motion';
interface AnimatedPageProps {
    children: ReactNode;
    someProp?: string; // Exemple de prop supplémentaire
  }
  
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "100vw", // Commence à droite
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "-100vw", // Glisse vers la gauche lors de la sortie
    },
  };
  
  const pageTransition = {
    duration: 0.3, // Réduisez la durée pour une transition plus rapide
    ease: "easeInOut", // Courbe de transition plus douce
  };
  const AnimatedPage = ({ children, someProp }: AnimatedPageProps) => {
    const location = useLocation();
  
    return (
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  };
  export default AnimatedPage;
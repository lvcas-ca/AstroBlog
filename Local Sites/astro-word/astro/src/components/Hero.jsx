import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import '../css/style.css';

const texts = ["Texto 1", "Texto 2", "Texto 3"];

function Hero() {

  const [visibleText, setVisibleText] = useState(0); // Seguimiento del índice de texto visible

  const textVariants = {
    visible: {
      opacity: 1,
      transition: { duration: 5 }, // Adjust duration as needed (in seconds)
    },
    hidden: {
      opacity: 0,
    },
  };

  // Effect to control text appearance (not related to parallax)
  useEffect(() => {
    const IdIntervalo = setTimeout(() => {
      if (visibleText < 2) {
        setVisibleText(visibleText + 1);
      } else {
        setVisibleText(0);
      }
    }, 5500);

    return () => clearTimeout(IdIntervalo); // Cleanup on unmount
  },);


  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // Define container for scroll tracking
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]); // Background movement
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]); // Text movement (adjust as needed)

  return (
    <div
      ref={ref}
      className="w-full h-[150vh] overflow-hidden relative grid place-items-center"
    >
      {console.log(visibleText)}
             {
        
          <motion.h1
            key={visibleText}
            className="fuente text-white relative z-10 text-[130px] sm:text-[200px] top-[-180px] sm:top-[-220px] "
            initial="hidden"
            animate={"visible"} // Animación dinámica basada en el estado
            exit="hidden"
            variants={textVariants}
            style={{ y: textY }}
          >
              {visibleText === 0 ? 'HISTORIA' : visibleText === 1 ? 'POESIAS' : visibleText === 2 ? 'BLOG' : ""}
          </motion.h1>   
       
        }

      <motion.div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(src/img/montana-hero-back.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
         
        }}
      />

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(src/img/montana-fron.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}

export default Hero;
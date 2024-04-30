import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import '../css/style.css';

function Framer() {
  const [visibleText, setVisibleText] = useState(0); // Seguimiento del índice de texto visible

  const textVariants = {
    visible: {
      opacity: 1,
      transition: { duration: 5 }, // Ajusta la duración según sea necesario (en segundos)
    },
    hidden: {
      opacity: 0,
    },
  };


  

     useEffect(() => {
      const IdIntervalo =  setTimeout(() => {
            if(visibleText<3){
            setVisibleText(visibleText + 1); 
            }else{
                setVisibleText(0);
            }
                
        }, 2500);

        return () => clearTimeout(IdIntervalo); // Limpieza al desmontar
    
    },);
  
 
 
 

  return (
   
    

    <div>
        <h1>contador: {visibleText}</h1>

        {
        
          <motion.h1
            key={visibleText}
            className="fuente"
            initial="hidden"
            animate={"visible"} // Animación dinámica basada en el estado
            exit="hidden"
            variants={textVariants}
            
          >
              {visibleText === 0 ? 'HISTORIA' : visibleText === 1 ? 'Texto 2' : visibleText === 2 ? 'Texto 3' : ""}
          </motion.h1>   
       
        }
    </div>
  );
}

export default Framer;






"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div 
          className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gradient-start to-gradient-end"
          animate={{ 
            textShadow: [
              '0 0 2px rgba(0,71,171,0.2)',
              '0 0 4px rgba(0,71,171,0.3)',
              '0 0 2px rgba(0,71,171,0.2)'
            ]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          TALAY
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </div>
      
      <motion.div 
        className="text-lg sm:text-xl tracking-widest mt-2 text-foreground/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        AIRLINES
      </motion.div>
    </motion.div>
  );
};

export default Logo; 
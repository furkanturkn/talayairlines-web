"use client";

import React from 'react';
import { motion } from 'framer-motion';

const GradientLogo: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div 
          className="text-5xl sm:text-6xl md:text-7xl font-bold"
          style={{ 
            background: 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
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

export default GradientLogo; 
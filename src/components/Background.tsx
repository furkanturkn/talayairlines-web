"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  const [circles, setCircles] = useState<Array<{
    size: number;
    top: number;
    left: number;
    xOffset: number;
    yOffset: number;
  }>>([]);

  useEffect(() => {
    // Generate random values only on the client side
    const newCircles = Array(6).fill(0).map(() => ({
      size: Math.random() * 300 + 100,
      top: Math.random() * 100,
      left: Math.random() * 100,
      xOffset: Math.random() * 100 - 50,
      yOffset: Math.random() * 100 - 50,
    }));
    setCircles(newCircles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      
      {/* Animated circles */}
      {circles.map((circle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/5"
          style={{
            width: circle.size,
            height: circle.size,
            top: `${circle.top}%`,
            left: `${circle.left}%`,
          }}
          animate={{
            x: [0, circle.xOffset],
            y: [0, circle.yOffset],
          }}
          transition={{
            duration: 20 + (i * 5),
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px), 
                            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Horizontal line */}
      <motion.div 
        className="absolute left-0 right-0 h-[1px] bg-primary/20"
        style={{ top: '50%' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Vertical line */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[1px] bg-primary/20"
        style={{ left: '50%' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default Background; 
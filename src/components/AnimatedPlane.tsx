"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Cloud: React.FC<{
  width: number;
  height: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
}> = ({ width, height, top, left, duration, delay }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        top: `${top}%`,
        left: `${left}%`,
      }}
      animate={{
        x: [0, -100],
        opacity: [0, 0.7, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
    >
      {/* Cloud shape using multiple overlapping circles */}
      <div className="relative">
        {/* Main cloud body */}
        <div 
          className="absolute rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            left: 0,
            top: 0
          }}
        />
        {/* Additional cloud puffs */}
        <div 
          className="absolute rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
          style={{
            width: `${width * 0.7}px`,
            height: `${height * 0.7}px`,
            left: `${width * 0.3}px`,
            top: `${-height * 0.2}px`
          }}
        />
        <div 
          className="absolute rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
          style={{
            width: `${width * 0.6}px`,
            height: `${height * 0.6}px`,
            left: `${width * 0.6}px`,
            top: `${height * 0.1}px`
          }}
        />
        <div 
          className="absolute rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
          style={{
            width: `${width * 0.5}px`,
            height: `${height * 0.5}px`,
            left: `${width * 0.1}px`,
            top: `${height * 0.3}px`
          }}
        />
      </div>
    </motion.div>
  );
};

const Plane: React.FC<{
  delay: number;
  duration: number;
  yPosition: number;
  size: number;
}> = ({ delay, duration, yPosition, size }) => {
  return (
    <motion.div
      className="absolute"
      initial={{ x: -100, y: yPosition }}
      animate={{ 
        x: ['calc(-5vw)', 'calc(105vw)'],
        y: [yPosition, yPosition - 10, yPosition + 10, yPosition - 5, yPosition]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "linear",
        y: {
          duration: duration * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror"
        }
      }}
    >
      <div className="relative">
        <motion.div
          className="text-primary"
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <FiSend size={size} style={{ transform: 'rotate(45deg)' }} />
        </motion.div>
        
        {/* Plane trail */}
        <motion.div 
          className="absolute top-1/2 right-full h-[2px] bg-gradient-to-r from-transparent to-primary/40"
          style={{ width: `${size * 2.5}px`, transformOrigin: 'right center' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0.8, 1, 0.7, 1, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>
    </motion.div>
  );
};

// Control Tower Component
const Tower: React.FC<{
  position: number;
  height: number;
}> = ({ position, height }) => {
  // Time-based animation for the control tower light
  const [isLightOn, setIsLightOn] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLightOn(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const towerWidth = height * 0.25;
  const controlRoomWidth = towerWidth * 1.5;
  const controlRoomHeight = height * 0.2;
  
  return (
    <div 
      className="absolute bottom-0"
      style={{ 
        left: `${position}%`,
        height: `${height}px`,
        width: `${towerWidth}px`,
      }}
    >
      {/* Tower Body - Tapered upward */}
      <div 
        className="absolute bottom-0 w-full bg-gradient-to-t from-gray-600 to-gray-500"
        style={{ 
          height: `${height - controlRoomHeight}px`,
          clipPath: 'polygon(0% 100%, 100% 100%, 85% 0%, 15% 0%)',
        }}
      >
        {/* Vertical support lines */}
        <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gray-400"></div>
        <div className="absolute left-[40%] top-0 bottom-0 w-[1px] bg-gray-400"></div>
        <div className="absolute left-[65%] top-0 bottom-0 w-[1px] bg-gray-400"></div>
        <div className="absolute left-[85%] top-0 bottom-0 w-[1px] bg-gray-400"></div>
        
        {/* Windows */}
        {Array(5).fill(0).map((_, i) => (
          <div 
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-[60%] h-[5%] bg-blue-200/30 backdrop-blur-sm"
            style={{ 
              bottom: `${15 + i * 15}%`,
              boxShadow: 'inset 0 0 5px rgba(255, 255, 255, 0.5)'
            }}
          ></div>
        ))}
      </div>
      
      {/* Control Room */}
      <div 
        className="absolute w-full rounded-sm overflow-hidden"
        style={{ 
          bottom: `${height - controlRoomHeight}px`,
          height: `${controlRoomHeight}px`,
          width: `${controlRoomWidth}px`,
          left: `${(towerWidth - controlRoomWidth) / 2}px`,
          background: 'linear-gradient(to bottom, #4a89dc 0%, #5d9cec 50%, #4a89dc 100%)',
          boxShadow: '0 0 15px rgba(93, 156, 236, 0.5)',
        }}
      >
        {/* Control room windows */}
        <div className="absolute inset-0 flex">
          {Array(5).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="flex-1 h-full border-r border-blue-400/50 bg-blue-300/20"
              style={{
                boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            ></div>
          ))}
        </div>
        
        {/* Control room top */}
        <div 
          className="absolute top-0 left-0 right-0 h-[15%] bg-gray-700"
          style={{
            borderRadius: '2px 2px 0 0'
          }}
        ></div>
        
        {/* Antenna */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[30px] bg-gray-400">
          {/* Blinking light */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full"
            style={{
              backgroundColor: isLightOn ? '#ff3b30' : '#7d0f0a',
              boxShadow: isLightOn ? '0 0 8px #ff3b30' : 'none'
            }}
            animate={{ opacity: isLightOn ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

const AnimatedPlane: React.FC = () => {
  const [clouds, setClouds] = useState<Array<{
    width: number;
    height: number;
    top: number;
    left: number;
    duration: number;
    delay: number;
  }>>([]);

  const [planes, setPlanes] = useState<Array<{
    delay: number;
    duration: number;
    yPosition: number;
    size: number;
  }>>([]);

  useEffect(() => {
    // Generate random values only on the client side
    const newClouds = Array(5).fill(0).map(() => ({
      width: Math.random() * 80 + 60, // Larger clouds
      height: Math.random() * 40 + 30,
      top: Math.random() * 80,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
    }));
    setClouds(newClouds);

    // Generate multiple planes with different sizes, positions and timings
    const newPlanes = [
      { delay: 0, duration: 15, yPosition: 40, size: 40 },
      { delay: 5, duration: 18, yPosition: 20, size: 30 },
      { delay: 10, duration: 12, yPosition: 60, size: 25 },
      { delay: 15, duration: 20, yPosition: 30, size: 35 },
      { delay: 8, duration: 16, yPosition: 75, size: 28 },
    ];
    setPlanes(newPlanes);
  }, []);

  return (
    <div className="relative w-full h-60 overflow-hidden my-8">
      {/* Multiple planes */}
      {planes.map((plane, i) => (
        <Plane
          key={i}
          delay={plane.delay}
          duration={plane.duration}
          yPosition={plane.yPosition}
          size={plane.size}
        />
      ))}
      
      {/* Cloud elements */}
      {clouds.map((cloud, i) => (
        <Cloud
          key={i}
          width={cloud.width}
          height={cloud.height}
          top={cloud.top}
          left={cloud.left}
          duration={cloud.duration}
          delay={cloud.delay}
        />
      ))}
      
      {/* Control Tower */}
      <Tower position={75} height={180} />
    </div>
  );
};

export default AnimatedPlane; 
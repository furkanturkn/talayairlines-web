"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCloud, FiCloudRain, FiRefreshCw } from 'react-icons/fi';

type WeatherType = 'cloudy' | 'rainy';

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherType>('cloudy');
  const [autoChange, setAutoChange] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);

  useEffect(() => {
    // Set up timer to change weather if autoChange is enabled
    let interval: NodeJS.Timeout;
    
    if (autoChange) {
      interval = setInterval(() => {
        // Change weather in order: cloudy → rainy → cloudy
        const nextWeather = getNextWeatherInOrder(weather);
        setWeather(nextWeather);
      }, 10000); // Change weather every 10 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoChange, weather]);

  // Get the next weather type in order
  const getNextWeatherInOrder = (current: WeatherType): WeatherType => {
    switch (current) {
      case 'cloudy':
        return 'rainy';
      case 'rainy':
        return 'cloudy';
      default:
        return 'cloudy';
    }
  };

  // Change weather manually
  const changeWeather = (type: WeatherType) => {
    setWeather(type);
    setAutoChange(false);
  };

  // Toggle auto change
  const toggleAutoChange = () => {
    setAutoChange(!autoChange);
  };

  // Render different weather elements
  const renderWeatherElements = () => {
    switch (weather) {
      case 'cloudy':
        return <CloudyWeather />;
      case 'rainy':
        return <RainyWeather />;
      default:
        return null;
    }
  };

  // Get weather icon
  const getWeatherIcon = () => {
    switch (weather) {
      case 'cloudy':
        return <FiCloud className="text-gray-400" size={24} />;
      case 'rainy':
        return <FiCloudRain className="text-blue-400" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      {renderWeatherElements()}
      
      <motion.div 
        className="absolute top-4 right-4 flex items-center bg-background/30 backdrop-blur-sm p-2 rounded-full shadow-lg border border-primary/20 pointer-events-auto cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={() => setShowControls(!showControls)}
      >
        {getWeatherIcon()}
      </motion.div>

      {/* Weather controls */}
      {showControls && (
        <motion.div 
          className="absolute top-16 right-4 bg-background/70 backdrop-blur-md p-3 rounded-lg shadow-lg border border-primary/20 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="text-sm font-medium mb-2 text-center">Hava Durumu</div>
          <div className="flex space-x-2 mb-3">
            <button 
              onClick={() => changeWeather('cloudy')}
              className={`p-2 rounded-full ${weather === 'cloudy' ? 'bg-gray-400/20 text-gray-500' : 'hover:bg-background/50'}`}
              title="Bulutlu"
            >
              <FiCloud size={20} />
            </button>
            <button 
              onClick={() => changeWeather('rainy')}
              className={`p-2 rounded-full ${weather === 'rainy' ? 'bg-blue-400/20 text-blue-500' : 'hover:bg-background/50'}`}
              title="Yağmurlu"
            >
              <FiCloudRain size={20} />
            </button>
          </div>
          <button 
            onClick={toggleAutoChange}
            className={`w-full p-1 text-xs flex items-center justify-center space-x-1 rounded ${autoChange ? 'bg-primary/20 text-primary' : 'bg-background/50 hover:bg-background/70'}`}
          >
            <FiRefreshCw size={12} className={autoChange ? 'animate-spin' : ''} />
            <span>{autoChange ? 'Otomatik Değişim Açık' : 'Otomatik Değişim Kapalı'}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

// Cloudy weather component
const CloudyWeather: React.FC = () => {
  const [clouds, setClouds] = useState<Array<{
    size: number;
    top: number;
    left: number;
    speed: number;
  }>>([]);

  useEffect(() => {
    setClouds(
      [...Array(8)].map(() => ({
        size: Math.random() * 100 + 50,
        top: Math.random() * 60,
        left: Math.random() * 100,
        speed: Math.random() * 150 + 100,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/20 backdrop-blur-sm rounded-full"
          style={{
            width: cloud.size,
            height: cloud.size / 2,
            borderRadius: '50%',
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
          }}
          animate={{
            x: [0, -cloud.speed],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          <div 
            className="absolute bg-white/20 backdrop-blur-sm rounded-full"
            style={{
              width: cloud.size * 0.6,
              height: cloud.size * 0.6,
              top: -cloud.size * 0.1,
              left: cloud.size * 0.1,
            }}
          />
          <div 
            className="absolute bg-white/20 backdrop-blur-sm rounded-full"
            style={{
              width: cloud.size * 0.7,
              height: cloud.size * 0.7,
              top: -cloud.size * 0.2,
              left: cloud.size * 0.3,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Rainy weather component
const RainyWeather: React.FC = () => {
  const [raindrops, setRaindrops] = useState<Array<{
    left: number;
    delay: number;
    duration: number;
    height: number;
  }>>([]);

  useEffect(() => {
    setRaindrops(
      [...Array(50)].map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 0.5 + 0.3,
        height: Math.random() * 10 + 15,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Darker overlay for rainy weather */}
      <div className="absolute inset-0 bg-blue-900/10" />
      
      {/* Raindrops */}
      {raindrops.map((drop, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] bg-blue-200/40"
          style={{
            height: drop.height,
            left: `${drop.left}%`,
            top: -drop.height,
          }}
          animate={{
            y: ['0vh', '100vh'],
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            ease: "linear",
            delay: drop.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Weather; 
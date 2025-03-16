"use client";

import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { motion } from 'framer-motion';

interface TimeDisplayProps {
  value: number;
  label: string;
}

interface CountdownRendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ value, label }) => {
  return (
    <motion.div 
      className="flex flex-col items-center mx-2 sm:mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-b from-primary/20 to-primary/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center shadow-lg border border-primary/30">
        <span className="text-2xl sm:text-3xl font-bold">{value}</span>
      </div>
      <span className="text-xs sm:text-sm mt-2 text-foreground/80">{label}</span>
    </motion.div>
  );
};

const CountdownTimer: React.FC = () => {
  const [launchDate, setLaunchDate] = useState<Date | null>(null);
  
  useEffect(() => {
    // Set the launch date to 3 months from now, but only on the client side
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    setLaunchDate(date);
  }, []);

  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRendererProps) => {
    if (completed) {
      return <span className="text-xl">We are launching now!</span>;
    } else {
      return (
        <div className="flex justify-center">
          <TimeDisplay value={days} label="Days" />
          <TimeDisplay value={hours} label="Hours" />
          <TimeDisplay value={minutes} label="Minutes" />
          <TimeDisplay value={seconds} label="Seconds" />
        </div>
      );
    }
  };

  return (
    <div className="my-8">
      <motion.h3 
        className="text-center text-lg sm:text-xl mb-6 text-foreground/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Launching In
      </motion.h3>
      {launchDate ? (
        <Countdown date={launchDate} renderer={renderer} />
      ) : (
        <div className="flex justify-center">
          <TimeDisplay value={0} label="Days" />
          <TimeDisplay value={0} label="Hours" />
          <TimeDisplay value={0} label="Minutes" />
          <TimeDisplay value={0} label="Seconds" />
        </div>
      )}
    </div>
  );
};

export default CountdownTimer; 
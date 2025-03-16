"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin } from 'react-icons/fi';

const socialLinks = [
  { icon: <FiInstagram size={20} />, url: '#', label: 'Instagram' },
  { icon: <FiLinkedin size={20} />, url: '#', label: 'LinkedIn' },
];

const SocialLinks: React.FC = () => {
  return (
    <motion.div 
      className="flex justify-center space-x-4 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.url}
          aria-label={social.label}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/30 text-foreground/70 hover:text-primary hover:border-primary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks; 
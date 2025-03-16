"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck, FiAlertCircle } from 'react-icons/fi';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }
    
    // Simulate form submission
    setStatus('success');
    setMessage('Thank you for subscribing! We\'ll keep you updated.');
    setEmail('');
    
    // In a real application, you would send this to your backend
    console.log('Subscription email:', email);
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h3 className="text-center text-lg sm:text-xl mb-4 text-foreground/80">
        Get notified when we launch
      </h3>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center border-2 rounded-full overflow-hidden border-primary/30 focus-within:border-primary transition-colors bg-background/80 backdrop-blur-sm">
          <span className="pl-4 text-foreground/60">
            <FiMail size={20} />
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full py-3 px-4 outline-none bg-transparent"
            disabled={status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'success'}
            className="bg-gradient-to-r from-gradient-start to-gradient-end text-white font-medium py-3 px-6 rounded-full hover:opacity-90 transition-opacity disabled:opacity-70"
          >
            Notify Me
          </button>
        </div>
      </form>
      
      {status !== 'idle' && (
        <motion.div 
          className={`mt-3 flex items-center ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          {status === 'success' ? <FiCheck className="mr-2" /> : <FiAlertCircle className="mr-2" />}
          <p className="text-sm">{message}</p>
        </motion.div>
      )}
      
      <p className="text-xs text-center mt-4 text-foreground/60">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  );
};

export default NewsletterForm; 
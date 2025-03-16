"use client";

import React from 'react';
// import Logo from '@/components/Logo';
// import SolidLogo from '@/components/SolidLogo';
// import BoldLogo from '@/components/BoldLogo';
import GradientLogo from '@/components/GradientLogo';
import CountdownTimer from '@/components/Countdown';
import NewsletterForm from '@/components/NewsletterForm';
import SocialLinks from '@/components/SocialLinks';
import AnimatedPlane from '@/components/AnimatedPlane';
import Background from '@/components/Background';
import Weather from '@/components/Weather';

export default function Home() {
  return (
    <>
      <Background />
      <Weather />
      
      <div className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-8 md:p-12 relative overflow-hidden">
        <main className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center z-10">
          <div className="mb-8 mt-4">
            <GradientLogo />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 text-foreground/80">
              A New Standard in Air Travel
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto text-foreground/70">
              Experience exceptional service, comfort, and reliability with Talay Airlines.
              We&apos;re preparing for takeoff and will be launching our services soon.
            </p>
          </div>
          
          <AnimatedPlane />
          
          <CountdownTimer />
          
          <div className="w-full max-w-md mx-auto">
            <NewsletterForm />
          </div>
          
          <SocialLinks />
          
          <footer className="mt-16 text-center text-sm text-foreground/60">
            <p>© {new Date().getFullYear()} Talay Airlines. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </>
  );
}

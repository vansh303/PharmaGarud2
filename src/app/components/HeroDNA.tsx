// src/app/components/HeroDNA.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Sabse important step: SSR ko false karna
const SplineModel = dynamic(() => import('./SplineModel'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-neon-blue font-outfit animate-pulse">
      Loading 3D DNA Model...
    </div>
  )
});

export default function HeroDNA() {
    return (
        <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-neon-purple/5 blur-[100px] rounded-full" />
            </div>

            {/* Spline 3D Render - Ab ye crash nahi hoga */}
            <div className="relative z-10 w-full h-full">
                <SplineModel />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
        </div>
    );
}
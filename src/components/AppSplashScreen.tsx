import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AshokaEmblem, IndianFlagBadge, NigraniLogo } from './GovernmentEmblems';

export default function AppSplashScreen({ onFinish }: { onFinish?: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onFinish) onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="splash-light"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            filter: 'blur(10px)',
            transition: { duration: 0.45, ease: 'easeOut' } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#F8FAFC] text-slate-800 select-none px-4 py-8 overflow-hidden"
        >
          {/* Top Government Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 mb-1">
              <AshokaEmblem className="w-5 h-7 text-slate-800 shrink-0" />
              <IndianFlagBadge className="w-5 h-4 shrink-0 shadow-2xs" />
            </div>
            <p className="text-[9px] font-black tracking-widest text-slate-900 uppercase">
              Government of India
            </p>
            <p className="text-[8px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
              Ministry of Social Justice & Empowerment
            </p>
          </div>

          {/* Center Simple Logo & Loading Indicator */}
          <div className="flex flex-col items-center justify-center my-auto text-center">
            {/* Logo with gentle pulse */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ 
                scale: [0.95, 1.05, 0.95],
                opacity: 1 
              }}
              transition={{ 
                scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.3 }
              }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2.5 border border-slate-200/80 shadow-md flex items-center justify-center mb-3"
            >
              <NigraniLogo className="w-full h-full rounded-xl" />
            </motion.div>

            {/* App Name */}
            <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center">
              <span>Nigrani</span>
              <span className="text-blue-600">360</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              National Monitoring & Inspection Command Centre
            </p>

            {/* Simple Light Theme Slim Progress Bar */}
            <div className="w-44 h-1 bg-slate-200 rounded-full overflow-hidden mt-5">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.85, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Bottom Simple Version Info */}
          <div className="text-center">
            <p className="text-[10px] font-semibold text-slate-400">
              Nigrani360 v1.0.0 · Secure Command Network
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Fingerprint, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0B0F19] text-white">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/20 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPgo8L3N2Zz4=')] opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
        
        {/* Left Side - Branding */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded bg-white flex flex-col overflow-hidden relative shadow-lg">
               <div className="h-1/3 bg-[#FF9933]"></div>
               <div className="h-1/3 bg-white flex items-center justify-center">
                 <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-blue-900 opacity-90"></div>
               </div>
               <div className="h-1/3 bg-[#138808]"></div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-1">Government of India</p>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Ministry of Social Justice & Empowerment</p>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-white">Nigrani360</h1>
          <p className="text-xl text-gray-400 font-light max-w-sm leading-relaxed mb-8">
            National Monitoring & Inspection Command Centre.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> End-to-end Encrypted
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
              <Lock className="w-5 h-5 text-blue-500" /> Role-based Access Control
            </div>
          </div>
        </div>

        {/* Right Side - Login Panel */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-4">
              <Fingerprint className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Secure Authorization</h2>
            <p className="text-sm text-gray-400 mt-1">Select your clearance level to enter</p>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/overview')} 
              className="w-full group relative flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                <div className="text-left">
                  <span className="block font-medium text-white group-hover:text-emerald-400 transition-colors">Field Inspector</span>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Mobile Operations</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </button>
            
            <button 
              onClick={() => navigate('/overview')} 
              className="w-full group relative flex items-center justify-between p-4 rounded-xl bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                <div className="text-left">
                  <span className="block font-medium text-white group-hover:text-blue-300 transition-colors">PMU Director</span>
                  <span className="block text-[10px] text-blue-200/70 uppercase tracking-widest mt-0.5">National Command</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors relative z-10" />
            </button>
            
            <button 
              onClick={() => navigate('/overview')} 
              className="w-full group relative flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                <div className="text-left">
                  <span className="block font-medium text-white group-hover:text-gray-300 transition-colors">NGO / Institute</span>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Restricted Oversight</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-500 font-mono">
              UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED. <br/>
              ALL ACTIVITY IS LOGGED AND MONITORED.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Video, ShieldCheck, MapPin, History as HistoryIcon, Camera, ChevronRight, AlertTriangle, ChevronLeft, Download, Maximize2, Activity } from 'lucide-react';
import CCTVViewer from '../components/CCTVViewer';

export default function SiteDetail() {
  const { id } = useParams();
  const [showJitsi, setShowJitsi] = useState(false);
  const [activeViewer, setActiveViewer] = useState(false);

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
        <Link to="/overview" className="hover:text-blue-600 transition-colors flex items-center gap-1">
          <ChevronLeft className="w-3 h-3" /> Command Centre
        </Link>
        <span>/</span>
        <span>Maharashtra</span>
        <span>/</span>
        <span>Pune District</span>
        <span>/</span>
        <span className="text-gray-900">Pune Shelter (ID: {id || 'CAM-01'})</span>
      </div>

      {/* Premium Header */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-premium)] border border-gray-200/60 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10B981]"></div>
        
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Pune Shelter Home</h1>
            <span className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-green-200/50 uppercase tracking-wide">
              Verified Active
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md font-semibold border border-gray-200/50">
              RISK: LOW (0.12)
            </span>
          </div>
          <p className="text-gray-500 flex items-center gap-1.5 text-sm">
            <MapPin className="w-4 h-4 text-gray-400" /> Sector 4, Haveli Block, Pune, Maharashtra
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => alert('Accessing immutable cryptographic audit trail...')} className="text-sm font-medium text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            View Audit Log
          </button>
          <button 
            onClick={() => setShowJitsi(!showJitsi)}
            className="text-sm font-medium text-white bg-blue-600 border border-blue-700 px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            {showJitsi ? 'End Video Protocol' : 'Initiate Secure Video Call'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - CCTV & Jitsi */}
        <div className="lg:col-span-2 space-y-6">
          
          {showJitsi && (
            <div className="bg-white rounded-xl shadow-[var(--shadow-premium)] border border-gray-200/60 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="p-3 bg-[#0B0F19] text-gray-300 flex justify-between items-center border-b border-gray-800">
                <span className="font-medium text-xs tracking-wide uppercase flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-400"/> Encrypted Jitsi Protocol
                </span>
                <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded animate-pulse border border-red-500/30">
                  LIVE RECORDING
                </span>
              </div>
              <div className="aspect-video bg-[#050505] relative">
                <iframe 
                  src={`https://meet.jit.si/nigrani360-secure-room-${id || 'test'}`} 
                  allow="camera; microphone; fullscreen; display-capture"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-[var(--shadow-premium)] border border-gray-200/60 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <Camera className="w-4 h-4 text-gray-500" /> Primary NVR Stream
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">High-definition authorized feed</p>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors" title="Download Snapshot">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors" title="Fullscreen" onClick={() => setActiveViewer(true)}>
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="relative bg-[#050505] aspect-[21/9]">
               <img src="/cctv/hospital.jpg" alt="Hospital CCTV" className="w-full h-full object-cover filter contrast-125 saturate-50 brightness-90" />
               <div className="absolute inset-0 grainy-overlay opacity-80 mix-blend-overlay"></div>
               
               {/* Premium overlays */}
               <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                 <span className="text-white text-xs font-bold tracking-widest drop-shadow">LIVE</span>
               </div>
               
               <div className="absolute top-4 right-4 text-white font-mono text-xs bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                  {new Date().toISOString().replace('T', ' ').substring(0,19)} UTC
               </div>
               
               <div className="absolute bottom-4 left-4 text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                  <div className="font-mono text-sm font-bold tracking-wider">CAM-01: ADMIN BLOCK</div>
                  <div className="font-mono text-[10px] text-gray-300 mt-0.5">IP: 192.168.1.104 • 1080p • 24fps</div>
               </div>
               
               {/* Intelligence Overlay (Bounding Box placeholder) */}
               <div className="absolute top-[30%] left-[40%] w-[100px] h-[150px] border border-green-500/50 bg-green-500/10 rounded">
                 <div className="absolute -top-5 left-0 bg-green-500/80 text-white text-[8px] font-mono px-1 rounded-t">PERSON 98%</div>
               </div>
            </div>
            
            <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center gap-4 text-xs font-medium text-gray-600">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Stream Authenticated</span>
              <span className="flex items-center gap-1.5 border-l border-gray-300 pl-4"><Activity className="w-3.5 h-3.5 text-blue-600" /> Network Latency: 24ms</span>
            </div>
          </div>
        </div>

        {/* Right Col - Immutable History */}
        <div className="bg-white rounded-xl shadow-[var(--shadow-premium)] border border-gray-200/60 overflow-hidden flex flex-col h-[calc(100vh-180px)] min-h-[600px]">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
              <HistoryIcon className="w-4 h-4 text-gray-500" /> Immutable Audit Trail
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Cryptographically signed inspections</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Timeline Item 1 */}
            <div className="relative pl-5 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-[-20px] before:w-[2px] before:bg-gray-200">
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-green-100 border border-green-500 flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Verified Check-in</span>
                  <span className="text-xs text-gray-500 font-mono">14:30</span>
                </div>
                <p className="text-sm text-gray-900 font-medium mb-1">Inspector: Ramesh Kumar</p>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono mb-2">
                  <MapPin className="w-3 h-3" /> 18.5204° N, 73.8567° E
                </div>
                <div className="bg-white border border-gray-100 rounded p-2 text-[10px] text-gray-600 space-y-1">
                  <div className="flex justify-between"><span>Liveness Check:</span><span className="text-green-600 font-semibold">PASSED</span></div>
                  <div className="flex justify-between"><span>Hash-chain:</span><span className="text-green-600 font-semibold">INTACT</span></div>
                  <div className="flex justify-between text-gray-400"><span>Tx:</span><span className="truncate w-24">0x7a8...91f</span></div>
                </div>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-5 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-[-20px] before:w-[2px] before:bg-gray-200">
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-100 border border-blue-500 flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">System Snapshot</span>
                  <span className="text-xs text-gray-500 font-mono">11:15</span>
                </div>
                <p className="text-sm text-gray-900 font-medium mb-1">Automated AI Routine</p>
                <p className="text-xs text-gray-500">No anomalies detected in primary visual field.</p>
              </div>
            </div>
            
            {/* Timeline Item 3 (Alert) */}
            <div className="relative pl-5">
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-amber-100 border border-amber-500 flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              </div>
              <div className="bg-amber-50/50 rounded-lg p-3 border border-amber-200/60">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Flagged Event</span>
                  <span className="text-xs text-gray-500 font-mono">Yesterday</span>
                </div>
                <p className="text-sm text-gray-900 font-medium mb-1">Network Instability</p>
                <p className="text-xs text-gray-600">Camera offline for 42 minutes. Reconnected automatically.</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-white border-t border-gray-100">
            <button onClick={() => alert('Loading archive records from SakshyaChain...')} className="w-full text-xs font-semibold text-blue-600 py-2 hover:bg-blue-50 rounded transition-colors flex items-center justify-center gap-1">
              Load Previous History <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      
      {activeViewer && (
        <CCTVViewer 
          src="/cctv/hospital.jpg"
          name="Pune Shelter Home"
          location="Sector 4, Haveli Block, Pune, Maharashtra"
          id={id || 'CAM-01'}
          onClose={() => setActiveViewer(false)}
        />
      )}
    </div>
  );
}

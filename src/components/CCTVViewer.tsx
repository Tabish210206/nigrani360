import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Camera, Info, AlertOctagon, RotateCcw, Activity } from 'lucide-react';

export default function CCTVViewer({ project, onClose, onViewOnMap }: { project: any, onClose: () => void, onViewOnMap: (p: any) => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [timeStr, setTimeStr] = useState('');

  const cctv = project?.cctvs?.[0] || {};
  const outage = cctv.status !== 'live';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(new Date().toISOString().replace('T', ' ').substring(0,19) + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateOutage = async () => {
    try {
      await fetch('/api/demo/simulate-outage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cameraId: cctv.cameraId })
      });
    } catch(e) {}
  };

  const handleRestore = async () => {
    try {
      await fetch('/api/demo/restore-camera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cameraId: cctv.cameraId })
      });
    } catch(e) {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B0F19] w-full max-w-6xl rounded-2xl border border-gray-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-[#05080f]">
          <div>
            <h2 className="text-white font-semibold text-lg flex items-center gap-3">
              {project.name}
              {outage ? (
                <span className="bg-red-500/20 text-red-500 text-xs px-2 py-0.5 rounded font-bold border border-red-500/30 animate-pulse">OFFLINE</span>
              ) : (
                <span className="bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded font-bold border border-green-500/30 animate-pulse">LIVE</span>
              )}
            </h2>
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
              <Camera className="w-4 h-4" /> {cctv.cameraId || 'CAM-UNKNOWN'} • {project.district}, {project.state}
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => onViewOnMap(project)}
              className="px-4 py-2 bg-blue-900/40 hover:bg-blue-800/60 text-blue-400 rounded border border-blue-800/50 text-sm font-bold tracking-wider transition-colors uppercase"
            >
              View on Map
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm font-bold tracking-wider transition-colors uppercase">
              Close View
            </button>
          </div>
        </div>

        {/* Video Area */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {outage && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
              <AlertOctagon className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
              <h3 className="text-white text-xl font-bold tracking-widest uppercase">Signal Lost</h3>
              <p className="text-red-400 mt-2 font-mono text-sm">ERR_CONNECTION_REFUSED</p>
              <button onClick={handleRestore} className="mt-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-widest border border-white/20 transition-all">
                <RotateCcw className="w-4 h-4" /> INITIATE REMOTE RESTART
              </button>
            </div>
          )}
          {cctv.image && (
            <img 
              src={cctv.image} 
              alt="CCTV Feed" 
              className={`w-full h-full object-cover filter contrast-125 saturate-50 ${outage ? 'opacity-20 grayscale' : 'opacity-90'}`}
            />
          )}

          {/* Overlays */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded font-mono text-sm border border-white/10 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${outage ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
              {timeStr}
            </div>
            <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded font-mono text-xs border border-white/10 w-fit">
              {isPlaying ? 'REC • 1080p60' : 'PAUSED'}
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-20 flex gap-2">
            {!outage && (
              <button onClick={handleSimulateOutage} className="bg-red-900/60 hover:bg-red-800 backdrop-blur-sm text-white px-4 py-2 rounded text-xs font-bold border border-red-500/30 transition-colors uppercase">
                Simulate Outage
              </button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-[#05080f] px-6 py-4 flex justify-between items-center border-t border-gray-800">
          <div className="flex gap-4">
            <button onClick={() => setIsPlaying(!isPlaying)} className="text-gray-400 hover:text-white transition-colors">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-white transition-colors">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <span className="flex items-center gap-2"><Info className="w-4 h-4" /> H.265 / Main Profile</span>
            <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> 4.2 Mbps</span>
            <button className="text-gray-400 hover:text-white transition-colors ml-4">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

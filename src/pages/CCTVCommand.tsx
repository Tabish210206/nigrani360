import React, { useState } from 'react';
import { Cctv, Info, AlertOctagon, RotateCcw, Maximize, Play, Pause, Camera } from 'lucide-react';

export default function CCTVCommand() {
  const [activeFeed, setActiveFeed] = useState<any>(null);

  // Using high quality Unsplash placeholders appropriate for institutional settings
  const feeds = [
    { id: 'CAM-HOSP-01', location: 'Government Hospital Ward', region: 'Nashik, Maharashtra', status: 'LIVE', viewers: 18, uptime: '99.2%', img: '/cctv_hospital_ward_1790326789587.jpg' },
    { id: 'CAM-SCHOOL-01', location: 'Government School Classroom', region: 'Ahmedabad, Gujarat', status: 'LIVE', viewers: 42, uptime: '99.8%', img: '/cctv_school_classroom_1790326822968.jpg' },
    { id: 'CAM-OFFICE-01', location: 'Government Records Office', region: 'Jaipur, Rajasthan', status: 'OFFLINE', viewers: 0, uptime: '84.1%', img: '/cctv_govt_office_1790326807196.jpg' },
    { id: 'CAM-REHAB-01', location: 'Rehabilitation Centre', region: 'Pune, Maharashtra', status: 'LIVE', viewers: 5, uptime: '97.5%', img: '/cctv_rehab_1790327477196.jpg' },
    { id: 'CAM-ENTRY-01', location: 'Facility Entrance', region: 'Bhopal, MP', status: 'LIVE', viewers: 11, uptime: '99.9%', img: '/cctv_entrance_1790327495380.jpg' },
    { id: 'CAM-STOCK-01', location: 'Asset / Storage Room', region: 'Surat, Gujarat', status: 'LIVE', viewers: 2, uptime: '98.4%', img: '/cctv_storage_1790327523922.jpg' }
  ];

  return (
    <div className="p-6 max-w-[1920px] mx-auto bg-[#0B0F19] min-h-[calc(100vh-56px)] text-gray-300">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
             <Cctv className="w-6 h-6 text-blue-500"/> Surveillance Wall
          </h1>
          <p className="text-sm text-gray-400 mt-1">Live national monitoring grid.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feeds.map(f => (
          <div 
            key={f.id} 
            onClick={() => setActiveFeed(f)}
            className="bg-black rounded-xl border border-gray-800 shadow-xl overflow-hidden cursor-pointer group hover:border-gray-600 transition-colors relative"
          >
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">
               <span className={`w-2 h-2 rounded-full ${f.status === 'LIVE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
               <span className="text-[10px] font-bold text-white uppercase">{f.status}</span>
            </div>
            <div className="aspect-video relative overflow-hidden bg-gray-900">
               <img src={f.img} className={`w-full h-full object-cover filter saturate-50 contrast-125 ${f.status === 'OFFLINE' ? 'grayscale opacity-30' : ''}`} alt="Feed" />
               {f.status === 'OFFLINE' && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500">
                   <AlertOctagon className="w-8 h-8 mb-2 animate-pulse"/>
                   <span className="text-xs font-bold uppercase tracking-widest">Signal Lost</span>
                 </div>
               )}
            </div>
            <div className="p-3 bg-[#05080f] border-t border-gray-800">
               <h3 className="text-xs font-bold text-white mb-0.5">{f.id}</h3>
               <p className="text-[10px] text-gray-400 truncate">{f.location} • {f.region}</p>
            </div>
          </div>
        ))}
      </div>

      {activeFeed && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
          <div className="w-[500px] h-full bg-[#0B0F19] border-l border-gray-800 flex flex-col animate-slideInRight shadow-2xl">
             <div className="p-4 border-b border-gray-800 flex justify-between items-center">
               <h2 className="text-white font-bold text-lg">{activeFeed.id}</h2>
               <button onClick={() => setActiveFeed(null)} className="text-gray-400 hover:text-white font-bold text-xs uppercase px-3 py-1.5 bg-gray-800 rounded">Close</button>
             </div>
             <div className="aspect-video relative bg-black">
                <img src={activeFeed.img} className={`w-full h-full object-cover filter saturate-50 contrast-125 ${activeFeed.status === 'OFFLINE' ? 'grayscale opacity-30' : ''}`} alt="Feed" />
             </div>
             <div className="p-6 flex-1 overflow-y-auto space-y-6">
                
                <div>
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-800 pb-1">Camera Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                     <div><span className="text-gray-500 block text-[10px] uppercase">Location</span><span className="text-gray-200">{activeFeed.location}</span></div>
                     <div><span className="text-gray-500 block text-[10px] uppercase">Region</span><span className="text-gray-200">{activeFeed.region}</span></div>
                     <div><span className="text-gray-500 block text-[10px] uppercase">Status</span><span className={`font-bold ${activeFeed.status === 'LIVE' ? 'text-green-500' : 'text-red-500'}`}>{activeFeed.status}</span></div>
                     <div><span className="text-gray-500 block text-[10px] uppercase">Viewers</span><span className="text-gray-200">{activeFeed.viewers}</span></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-800 pb-1">Network Health</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                     <div><span className="text-gray-500 block text-[10px] uppercase">Uptime</span><span className="text-gray-200">{activeFeed.uptime}</span></div>
                     <div><span className="text-gray-500 block text-[10px] uppercase">Latency</span><span className="text-gray-200">42ms</span></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800 grid grid-cols-2 gap-2">
                   <button className="flex items-center justify-center gap-2 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold uppercase rounded transition-colors">
                     <Maximize className="w-4 h-4"/> Fullscreen
                   </button>
                   <button className="flex items-center justify-center gap-2 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold uppercase rounded transition-colors">
                     <Camera className="w-4 h-4"/> Snapshot
                   </button>
                   {activeFeed.status === 'OFFLINE' && (
                     <button className="col-span-2 flex items-center justify-center gap-2 py-2.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-bold uppercase rounded transition-colors">
                       <RotateCcw className="w-4 h-4"/> Initiate Remote Restart
                     </button>
                   )}
                   <button className="col-span-2 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase rounded transition-colors">
                      View on Map
                   </button>
                </div>

             </div>
          </div>
        </div>
      )}
    </div>
  );
}
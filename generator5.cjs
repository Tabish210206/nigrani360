const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');

const pages = {
  'Projects.tsx': `import React, { useState, useEffect } from 'react';
import { FolderTree, MapPin, ShieldAlert, Activity, Users, MoreHorizontal, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(setProjects).catch(() => {});
  }, []);

  return (
    <div className="p-6 max-w-[1920px] mx-auto space-y-6 bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
             <FolderTree className="w-6 h-6 text-blue-600"/> Projects & Centres Registry
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all social welfare sites nationwide.</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm">
          + Onboard New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Total Projects</h3><div className="text-3xl font-bold text-gray-900 mt-1">{projects.length || 54}</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Active</h3><div className="text-3xl font-bold text-green-600 mt-1">48</div></div>
        <div className="bg-red-50 rounded-xl p-5 border border-red-200 shadow-sm"><h3 className="text-[10px] font-bold text-red-800 uppercase">High Risk</h3><div className="text-3xl font-bold text-red-600 mt-1">{projects.filter((p:any) => p.riskLevel === 'high').length || 4}</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Inspection Overdue</h3><div className="text-3xl font-bold text-amber-600 mt-1">11</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">CCTV Offline</h3><div className="text-3xl font-bold text-gray-600 mt-1">3</div></div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50/80 border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-500 font-bold">
            <tr>
              <th className="px-6 py-4">Project Details</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Status & Risk</th>
              <th className="px-6 py-4">Compliance Health</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((p: any, i) => (
              <tr key={i} className="hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={() => alert('Open detailed project drawer for ' + p.name)}>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">{p.name}</span>
                    <span className="text-xs text-gray-500 font-mono mt-0.5">{p.id.substring(0,8).toUpperCase()} • {p.type || 'Community Centre'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-700 flex items-center gap-1"><MapPin className="w-3 h-3"/> {p.district}</span>
                    <span className="text-xs text-gray-500">{p.state}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Active</span>
                    {p.riskLevel === 'high' && <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> High Risk</span>}
                    {p.riskLevel === 'medium' && <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Medium Risk</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                     <div className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-blue-500"/> 98% CCTV</div>
                     <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-green-500"/> Insp. OK</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><ChevronRight className="w-5 h-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,

  'Assets.tsx': `import React from 'react';
import { Package, QrCode, Building2, MapPin, AlertCircle, Search, Filter } from 'lucide-react';

export default function Assets() {
  const assets = [
    { id: 'AST-9921', name: 'Commercial CCTV Rig', project: 'MH-042 Pimpalgaon Centre', expected: 'Server Room', custodian: 'Ravi Kumar', condition: 'Functional', lastVerified: 'Today', status: 'Verified' },
    { id: 'AST-4412', name: 'Biometric Attendance Kiosk', project: 'GJ-011 Ahmedabad Office', expected: 'Main Entrance', custodian: 'Amit Shah', condition: 'Functional', lastVerified: '3 days ago', status: 'Verified' },
    { id: 'AST-7763', name: 'Wheelchair - Model X', project: 'UP-088 Rehab Institute', expected: 'Ward B', custodian: 'Sunil Verma', condition: 'Damaged', lastVerified: '12 days ago', status: 'Mismatch' },
    { id: 'AST-1198', name: 'Desktop Computer', project: 'MH-042 Pimpalgaon Centre', expected: 'Admin Desk', custodian: 'Ravi Kumar', condition: 'Unknown', lastVerified: '45 days ago', status: 'Missing' },
  ];

  return (
    <div className="p-6 max-w-[1920px] mx-auto space-y-6 bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
             <Package className="w-6 h-6 text-blue-600"/> Assets & Stock Verification (SakshyaChain)
          </h1>
          <p className="text-sm text-gray-500 mt-1">Immutable ledger for physical infrastructure and inventory tracking.</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm flex items-center gap-2">
          <QrCode className="w-4 h-4"/> Scan Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Total Tracked Assets</h3><div className="text-3xl font-bold text-gray-900 mt-1">12,408</div></div>
        <div className="bg-green-50 rounded-xl p-5 border border-green-200 shadow-sm"><h3 className="text-[10px] font-bold text-green-800 uppercase">Verified Active</h3><div className="text-3xl font-bold text-green-600 mt-1">11,942</div></div>
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 shadow-sm"><h3 className="text-[10px] font-bold text-amber-800 uppercase">Location Mismatch</h3><div className="text-3xl font-bold text-amber-600 mt-1">86</div></div>
        <div className="bg-red-50 rounded-xl p-5 border border-red-200 shadow-sm"><h3 className="text-[10px] font-bold text-red-800 uppercase">Missing / Lost</h3><div className="text-3xl font-bold text-red-600 mt-1">14</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Pending Audits</h3><div className="text-3xl font-bold text-blue-600 mt-1">366</div></div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by Asset ID, Project, or Custodian..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded text-sm font-medium transition-colors"><Filter className="w-4 h-4"/> Filters</button>
        </div>

        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50/80 border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-500 font-bold">
            <tr>
              <th className="px-6 py-4">Asset Details</th>
              <th className="px-6 py-4">Assignment / Custodian</th>
              <th className="px-6 py-4">Verification State</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assets.map((a, i) => (
              <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 flex items-center gap-2"><QrCode className="w-3.5 h-3.5 text-blue-500"/> {a.name}</span>
                    <span className="text-xs text-gray-500 font-mono mt-1">ID: {a.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5"><Building2 className="w-3 h-3 text-gray-400"/> {a.project}</span>
                    <span className="text-xs text-gray-500 mt-1 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gray-400"/> {a.expected} • Custodian: {a.custodian}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5 items-start">
                    {a.status === 'Verified' && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Verified ({a.condition})</span>}
                    {a.status === 'Mismatch' && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Location Mismatch</span>}
                    {a.status === 'Missing' && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Missing / Lost</span>}
                    <span className="text-[10px] text-gray-400 font-medium tracking-wider">Last Check: {a.lastVerified}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded hover:bg-gray-200 transition-colors">HISTORY</button>
                    <button className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded hover:bg-blue-100 transition-colors">VERIFY</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,

  'CCTVCommand.tsx': `import React, { useState } from 'react';
import { Cctv, Info, AlertOctagon, RotateCcw, Maximize, Play, Pause, Camera } from 'lucide-react';

export default function CCTVCommand() {
  const [activeFeed, setActiveFeed] = useState<any>(null);

  // Using high quality Unsplash placeholders appropriate for institutional settings
  const feeds = [
    { id: 'CAM-HOSP-01', location: 'Government Hospital Ward', region: 'Nashik, Maharashtra', status: 'LIVE', viewers: 18, uptime: '99.2%', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
    { id: 'CAM-SCHOOL-01', location: 'Government School Classroom', region: 'Ahmedabad, Gujarat', status: 'LIVE', viewers: 42, uptime: '99.8%', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80' },
    { id: 'CAM-OFFICE-01', location: 'Government Records Office', region: 'Jaipur, Rajasthan', status: 'OFFLINE', viewers: 0, uptime: '84.1%', img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80' },
    { id: 'CAM-REHAB-01', location: 'Rehabilitation Centre', region: 'Pune, Maharashtra', status: 'LIVE', viewers: 5, uptime: '97.5%', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
    { id: 'CAM-ENTRY-01', location: 'Facility Entrance', region: 'Bhopal, MP', status: 'LIVE', viewers: 11, uptime: '99.9%', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
    { id: 'CAM-STOCK-01', location: 'Asset / Storage Room', region: 'Surat, Gujarat', status: 'LIVE', viewers: 2, uptime: '98.4%', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' }
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
               <span className={\`w-2 h-2 rounded-full \${f.status === 'LIVE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}\`}></span>
               <span className="text-[10px] font-bold text-white uppercase">{f.status}</span>
            </div>
            <div className="aspect-video relative overflow-hidden bg-gray-900">
               <img src={f.img} className={\`w-full h-full object-cover filter saturate-50 contrast-125 \${f.status === 'OFFLINE' ? 'grayscale opacity-30' : ''}\`} alt="Feed" />
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
                <img src={activeFeed.img} className={\`w-full h-full object-cover filter saturate-50 contrast-125 \${activeFeed.status === 'OFFLINE' ? 'grayscale opacity-30' : ''}\`} alt="Feed" />
             </div>
             <div className="p-6 flex-1 overflow-y-auto space-y-6">
                
                <div>
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-800 pb-1">Camera Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                     <div><span className="text-gray-500 block text-[10px] uppercase">Location</span><span className="text-gray-200">{activeFeed.location}</span></div>
                     <div><span className="text-gray-500 block text-[10px] uppercase">Region</span><span className="text-gray-200">{activeFeed.region}</span></div>
                     <div><span className="text-gray-500 block text-[10px] uppercase">Status</span><span className={\`font-bold \${activeFeed.status === 'LIVE' ? 'text-green-500' : 'text-red-500'}\`}>{activeFeed.status}</span></div>
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
}`
};

for (const [name, content] of Object.entries(pages)) {
  fs.writeFileSync(path.join(dir, name), content);
}
console.log('Final Polish Pages generated.');

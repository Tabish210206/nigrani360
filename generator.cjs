const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');

const pages = {
  'Reports.tsx': `import React from 'react';
import { FileText, Download, PlayCircle, BarChart2 } from 'lucide-react';

export default function Reports() {
  const reports = [
    { name: 'National Monitoring Report', desc: 'Aggregated view of all active projects, risk signals, and inspection outcomes across India.', last: 'Today, 08:00 AM' },
    { name: 'State Performance Report', desc: 'Detailed breakdown by State/UT covering compliance, fund utilisation, and CCTV uptime.', last: 'Yesterday, 18:00 PM' },
    { name: 'District Monitoring Report', desc: 'Granular view for District Magistrates and Nodal Officers.', last: '24-09-2026' },
    { name: 'NGO Compliance Report', desc: 'Scoring and risk profiling of all registered NGOs/Institutes.', last: '20-09-2026' },
    { name: 'Financial Utilisation Report', desc: 'FundTrace analysis covering sanctioned vs verified expenditures.', last: '01-09-2026' },
    { name: 'Asset & Stock Report', desc: 'SakshyaChain audit of physical infrastructure and inventory.', last: '15-09-2026' },
    { name: 'Beneficiary / Complaint Report', desc: 'Aggregated Seva-Samadhan and Proof-of-Service signals.', last: 'Today, 10:30 AM' },
    { name: 'Audit Evidence Pack', desc: 'Immutable ledger extract of all critical system mutations.', last: 'Always Live' }
  ];

  return (
    <div className="p-6 max-w-[1920px] mx-auto bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
             <BarChart2 className="w-6 h-6 text-blue-600"/> Reporting Centre
          </h1>
          <p className="text-sm text-gray-500 mt-1">Generate and download official intelligence reports.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Reports Generated</h3><div className="text-3xl font-bold text-gray-900 mt-1">1,402</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Pending Requests</h3><div className="text-3xl font-bold text-amber-600 mt-1">3</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">National Coverage</h3><div className="text-3xl font-bold text-blue-600 mt-1">100%</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Audit Packs</h3><div className="text-3xl font-bold text-green-600 mt-1">84</div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reports.map(r => (
          <div key={r.name} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className="p-5 flex-1">
              <h3 className="font-bold text-gray-900 text-sm mb-2">{r.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{r.desc}</p>
              <div className="text-[10px] font-mono text-gray-400 bg-gray-50 inline-block px-2 py-1 rounded">Last Generated: {r.last}</div>
            </div>
            <div className="border-t border-gray-100 bg-gray-50 p-3 flex justify-between gap-2">
               <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"><FileText className="w-3.5 h-3.5"/> PREVIEW</button>
               <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"><PlayCircle className="w-3.5 h-3.5"/> GENERATE</button>
               <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"><Download className="w-3.5 h-3.5"/> CSV</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  'CCTVCommand.tsx': `import React, { useState } from 'react';
import { Cctv, Info, AlertOctagon, RotateCcw, Maximize, Play, Pause, Camera } from 'lucide-react';

export default function CCTVCommand() {
  const [activeFeed, setActiveFeed] = useState<any>(null);

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
}`,

  'DemoControl.tsx': `import React, { useState } from 'react';
import { Sliders, AlertTriangle, VideoOff, RefreshCw, FileWarning, AlertCircle, Database } from 'lucide-react';

export default function DemoControl() {
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog(prev => [new Date().toISOString().substring(11,19) + ' - ' + msg, ...prev]);

  const simulate = async (action: string) => {
    addLog(\`Executing: \${action}\`);
    try {
      await fetch('/api/demo/' + action, { method: 'POST' });
      addLog(\`Success: \${action}\`);
    } catch(e) {
      addLog(\`Simulated Success: \${action}\`); // Fallback for demo
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
         <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
           <Sliders className="w-6 h-6 text-blue-600" /> Demo Control Centre
         </h1>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <button onClick={() => simulate('risk-alert')} className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-left transition-colors">
             <AlertTriangle className="w-5 h-5 text-red-600"/>
             <div><h3 className="font-bold text-red-900 text-sm">Simulate Risk Alert</h3><p className="text-xs text-red-700">Triggers a high-risk operational signal.</p></div>
           </button>
           
           <button onClick={() => simulate('cctv-outage')} className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-left transition-colors">
             <VideoOff className="w-5 h-5 text-gray-600"/>
             <div><h3 className="font-bold text-gray-900 text-sm">Simulate CCTV Outage</h3><p className="text-xs text-gray-600">Takes a random camera offline.</p></div>
           </button>

           <button onClick={() => simulate('restore-camera')} className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl text-left transition-colors">
             <RefreshCw className="w-5 h-5 text-green-600"/>
             <div><h3 className="font-bold text-green-900 text-sm">Restore Camera</h3><p className="text-xs text-green-700">Brings an offline camera back online.</p></div>
           </button>

           <button onClick={() => simulate('flag-bill')} className="flex items-center gap-3 p-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left transition-colors">
             <FileWarning className="w-5 h-5 text-amber-600"/>
             <div><h3 className="font-bold text-amber-900 text-sm">Flag Bill for Review</h3><p className="text-xs text-amber-700">Simulates an automated FundTrace flag.</p></div>
           </button>

           <button onClick={() => simulate('reset-data')} className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-left transition-colors col-span-1 md:col-span-2">
             <Database className="w-5 h-5 text-blue-600"/>
             <div><h3 className="font-bold text-blue-900 text-sm">Reset Demo Data</h3><p className="text-xs text-blue-700">Restores SQLite database to pristine seeded state.</p></div>
           </button>
         </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-800">
         <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2"><AlertCircle className="w-3 h-3"/> Execution Log</h3>
         <div className="h-48 overflow-y-auto font-mono text-xs text-green-400 space-y-1">
           {log.map((l, i) => <div key={i}>{l}</div>)}
           {log.length === 0 && <div className="text-gray-600">Waiting for commands...</div>}
         </div>
      </div>
    </div>
  );
}`
};

for (const [name, content] of Object.entries(pages)) {
  fs.writeFileSync(path.join(dir, name), content);
}
console.log('Specialized Pages generated.');

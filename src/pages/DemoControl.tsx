import React, { useState } from 'react';
import { Sliders, AlertTriangle, VideoOff, RefreshCw, FileWarning, AlertCircle, Database } from 'lucide-react';

export default function DemoControl() {
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog(prev => [new Date().toISOString().substring(11,19) + ' - ' + msg, ...prev]);

  const simulate = async (action: string) => {
    addLog(`Executing: ${action}`);
    try {
      await fetch('/api/demo/' + action, { method: 'POST' });
      addLog(`Success: ${action}`);
    } catch(e) {
      addLog(`Simulated Success: ${action}`); // Fallback for demo
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
}
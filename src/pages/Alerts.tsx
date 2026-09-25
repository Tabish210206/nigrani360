import React from 'react';
import { AlertTriangle, MapPin, Eye, Zap, Search, ChevronRight } from 'lucide-react';

export default function Alerts() {
  return (
    <div className="p-6 max-w-[1920px] mx-auto space-y-6 bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
             <AlertTriangle className="w-6 h-6 text-red-600"/> Risk Operations
          </h1>
          <p className="text-sm text-gray-500 mt-1">Operational intelligence and automated anomaly detection.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-red-50 rounded-xl p-5 border border-red-200 shadow-sm"><h3 className="text-[10px] font-bold text-red-800 uppercase">High Risk</h3><div className="text-3xl font-bold text-red-600 mt-1">4</div></div>
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 shadow-sm"><h3 className="text-[10px] font-bold text-amber-800 uppercase">Medium</h3><div className="text-3xl font-bold text-amber-600 mt-1">7</div></div>
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 shadow-sm"><h3 className="text-[10px] font-bold text-blue-800 uppercase">Review</h3><div className="text-3xl font-bold text-blue-600 mt-1">12</div></div>
        <div className="bg-purple-50 rounded-xl p-5 border border-purple-200 shadow-sm"><h3 className="text-[10px] font-bold text-purple-800 uppercase">Escalated</h3><div className="text-3xl font-bold text-purple-600 mt-1">2</div></div>
        <div className="bg-green-50 rounded-xl p-5 border border-green-200 shadow-sm"><h3 className="text-[10px] font-bold text-green-800 uppercase">Resolved Today</h3><div className="text-3xl font-bold text-green-600 mt-1">19</div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 'MH-042', name: 'Pimpalgaon Community Centre', score: 78, signals: ['CCTV offline > 24h', 'Inspection overdue', 'Complaint hotspot'], action: 'Surprise Inspection' },
          { id: 'GJ-011', name: 'Ahmedabad Welfare Office', score: 65, signals: ['Fund mismatch (₹2.4L)', 'Asset verification failed'], action: 'Financial Audit' },
          { id: 'UP-088', name: 'Lucknow Rehab Institute', score: 92, signals: ['Zero beneficiary confirmations', 'CCTV tampered', 'Multiple severe complaints'], action: 'Immediate Escalation' }
        ].map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-red-200 shadow-lg overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 bg-red-50/30">
               <div className="flex justify-between items-start mb-2">
                 <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">HIGH RISK</span>
                 <span className="text-2xl font-black text-red-600">{a.score}</span>
               </div>
               <h3 className="font-bold text-gray-900 text-sm">{a.name}</h3>
               <p className="text-[11px] text-gray-500 font-mono mt-1">{a.id}</p>
            </div>
            <div className="p-5 flex-1">
               <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Anomaly Signals</h4>
               <ul className="space-y-2">
                 {a.signals.map((s, i) => (
                   <li key={i} className="text-xs font-medium text-gray-700 flex items-start gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0"></span> {s}
                   </li>
                 ))}
               </ul>
               <div className="mt-5 p-3 bg-gray-50 rounded border border-gray-100">
                  <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Recommended Action</h4>
                  <p className="text-sm font-bold text-blue-700 flex items-center gap-2"><Zap className="w-4 h-4"/> {a.action}</p>
               </div>
            </div>
            <div className="grid grid-cols-2 border-t border-gray-100">
               <button className="py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 border-r border-gray-100 uppercase tracking-wider">Review</button>
               <button className="py-3 text-xs font-bold text-blue-600 hover:bg-blue-50 uppercase tracking-wider">Assign</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
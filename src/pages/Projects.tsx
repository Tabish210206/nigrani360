import React, { useState, useEffect } from 'react';
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
}
import React from 'react';
import { X, PlayCircle, MapPin, AlertTriangle, ChevronRight, Video, FileText, IndianRupee, ClipboardCheck } from 'lucide-react';

export default function ProjectDrawer({ project, onClose, onOpenCctv }: { project: any, onClose: () => void, onOpenCctv: (project: any) => void }) {
  if (!project) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl border-l border-gray-200 z-[400] flex flex-col transform transition-transform duration-300">
      
      {/* Drawer Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
              project.riskLevel === 'high' ? 'bg-red-50 text-red-600 border border-red-200' :
              project.riskLevel === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
              'bg-green-50 text-green-600 border border-green-200'
            }`}>
              {project.riskLevel} RISK ({project.riskScore}%)
            </span>
            <span className="text-[10px] text-gray-500 font-mono">{project.projectId}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-2 leading-tight">{project.name}</h2>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {project.block}, {project.district}, {project.state}
          </p>
        </div>
        <button onClick={onClose} className="p-1.5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-md transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* CCTV Hero */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Live Feed</h3>
            <span className={`text-[10px] font-bold ${(project.cctvs?.[0]?.status || 'offline') === 'live' ? 'text-green-600' : 'text-red-500'} flex items-center gap-1`}>
              <span className={`w-1.5 h-1.5 rounded-full ${(project.cctvs?.[0]?.status || 'offline') === 'live' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              {(project.cctvs?.[0]?.status || 'OFFLINE').toUpperCase()}
            </span>
          </div>
          <div 
            className="relative rounded-lg overflow-hidden aspect-video border border-gray-200 shadow-sm group cursor-pointer bg-gray-900"
            onClick={() => onOpenCctv(project)}
          >
            {project.cctvs?.[0]?.image && (
              <img src={project.cctvs[0].image} alt={project.name} className="w-full h-full object-cover filter contrast-110 saturate-50 brightness-90 group-hover:scale-105 transition-transform duration-500" />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 rounded-full p-3 backdrop-blur-sm group-hover:scale-110 transition-transform shadow-lg">
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] text-white font-mono bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
              {project.cctvs?.[0]?.cameraId || 'N/A'}
            </div>
          </div>
        </div>

        {/* Risk Analysis */}
        {project.signals && project.signals.length > 0 && (
          <div className="bg-red-50/50 rounded-xl border border-red-100 p-4">
            <h3 className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <AlertTriangle className="w-4 h-4" /> Risk Signal Analysis
            </h3>
            <ul className="space-y-2 mb-4">
              {project.signals.map((sig: any, i: number) => (
                <li key={i} className="text-[13px] text-red-900 flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-[-2px]">•</span> {sig.signal}
                </li>
              ))}
            </ul>
            <div className="bg-white rounded-lg p-3 border border-red-100 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-semibold">Recommended Action</p>
                <p className="text-sm font-semibold text-gray-900">Surprise Inspection</p>
              </div>
              <button onClick={() => alert('Assigned action')} className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition-colors font-medium">
                Execute
              </button>
            </div>
          </div>
        )}

        {/* Modules Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 hover:bg-white hover:border-gray-200 transition-colors cursor-pointer group" onClick={() => alert('Inspections')}>
            <ClipboardCheck className="w-4 h-4 text-blue-600 mb-2" />
            <p className="text-[10px] text-gray-500 uppercase font-semibold">Inspections</p>
            <p className="text-sm font-bold text-gray-900">{project.inspections?.[0]?.compliance || 'N/A'} Compliance</p>
            <p className="text-[10px] text-gray-400 mt-1">Status: {project.inspections?.[0]?.status || 'Pending'}</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 hover:bg-white hover:border-gray-200 transition-colors cursor-pointer group" onClick={() => alert('FundTrace')}>
            <IndianRupee className="w-4 h-4 text-green-600 mb-2" />
            <p className="text-[10px] text-gray-500 uppercase font-semibold">Fund Utilisation</p>
            <p className="text-sm font-bold text-gray-900">{project.funds?.[0]?.utilised || 'N/A'}</p>
            <p className={`text-[10px] font-medium mt-1 ${(project.funds?.[0]?.flagged || 'None') !== 'None' ? 'text-red-500' : 'text-gray-400'}`}>
              {project.funds?.[0]?.flagged || 'None'}
            </p>
          </div>
        </div>

      </div>
      
      {/* Footer Action */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <button onClick={() => alert('Opening full project dashboard')} className="w-full bg-[#0B0F19] hover:bg-gray-900 text-white text-sm font-medium py-3 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-sm">
          Open Full Project Dashboard <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

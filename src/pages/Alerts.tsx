import React, { useState } from 'react';
import { AlertTriangle, MapPin, Eye, Zap, Search, ChevronRight, ShieldAlert, Navigation, Phone, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AlertItem {
  id: string;
  name: string;
  category: 'High Risk' | 'Medium' | 'Resolved';
  issue: string;
  location: string;
  time: string;
  score: number;
  signals: string[];
  action: string;
}

const ALL_ALERTS: AlertItem[] = [
  {
    id: 'MH-042',
    name: 'Pimpalgaon Community Centre',
    category: 'High Risk',
    issue: 'CCTV offline > 24h',
    location: 'Nashik, Maharashtra',
    time: '2h ago',
    score: 78,
    signals: ['CCTV offline > 24h', 'Inspection overdue', 'Complaint hotspot'],
    action: 'Surprise Inspection'
  },
  {
    id: 'MH-112',
    name: 'Govt School, Main Block',
    category: 'Medium',
    issue: 'Inspection overdue',
    location: 'Thane, Maharashtra',
    time: '5h ago',
    score: 54,
    signals: ['Inspection overdue by 12 days', 'Document submission pending'],
    action: 'Desk Review'
  },
  {
    id: 'MH-089',
    name: 'District Hospital, Ward 3',
    category: 'Medium',
    issue: 'Complaint hotspot',
    location: 'Pune, Maharashtra',
    time: '1d ago',
    score: 48,
    signals: ['3 beneficiary complaints logged in 48 hours'],
    action: 'Verification Visit'
  },
  {
    id: 'RJ-044',
    name: 'State Facility Entrance',
    category: 'High Risk',
    issue: 'Power backup failure',
    location: 'Jaipur, Rajasthan',
    time: '1d ago',
    score: 72,
    signals: ['UPS telemetry failure', 'Entrance camera dark signal'],
    action: 'Facility Technician Dispatch'
  },
  {
    id: 'GJ-011',
    name: 'Ahmedabad Welfare Office',
    category: 'Resolved',
    issue: 'Biometric device sync restored',
    location: 'Ahmedabad, Gujarat',
    time: '2d ago',
    score: 22,
    signals: ['Biometric sync restored after firmware update'],
    action: 'Resolved'
  }
];

export default function Alerts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filterTab, setFilterTab] = useState<'All' | 'High Risk' | 'Medium' | 'Resolved'>('All');

  const filteredAlerts = ALL_ALERTS.filter(a => {
    if (filterTab === 'All') return true;
    return a.category === filterTab;
  });

  return (
    <div className="p-3.5 sm:p-6 max-w-[1400px] mx-auto space-y-4 sm:space-y-6 bg-[#F8FAFC] w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" /> Risk Alerts
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time anomaly signals across monitored social welfare facilities.
          </p>
        </div>
      </div>

      {/* Filter Tabs (Matches "Mobile (Alerts)" in reference screenshot) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {(['All', 'High Risk', 'Medium', 'Resolved'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterTab === tab
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* KPI metric chips for Desktop */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100 shadow-xs">
          <p className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">High Risk</p>
          <p className="text-2xl font-black text-rose-600 mt-1">2</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 shadow-xs">
          <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Medium Risk</p>
          <p className="text-2xl font-black text-amber-600 mt-1">2</p>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 shadow-xs">
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Resolved</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">1</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 shadow-xs">
          <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Total Monitored</p>
          <p className="text-2xl font-black text-blue-600 mt-1">5</p>
        </div>
      </div>

      {/* Alerts List (Optimized for both Mobile touch & Desktop) */}
      <div className="space-y-3">
        {filteredAlerts.map(alert => {
          const isHigh = alert.category === 'High Risk';
          const isMed = alert.category === 'Medium';
          const isResolved = alert.category === 'Resolved';

          return (
            <div 
              key={alert.id}
              onClick={() => navigate('/map')}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                  isHigh ? 'bg-rose-500 animate-pulse ring-4 ring-rose-100' :
                  isMed ? 'bg-amber-500 ring-4 ring-amber-100' :
                  'bg-emerald-500 ring-4 ring-emerald-100'
                }`} />

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-slate-900 text-sm tracking-tight truncate group-hover:text-blue-600 transition-colors">
                      {alert.name}
                    </h3>
                    <span className="font-mono text-[10px] text-slate-400 font-bold">{alert.id}</span>
                  </div>

                  <p className={`text-xs font-semibold mt-0.5 ${
                    isHigh ? 'text-rose-600' : isMed ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {alert.issue}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {alert.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {alert.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Risk Score</span>
                  <span className={`text-lg font-black ${isHigh ? 'text-rose-600' : isMed ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {alert.score}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
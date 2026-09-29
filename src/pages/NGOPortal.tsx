import React from 'react';
import { Building2, FileText, IndianRupee, MessageSquare, ShieldCheck, AlertTriangle, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NGOPortal() {
  const { user } = useAuth();

  const projectData = {
    id: 'MH-042',
    name: 'Pimpalgaon Community Centre',
    type: 'Rehabilitation Centre',
    district: 'Nashik, Maharashtra',
    ngo: 'Sahyog Sanstha',
    riskLevel: 'high' as const,
    complianceScore: '76%',
    lastInspection: '21 days ago',
    nextInspection: 'Due in 3 days',
  };

  const funds = {
    sanctioned: '₹5,00,000',
    utilised: '₹2,25,000',
    utilisedPct: 45,
    flagged: '₹2.4L mismatch',
    hasMismatch: true,
  };

  const complaints = [
    { id: 'CMP-001', desc: 'Beneficiary not receiving meals', status: 'open', date: '25 Sep 2026' },
    { id: 'CMP-002', desc: 'Attendance records incomplete', status: 'under review', date: '22 Sep 2026' },
    { id: 'CMP-003', desc: 'Staff absent during inspection hours', status: 'resolved', date: '15 Sep 2026' },
  ];

  const complianceItems = [
    { label: 'Biometric Attendance', status: 'non-compliant' },
    { label: 'CCTV Operational', status: 'non-compliant' },
    { label: 'Beneficiary Register', status: 'compliant' },
    { label: 'Fund Utilization Report', status: 'pending' },
    { label: 'Staff Qualification Docs', status: 'compliant' },
  ];

  return (
    <div className="p-2.5 sm:p-6 md:p-8 max-w-[1200px] mx-auto space-y-2.5 sm:space-y-6 w-full bg-[#F8FAFC]">

      {/* Header */}
      <div className="flex items-start justify-between gap-2 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
            <Building2 className="w-4.5 h-4.5 sm:w-7 sm:h-7" />
          </div>
          <div>
            <h1 className="text-sm sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">{projectData.name}</h1>
            <p className="text-[10px] sm:text-sm text-slate-500 mt-0.5">{projectData.type} · {projectData.district} · <span className="font-mono text-[9px] sm:text-xs text-slate-400">{projectData.id}</span></p>
          </div>
        </div>

        {/* Risk badge */}
        <div className="flex items-center gap-1.5 px-2 py-1 sm:px-4 sm:py-2 bg-rose-50 border border-rose-200 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-bold text-rose-700 uppercase tracking-wider shrink-0">
          <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
          High Risk Site
        </div>
      </div>

      {/* Restricted access notice */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-4 sm:py-3 bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold text-amber-800 leading-snug">
        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
        <span>You have read-only access limited to your assigned project ({projectData.id}). Contact your PMU officer for queries.</span>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-2.5 sm:p-5 shadow-2xs">
          <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Compliance Score</p>
          <p className="text-xl sm:text-3xl font-extrabold text-amber-600 leading-tight">{projectData.complianceScore}</p>
          <p className="text-[9px] sm:text-xs text-slate-400 mt-1 truncate">Last inspected: {projectData.lastInspection}</p>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-2.5 sm:p-5 shadow-2xs">
          <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Fund Utilisation</p>
          <p className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">{funds.utilisedPct}%</p>
          {funds.hasMismatch ? (
            <p className="text-[9px] sm:text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1 truncate">
              <AlertTriangle className="w-2.5 h-2.5 shrink-0" /> {funds.flagged}
            </p>
          ) : (
            <p className="text-[9px] sm:text-xs text-slate-400 mt-1">On track</p>
          )}
        </div>
        <div className="col-span-2 sm:col-span-1 bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-2.5 sm:p-5 shadow-2xs">
          <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Next Inspection</p>
          <p className="text-sm sm:text-lg font-bold text-slate-900 leading-tight">{projectData.nextInspection}</p>
          <p className="text-[9px] sm:text-xs text-slate-400 mt-1 truncate">Ensure all docs are ready</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-6">

        {/* Compliance Checklist */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs p-3 sm:p-6">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5 sm:mb-4 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" /> Compliance Checklist
          </h2>
          <div className="space-y-1.5 sm:space-y-2.5">
            {complianceItems.map(item => (
              <div key={item.label} className="flex items-center justify-between text-[11px] sm:text-sm">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className={`text-[7px] sm:text-[8px] font-extrabold px-1.5 py-[1px] rounded-full uppercase tracking-tight shrink-0 leading-tight ${
                  item.status === 'compliant' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  item.status === 'non-compliant' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fund Utilisation */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs p-3 sm:p-6">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5 sm:mb-4 flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" /> Fund Utilisation
          </h2>
          <div className="space-y-2.5 sm:space-y-4">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">Sanctioned</span>
              <span className="font-bold text-slate-900">{funds.sanctioned}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">Utilised</span>
              <span className="font-bold text-slate-900">{funds.utilised}</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 sm:h-2.5">
              <div
                className="bg-blue-500 h-1.5 sm:h-2.5 rounded-full"
                style={{ width: `${funds.utilisedPct}%` }}
              />
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500">{funds.utilisedPct}% of sanctioned funds utilised</p>

            {funds.hasMismatch && (
              <div className="flex items-start gap-1.5 mt-2 p-2 sm:p-3 bg-rose-50 border border-rose-200 rounded-lg sm:rounded-xl">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-rose-700">Bill Mismatch Detected</p>
                  <p className="text-[9px] sm:text-xs text-rose-600 mt-0.5">{funds.flagged} — Under PMU review. Please submit supporting documents.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Complaints */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs p-3 sm:p-6 lg:col-span-2">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5 sm:mb-4 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" /> Beneficiary Complaints
          </h2>
          <div className="divide-y divide-slate-100">
            {complaints.map(c => (
              <div key={c.id} className="flex items-center justify-between py-2 sm:py-3 group cursor-default">
                <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                  <div className={`mt-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${
                    c.status === 'resolved' ? 'bg-emerald-500' :
                    c.status === 'under review' ? 'bg-amber-500' :
                    'bg-rose-500'
                  }`} />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">{c.desc}</p>
                    <p className="text-[9px] sm:text-xs text-slate-400 mt-0.5 font-mono">{c.id} · {c.date}</p>
                  </div>
                </div>
                <span className={`text-[7px] sm:text-[8px] font-extrabold px-1.5 py-[1px] rounded-full uppercase tracking-tight shrink-0 leading-tight ${
                  c.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  c.status === 'under review' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 sm:mt-3 sm:pt-3 border-t border-slate-100 text-center">
            <p className="text-[10px] sm:text-xs text-slate-400">Complaint resolution is managed by your assigned PMU Inspector.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

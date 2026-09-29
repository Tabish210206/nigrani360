import React, { useState } from 'react';
import { 
  ClipboardCheck, MapPin, AlertTriangle, Camera, CheckCircle2, 
  Clock, ChevronRight, Navigation, Upload, FileText, 
  Zap, Phone, User, Calendar, TrendingUp, XCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type InspectionStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';

interface Inspection {
  id: string;
  projectId: string;
  projectName: string;
  location: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  status: InspectionStatus;
  dueDate: string;
  distance: string;
  compliance: string;
  signals: string[];
}

const MY_INSPECTIONS: Inspection[] = [
  {
    id: 'INS-2026-041',
    projectId: 'MH-042',
    projectName: 'Pimpalgaon Community Centre',
    location: 'Nashik, Maharashtra',
    type: 'Surprise Inspection',
    priority: 'high',
    status: 'overdue',
    dueDate: 'Overdue by 12 days',
    distance: '3.2 km',
    compliance: '76%',
    signals: ['CCTV offline', 'Beneficiary complaints', 'Fund mismatch'],
  },
  {
    id: 'INS-2026-042',
    projectId: 'RJ-044',
    projectName: 'State Facility Entrance',
    location: 'Jaipur, Rajasthan',
    type: 'Security Verification',
    priority: 'medium',
    status: 'pending',
    dueDate: 'Due in 2 days',
    distance: '14.1 km',
    compliance: '85%',
    signals: ['Security log mismatch', 'Corrective action pending'],
  },
  {
    id: 'INS-2026-043',
    projectId: 'MH-089',
    projectName: 'District Hospital, Ward 3',
    location: 'Pune, Maharashtra',
    type: 'Routine Compliance',
    priority: 'low',
    status: 'completed',
    dueDate: 'Completed 5 days ago',
    distance: '28.7 km',
    compliance: '92%',
    signals: [],
  },
  {
    id: 'INS-2026-044',
    projectId: 'MH-112',
    projectName: 'Govt School, Main Block',
    location: 'Bhiwandi, Maharashtra',
    type: 'Annual Audit',
    priority: 'low',
    status: 'in-progress',
    dueDate: 'In progress',
    distance: '8.5 km',
    compliance: '98%',
    signals: [],
  },
];

const STATUS_STYLES: Record<InspectionStatus, string> = {
  overdue: 'bg-rose-50 text-rose-700 border-rose-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const PRIORITY_DOT: Record<string, string> = {
  high: 'bg-rose-500',
  medium: 'bg-amber-500',
  low: 'bg-emerald-500',
};

export default function FieldInspectorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'queue' | 'completed'>('queue');
  const [submitting, setSubmitting] = useState<string | null>(null);

  const queueItems = MY_INSPECTIONS.filter(i => i.status !== 'completed');
  const completedItems = MY_INSPECTIONS.filter(i => i.status === 'completed');

  const overdue = queueItems.filter(i => i.status === 'overdue').length;
  const pending = queueItems.filter(i => i.status === 'pending').length;
  const inProgress = queueItems.filter(i => i.status === 'in-progress').length;

  const handleSubmitReport = (id: string) => {
    setSubmitting(id);
    setTimeout(() => setSubmitting(null), 2000);
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="p-3 sm:p-6 md:p-8 max-w-[1400px] mx-auto space-y-3 sm:space-y-6 w-full bg-[#F8FAFC]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">My Field Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            <span className="font-semibold text-slate-700">{user?.name}</span> · {today}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/map')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] sm:text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
          >
            <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" /> View Map
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] sm:text-xs font-semibold shadow-sm transition-all">
            <Upload className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Submit Report
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-rose-100 p-2.5 sm:p-5 shadow-xs flex items-center gap-2.5 sm:gap-4">
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Overdue</p>
            <p className="text-lg sm:text-3xl font-extrabold text-rose-600 mt-0.5 leading-none">{overdue}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl border border-amber-100 p-2.5 sm:p-5 shadow-xs flex items-center gap-2.5 sm:gap-4">
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Pending</p>
            <p className="text-lg sm:text-3xl font-extrabold text-amber-600 mt-0.5 leading-none">{pending}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl border border-blue-100 p-2.5 sm:p-5 shadow-xs flex items-center gap-2.5 sm:gap-4">
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">In Progress</p>
            <p className="text-lg sm:text-3xl font-extrabold text-blue-600 mt-0.5 leading-none">{inProgress}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl border border-emerald-100 p-2.5 sm:p-5 shadow-xs flex items-center gap-2.5 sm:gap-4">
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Done</p>
            <p className="text-lg sm:text-3xl font-extrabold text-emerald-600 mt-0.5 leading-none">{completedItems.length}</p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">

        {/* LEFT: Inspection Queue (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            {(['queue', 'completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 sm:py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {tab === 'queue' ? `My Queue (${queueItems.length})` : `Completed (${completedItems.length})`}
              </button>
            ))}
          </div>

          {/* Inspection Cards */}
          <div className="divide-y divide-slate-100">
            {(activeTab === 'queue' ? queueItems : completedItems).map(insp => (
              <div key={insp.id} className="p-3 sm:p-5 hover:bg-slate-50/60 transition-colors space-y-2 sm:space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                    <div className={`mt-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${PRIORITY_DOT[insp.priority]}`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{insp.projectName}</h3>
                        <span className="font-mono text-[9px] sm:text-[10px] text-slate-400">{insp.projectId}</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /> {insp.location}
                        <span className="text-slate-300">·</span>
                        <Navigation className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /> {insp.distance}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border uppercase tracking-wider whitespace-nowrap shrink-0 ${STATUS_STYLES[insp.status]}`}>
                    {insp.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-[10px]">
                  <span className="text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {insp.type}
                  </span>
                  <span className={`text-[9px] sm:text-[10px] font-semibold flex items-center gap-1 ${
                    insp.status === 'overdue' ? 'text-rose-600' :
                    insp.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {insp.dueDate}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500">
                    Compliance: <strong>{insp.compliance}</strong>
                  </span>
                </div>

                {/* Risk signals */}
                {insp.signals.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {insp.signals.map(s => (
                      <span key={s} className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100 font-medium">
                        ⚠ {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-1.5 sm:gap-2 pt-1 flex-wrap">
                  {insp.status !== 'completed' && (
                    <>
                      <button className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] sm:text-[11px] font-bold transition-colors cursor-pointer">
                        <Navigation className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Navigate
                      </button>
                      <button
                        onClick={() => handleSubmitReport(insp.id)}
                        disabled={submitting === insp.id}
                        className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-[10px] sm:text-[11px] font-bold transition-colors disabled:opacity-60 cursor-pointer"
                      >
                        {submitting === insp.id ? (
                          <><CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 animate-pulse" /> Submitted!</>
                        ) : (
                          <><Upload className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Submit Report</>
                        )}
                      </button>
                      <button className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-[10px] sm:text-[11px] font-bold transition-colors cursor-pointer">
                        <Camera className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Upload Evidence
                      </button>
                    </>
                  )}
                  {insp.status === 'completed' && (
                    <button className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] sm:text-[11px] font-medium cursor-pointer">
                      <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> View Report
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Sidebar info (1/3 width) */}
        <div className="space-y-3 sm:space-y-4">

          {/* My Profile Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs p-3 sm:p-5">
            <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 sm:mb-4">My Profile</h3>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-4">
              <img 
                src={user?.avatar || '/avatar_rsharma.jpg'} 
                alt={user?.name || 'R. Sharma'} 
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-emerald-500 shadow-xs"
              />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">{user?.name || 'R. Sharma'}</p>
                <p className="text-[10px] sm:text-xs text-slate-500">{user?.subtitle || 'Field Officer · Maharashtra West'}</p>
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Zone</span>
                <span className="font-semibold text-slate-800">Maharashtra West</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Employee ID</span>
                <span className="font-mono text-slate-800">INS-MH-2024-09</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Supervisor</span>
                <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <img src="/avatar_arjun.jpg" alt="Arjun Mehta" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full object-cover" />
                  Arjun Mehta
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  On Duty
                </span>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs p-3 sm:p-5">
            <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 sm:mb-4 flex items-center gap-1.5">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Today's Schedule
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                { time: '09:00', task: 'MH-042 — Surprise Inspection', done: false, urgent: true },
                { time: '12:00', task: 'Lunch Break', done: true, urgent: false },
                { time: '14:00', task: 'MH-112 — Document Review', done: false, urgent: false },
                { time: '16:00', task: 'Submit field reports (2)', done: false, urgent: false },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-2 sm:gap-3 ${item.done ? 'opacity-50' : ''}`}>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 pt-0.5 w-8 sm:w-10 shrink-0">{item.time}</span>
                  <div className={`flex-1 text-[11px] sm:text-xs font-medium rounded-lg p-1.5 sm:p-2 ${
                    item.urgent ? 'bg-rose-50 text-rose-800 border border-rose-100' :
                    item.done ? 'bg-slate-50 text-slate-400 line-through' :
                    'bg-slate-50 text-slate-700'
                  }`}>
                    {item.task}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs p-3 sm:p-5">
            <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-1.5">
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Quick Contact
            </h3>
            <div className="space-y-1.5 sm:space-y-2">
              {[
                { name: 'Arjun Mehta', role: 'PMU Director', color: 'bg-blue-100 text-blue-800' },
                { name: 'Dr. P. Kulkarni', role: 'District Officer', color: 'bg-purple-100 text-purple-800' },
                { name: 'Control Room', role: 'Emergency', color: 'bg-rose-100 text-rose-800' },
              ].map(c => (
                <button key={c.name} className="w-full flex items-center justify-between px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold ${c.color}`}>
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-tight">{c.name}</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400">{c.role}</p>
                    </div>
                  </div>
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

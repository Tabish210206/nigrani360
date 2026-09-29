import React, { useState } from 'react';
import { 
  ClipboardCheck, Search, Filter, AlertTriangle, CheckCircle2, 
  Clock, MapPin, User, ChevronRight, Download, Calendar, 
  Eye, ShieldCheck, Zap, RefreshCw, BarChart2, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InspectionRecord {
  id: string;
  projectId: string;
  projectName: string;
  state: string;
  inspectorName: string;
  type: 'Surprise' | 'Routine' | 'Follow-up';
  status: 'Completed' | 'In Progress' | 'Overdue' | 'Scheduled';
  scheduledDate: string;
  riskScore: number;
  findingSummary: string;
}

const NATIONAL_INSPECTIONS: InspectionRecord[] = [
  {
    id: 'INS-2026-891',
    projectId: 'MH-042',
    projectName: 'Pimpalgaon Community Centre',
    state: 'Maharashtra',
    inspectorName: 'R. Sharma',
    type: 'Surprise',
    status: 'Overdue',
    scheduledDate: '16 Sep 2026',
    riskScore: 78,
    findingSummary: 'CCTV offline > 24h, multiple beneficiary complaints on meal distribution.'
  },
  {
    id: 'INS-2026-892',
    projectId: 'GJ-011',
    projectName: 'Arogya Kalyan Kendra, Ahmedabad',
    state: 'Gujarat',
    inspectorName: 'V. Patel',
    type: 'Routine',
    status: 'Completed',
    scheduledDate: '27 Sep 2026',
    riskScore: 32,
    findingSummary: 'All biometric logs verified. Stock reconciliation 100% matched.'
  },
  {
    id: 'INS-2026-893',
    projectId: 'RJ-044',
    projectName: 'State Divyang Empowerment Facility',
    state: 'Rajasthan',
    inspectorName: 'K. Singh',
    type: 'Follow-up',
    status: 'In Progress',
    scheduledDate: '29 Sep 2026',
    riskScore: 64,
    findingSummary: 'Checking fire safety and wheelchair accessibility compliance.'
  },
  {
    id: 'INS-2026-894',
    projectId: 'MH-089',
    projectName: 'District Welfare Hospital, Ward 3',
    state: 'Maharashtra',
    inspectorName: 'R. Sharma',
    type: 'Routine',
    status: 'Completed',
    scheduledDate: '24 Sep 2026',
    riskScore: 18,
    findingSummary: 'Full physical audit completed. Digital certificate uploaded.'
  },
  {
    id: 'INS-2026-895',
    projectId: 'MP-055',
    projectName: 'Bhopal Skill Training Institute',
    state: 'Madhya Pradesh',
    inspectorName: 'A. Mishra',
    type: 'Surprise',
    status: 'Scheduled',
    scheduledDate: '30 Sep 2026',
    riskScore: 52,
    findingSummary: 'Attendance discrepancy flagged by AI automated cross-check.'
  }
];

const INSPECTORS_ON_DUTY = [
  { name: 'R. Sharma', zone: 'Maharashtra West', activeTask: 'MH-042 (Nashik)', status: 'En Route', completedToday: 2, avatar: '/avatar_rsharma.jpg' },
  { name: 'V. Patel', zone: 'Gujarat North', activeTask: 'GJ-011 (Ahmedabad)', status: 'On Site', completedToday: 3, avatar: '/avatar_priya.jpg' },
  { name: 'K. Singh', zone: 'Rajasthan Central', activeTask: 'RJ-044 (Jaipur)', status: 'Report Drafting', completedToday: 1, avatar: '/avatar_arjun.jpg' },
  { name: 'A. Mishra', zone: 'MP Central', activeTask: 'MP-055 (Bhopal)', status: 'Available', completedToday: 2, avatar: '/avatar_alok.jpg' },
];

export default function NationalInspections() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = NATIONAL_INSPECTIONS.filter(item => {
    if (filterType !== 'All' && item.type !== filterType) return false;
    if (filterStatus !== 'All' && item.status !== filterStatus) return false;
    if (searchTerm) {
      const match = item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.inspectorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.state.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="p-2.5 sm:p-6 md:p-8 max-w-[1920px] mx-auto space-y-2.5 sm:space-y-6 bg-[#F8FAFC] w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              National Oversight
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Pan-India Command</span>
          </div>
          <h1 className="text-base sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 sm:gap-2.5">
            <ClipboardCheck className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" /> Inspection & Audit Operations
          </h1>
          <p className="text-[10px] sm:text-sm text-slate-500 mt-0.5">
            National audit coverage, field officer deployment, and live physical verification signals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/assignments')}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold shadow-xs transition-colors uppercase tracking-wider cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            Dispatch Smart Assignment
          </button>
        </div>
      </div>

      {/* National KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-slate-200 shadow-2xs">
          <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Scheduled (Month)</p>
          <div className="flex items-baseline justify-between mt-1 sm:mt-2">
            <span className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">248</span>
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              +12% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[9px] sm:text-xs text-slate-400 mt-0.5">Target: 300 inspections</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-slate-200 shadow-2xs">
          <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Completed & Verified</p>
          <div className="flex items-baseline justify-between mt-1 sm:mt-2">
            <span className="text-xl sm:text-3xl font-extrabold text-emerald-600 leading-tight">184</span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-600">74.2%</span>
          </div>
          <p className="text-[9px] sm:text-xs text-slate-400 mt-0.5">Avg: 3.1 days</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-rose-200 bg-rose-50/40 shadow-2xs">
          <p className="text-[9px] sm:text-xs font-bold text-rose-700 uppercase tracking-wider">Overdue Audits</p>
          <div className="flex items-baseline justify-between mt-1 sm:mt-2">
            <span className="text-xl sm:text-3xl font-extrabold text-rose-600 leading-tight">23</span>
            <span className="text-[8.5px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 uppercase">
              Action
            </span>
          </div>
          <p className="text-[9px] sm:text-xs text-rose-700 mt-0.5">High-risk sites</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-slate-200 shadow-2xs">
          <p className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Officers on Duty</p>
          <div className="flex items-baseline justify-between mt-1 sm:mt-2">
            <span className="text-xl sm:text-3xl font-extrabold text-blue-600 leading-tight">42</span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-600">18 states</span>
          </div>
          <p className="text-[9px] sm:text-xs text-slate-400 mt-0.5">GPS telemetry active</p>
        </div>
      </div>

      {/* Main Grid: National Queue + Field Officers Status */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-2.5 sm:gap-6">
        
        {/* Left 2 Cols: Inspection Audit Log */}
        <div className="xl:col-span-2 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-3 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 bg-slate-50/50">
            <div>
              <h2 className="font-bold text-slate-900 text-xs sm:text-base">National Audit Log & Queue</h2>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Physical inspections reported across state directorates</p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search project, state..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-7 pr-2.5 py-1 text-[11px] bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 w-full sm:w-36"
                />
              </div>

              <select 
                value={filterType} 
                onChange={e => setFilterType(e.target.value)}
                className="text-[10px] sm:text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 focus:outline-none font-medium text-slate-700"
              >
                <option value="All">All Types</option>
                <option value="Surprise">Surprise</option>
                <option value="Routine">Routine</option>
                <option value="Follow-up">Follow-up</option>
              </select>

              <select 
                value={filterStatus} 
                onChange={e => setFilterStatus(e.target.value)}
                className="text-[10px] sm:text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 focus:outline-none font-medium text-slate-700"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Overdue">Overdue</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          {/* Mobile Responsive Inspection Cards (< md) */}
          <div className="md:hidden divide-y divide-slate-100 p-2 space-y-1.5">
            {filtered.map(item => {
              const statusColors = {
                Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
                Overdue: 'bg-rose-50 text-rose-700 border-rose-200',
                Scheduled: 'bg-slate-100 text-slate-700 border-slate-200'
              }[item.status];

              return (
                <div key={item.id} className="p-2.5 space-y-2 bg-white rounded-lg border border-slate-100 shadow-2xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs truncate">{item.projectName}</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.projectId} • {item.state}</p>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded-full text-[8.5px] font-bold border uppercase tracking-wider shrink-0 ${statusColors}`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-700">
                        {item.inspectorName[0]}
                      </div>
                      <span className="text-[10px] font-medium">{item.inspectorName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-medium">{item.type}</span>
                      <span className={`font-mono text-[10px] font-bold ${item.riskScore > 60 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        Score: {item.riskScore}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/site/${item.projectId}`)}
                    className="w-full py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Inspection Site</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Desktop Responsive Table (>= md) */}
          <div className="hidden md:block overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Project & Location</th>
                  <th className="p-4">Inspector</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Risk</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(item => {
                  const statusColors = {
                    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
                    Overdue: 'bg-rose-50 text-rose-700 border-rose-200',
                    Scheduled: 'bg-slate-100 text-slate-700 border-slate-200'
                  }[item.status];

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-xs">{item.projectName}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-slate-400">{item.projectId}</span>
                          <span>•</span>
                          <span>{item.state}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                            {item.inspectorName.split(' ')[0][0]}
                          </div>
                          <span className="text-xs font-semibold text-slate-800">{item.inspectorName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-medium text-slate-600">{item.type}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusColors}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`font-mono text-xs font-bold ${item.riskScore > 60 ? 'text-rose-600' : item.riskScore > 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {item.riskScore}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => navigate(`/site/${item.projectId}`)}
                          className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Active Field Inspectors Roster */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" /> Active Inspectors on Duty
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live GPS
              </span>
            </div>

            <div className="space-y-3">
              {INSPECTORS_ON_DUTY.map((insp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={insp.avatar} alt={insp.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{insp.name}</h4>
                        <p className="text-[11px] text-slate-500">{insp.zone}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      insp.status === 'On Site' ? 'bg-emerald-100 text-emerald-700' :
                      insp.status === 'En Route' ? 'bg-blue-100 text-blue-700' :
                      insp.status === 'Report Drafting' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {insp.status}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="truncate max-w-[180px]">Target: <strong>{insp.activeTask}</strong></span>
                    <span>Completed: <strong>{insp.completedToday}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick PMU Action card */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Automated Audit Triggers</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              AI algorithms flag facilities when CCTV goes dark for &gt; 24h, attendance shifts by &gt; 30%, or high-risk fund anomalies occur.
            </p>
            <button 
              onClick={() => navigate('/assignments')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Configure Audit Rules
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

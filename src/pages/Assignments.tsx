import React, { useState } from 'react';
import { 
  ListTodo, PlayCircle, MapPin, UserCheck, Zap, ShieldAlert, 
  CheckCircle2, Navigation, Clock, Upload, Phone, AlertTriangle, 
  FileText, Calendar, ArrowRight, Check, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Assignments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isInspector = user?.role === 'FIELD_INSPECTOR';

  // PMU Director state
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);

  // Inspector Duty Orders state
  const [dutyTab, setDutyTab] = useState<'All' | 'Active' | 'Upcoming' | 'Completed'>('Active');
  const [inspectorOrders, setInspectorOrders] = useState([
    {
      id: 'DO-2026-104',
      projectId: 'MH-042',
      projectName: 'Pimpalgaon Community Centre',
      location: 'Nashik, Maharashtra',
      priority: 'high',
      dueDate: 'Today • 14:00 IST',
      distance: '3.2 km',
      type: 'Surprise Audit',
      dispatchedBy: 'Dr. Alok Verma (PMU Director)',
      status: 'In Transit',
      instructions: 'Verify biometric offline logs and inspect kitchen ration inventory immediately.',
      accepted: true
    },
    {
      id: 'DO-2026-105',
      projectId: 'RJ-044',
      projectName: 'State Facility Entrance',
      location: 'Jaipur, Rajasthan',
      priority: 'medium',
      dueDate: 'Tomorrow • 10:30 IST',
      distance: '14.1 km',
      type: 'Security Verification',
      dispatchedBy: 'PMU Automation Engine',
      status: 'Pending Acceptance',
      instructions: 'Examine entry gate CCTV camera wire continuity and logbook timestamps.',
      accepted: false
    },
    {
      id: 'DO-2026-101',
      projectId: 'MH-089',
      projectName: 'District Welfare Hospital, Ward 3',
      location: 'Pune, Maharashtra',
      priority: 'low',
      dueDate: 'Yesterday • Completed',
      distance: '28.7 km',
      type: 'Routine Compliance',
      dispatchedBy: 'Dr. Alok Verma (PMU Director)',
      status: 'Completed',
      instructions: 'Inspect patient registration desk and fire extinguisher certifications.',
      accepted: true
    }
  ]);

  const steps = [
    { name: 'IDENTIFY ELIGIBLE PROJECT', desc: 'Scanning for overdue inspections and risk signals...' },
    { name: 'PRIORITY CALCULATION', desc: 'Evaluating MH-042 (Risk Score: 78)' },
    { name: 'NEARBY INSPECTOR SEARCH', desc: 'Locating officers within 25km radius...' },
    { name: 'WORKLOAD & SKILL CHECK', desc: 'Checking R. Sharma (3 pending, Skill Match: 94%)' },
    { name: 'CONFLICT OF INTEREST CHECK', desc: 'Verifying past assignments...' },
    { name: 'ASSIGNMENT CREATED', desc: 'Awaiting Inspector Acceptance' }
  ];

  const runSmartAssignment = () => {
    setRunning(true);
    setStep(0);
    const interval = setInterval(() => {
      setStep(s => {
        if (s >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setRunning(false), 3000);
          return s;
        }
        return s + 1;
      });
    }, 1200);
  };

  const handleAcceptOrder = (id: string) => {
    setInspectorOrders(prev => prev.map(o => o.id === id ? { ...o, accepted: true, status: 'Accepted' } : o));
  };

  const filteredOrders = inspectorOrders.filter(o => {
    if (dutyTab === 'All') return true;
    if (dutyTab === 'Active') return o.status === 'In Transit' || o.status === 'Accepted' || o.dueDate.includes('Today');
    if (dutyTab === 'Upcoming') return o.status === 'Pending Acceptance' || o.dueDate.includes('Tomorrow') || o.dueDate.includes('Oct');
    if (dutyTab === 'Completed') return o.status === 'Completed';
    return true;
  });

  // FIELD INSPECTOR VIEW
  if (isInspector) {
    return (
      <div className="p-3.5 sm:p-6 md:p-8 max-w-[1400px] mx-auto space-y-4 sm:space-y-6 bg-[#F8FAFC] w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                Ground Officer Roster
              </span>
              <span className="text-xs text-slate-500 font-medium">Maharashtra West Zone</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <ListTodo className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" /> My Duty Orders & Schedule
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Inspection assignments dispatched to you by PMU Command. Review, accept, and record on-site audit steps.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => navigate('/inspections')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors uppercase tracking-wider"
            >
              <Navigation className="w-4 h-4" /> Start Journey
            </button>
          </div>
        </div>

        {/* Filter Tabs (Matches "Mobile (Duty Orders)" reference screenshot) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {(['Active', 'Upcoming', 'Completed', 'All'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setDutyTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                dutyTab === tab
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Inspector KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Active Duty Orders</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 sm:mt-2">2</p>
            <p className="text-[11px] text-slate-500 mt-0.5">1 high priority</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Travel</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1 sm:mt-2">17.3 km</p>
            <p className="text-[11px] text-slate-500 mt-0.5">2 assigned sites</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Today</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 sm:mt-2">1</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Report signed</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 sm:mt-2">98.4%</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Excellent tier</p>
          </div>
        </div>

        {/* Duty Orders List */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">Assigned Inspection Directives</h2>

          {filteredOrders.map(order => (
            <div 
              key={order.id} 
              className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ${
                order.priority === 'high' ? 'border-rose-200' : 'border-slate-200'
              }`}
            >
              <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-400">{order.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                      order.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {order.priority} priority
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {order.type}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{order.projectName}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{order.location}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">{order.distance} away</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400 ml-1" />
                    <span>Deadline: <strong>{order.dueDate}</strong></span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!order.accepted ? (
                    <button 
                      onClick={() => handleAcceptOrder(order.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                    >
                      <Check className="w-3.5 h-3.5" /> Accept Duty
                    </button>
                  ) : order.status !== 'Completed' ? (
                    <button 
                      onClick={() => navigate('/inspections')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Navigate & Audit
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4" /> Report Submitted
                    </span>
                  )}
                </div>
              </div>

              {/* Order Specifics */}
              <div className="px-5 py-4 bg-slate-50/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-700">PMU Instructions: </span>
                  <span className="text-slate-600">{order.instructions}</span>
                </div>
                <div className="text-slate-500 shrink-0 font-medium">
                  Dispatched by: <span className="font-semibold text-slate-800">{order.dispatchedBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // PMU DIRECTOR VIEW (Default)
  return (
    <div className="p-3.5 sm:p-6 md:p-8 max-w-[1920px] mx-auto space-y-4 sm:space-y-6 bg-[#F8FAFC] w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              National Dispatch
            </span>
            <span className="text-xs text-slate-500 font-medium">AI Allocation Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
             <ListTodo className="w-6 h-6 text-blue-600"/> Smart Assignment & Officer Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Automated workload balancing, proximity routing, and conflict-of-interest verification.</p>
        </div>
        <button 
          onClick={runSmartAssignment}
          disabled={running}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#0B0F19] text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition-colors tracking-wide uppercase disabled:opacity-50"
        >
          <Zap className={`w-4 h-4 ${running ? 'animate-pulse text-yellow-400' : ''}`}/>
          {running ? 'Processing Engine...' : 'Run Smart Allocation'}
        </button>
      </div>

      {running && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 left-0 h-1.5 bg-blue-500 transition-all duration-[1200ms] ease-linear" style={{ width: `${((step+1)/steps.length)*100}%`}}></div>
           <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Smart Allocation Engine Running</h3>
           <div className="space-y-4">
             {steps.map((s, idx) => (
               <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${idx > step ? 'opacity-20 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${idx < step ? 'bg-emerald-100 text-emerald-600' : idx === step ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                   {idx < step ? <CheckCircle2 className="w-4 h-4"/> : <Zap className="w-4 h-4"/>}
                 </div>
                 <div>
                   <h4 className={`text-xs font-bold uppercase tracking-wider ${idx === step ? 'text-blue-700' : 'text-slate-700'}`}>{s.name}</h4>
                   <p className="text-[11px] text-slate-500">{s.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm"><h3 className="text-[10px] font-bold text-slate-500 uppercase">Unassigned Sites</h3><div className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1">12</div></div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm"><h3 className="text-[10px] font-bold text-slate-500 uppercase">AI Recommendations</h3><div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1">8</div></div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm"><h3 className="text-[10px] font-bold text-slate-500 uppercase">Officers Active</h3><div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">34</div></div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm"><h3 className="text-[10px] font-bold text-slate-500 uppercase">Dispatched Today</h3><div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">104</div></div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
           <h3 className="font-bold text-slate-900 text-sm">Suggested Dispatch Queue</h3>
         </div>

         {/* Mobile Card List (< sm) */}
         <div className="sm:hidden divide-y divide-slate-100 p-3 space-y-3">
           {[
             {
               id: 'MH-042',
               site: 'Pimpalgaon, Nashik',
               type: 'High Risk Surprise',
               typeColor: 'bg-rose-50 text-rose-700',
               inspector: 'R. Sharma',
               avatar: '/avatar_rsharma.jpg',
               dist: '3.2km away • Maharashtra West',
               match: '94%'
             },
             {
               id: 'GJ-011',
               site: 'Ahmedabad Welfare',
               type: 'Routine Check',
               typeColor: 'bg-amber-50 text-amber-700',
               inspector: 'V. Patel',
               avatar: '/avatar_priya.jpg',
               dist: '12km away • Gujarat North',
               match: '88%'
             },
             {
               id: 'RJ-044',
               site: 'Jaipur Entrance',
               type: 'Security Audit',
               typeColor: 'bg-amber-50 text-amber-700',
               inspector: 'K. Singh',
               avatar: '/avatar_arjun.jpg',
               dist: '14km away • Jaipur Central',
               match: '91%'
             }
           ].map(item => (
             <div key={item.id} className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs space-y-2.5">
               <div className="flex items-start justify-between">
                 <div>
                   <h4 className="font-bold text-xs text-slate-900">{item.id} ({item.site})</h4>
                   <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase ${item.typeColor}`}>
                     {item.type}
                   </span>
                 </div>
                 <span className="font-mono text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
                   {item.match} Match
                 </span>
               </div>

               <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                 <div className="flex items-center gap-2">
                   <img src={item.avatar} alt={item.inspector} className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200" />
                   <div>
                     <span className="font-bold text-slate-800 text-[11px] block">{item.inspector}</span>
                     <span className="text-[10px] text-slate-400">{item.dist}</span>
                   </div>
                 </div>
                 <button className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold rounded-lg uppercase transition-colors cursor-pointer">
                   Dispatch
                 </button>
               </div>
             </div>
           ))}
         </div>

         {/* Desktop Table (>= sm) */}
         <div className="hidden sm:block overflow-x-auto">
           <table className="w-full text-left text-sm min-w-[640px]">
             <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
               <tr>
                 <th className="p-4">Project & Location</th>
                 <th className="p-4">Risk / Type</th>
                 <th className="p-4">Recommended Inspector</th>
                 <th className="p-4">Match Score</th>
                 <th className="p-4 text-right">Action</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               <tr className="hover:bg-blue-50/50 transition-colors">
                 <td className="p-4 font-semibold text-slate-900">MH-042 (Pimpalgaon, Nashik)</td>
                 <td className="p-4"><span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">High Risk Surprise</span></td>
                 <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <img src="/avatar_rsharma.jpg" alt="R. Sharma" className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 text-xs block">R. Sharma</span>
                        <span className="text-[11px] text-slate-500">3.2km away • Maharashtra West</span>
                      </div>
                    </div>
                  </td>
                 <td className="p-4 font-mono text-emerald-600 font-bold">94% Match</td>
                 <td className="p-4 text-right"><button className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-bold rounded-lg uppercase transition-colors cursor-pointer">Dispatch</button></td>
               </tr>
               <tr className="hover:bg-blue-50/50 transition-colors">
                 <td className="p-4 font-semibold text-slate-900">GJ-011 (Ahmedabad)</td>
                 <td className="p-4"><span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Routine Check</span></td>
                 <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <img src="/avatar_priya.jpg" alt="V. Patel" className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 text-xs block">V. Patel</span>
                        <span className="text-[11px] text-slate-500">12km away • Gujarat North</span>
                      </div>
                    </div>
                  </td>
                 <td className="p-4 font-mono text-emerald-600 font-bold">88% Match</td>
                 <td className="p-4 text-right"><button className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-bold rounded-lg uppercase transition-colors cursor-pointer">Dispatch</button></td>
               </tr>
               <tr className="hover:bg-blue-50/50 transition-colors">
                 <td className="p-4 font-semibold text-slate-900">RJ-044 (Jaipur Entrance)</td>
                 <td className="p-4"><span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Security Audit</span></td>
                 <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <img src="/avatar_arjun.jpg" alt="K. Singh" className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 text-xs block">K. Singh</span>
                        <span className="text-[11px] text-slate-500">14km away • Jaipur Central</span>
                      </div>
                    </div>
                  </td>
                 <td className="p-4 font-mono text-emerald-600 font-bold">91% Match</td>
                 <td className="p-4 text-right"><button className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-bold rounded-lg uppercase transition-colors cursor-pointer">Dispatch</button></td>
               </tr>
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');

const pages = {
  'Assignments.tsx': `import React, { useState } from 'react';
import { ListTodo, PlayCircle, MapPin, UserCheck, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Assignments() {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);

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

  return (
    <div className="p-6 max-w-[1920px] mx-auto space-y-6 bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
             <ListTodo className="w-6 h-6 text-blue-600"/> Assignment Operations
          </h1>
          <p className="text-sm text-gray-500 mt-1">Smart scheduling and inspector allocation.</p>
        </div>
        <button 
          onClick={runSmartAssignment}
          disabled={running}
          className="flex items-center gap-2 px-6 py-3 bg-[#0B0F19] text-white rounded-lg text-sm font-bold shadow-md hover:bg-gray-800 transition-colors tracking-wide uppercase disabled:opacity-50"
        >
          <Zap className={\`w-4 h-4 \${running ? 'animate-pulse text-yellow-400' : ''}\`}/>
          {running ? 'Processing Engine...' : 'Run Smart Assignment'}
        </button>
      </div>

      {running && (
        <div className="bg-white rounded-xl p-8 border border-blue-200 shadow-lg mb-8 relative overflow-hidden">
           <div className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-[1200ms] ease-linear" style={{ width: \`\${((step+1)/steps.length)*100}%\`}}></div>
           <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Smart Allocation Engine Running</h3>
           <div className="space-y-4">
             {steps.map((s, idx) => (
               <div key={idx} className={\`flex items-center gap-4 transition-all duration-500 \${idx > step ? 'opacity-20 translate-y-4' : 'opacity-100 translate-y-0'}\`}>
                 <div className={\`w-8 h-8 rounded-full flex items-center justify-center \${idx < step ? 'bg-green-100 text-green-600' : idx === step ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-gray-100 text-gray-400'}\`}>
                   {idx < step ? <CheckCircle2 className="w-4 h-4"/> : <Zap className="w-4 h-4"/>}
                 </div>
                 <div>
                   <h4 className={\`text-xs font-bold uppercase tracking-wider \${idx === step ? 'text-blue-700' : 'text-gray-700'}\`}>{s.name}</h4>
                   <p className="text-[11px] text-gray-500">{s.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Unassigned Risk</h3><div className="text-3xl font-bold text-red-600 mt-1">12</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Recommended</h3><div className="text-3xl font-bold text-blue-600 mt-1">8</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">In Progress</h3><div className="text-3xl font-bold text-amber-600 mt-1">34</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Completed Today</h3><div className="text-3xl font-bold text-green-600 mt-1">104</div></div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
         <table className="w-full text-left text-sm">
           <thead className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
             <tr><th className="p-4">Project</th><th className="p-4">Risk / Type</th><th className="p-4">Recommended Inspector</th><th className="p-4">Score</th><th className="p-4 text-right">Action</th></tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
             <tr className="hover:bg-blue-50/50">
               <td className="p-4 font-semibold">MH-042 (Nashik)</td>
               <td className="p-4"><span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">High Risk</span></td>
               <td className="p-4 flex items-center gap-2"><UserCheck className="w-4 h-4 text-gray-400"/> R. Sharma (3km)</td>
               <td className="p-4 font-mono text-green-600">94% Match</td>
               <td className="p-4 text-right"><button className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">Approve</button></td>
             </tr>
             <tr className="hover:bg-blue-50/50">
               <td className="p-4 font-semibold">GJ-011 (Ahmedabad)</td>
               <td className="p-4"><span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Surprise</span></td>
               <td className="p-4 flex items-center gap-2"><UserCheck className="w-4 h-4 text-gray-400"/> V. Patel (12km)</td>
               <td className="p-4 font-mono text-green-600">88% Match</td>
               <td className="p-4 text-right"><button className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">Approve</button></td>
             </tr>
           </tbody>
         </table>
      </div>
    </div>
  );
}`
};

for (const [name, content] of Object.entries(pages)) {
  fs.writeFileSync(path.join(dir, name), content);
}
console.log('Assignments Page generated.');

import React from 'react';
import { FileText, Download, PlayCircle, BarChart2 } from 'lucide-react';

export default function Reports() {
  const reports = [
    { name: 'National Monitoring Report', desc: 'Aggregated view of all active projects, risk signals, and inspection outcomes across India.', last: 'Today, 08:00 AM' },
    { name: 'State Performance Report', desc: 'Detailed breakdown by State/UT covering compliance, fund utilisation, and CCTV uptime.', last: 'Yesterday, 18:00 PM' },
    { name: 'District Monitoring Report', desc: 'Granular view for District Magistrates and Nodal Officers.', last: '24-09-2026' },
    { name: 'NGO Compliance Report', desc: 'Scoring and risk profiling of all registered NGOs/Institutes.', last: '20-09-2026' },
    { name: 'Financial Utilisation Report', desc: 'FundTrace analysis covering sanctioned vs verified expenditures.', last: '01-09-2026' },
    { name: 'Asset & Stock Report', desc: 'SakshyaChain audit of physical infrastructure and inventory.', last: '15-09-2026' },
    { name: 'Beneficiary / Complaint Report', desc: 'Aggregated Seva-Samadhan and Proof-of-Service signals.', last: 'Today, 10:30 AM' },
    { name: 'Audit Evidence Pack', desc: 'Immutable ledger extract of all critical system mutations.', last: 'Always Live' }
  ];

  return (
    <div className="p-6 max-w-[1920px] mx-auto bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
             <BarChart2 className="w-6 h-6 text-blue-600"/> Reporting Centre
          </h1>
          <p className="text-sm text-gray-500 mt-1">Generate and download official intelligence reports.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Reports Generated</h3><div className="text-3xl font-bold text-gray-900 mt-1">1,402</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Pending Requests</h3><div className="text-3xl font-bold text-amber-600 mt-1">3</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">National Coverage</h3><div className="text-3xl font-bold text-blue-600 mt-1">100%</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Audit Packs</h3><div className="text-3xl font-bold text-green-600 mt-1">84</div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reports.map(r => (
          <div key={r.name} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className="p-5 flex-1">
              <h3 className="font-bold text-gray-900 text-sm mb-2">{r.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{r.desc}</p>
              <div className="text-[10px] font-mono text-gray-400 bg-gray-50 inline-block px-2 py-1 rounded">Last Generated: {r.last}</div>
            </div>
            <div className="border-t border-gray-100 bg-gray-50 p-3 flex justify-between gap-2">
               <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"><FileText className="w-3.5 h-3.5"/> PREVIEW</button>
               <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"><PlayCircle className="w-3.5 h-3.5"/> GENERATE</button>
               <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"><Download className="w-3.5 h-3.5"/> CSV</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { Package, QrCode, Building2, MapPin, AlertCircle, Search, Filter } from 'lucide-react';

export default function Assets() {
  const assets = [
    { id: 'AST-9921', name: 'Commercial CCTV Rig', project: 'MH-042 Pimpalgaon Centre', expected: 'Server Room', custodian: 'Ravi Kumar', condition: 'Functional', lastVerified: 'Today', status: 'Verified' },
    { id: 'AST-4412', name: 'Biometric Attendance Kiosk', project: 'GJ-011 Ahmedabad Office', expected: 'Main Entrance', custodian: 'Amit Shah', condition: 'Functional', lastVerified: '3 days ago', status: 'Verified' },
    { id: 'AST-7763', name: 'Wheelchair - Model X', project: 'UP-088 Rehab Institute', expected: 'Ward B', custodian: 'Sunil Verma', condition: 'Damaged', lastVerified: '12 days ago', status: 'Mismatch' },
    { id: 'AST-1198', name: 'Desktop Computer', project: 'MH-042 Pimpalgaon Centre', expected: 'Admin Desk', custodian: 'Ravi Kumar', condition: 'Unknown', lastVerified: '45 days ago', status: 'Missing' },
  ];

  return (
    <div className="p-6 max-w-[1920px] mx-auto space-y-6 bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
             <Package className="w-6 h-6 text-blue-600"/> Assets & Stock Verification (SakshyaChain)
          </h1>
          <p className="text-sm text-gray-500 mt-1">Immutable ledger for physical infrastructure and inventory tracking.</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm flex items-center gap-2">
          <QrCode className="w-4 h-4"/> Scan Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Total Tracked Assets</h3><div className="text-3xl font-bold text-gray-900 mt-1">12,408</div></div>
        <div className="bg-green-50 rounded-xl p-5 border border-green-200 shadow-sm"><h3 className="text-[10px] font-bold text-green-800 uppercase">Verified Active</h3><div className="text-3xl font-bold text-green-600 mt-1">11,942</div></div>
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 shadow-sm"><h3 className="text-[10px] font-bold text-amber-800 uppercase">Location Mismatch</h3><div className="text-3xl font-bold text-amber-600 mt-1">86</div></div>
        <div className="bg-red-50 rounded-xl p-5 border border-red-200 shadow-sm"><h3 className="text-[10px] font-bold text-red-800 uppercase">Missing / Lost</h3><div className="text-3xl font-bold text-red-600 mt-1">14</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Pending Audits</h3><div className="text-3xl font-bold text-blue-600 mt-1">366</div></div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by Asset ID, Project, or Custodian..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded text-sm font-medium transition-colors"><Filter className="w-4 h-4"/> Filters</button>
        </div>

        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50/80 border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-500 font-bold">
            <tr>
              <th className="px-6 py-4">Asset Details</th>
              <th className="px-6 py-4">Assignment / Custodian</th>
              <th className="px-6 py-4">Verification State</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assets.map((a, i) => (
              <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 flex items-center gap-2"><QrCode className="w-3.5 h-3.5 text-blue-500"/> {a.name}</span>
                    <span className="text-xs text-gray-500 font-mono mt-1">ID: {a.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5"><Building2 className="w-3 h-3 text-gray-400"/> {a.project}</span>
                    <span className="text-xs text-gray-500 mt-1 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gray-400"/> {a.expected} • Custodian: {a.custodian}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5 items-start">
                    {a.status === 'Verified' && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Verified ({a.condition})</span>}
                    {a.status === 'Mismatch' && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Location Mismatch</span>}
                    {a.status === 'Missing' && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Missing / Lost</span>}
                    <span className="text-[10px] text-gray-400 font-medium tracking-wider">Last Check: {a.lastVerified}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded hover:bg-gray-200 transition-colors">HISTORY</button>
                    <button className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded hover:bg-blue-100 transition-colors">VERIFY</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
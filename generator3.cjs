const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');

const pages = {
  'RegionalMap.tsx': `import React from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import { Map, Layers, Filter, Activity, MapPin } from 'lucide-react';
import L from 'leaflet';

const INDIA_BOUNDS = [[6.0, 68.0], [36.0, 98.0]];

export default function RegionalMap() {
  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-[#0B0F19]">
      {/* Top Toolbar */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 z-10 shadow-sm shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
             <Map className="w-5 h-5 text-blue-600"/> Geospatial Intelligence
          </h1>
          <p className="text-xs text-gray-500 mt-1">National mapping and regional clustering.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 bg-gray-100 rounded hover:bg-gray-200">SATELLITE</button>
          <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 bg-gray-100 rounded hover:bg-gray-200">HYBRID</button>
          <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 rounded">RISK HEATMAP</button>
        </div>
      </div>

      {/* Map & Sidebar */}
      <div className="flex flex-1 overflow-hidden relative">
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col z-10 shrink-0">
           <div className="p-4 border-b border-gray-100 bg-gray-50/50">
             <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2"><Filter className="w-4 h-4"/> Filters</h3>
           </div>
           <div className="p-4 space-y-4 flex-1 overflow-y-auto">
             <div><label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">State / UT</label><select className="w-full text-sm border-gray-300 rounded"><option>All States</option><option>Maharashtra</option><option>Gujarat</option></select></div>
             <div><label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Risk Level</label><select className="w-full text-sm border-gray-300 rounded"><option>All Risks</option><option>High Risk</option></select></div>
             <div><label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Project Type</label><select className="w-full text-sm border-gray-300 rounded"><option>All Types</option><option>Rehab Centre</option></select></div>
             <div className="pt-4 border-t border-gray-100">
               <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Visible Layers</h4>
               <label className="flex items-center gap-2 mb-2 text-sm text-gray-700"><input type="checkbox" defaultChecked /> Active Projects</label>
               <label className="flex items-center gap-2 mb-2 text-sm text-gray-700"><input type="checkbox" defaultChecked /> Open Inspections</label>
               <label className="flex items-center gap-2 mb-2 text-sm text-gray-700"><input type="checkbox" defaultChecked /> Offline CCTV</label>
             </div>
           </div>
        </div>

        <div className="flex-1 relative bg-[#0B0F19]">
          <MapContainer center={[22.0, 79.0]} zoom={5} minZoom={4} maxZoom={18} maxBounds={INDIA_BOUNDS} className="w-full h-full" zoomControl={false}>
            <ZoomControl position="bottomright" />
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}`,

  'FundTrace.tsx': `import React from 'react';
import { IndianRupee, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, FileWarning } from 'lucide-react';

export default function FundTrace() {
  return (
    <div className="p-6 max-w-[1920px] mx-auto space-y-6 bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
             <IndianRupee className="w-6 h-6 text-green-600"/> FundTrace Intelligence
          </h1>
          <p className="text-sm text-gray-500 mt-1">Financial oversight, budget tracking, and automated bill flagging.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Sanctioned</h3><div className="text-3xl font-bold text-gray-900 mt-1">₹4.2Cr</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Released</h3><div className="text-3xl font-bold text-blue-600 mt-1">₹2.8Cr</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Verified Exp.</h3><div className="text-3xl font-bold text-green-600 mt-1">₹1.9Cr</div></div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"><h3 className="text-[10px] font-bold text-gray-500 uppercase">Pending Bills</h3><div className="text-3xl font-bold text-amber-600 mt-1">18</div></div>
        <div className="bg-white rounded-xl p-5 border border-red-200 shadow-sm bg-red-50"><h3 className="text-[10px] font-bold text-red-800 uppercase">Flagged Review</h3><div className="text-3xl font-bold text-red-600 mt-1">3</div></div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm">Bill Review Queue</h3>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              <tr><th className="p-4">Invoice / UTR</th><th className="p-4">Project</th><th className="p-4">Amount</th><th className="p-4">Risk Flag</th><th className="p-4 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-red-50/30">
                <td className="p-4 font-mono text-xs">INV-2026-892</td>
                <td className="p-4 font-semibold">MH-042</td>
                <td className="p-4 font-bold text-gray-900">₹2,40,000</td>
                <td className="p-4"><span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><FileWarning className="w-3 h-3"/> Location Mismatch</span></td>
                <td className="p-4 text-right"><button className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded uppercase hover:bg-red-200">Investigate</button></td>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <td className="p-4 font-mono text-xs">UTR-HDFC-991</td>
                <td className="p-4 font-semibold">GJ-011</td>
                <td className="p-4 font-bold text-gray-900">₹85,000</td>
                <td className="p-4"><span className="text-green-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3"/> Verified</span></td>
                <td className="p-4 text-right"><button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded uppercase hover:bg-gray-200">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-[#0B0F19] rounded-xl border border-gray-800 shadow-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <h3 className="font-bold text-green-400 text-sm tracking-tight mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Utilisation Readiness</h3>
          <div className="text-5xl font-bold mb-2">92%</div>
          <p className="text-gray-400 text-xs">Overall financial compliance score across all monitored projects. 3 projects currently under active investigation.</p>
          <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold tracking-wider uppercase transition-colors">Generate Financial Audit</button>
        </div>
      </div>
    </div>
  );
}`
};

for (const [name, content] of Object.entries(pages)) {
  fs.writeFileSync(path.join(dir, name), content);
}
console.log('Map and FundTrace Pages generated.');

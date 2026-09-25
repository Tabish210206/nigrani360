const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'pages');

const content = `import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import { Map, Filter, Activity, MapPin, Building, ShieldAlert } from 'lucide-react';
import L from 'leaflet';

const INDIA_BOUNDS = [[6.0, 68.0], [36.0, 98.0]];

// Custom SVG Icons
const createIcon = (color: string) => L.divIcon({
  className: 'custom-div-icon',
  html: \`<div style="background-color: \${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>\`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const defaultIcon = createIcon('#3B82F6');
const riskIcon = createIcon('#EF4444');

export default function RegionalMap() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filterState, setFilterState] = useState('All');
  const [filterRisk, setFilterRisk] = useState('All');
  
  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(setProjects).catch(() => {});
  }, []);

  const filteredProjects = projects.filter(p => {
    if (filterState !== 'All' && p.state !== filterState) return false;
    if (filterRisk === 'High' && p.riskLevel !== 'high') return false;
    if (filterRisk === 'Medium' && p.riskLevel !== 'medium') return false;
    return true;
  });

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
          <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 rounded">HYBRID</button>
        </div>
      </div>

      {/* Map & Sidebar */}
      <div className="flex flex-1 overflow-hidden relative">
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col z-10 shrink-0">
           <div className="p-4 border-b border-gray-100 bg-gray-50/50">
             <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2"><Filter className="w-4 h-4"/> Filters</h3>
           </div>
           <div className="p-4 space-y-4 flex-1 overflow-y-auto">
             <div>
               <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">State / UT</label>
               <select value={filterState} onChange={e => setFilterState(e.target.value)} className="w-full text-sm border-gray-300 rounded p-2 border">
                 <option value="All">All States</option>
                 <option value="Maharashtra">Maharashtra</option>
                 <option value="Gujarat">Gujarat</option>
                 <option value="Rajasthan">Rajasthan</option>
                 <option value="Uttar Pradesh">Uttar Pradesh</option>
               </select>
             </div>
             <div>
               <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Risk Level</label>
               <select value={filterRisk} onChange={e => setFilterRisk(e.target.value)} className="w-full text-sm border-gray-300 rounded p-2 border">
                 <option value="All">All Risks</option>
                 <option value="High">High Risk</option>
                 <option value="Medium">Medium Risk</option>
               </select>
             </div>
             <div className="pt-4 border-t border-gray-100">
               <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Visible Data</h4>
               <p className="text-sm font-bold text-blue-600 mb-2">Showing {filteredProjects.length} Projects</p>
               <label className="flex items-center gap-2 mb-2 text-sm text-gray-700"><input type="checkbox" defaultChecked /> Active Projects</label>
             </div>
           </div>
        </div>

        <div className="flex-1 relative bg-[#0B0F19]">
          <MapContainer center={[22.0, 79.0]} zoom={5} minZoom={4} maxZoom={18} maxBounds={INDIA_BOUNDS} className="w-full h-full" zoomControl={false}>
            <ZoomControl position="bottomright" />
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            
            {filteredProjects.map((p, i) => (
              <Marker 
                key={p.id || i} 
                position={[p.lat || 20 + Math.random()*5, p.lng || 75 + Math.random()*5]}
                icon={p.riskLevel === 'high' ? riskIcon : defaultIcon}
              >
                <Popup className="custom-popup">
                  <div className="p-1 min-w-[200px]">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{p.district}, {p.state}</p>
                    {p.riskLevel === 'high' && <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase inline-block mb-2">High Risk</span>}
                    <button className="w-full py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded">View Intelligence</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}`;

fs.writeFileSync(path.join(dir, 'RegionalMap.tsx'), content);
console.log('RegionalMap updated with working filters and markers.');

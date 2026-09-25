import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowUpRight, Activity, ChevronRight, Filter, Expand, AlertTriangle, PlayCircle, ShieldAlert, BarChart2, CheckCircle2, Globe, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import L from 'leaflet';
import CCTVViewer from '../components/CCTVViewer';
import ProjectDrawer from '../components/ProjectDrawer';
import { useNavigate } from 'react-router-dom';
import { regionalData } from '../data/mockData';
import { fetchCommandCentre, socket } from '../services/api';

const createCustomIcon = (risk: string) => {
  const color = risk === 'high' ? '#EF4444' : risk === 'medium' ? '#F59E0B' : '#10B981';
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid white; box-shadow: 0 0 12px ${color}80; transition: transform 0.2s;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

const INDIA_BOUNDS: L.LatLngBoundsExpression = [
  [6.0, 68.0], // SW
  [36.0, 98.0] // NE
];

function MapUpdater({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 12, { duration: 1.5 });
    }
  }, [center, map]);
  
  // Expose a global reset method
  (window as any).resetMapToIndia = () => {
    map.flyToBounds(INDIA_BOUNDS, { duration: 1.5 });
  };
  return null;
}

export default function Overview() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [activeViewer, setActiveViewer] = useState<any>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  const loadData = async () => {
    try {
      const result = await fetchCommandCentre();
      setData(result);
      if (result.activities) {
        setActivities(result.activities.map((a: any) => ({
          id: a.id,
          text: a.description,
          time: new Date(a.timestamp).toLocaleTimeString(),
          type: a.type
        })));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();

    socket.on('CCTV_STATUS_CHANGED', loadData);
    socket.on('ACTIVITY_EVENT', (ev) => {
      setActivities(prev => [ev, ...prev].slice(0, 8));
    });

    return () => {
      socket.off('CCTV_STATUS_CHANGED');
      socket.off('ACTIVITY_EVENT');
    };
  }, []);

  const handleProjectClick = (project: any) => {
    setActiveProject(project.id);
  };
  
  const handleViewOnMap = (project: any) => {
    setMapCenter([project.latitude, project.longitude]);
    setActiveProject(project.id);
    setActiveViewer(null);
  };

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest animate-pulse">Initializing Command Centre...</p>
        </div>
      </div>
    );
  }

  const projectsData = data.projects || [];

  return (
    <div className="p-6 max-w-[1920px] mx-auto space-y-6 flex flex-col min-h-[calc(100vh-56px)] bg-[#F4F6F8]">
      
      {/* Intelligence KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 shrink-0">
        
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => alert('Filter Map')}>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Active Monitored Sites</h3>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-3xl font-bold tracking-tight text-gray-900">{data.activeProjects.toLocaleString()}</span>
            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3"/> 2.4%</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Across 28 States / UTs</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/alerts')}>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Open Risk Alerts</h3>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-3xl font-bold tracking-tight text-red-600">{data.openRiskAlerts}</span>
            <span className="text-[11px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3"/> 8.1%</span>
          </div>
          <div className="flex gap-1.5 mt-2">
            <span className="text-[9px] font-bold text-red-700 uppercase tracking-wider">4 High</span>
            <span className="text-[9px] text-gray-300">•</span>
            <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider">7 Medium</span>
            <span className="text-[9px] text-gray-300">•</span>
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">3 Review</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => alert('Inspections')}>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Inspections Requiring Attention</h3>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-3xl font-bold tracking-tight text-amber-600">{data.inspectionDeficit}</span>
          </div>
          <div className="flex gap-1.5 mt-2">
            <span className="text-[10px] font-semibold text-gray-600">{data.inspectionDeficit} overdue</span>
            <span className="text-[10px] text-gray-300">•</span>
            <span className="text-[10px] font-semibold text-gray-600">18 due soon</span>
          </div>
        </div>

        <div className="bg-[#0B0F19] rounded-xl p-5 border border-gray-800 shadow-lg relative overflow-hidden cursor-pointer" onClick={() => navigate('/fundtrace')}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <h3 className="text-[10px] font-bold text-blue-300/80 uppercase tracking-widest mb-1 relative z-10">FundTrace Confidence</h3>
          <div className="flex items-baseline gap-2 mb-1.5 relative z-10">
            <span className="text-3xl font-bold tracking-tight text-white">{data.fundTraceConfidence}%</span>
          </div>
          <p className="text-xs text-gray-400 font-medium relative z-10">2.1% records under review</p>
        </div>
      </div>

      {/* Main Grid: Map & CCTV Wall */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 min-h-[600px] flex-1">
        
        {/* Cinematic Map (Hero) */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden relative flex flex-col">
          <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-md border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
            <h3 className="font-bold text-gray-900 text-sm tracking-tight flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600"/> Geospatial Intelligence
            </h3>
            <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase tracking-widest">National View</p>
          </div>
          
          <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-sm p-1 flex flex-col gap-1">
              <button className="text-[10px] font-bold px-3 py-1.5 rounded bg-gray-100 text-gray-900 hover:bg-gray-200">HYBRID</button>
              <button className="text-[10px] font-bold px-3 py-1.5 rounded hover:bg-gray-100 text-gray-600">SATELLITE</button>
              <button className="text-[10px] font-bold px-3 py-1.5 rounded hover:bg-gray-100 text-gray-600">RISK</button>
            </div>
            <button 
              onClick={() => (window as any).resetMapToIndia?.()} 
              className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-sm px-3 py-2 text-[10px] font-bold text-blue-700 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5 uppercase tracking-widest"
            >
              Reset India View
            </button>
          </div>

          <div className="absolute bottom-6 left-4 z-[400] bg-white/90 backdrop-blur-md border border-gray-200 p-3 rounded-lg shadow-sm flex flex-col gap-2">
             <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span><span className="text-[10px] font-bold text-gray-600 uppercase">Normal</span></div>
             <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span><span className="text-[10px] font-bold text-gray-600 uppercase">Review</span></div>
             <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span><span className="text-[10px] font-bold text-gray-600 uppercase">High Risk</span></div>
          </div>
          
          <div className="flex-1 w-full h-full bg-[#0B0F19]">
            <MapContainer 
              center={[22.0, 79.0]} 
              zoom={5} 
              minZoom={4}
              maxZoom={18}
              maxBounds={INDIA_BOUNDS}
              maxBoundsViscosity={1.0}
              className="w-full h-full" 
              zoomControl={false}
            >
              <ZoomControl position="bottomright" />
              <MapUpdater center={mapCenter} />
              <TileLayer
                attribution='&copy; Esri'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={18}
              />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
                opacity={0.9}
                zIndex={10}
              />
              {projectsData.map((marker, i) => (
                <Marker 
                  key={i} 
                  position={[marker.latitude, marker.longitude] as [number, number]} 
                  icon={createCustomIcon(marker.riskLevel)}
                  eventHandlers={{ click: () => handleProjectClick(marker) }}
                >
                  <Popup className="custom-popup" closeButton={false}>
                     <div className="text-center p-1">
                        <div className="font-bold text-gray-900 text-xs mb-1">{marker.name}</div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest">{marker.id}</div>
                     </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* CCTV Surveillance Wall */}
        <div className="bg-[#0B0F19] rounded-xl border border-gray-800 shadow-xl overflow-hidden flex flex-col shrink-0 relative">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#070A11] sticky top-0 z-10">
            <div>
              <h3 className="font-bold text-white text-sm tracking-tight">Live Surveillance Wall</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Monitoring 4 active feeds</p>
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
            {projectsData.slice(0, 4).map((feed, idx) => (
              <div 
                key={feed.id}
                className="relative rounded-lg overflow-hidden aspect-[4/3] group border border-gray-700 shadow-inner cursor-pointer"
                onClick={() => {
                  handleProjectClick(feed);
                }}
              >
                <img src={(feed.cctvs?.[0]?.image)} alt={feed.name} className="w-full h-full object-cover filter contrast-[1.15] saturate-[0.6] brightness-90 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 grainy-overlay mix-blend-overlay opacity-60"></div>
                
                {/* OSD */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-white text-[8px] font-bold tracking-widest">LIVE</span>
                </div>
                <div className="absolute top-2 right-2 text-white/90 font-mono text-[8px] bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
                  {(feed.cctvs?.[0]?.cameraId)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6">
                   <div className="text-white/90 font-mono text-[9px] drop-shadow-md truncate font-bold">{feed.name.toUpperCase()}</div>
                   <div className="text-gray-400 font-mono text-[8px] flex justify-between mt-0.5">
                     <span>{feed.district}, {feed.state}</span>
                     <span>👁 18</span>
                   </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-lg transition-colors pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Intelligence Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[280px]">
        
        {/* What Needs Attention Now */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm flex flex-col overflow-hidden col-span-1 lg:col-span-1">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-900 text-sm tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" /> What Needs Attention Now
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {projectsData.filter(p => p.riskLevel !== 'low').map((p, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 transition-colors cursor-pointer group" onClick={() => handleProjectClick(p)}>
                 <div className="flex justify-between items-start mb-1">
                   <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${p.riskLevel === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                     {p.riskLevel}
                   </span>
                   <span className="text-[10px] text-gray-400 font-medium">Just now</span>
                 </div>
                 <h4 className="text-xs font-bold text-gray-900 truncate">{p.name}</h4>
                 <p className="text-[11px] text-gray-600 mt-1 line-clamp-1">{p.signals?.[0]?.signal}</p>
                 <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">REVIEW</button>
                   <button className="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">ASSIGN</button>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* National Situation */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm flex flex-col p-5 col-span-1 lg:col-span-1">
          <h3 className="font-bold text-gray-900 text-sm tracking-tight mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-blue-600" /> Regional Performance
          </h3>
          <div className="flex-1 flex flex-col gap-3">
             <div className="grid grid-cols-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-2">
               <div className="col-span-2">Region</div>
               <div className="text-center">High Risk</div>
               <div className="text-center">Insp.</div>
               <div className="text-right">Offline</div>
             </div>
             {regionalData.map((reg, idx) => (
               <div key={idx} className="grid grid-cols-5 text-xs items-center p-2 rounded hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer" onClick={() => alert(`Filtering by ${reg.region}`)}>
                 <div className="col-span-2 font-semibold text-gray-900">{reg.region}</div>
                 <div className="text-center font-bold text-red-600">{reg.riskLevelHigh}</div>
                 <div className="text-center font-medium text-gray-600">{reg.inspection}</div>
                 <div className="text-right font-medium text-gray-600">{reg.offline}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Live Activity Stream */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm flex flex-col overflow-hidden col-span-1 lg:col-span-1">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm tracking-tight flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-600" /> Live Activity Stream
            </h3>
            <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-200 uppercase tracking-wider animate-pulse">Live</span>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
            {activities.map((activity, idx) => (
              <div key={activity.id} className="relative pl-5">
                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                {idx === 0 && <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></div>}
                
                <p className={`text-xs font-medium leading-snug ${activity.type === 'critical' ? 'text-red-600 font-bold' : activity.type === 'warning' ? 'text-amber-700' : 'text-gray-700'}`}>
                  {activity.text}
                </p>
                <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-semibold">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drawers and Modals */}
      {activeProject && (
        <ProjectDrawer 
          project={projectsData.find((p: any) => p.id === activeProject)} 
          onClose={() => setActiveProject(null)} 
          onOpenCctv={(p: any) => setActiveViewer(p)} 
        />
      )}

      {activeViewer && (
        <CCTVViewer 
          project={activeViewer}
          onViewOnMap={handleViewOnMap}
          onClose={() => setActiveViewer(null)}
        />
      )}
    </div>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  ArrowUpRight, Activity, ChevronRight, ChevronDown, ChevronUp,
  AlertTriangle, Video, ShieldAlert, BarChart2,
  WifiOff, MapPin, Compass, Maximize2, Plus, Minus,
  BookmarkCheck, Clock, X, Map as MapIcon, Loader2,
  Building2, Home
} from 'lucide-react';
import L from 'leaflet';
import CCTVViewer from '../components/CCTVViewer';
import ProjectDrawer from '../components/ProjectDrawer';
import { useNavigate } from 'react-router-dom';
import { regionalData, projectsData as localProjects } from '../data/mockData';
import { fetchCommandCentre, socket } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Fallback mock data used when the backend API is unreachable
const MOCK_OVERVIEW = {
  activeProjects: 6,
  openRiskAlerts: 1,
  inspectionDeficit: 1,
  fundTraceConfidence: 98.2,
  offlineCameras: 3,
  activities: [],
  regionalData,
  projects: localProjects.map((p: any) => ({
    ...p,
    latitude: p.location[0],
    longitude: p.location[1],
    riskLevel: p.risk,
  }))
};

interface SiteData {
  id: string;
  name: string;
  cameraId: string;
  location: string;
  city: string;
  state: string;
  coordinates: [number, number];
  riskLevel: 'high' | 'attention' | 'healthy' | 'offline';
  riskScore: number;
  cctvUptime: string;
  lastInspectionStatus: string;
  lastInspectionDate: string;
  openIssuesCount: number;
  image: string;
}

const OVERVIEW_MAP_SITES: SiteData[] = [
  {
    id: 'MH-042',
    name: 'Pimpalgaon Community Centre',
    cameraId: 'CAM-MH-042-01',
    location: 'Nashik, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    coordinates: [19.0760, 72.8777],
    riskLevel: 'high',
    riskScore: 78,
    cctvUptime: '98%',
    lastInspectionStatus: 'Overdue',
    lastInspectionDate: '5 days ago',
    openIssuesCount: 3,
    image: '/building_health_centre.jpg',
  },
  {
    id: 'MH-043',
    name: 'Nashik Divyang Kendra',
    cameraId: 'CAM-MH-043-01',
    location: 'Nashik, Maharashtra',
    city: 'Nashik',
    state: 'Maharashtra',
    coordinates: [20.005, 73.79],
    riskLevel: 'attention',
    riskScore: 54,
    cctvUptime: '95%',
    lastInspectionStatus: 'Routine',
    lastInspectionDate: '12 days ago',
    openIssuesCount: 1,
    image: '/cctv_rehab_1790327477196.jpg',
  },
  {
    id: 'MH-089',
    name: 'District Hospital, Ward 3',
    cameraId: 'CAM-MH-089-01',
    location: 'Pune, Maharashtra',
    city: 'Pune',
    state: 'Maharashtra',
    coordinates: [18.5204, 73.8567],
    riskLevel: 'healthy',
    riskScore: 18,
    cctvUptime: '99.2%',
    lastInspectionStatus: 'Verified',
    lastInspectionDate: '2 days ago',
    openIssuesCount: 0,
    image: '/cctv_hospital_ward_1790326789587.jpg',
  },
  {
    id: 'MH-112',
    name: 'Govt School, Main Block',
    cameraId: 'CAM-MH-112-01',
    location: 'Nagpur, Maharashtra',
    city: 'Nagpur',
    state: 'Maharashtra',
    coordinates: [21.1458, 79.0882],
    riskLevel: 'healthy',
    riskScore: 12,
    cctvUptime: '99.4%',
    lastInspectionStatus: 'Verified',
    lastInspectionDate: '1 day ago',
    openIssuesCount: 0,
    image: '/cctv_school_classroom_1790326822968.jpg',
  },
  {
    id: 'GJ-011',
    name: 'Surat Healthcare Facility',
    cameraId: 'CAM-GJ-011-01',
    location: 'Surat, Gujarat',
    city: 'Surat',
    state: 'Gujarat',
    coordinates: [21.1702, 72.8311],
    riskLevel: 'attention',
    riskScore: 45,
    cctvUptime: '96%',
    lastInspectionStatus: 'Routine',
    lastInspectionDate: '4 days ago',
    openIssuesCount: 1,
    image: '/cctv_entrance_1790327495380.jpg',
  }
];

// Helper to create teardrop pin icon with white dot & city tag
const createPinIcon = (color: string, label?: string, isPulse?: boolean) => L.divIcon({
  className: 'custom-map-pin',
  html: `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
      ${isPulse ? `
        <div style="position: absolute; width: 44px; height: 44px; top: -6px; left: -6px; border-radius: 50%; background: ${color}33; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: absolute; width: 56px; height: 56px; top: -12px; left: -12px; border-radius: 50%; background: ${color}1a;"></div>
      ` : ''}
      <div style="
        width: 30px; 
        height: 30px; 
        background: ${color}; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg); 
        box-shadow: 0 4px 10px rgba(0,0,0,0.3); 
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 9px; height: 9px; background: white; border-radius: 50%;"></div>
      </div>
      ${label ? `
        <div style="
          margin-top: 3px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(4px);
          padding: 1.5px 6px;
          border-radius: 5px;
          border: 1px solid rgba(0,0,0,0.08);
          font-weight: 800;
          font-size: 10px;
          color: #0f172a;
          box-shadow: 0 2px 5px rgba(0,0,0,0.15);
          white-space: nowrap;
        ">
          ${label}
        </div>
      ` : ''}
    </div>
  `,
  iconSize: [30, 48],
  iconAnchor: [15, 30]
});

// Standalone safe map controls that take map instance prop
function OverviewMapControls({ map }: { map: L.Map | null }) {
  return (
    <div className="flex flex-col gap-1.5">
      <button 
        onClick={() => map?.setView([20.5, 78.5], 5, { animate: true })} 
        className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center shadow-md transition-colors cursor-pointer"
        title="Reset Map Telemetry"
      >
        <Compass className="w-3.5 h-3.5 text-slate-600" />
      </button>
      <button 
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }} 
        className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center shadow-md transition-colors cursor-pointer"
        title="Fullscreen"
      >
        <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
      </button>
      <div className="flex flex-col bg-white rounded-lg border border-slate-200 shadow-md overflow-hidden">
        <button 
          onClick={() => map?.zoomIn()} 
          className="w-8 h-8 hover:bg-slate-50 text-slate-700 flex items-center justify-center border-b border-slate-100 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button 
          onClick={() => map?.zoomOut()} 
          className="w-8 h-8 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function Overview() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<any>(MOCK_OVERVIEW);
  const [activities, setActivities] = useState<any[]>([]);
  const [activeViewer, setActiveViewer] = useState<any>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [apiOffline, setApiOffline] = useState(false);

  // Map state & controls
  const [overviewMap, setOverviewMap] = useState<L.Map | null>(null);
  const [selectedMapSite, setSelectedMapSite] = useState<SiteData | null>(OVERVIEW_MAP_SITES[0]);
  const [filterCardOpen, setFilterCardOpen] = useState(true);
  const [legendOpen, setLegendOpen] = useState(true);

  const [selectedRegion, setSelectedRegion] = useState('All India');
  const [selectedZone, setSelectedZone] = useState('Maharashtra West');
  const [selectedType, setSelectedType] = useState('All Sites');
  const [selectedRisk, setSelectedRisk] = useState('Risk (All)');

  useEffect(() => {
    if (!overviewMap) return;
    const t = setTimeout(() => overviewMap.invalidateSize(), 300);
    return () => clearTimeout(t);
  }, [overviewMap]);

  const pinIcons = useMemo(() => ({
    high: createPinIcon('#E11D48', 'Mumbai', true),
    attention_nashik: createPinIcon('#F59E0B', 'Nashik'),
    attention_surat: createPinIcon('#F59E0B', 'Surat'),
    healthy_pune: createPinIcon('#10B981', 'Pune'),
    healthy_nagpur: createPinIcon('#10B981', 'Nagpur'),
    offline: createPinIcon('#64748B'),
  }), []);

  const loadData = async () => {
    try {
      const result = await fetchCommandCentre();
      if (result) {
        setData(result);
        setApiOffline(false);
        if (result.activities) {
          setActivities(result.activities.map((a: any) => ({
            id: a.id,
            text: a.description,
            time: new Date(a.timestamp).toLocaleTimeString(),
            type: a.type
          })));
        }
      }
    } catch (e) {
      console.warn('[Overview] Backend API unreachable, operating in local offline mode:', e);
      setApiOffline(true);
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
    if (overviewMap && project.latitude && project.longitude) {
      overviewMap.setView([project.latitude, project.longitude], 10, { animate: true });
    }
    setActiveProject(project.id);
    setActiveViewer(null);
  };

  const projectsData = data?.projects || [];

  return (
    <div className="p-3 sm:p-5 max-w-[1920px] mx-auto space-y-3.5 sm:space-y-5 flex flex-col w-full bg-[#F8FAFC]">
      
      {/* Offline / Mock Data Banner */}
      {apiOffline && (
        <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-800 shadow-sm shrink-0">
          <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Backend service unavailable — displaying demo data. Start the backend server (<code className="font-mono bg-amber-100 px-1 py-0.5 rounded">npm run dev:backend</code>) for live data.</span>
        </div>
      )}

      {/* MOBILE GREETING CARD */}
      <div className="md:hidden bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium">Good morning,</p>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">{user?.name || 'Dr. Alok Verma'}</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">{user?.subtitle || 'National Command Centre'}</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">
          360°
        </div>
      </div>

      {/* MOBILE 4-METRICS ROW (Matches exact specification: 48 Active, 3 CCTV Offline, 1 High Risk, 11 Due) */}
      <div className="md:hidden grid grid-cols-4 gap-1.5 sm:gap-2">
        <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-base sm:text-lg font-black text-slate-900 leading-tight">48</span>
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-0.5 truncate">Active</span>
        </div>

        <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 shadow-xs flex flex-col items-center text-center cursor-pointer" onClick={() => navigate('/cctv')}>
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
            <Video className="w-3.5 h-3.5" />
          </div>
          <span className="text-base sm:text-lg font-black text-slate-900 leading-tight">3</span>
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-0.5 truncate">Offline</span>
        </div>

        <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 shadow-xs flex flex-col items-center text-center cursor-pointer" onClick={() => navigate('/alerts')}>
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-1">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <span className="text-base sm:text-lg font-black text-rose-600 leading-tight">1</span>
          <span className="text-[9px] sm:text-[10px] font-bold text-rose-600 mt-0.5 truncate">High Risk</span>
        </div>

        <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 shadow-xs flex flex-col items-center text-center cursor-pointer" onClick={() => navigate('/assignments')}>
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-1">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className="text-base sm:text-lg font-black text-amber-600 leading-tight">11</span>
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-0.5 truncate">Due</span>
        </div>
      </div>

      {/* DESKTOP DASHBOARD HEADER (Matches "Desktop (Dashboard)" reference screenshot) */}
      <div className="hidden md:flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Live overview of social welfare sites across Maharashtra West.
          </p>
        </div>
        <button 
          onClick={() => navigate('/map')}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-colors cursor-pointer border border-blue-200/60 shadow-xs"
        >
          <span>View Full Map</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* DESKTOP INTELLIGENCE KPIS - All 4 in a Single Row */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        
        {/* Card 1: Active Monitored Sites */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between" onClick={() => alert('Filter Map')}>
          <div>
            <h3 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
              Active Monitored Sites
            </h3>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-3xl font-black tracking-tight text-slate-900">{data.activeProjects.toLocaleString()}</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3"/> 2.4%
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium">Across 28 States / UTs</p>
        </div>

        {/* Card 2: Open Risk Alerts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between" onClick={() => navigate('/alerts')}>
          <div>
            <h3 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
              Open Risk Alerts
            </h3>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-3xl font-black tracking-tight text-rose-600">{data.openRiskAlerts}</span>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3"/> 8.1%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider pt-1">
            <span className="text-rose-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span> 4 High
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-600">7 Medium</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">3 Review</span>
          </div>
        </div>

        {/* Card 3: Inspections Requiring Attention */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between" onClick={() => alert('Inspections')}>
          <div>
            <h3 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
              Inspections Requiring Attention
            </h3>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-3xl font-black tracking-tight text-amber-500">{data.inspectionDeficit}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <span className="text-rose-600 font-bold">{data.inspectionDeficit} overdue</span>
            <span className="text-slate-300">•</span>
            <span>18 due soon</span>
          </div>
        </div>

        {/* Card 4: FundTrace Confidence (Deep Navy Highlight Card) */}
        <div className="bg-[#0F172A] rounded-2xl p-5 border border-slate-800 shadow-md relative overflow-hidden cursor-pointer flex flex-col justify-between" onClick={() => navigate('/fundtrace')}>
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/15 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="text-[11px] font-extrabold text-blue-300/90 uppercase tracking-wider mb-1.5">
              FundTrace Confidence
            </h3>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-3xl font-black tracking-tight text-white">{data.fundTraceConfidence}%</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium relative z-10">2.1% records under review</p>
        </div>

      </div>

      {/* MOBILE SITE MAP HEADER & QUICK FILTER CHIPS */}
      <div className="md:hidden space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">Site Operations Map</h3>
          <button onClick={() => navigate('/map')} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer">
            Full Map <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick touch filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {[
            { label: 'All India', val: 'All India', type: 'zone' },
            { label: 'Maharashtra', val: 'Maharashtra West', type: 'zone' },
            { label: 'High Risk', val: 'High Risk', type: 'risk' },
            { label: 'Attention', val: 'Attention', type: 'risk' },
            { label: 'Hospitals', val: 'Hospital', type: 'type' },
          ].map(chip => {
            const isChipActive = 
              (chip.type === 'zone' && selectedZone === chip.val) ||
              (chip.type === 'risk' && selectedRisk === chip.val) ||
              (chip.type === 'type' && selectedType === chip.val);

            return (
              <button
                key={chip.label}
                onClick={() => {
                  if (chip.type === 'zone') setSelectedZone(chip.val);
                  else if (chip.type === 'risk') setSelectedRisk(isChipActive ? 'Risk (All)' : chip.val);
                  else if (chip.type === 'type') setSelectedType(isChipActive ? 'All Sites' : chip.val);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isChipActive
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Operations Map - Reference Map Design */}
      <div className="w-full bg-slate-100 rounded-2xl border border-slate-200/80 shadow-md overflow-hidden relative flex flex-col h-[260px] sm:h-[340px] md:h-[520px] shrink-0">
        
        {/* Full Interactive Leaflet Map */}
        <div className="absolute inset-0 z-0">
          <MapContainer
            ref={setOverviewMap}
            center={[20.5, 78.5]}
            zoom={5}
            zoomControl={false}
            style={{ width: '100%', height: '100%' }}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              maxZoom={18}
            />

            {/* Pins with City Labels and Live Radar Ping */}
            {OVERVIEW_MAP_SITES.map((site) => {
              let icon = pinIcons.offline;
              if (site.id === 'MH-042') icon = pinIcons.high;
              else if (site.city === 'Nashik') icon = pinIcons.attention_nashik;
              else if (site.city === 'Surat') icon = pinIcons.attention_surat;
              else if (site.city === 'Pune') icon = pinIcons.healthy_pune;
              else if (site.city === 'Nagpur') icon = pinIcons.healthy_nagpur;

              return (
                <Marker
                  key={site.id}
                  position={site.coordinates}
                  icon={icon}
                  eventHandlers={{
                    click: () => {
                      setSelectedMapSite(site);
                      if (overviewMap) {
                        overviewMap.setView(site.coordinates, Math.max(overviewMap.getZoom(), 7), { animate: true });
                      }
                    },
                  }}
                />
              );
            })}
          </MapContainer>
        </div>

        {/* Mobile Corner Expand Button to Open Full Map */}
        <button 
          onClick={() => navigate('/map')} 
          className="md:hidden absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-blue-600 cursor-pointer"
          title="Open Full Map"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Desktop Top-Left: National Operations Map Floating Filter Card */}
        <div className="hidden md:block absolute top-3 left-3 z-20 w-64 max-w-[calc(100vw-24px)] bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80 p-2.5 transition-all">
          <div 
            onClick={() => setFilterCardOpen(!filterCardOpen)}
            className="flex items-center justify-between cursor-pointer group select-none"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <MapIcon className="w-3 h-3" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs tracking-tight">
                National Operations Map
              </h3>
            </div>
            <button className="text-slate-400 group-hover:text-slate-700">
              {filterCardOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {filterCardOpen && (
            <div className="mt-2 space-y-1.5 pt-1.5 border-t border-slate-100 animate-in fade-in duration-150">
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={e => setSelectedRegion(e.target.value)}
                  className="w-full appearance-none pl-7 pr-6 py-1.5 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="All India">All India</option>
                  <option value="North Zone">North Zone</option>
                  <option value="West Zone">West Zone</option>
                  <option value="South Zone">South Zone</option>
                  <option value="East Zone">East Zone</option>
                </select>
                <MapPin className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedZone}
                  onChange={e => setSelectedZone(e.target.value)}
                  className="w-full appearance-none pl-7 pr-6 py-1.5 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Maharashtra West">Maharashtra West</option>
                  <option value="Maharashtra East">Maharashtra East</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
                <MapIcon className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    className="w-full appearance-none pl-6 pr-5 py-1.5 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer truncate"
                  >
                    <option value="All Sites">All Sites</option>
                    <option value="Rehab">Rehab</option>
                    <option value="Hospital">Hospitals</option>
                    <option value="School">Schools</option>
                  </select>
                  <Building2 className="w-2.5 h-2.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={selectedRisk}
                    onChange={e => setSelectedRisk(e.target.value)}
                    className="w-full appearance-none pl-6 pr-5 py-1.5 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer truncate"
                  >
                    <option value="Risk (All)">Risk (All)</option>
                    <option value="High Risk">High Risk</option>
                    <option value="Attention">Attention</option>
                    <option value="Healthy">Healthy</option>
                  </select>
                  <AlertTriangle className="w-2.5 h-2.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom-Left: Legend Card */}
        <div className="absolute bottom-5 left-3 z-20 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80 p-2.5 space-y-1 text-xs">
          <div 
            onClick={() => setLegendOpen(!legendOpen)}
            className="flex items-center justify-between gap-3 font-bold text-slate-800 cursor-pointer text-[11px]"
          >
            <span>Legend</span>
            <span className="text-slate-400">{legendOpen ? '▾' : '▸'}</span>
          </div>
          {legendOpen && (
            <div className="space-y-1 pt-1 text-[10px] font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span>Healthy Site</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span>Attention</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                <span>High Risk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>
                <span>Offline</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom-Right: Map Controls & Live Status */}
        <div className="absolute bottom-5 right-3 z-20 flex flex-col items-end gap-2">
          <OverviewMapControls map={overviewMap} />
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200 text-[10px] font-semibold text-slate-700 shadow-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live • Updated 12:49 IST</span>
          </div>
        </div>

        {/* Right: Selected Site Detail Floating Drawer Card */}
        {selectedMapSite && (
          <div className="absolute z-30 max-h-[calc(100vh-160px)] bg-white rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col animate-in fade-in duration-200 inset-x-2 bottom-2 md:inset-auto md:top-3 md:right-3 md:w-64 max-w-[calc(100vw-24px)]">
            {/* Card Header */}
            <div className="py-1.5 px-3 flex items-center justify-between border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600">
                  <BookmarkCheck className="w-2.5 h-2.5" />
                </div>
                <h3 className="font-extrabold text-[10px] uppercase tracking-wider text-slate-800">
                  Selected Site
                </h3>
              </div>
              <button 
                onClick={() => setSelectedMapSite(null)}
                className="w-5 h-5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-y-auto">
              <div className="relative h-20 w-full bg-slate-900 overflow-hidden shrink-0">
                <img 
                  src={selectedMapSite.image} 
                  alt={selectedMapSite.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-2.5 space-y-2">
                <div className="flex items-start justify-between gap-1.5">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-slate-900 text-xs leading-tight truncate">
                      {selectedMapSite.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {selectedMapSite.cameraId}
                    </p>
                    <p className="text-[10px] text-slate-600 font-medium flex items-center gap-0.5 mt-0.5 truncate">
                      <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      <span className="truncate">{selectedMapSite.location}</span>
                    </p>

                    <div className="mt-1.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                        selectedMapSite.riskLevel === 'high' 
                          ? 'bg-rose-50 text-rose-600 border-rose-200'
                          : selectedMapSite.riskLevel === 'attention'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          selectedMapSite.riskLevel === 'high' ? 'bg-rose-500 animate-pulse' :
                          selectedMapSite.riskLevel === 'attention' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                        {selectedMapSite.riskLevel === 'high' ? 'High Risk' :
                         selectedMapSite.riskLevel === 'attention' ? 'Attention' : 'Healthy'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative w-9 h-9 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3.6"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={selectedMapSite.riskLevel === 'high' ? 'text-rose-500' : selectedMapSite.riskLevel === 'attention' ? 'text-amber-500' : 'text-emerald-500'}
                          strokeDasharray={`${selectedMapSite.riskScore}, 100`}
                          strokeWidth="3.6"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-xs font-black text-slate-900">{selectedMapSite.riskScore}</span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                      Risk
                    </span>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-slate-100 divide-y divide-slate-100 text-[10px]">
                  <div className="py-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Video className="w-3 h-3 text-slate-400" />
                      <span>CCTV Uptime</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-emerald-600">{selectedMapSite.cctvUptime}</span>
                      <span className="text-emerald-500 font-bold text-[9px]">∿∿</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => navigate('/inspections')}
                    className="py-1 flex items-center justify-between group cursor-pointer hover:bg-slate-50 rounded px-1 -mx-1 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Last Inspection</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-right">
                        <span className={`font-extrabold text-[10px] block ${selectedMapSite.lastInspectionStatus === 'Overdue' ? 'text-rose-600' : 'text-slate-800'}`}>
                          {selectedMapSite.lastInspectionStatus}
                        </span>
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-transform" />
                    </div>
                  </div>

                  <div 
                    onClick={() => navigate('/alerts')}
                    className="py-1 flex items-center justify-between group cursor-pointer hover:bg-slate-50 rounded px-1 -mx-1 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <AlertTriangle className="w-3 h-3 text-slate-400" />
                      <span>Open Issues</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`font-extrabold text-[10px] ${selectedMapSite.openIssuesCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {selectedMapSite.openIssuesCount} active
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-transform" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/site/${selectedMapSite.id}`)}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-[11px] rounded-lg shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Site</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MOBILE RECENT ALERTS SECTION (Matches "Mobile (Dashboard)" reference screenshot) */}
      <div className="md:hidden bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">Recent Alerts</h3>
          <button onClick={() => navigate('/alerts')} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Alert 1 */}
          <div 
            onClick={() => navigate('/alerts')} 
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/90 border border-slate-100 hover:bg-slate-100/70 transition-colors cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0 animate-pulse" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-900 text-xs truncate">Pimpalgaon Community Centre</div>
              <p className="text-[11px] font-semibold text-rose-600 mt-0.5">CCTV offline &gt; 24h</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-medium">
                <span>Nashik, Maharashtra</span>
                <span>2h ago</span>
              </div>
            </div>
          </div>

          {/* Alert 2 */}
          <div 
            onClick={() => navigate('/alerts')} 
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/90 border border-slate-100 hover:bg-slate-100/70 transition-colors cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-900 text-xs truncate">Govt School, Main Block</div>
              <p className="text-[11px] font-semibold text-amber-600 mt-0.5">Inspection overdue</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-medium">
                <span>Thane, Maharashtra</span>
                <span>5h ago</span>
              </div>
            </div>
          </div>

          {/* Alert 3 */}
          <div 
            onClick={() => navigate('/alerts')} 
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/90 border border-slate-100 hover:bg-slate-100/70 transition-colors cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-900 text-xs truncate">District Hospital, Ward 3</div>
              <p className="text-[11px] font-semibold text-amber-600 mt-0.5">Complaint hotspot</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-medium">
                <span>Pune, Maharashtra</span>
                <span>1d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE PRIORITY DUTY ORDERS SECTION */}
      <div className="md:hidden bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h3 className="font-extrabold text-sm text-slate-900">Priority Duty Orders</h3>
          </div>
          <button onClick={() => navigate('/assignments')} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Duty Order 1 */}
          <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">
                HIGH PRIORITY
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">ORD-8921</span>
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-xs leading-tight">Pimpalgaon Community Centre</div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Nashik · 3.2 km away</p>
              <p className="text-[10px] text-slate-400 font-medium">Deadline Today · 14:00</p>
            </div>
            <button
              onClick={() => navigate('/inspections')}
              className="w-full min-h-[44px] py-2 px-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Navigate & Audit</span>
            </button>
          </div>

          {/* Duty Order 2 */}
          <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200">
                URGENT AUDIT
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">ORD-8922</span>
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-xs leading-tight">Nashik Divyang Kendra</div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Nashik · 6.8 km away</p>
              <p className="text-[10px] text-slate-400 font-medium">Deadline Tomorrow · 11:00</p>
            </div>
            <button
              onClick={() => navigate('/inspections')}
              className="w-full min-h-[44px] py-2 px-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Navigate & Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* CCTV Surveillance Wall — Row of 4 Columns Grid (Desktop Only) */}
      <div className="hidden md:flex bg-[#0B0F19] rounded-2xl border border-gray-800 shadow-xl overflow-hidden flex-col relative shrink-0">
        <div className="p-4 px-6 border-b border-gray-800 flex justify-between items-center bg-[#070A11]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base tracking-tight">Live Surveillance Wall</h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </div>
              <p className="text-[11px] text-gray-400 uppercase tracking-widest mt-0.5">Monitoring 4 active feeds</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              4 / 4 Feeds Online
            </span>
            <button 
              onClick={() => navigate('/cctv')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors uppercase tracking-wider px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
            >
              Surveillance Grid <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        {/* Row of 4 Columns Grid */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projectsData.slice(0, 4).map((feed, idx) => {
            const defaultImages = [
              '/cctv_rehab_1790327477196.jpg',
              '/cctv_hospital_ward_1790326789587.jpg',
              '/cctv_school_classroom_1790326822968.jpg',
              '/cctv_govt_office_1790326807196.jpg'
            ];
            const feedImg = (feed as any).cctvs?.[0]?.image || (feed as any).cctv?.image || defaultImages[idx % defaultImages.length];
            const camId = (feed as any).cctvs?.[0]?.cameraId || (feed as any).cctv?.id || `CAM-${feed.id || idx + 1}`;

            return (
              <div 
                key={feed.id || idx}
                className="relative rounded-xl overflow-hidden aspect-video group border border-gray-800 hover:border-blue-500/60 shadow-xl cursor-pointer transition-all duration-300 bg-black"
                onClick={() => {
                  handleProjectClick(feed);
                }}
              >
                <img 
                  src={feedImg} 
                  alt={feed.name} 
                  className="w-full h-full object-cover filter contrast-[1.15] saturate-[0.7] brightness-90 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 grainy-overlay mix-blend-overlay opacity-50 pointer-events-none"></div>
                
                {/* OSD Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/70 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-white text-[9px] font-bold tracking-widest uppercase">LIVE</span>
                </div>
                <div className="absolute top-2.5 right-2.5 text-white/90 font-mono text-[9px] bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                  {camId}
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-6">
                   <div className="text-white font-bold text-xs truncate drop-shadow-md">{feed.name}</div>
                   <div className="text-gray-400 text-[10px] flex justify-between items-center mt-1 font-mono">
                     <span className="truncate max-w-[150px]">{feed.district}, {feed.state}</span>
                     <span className="text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                       👁 18
                     </span>
                   </div>
                </div>

                {/* Hover ring */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-xl transition-colors pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Intelligence Row (Desktop Only) */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6 h-[280px]">
        
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

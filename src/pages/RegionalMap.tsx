import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { 
  Map as MapIcon, ChevronDown, ChevronUp, ChevronRight, X, 
  Building2, Video, AlertTriangle, Clock, MapPin, 
  Compass, Maximize2, Plus, Minus, BookmarkCheck
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

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

const MAP_SITES: SiteData[] = [
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
        width: 32px; 
        height: 32px; 
        background: ${color}; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg); 
        box-shadow: 0 4px 12px rgba(0,0,0,0.32); 
        border: 2.5px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
      </div>
      ${label ? `
        <div style="
          margin-top: 4px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(4px);
          padding: 2px 7px;
          border-radius: 6px;
          border: 1px solid rgba(0,0,0,0.08);
          font-weight: 800;
          font-size: 11px;
          color: #0f172a;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          white-space: nowrap;
        ">
          ${label}
        </div>
      ` : ''}
    </div>
  `,
  iconSize: [32, 50],
  iconAnchor: [16, 32]
});

// Standalone safe map controls that take map instance prop
function CustomMapControls({ map }: { map: L.Map | null }) {
  return (
    <div className="flex flex-col gap-2">
      <button 
        onClick={() => map?.setView([20.5, 76.5], 6, { animate: true })} 
        className="w-9 h-9 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 flex items-center justify-center shadow-md transition-colors cursor-pointer"
        title="Reset Map Telemetry"
      >
        <Compass className="w-4 h-4 text-slate-600" />
      </button>
      <button 
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }} 
        className="w-9 h-9 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 flex items-center justify-center shadow-md transition-colors cursor-pointer"
        title="Fullscreen"
      >
        <Maximize2 className="w-4 h-4 text-slate-600" />
      </button>
      <div className="flex flex-col bg-white rounded-xl border border-slate-200/90 shadow-md overflow-hidden">
        <button 
          onClick={() => map?.zoomIn()} 
          className="w-9 h-9 hover:bg-slate-50 text-slate-700 flex items-center justify-center border-b border-slate-100 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button 
          onClick={() => map?.zoomOut()} 
          className="w-9 h-9 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function RegionalMap() {
  const navigate = useNavigate();
  const [map, setMap] = useState<L.Map | null>(null);
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(MAP_SITES[0]);
  const [filterCardOpen, setFilterCardOpen] = useState(true);
  const [legendOpen, setLegendOpen] = useState(true);

  const [selectedRegion, setSelectedRegion] = useState('All India');
  const [selectedZone, setSelectedZone] = useState('Maharashtra West');
  const [selectedType, setSelectedType] = useState('All Sites');
  const [selectedRisk, setSelectedRisk] = useState('Risk (All)');

  // Safely trigger size recalculation once map instance mounts or selectedSite toggles
  useEffect(() => {
    if (!map) return;
    const t1 = setTimeout(() => {
      map.invalidateSize();
      if (selectedSite) {
        map.setView(selectedSite.coordinates, Math.max(map.getZoom(), 7), { animate: true });
      }
    }, 150);
    const t2 = setTimeout(() => map.invalidateSize(), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [map, selectedSite]);

  const pinIcons = useMemo(() => ({
    high: createPinIcon('#E11D48', 'Mumbai', true),
    attention_nashik: createPinIcon('#F59E0B', 'Nashik'),
    attention_surat: createPinIcon('#F59E0B', 'Surat'),
    healthy_pune: createPinIcon('#10B981', 'Pune'),
    healthy_nagpur: createPinIcon('#10B981', 'Nagpur'),
    offline: createPinIcon('#64748B'),
  }), []);

  return (
    <div className="relative w-full h-full overflow-hidden font-sans select-none bg-[#F8FAFC]">
      
      {/* Mobile Top Filter Pills (Matches "Mobile (Map View)" screenshot) */}
      <div className="md:hidden absolute top-3 inset-x-3 z-20 flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
        <button
          onClick={() => setSelectedRisk('Risk (All)')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer ${
            selectedRisk === 'Risk (All)' 
              ? 'bg-blue-600 text-white shadow-blue-500/20' 
              : 'bg-white/95 text-slate-700 border border-slate-200 backdrop-blur-md'
          }`}
        >
          All Sites
        </button>
        <button
          onClick={() => setSelectedRisk('High Risk')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer ${
            selectedRisk === 'High Risk' 
              ? 'bg-rose-600 text-white shadow-rose-500/20' 
              : 'bg-white/95 text-slate-700 border border-slate-200 backdrop-blur-md'
          }`}
        >
          High Risk
        </button>
        <button
          onClick={() => setSelectedRisk('Attention')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer ${
            selectedRisk === 'Attention' 
              ? 'bg-amber-500 text-white shadow-amber-500/20' 
              : 'bg-white/95 text-slate-700 border border-slate-200 backdrop-blur-md'
          }`}
        >
          CCTV Offline
        </button>
      </div>

      {/* 1. Leaflet Interactive Map (Half-screen on mobile when site is selected, full-screen on desktop) */}
      <div className={`absolute inset-x-0 top-0 z-0 transition-all duration-300 ${
        selectedSite ? 'h-[50%] md:h-full md:inset-0' : 'h-full inset-0'
      }`}>
        <MapContainer
          ref={setMap}
          center={[20.5, 76.5]}
          zoom={6}
          zoomControl={false}
          style={{ width: '100%', height: '100%' }}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            maxZoom={18}
          />

          {/* Interactive Markers */}
          {MAP_SITES.map((site) => {
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
                    setSelectedSite(site);
                    if (map) {
                      map.setView(site.coordinates, Math.max(map.getZoom(), 7), { animate: true });
                    }
                  },
                }}
              />
            );
          })}
        </MapContainer>
      </div>

      {/* Mobile Top Filter Bar (Quick touch filters for phones) */}
      <div className="md:hidden absolute top-3 inset-x-3 z-20 flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        <select
          value={selectedZone}
          onChange={e => setSelectedZone(e.target.value)}
          className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 shadow-md focus:outline-none"
        >
          <option value="All India">All India</option>
          <option value="Maharashtra West">Maharashtra West</option>
          <option value="Maharashtra East">Maharashtra East</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>

        <select
          value={selectedRisk}
          onChange={e => setSelectedRisk(e.target.value)}
          className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 shadow-md focus:outline-none"
        >
          <option value="Risk (All)">All Risks</option>
          <option value="High Risk">High Risk</option>
          <option value="Attention">Attention</option>
          <option value="Healthy">Healthy</option>
        </select>
      </div>

      {/* 2. Top-Left: National Operations Map Floating Filter Card (Desktop Only) */}
      <div className="hidden md:block absolute top-3 left-3 z-20 w-64 max-w-[calc(100vw-24px)] bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80 p-2.5 transition-all">
        {/* Header */}
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

        {/* Collapsible Dropdown Controls */}
        {filterCardOpen && (
          <div className="mt-2 space-y-1.5 pt-1.5 border-t border-slate-100 animate-in fade-in duration-150">
            {/* Region Dropdown */}
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

            {/* Jurisdiction Dropdown */}
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

            {/* Sub-Filters Side by Side */}
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

      {/* 3. Bottom-Left: Legend Card */}
      <div className="absolute bottom-28 left-5 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 p-3.5 space-y-2 text-xs">
        <div 
          onClick={() => setLegendOpen(!legendOpen)}
          className="flex items-center justify-between gap-4 font-bold text-slate-900 cursor-pointer text-xs"
        >
          <span>Legend</span>
          <span className="text-slate-400">{legendOpen ? '▾' : '▸'}</span>
        </div>
        {legendOpen && (
          <div className="space-y-1.5 pt-1 text-[11px] font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span>Healthy Site</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              <span>Attention</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0"></span>
              <span>Offline</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom: Horizontal 4-Metric Bar Dock */}
      <div className="absolute bottom-5 left-5 z-20 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-slate-200/80">
        {/* Metric 1: Active Sites */}
        <div className="flex items-center gap-3 px-3 py-1 border-r border-slate-100 last:border-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">48</span>
              <span className="text-xs font-semibold text-slate-500">Active Sites</span>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑</span> <span>+6 this month</span>
            </div>
          </div>
        </div>

        {/* Metric 2: CCTV Offline */}
        <div className="flex items-center gap-3 px-3 py-1 border-r border-slate-100 last:border-0">
          <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">3</span>
              <span className="text-xs font-semibold text-slate-500">CCTV Offline</span>
            </div>
            <div className="text-[10px] font-bold text-rose-600 flex items-center gap-0.5 mt-0.5">
              <span>↑</span> <span>+1 this month</span>
            </div>
          </div>
        </div>

        {/* Metric 3: High Risk */}
        <div className="flex items-center gap-3 px-3 py-1 border-r border-slate-100 last:border-0">
          <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">1</span>
              <span className="text-xs font-semibold text-slate-500">High Risk</span>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↓</span> <span>-1 this month</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Inspections Overdue */}
        <div className="flex items-center gap-3 px-3 py-1">
          <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">11</span>
              <span className="text-xs font-semibold text-slate-500">Inspections Overdue</span>
            </div>
            <div className="text-[10px] font-bold text-rose-600 flex items-center gap-0.5 mt-0.5">
              <span>↑</span> <span>+3 this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom-Right: Map Controls & Live Status */}
      <div className={`absolute z-20 flex flex-col items-end gap-1.5 md:gap-3 transition-all duration-300 ${
        selectedSite ? 'bottom-[calc(50%+8px)] right-3 md:bottom-5 md:right-5' : 'bottom-14 md:bottom-5 right-3 md:right-5'
      }`}>
        <CustomMapControls map={map} />
        <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-slate-200 text-[10px] md:text-xs font-semibold text-slate-700 shadow-md flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live • Updated 12:49 IST</span>
        </div>
      </div>

      {/* 6. Selected Site Detail Modal (Half-screen bottom sheet on mobile, right floating card on desktop) */}
      {selectedSite && (
        <div className="absolute z-30 inset-x-0 bottom-0 h-[50%] bg-white rounded-t-2xl shadow-2xl border-t border-slate-200/90 overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300 md:inset-auto md:top-3 md:right-3 md:w-64 md:h-auto md:max-h-[calc(100vh-180px)] md:rounded-2xl md:border md:shadow-2xl">
          
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
              onClick={() => setSelectedSite(null)}
              className="w-5 h-5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
            {/* Facility Photo - Sleek Banner */}
            <div className="relative h-20 md:h-20 w-full bg-slate-900 overflow-hidden shrink-0">
              <img 
                src={selectedSite.image} 
                alt={selectedSite.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Site Metadata & Risk Score Section */}
            <div className="p-2.5 space-y-2 flex-1 flex flex-col justify-between">
              
              {/* Title, ID, Location, and Circular Risk Gauge */}
              <div className="flex items-start justify-between gap-1.5">
                <div className="min-w-0 flex-1">
                  <h4 className="font-extrabold text-slate-900 text-xs leading-tight truncate">
                    {selectedSite.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {selectedSite.cameraId}
                  </p>
                  <p className="text-[10px] text-slate-600 font-medium flex items-center gap-0.5 mt-0.5 truncate">
                    <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                    <span className="truncate">{selectedSite.location}</span>
                  </p>

                  {/* Risk Level Badge */}
                  <div className="mt-1">
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase tracking-wider border ${
                      selectedSite.riskLevel === 'high' 
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : selectedSite.riskLevel === 'attention'
                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        selectedSite.riskLevel === 'high' ? 'bg-rose-500 animate-pulse' :
                        selectedSite.riskLevel === 'attention' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                      {selectedSite.riskLevel === 'high' ? 'High Risk' :
                       selectedSite.riskLevel === 'attention' ? 'Attention' : 'Healthy'}
                    </span>
                  </div>
                </div>

                {/* Circular Risk Score Gauge - Ultra Compact */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.6"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={selectedSite.riskLevel === 'high' ? 'text-rose-500' : selectedSite.riskLevel === 'attention' ? 'text-amber-500' : 'text-emerald-500'}
                        strokeDasharray={`${selectedSite.riskScore}, 100`}
                        strokeWidth="3.6"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-black text-slate-900">{selectedSite.riskScore}</span>
                  </div>
                  <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    Risk
                  </span>
                </div>
              </div>

              {/* Stat Rows - Ultra Compact */}
              <div className="pt-1 border-t border-slate-100 divide-y divide-slate-100 text-[10px]">
                
                {/* CCTV Uptime */}
                <div className="py-0.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Video className="w-3 h-3 text-slate-400" />
                    <span>CCTV Uptime</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-emerald-600">{selectedSite.cctvUptime}</span>
                    <span className="text-emerald-500 font-bold text-[9px]">∿∿</span>
                  </div>
                </div>

                {/* Last Inspection */}
                <div 
                  onClick={() => navigate('/inspections')}
                  className="py-0.5 flex items-center justify-between group cursor-pointer hover:bg-slate-50 rounded px-1 -mx-1 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Last Inspection</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-right">
                      <span className={`font-extrabold text-[10px] block ${selectedSite.lastInspectionStatus === 'Overdue' ? 'text-rose-600' : 'text-slate-800'}`}>
                        {selectedSite.lastInspectionStatus}
                      </span>
                    </span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-transform" />
                  </div>
                </div>

                {/* Open Issues */}
                <div 
                  onClick={() => navigate('/alerts')}
                  className="py-0.5 flex items-center justify-between group cursor-pointer hover:bg-slate-50 rounded px-1 -mx-1 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <AlertTriangle className="w-3 h-3 text-slate-400" />
                    <span>Open Issues</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`font-extrabold text-[10px] ${selectedSite.openIssuesCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {selectedSite.openIssuesCount} active
                    </span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-transform" />
                  </div>
                </div>

              </div>

              {/* Action Button: View Site */}
              <button
                onClick={() => navigate(`/site/${selectedSite.id}`)}
                className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-[11px] rounded-lg shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer mt-0.5"
              >
                <span>View Site</span>
                <ChevronRight className="w-3 h-3" />
              </button>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
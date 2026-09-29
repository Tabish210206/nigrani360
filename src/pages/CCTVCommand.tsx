import React, { useState } from 'react';
import { 
  Cctv, Video, VideoOff, AlertTriangle, AlertOctagon, Maximize2, 
  Search, ChevronDown, LayoutGrid, List, Map as MapIcon, 
  Landmark, Activity, X, SlidersHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CameraFeed {
  id: string;
  cameraId: string;
  name: string;
  location: string;
  state: string;
  status: 'LIVE' | 'OFFLINE';
  timestamp: string;
  uptime: string;
  img: string;
  lastSeen?: string;
  viewers?: number;
}

const FEEDS_DATA: CameraFeed[] = [
  {
    id: 'FEED-01',
    cameraId: 'CAM-MH-042-01',
    name: 'Pimpalgaon Rehab Centre — Main Gate',
    location: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    status: 'LIVE',
    timestamp: '12:49:21 IST',
    uptime: '99.2%',
    img: '/cctv_rehab_1790327477196.jpg',
    viewers: 18
  },
  {
    id: 'FEED-02',
    cameraId: 'CAM-MH-042-02',
    name: 'Pimpalgaon Rehab Centre — Workshop Hall',
    location: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    status: 'OFFLINE',
    timestamp: '10:49:00 IST',
    uptime: '62.4%',
    img: '/cctv_storage_1790327523922.jpg',
    lastSeen: 'Last seen 2 hours ago'
  },
  {
    id: 'FEED-03',
    cameraId: 'CAM-RJ-061-01',
    name: 'State Facility Entrance & Gate',
    location: 'Jaipur, Rajasthan',
    state: 'Rajasthan',
    status: 'LIVE',
    timestamp: '12:49:18 IST',
    uptime: '99.9%',
    img: '/cctv_entrance_1790327495380.jpg',
    viewers: 14
  },
  {
    id: 'FEED-04',
    cameraId: 'CAM-MH-112-03',
    name: 'District Hospital, Ward 3',
    location: 'Pune, Maharashtra',
    state: 'Maharashtra',
    status: 'LIVE',
    timestamp: '12:49:05 IST',
    uptime: '98.7%',
    img: '/cctv_hospital_ward_1790326789587.jpg',
    viewers: 22
  },
  {
    id: 'FEED-05',
    cameraId: 'CAM-MH-205-01',
    name: 'Govt School, Main Block',
    location: 'Thane, Maharashtra',
    state: 'Maharashtra',
    status: 'LIVE',
    timestamp: '12:49:11 IST',
    uptime: '99.4%',
    img: '/cctv_school_classroom_1790326822968.jpg',
    viewers: 31
  },
  {
    id: 'FEED-06',
    cameraId: 'CAM-GJ-033-02',
    name: 'Central Records Office',
    location: 'Ahmedabad, Gujarat',
    state: 'Gujarat',
    status: 'LIVE',
    timestamp: '12:49:16 IST',
    uptime: '98.9%',
    img: '/cctv_govt_office_1790326807196.jpg',
    viewers: 9
  }
];

export default function CCTVCommand() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSite, setSelectedSite] = useState('All Sites');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [activeFeed, setActiveFeed] = useState<CameraFeed | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredFeeds = FEEDS_DATA.filter(feed => {
    if (selectedStatus === 'Live' && feed.status !== 'LIVE') return false;
    if (selectedStatus === 'Offline' && feed.status !== 'OFFLINE') return false;
    if (selectedLocation !== 'All Locations' && !feed.location.includes(selectedLocation)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = feed.name.toLowerCase().includes(q) ||
                    feed.cameraId.toLowerCase().includes(q) ||
                    feed.location.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const liveCount = FEEDS_DATA.filter(f => f.status === 'LIVE').length;
  const offlineCount = FEEDS_DATA.filter(f => f.status === 'OFFLINE').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-4 sm:space-y-6 bg-[#F8FAFC] w-full font-sans antialiased text-slate-800">
      
      {/* ── MOBILE HEADER ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          {/* Badge – hidden on very small screens to save space */}
          <div className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-100/70 text-blue-600 border border-blue-200/60">
            ZONE FIELD SURVEILLANCE
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Cctv className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 stroke-[2.3] shrink-0" />
            <span>Camera Feeds</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl hidden sm:block">
            Live camera streams for sites in your inspection roster.
          </p>
        </div>

        {/* Mobile: Map View shortcut */}
        <button
          onClick={() => navigate('/map')}
          className="sm:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-xs shrink-0"
        >
          <MapIcon className="w-3.5 h-3.5 text-slate-500" />
          Map
        </button>
      </div>

      {/* ── KPI STRIP — 2×2 on mobile, 4 in a row on sm+ ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-slate-900">{liveCount}</span>
              <span className="text-xs font-semibold text-slate-500">Live</span>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <span>↑</span> <span>2</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
            <VideoOff className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-slate-900">{offlineCount}</span>
              <span className="text-xs font-semibold text-slate-500">Offline</span>
            </div>
            <div className="text-[10px] font-bold text-rose-600 flex items-center gap-0.5 mt-0.5">
              <span>↑</span> <span>1</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-slate-900">1</span>
              <span className="text-xs font-semibold text-slate-500">Issues</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5 mt-0.5">
              <span>—</span> <span>0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-black text-slate-900 leading-tight">99.2%</div>
            <div className="text-[10px] font-bold text-slate-500">Avg. Uptime</div>
          </div>
        </div>

      </div>

      {/* ── SEARCH + FILTER TOOLBAR ── */}
      {/* Mobile: Search row + collapsible filter panel */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3 sm:p-4 space-y-3">

        {/* Row 1: Search + filter toggle (mobile) / Full toolbar (desktop) */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sites, camera IDs…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
            />
          </div>

          {/* Mobile-only: filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`sm:hidden p-2.5 rounded-xl border text-xs font-bold transition-colors ${
              showMobileFilters ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Desktop: dropdowns inline */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer text-xs"
              >
                <option value="All Locations">All Locations</option>
                <option value="Nashik">Nashik</option>
                <option value="Pune">Pune</option>
                <option value="Thane">Thane</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer text-xs"
              >
                <option value="All Status">All Status</option>
                <option value="Live">Live Only</option>
                <option value="Offline">Offline Only</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={() => navigate('/map')}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-2xs"
            >
              <MapIcon className="w-3.5 h-3.5 text-slate-500" />
              Map View
            </button>
          </div>
        </div>

        {/* Mobile collapsible filter panel */}
        {showMobileFilters && (
          <div className="sm:hidden grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                className="w-full appearance-none pl-3 pr-7 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option value="All Locations">All Locations</option>
                <option value="Nashik">Nashik</option>
                <option value="Pune">Pune</option>
                <option value="Thane">Thane</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full appearance-none pl-3 pr-7 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option value="All Status">All Status</option>
                <option value="Live">Live Only</option>
                <option value="Offline">Offline Only</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* ── CAMERA FEEDS GRID ── 
          Mobile: 1 col, Tablet: 2 col, Desktop: 3 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredFeeds.map(feed => {
          const isLive = feed.status === 'LIVE';

          return (
            <div
              key={feed.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Camera Video Viewport */}
              <div
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => setActiveFeed(feed)}
              >
                <img
                  src={feed.img}
                  alt={feed.name}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    isLive
                      ? 'filter contrast-[1.12] saturate-[0.8] brightness-95'
                      : 'filter grayscale contrast-125 opacity-35'
                  }`}
                />

                <div className="absolute inset-0 grainy-overlay mix-blend-overlay opacity-50 pointer-events-none"></div>

                {/* LIVE / OFFLINE Badge */}
                <div className="absolute top-3 left-3 z-10">
                  {isLive ? (
                    <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-white shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-extrabold tracking-wider uppercase">LIVE</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-white shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span className="text-[10px] font-extrabold tracking-wider uppercase">OFFLINE</span>
                    </div>
                  )}
                </div>

                {/* Timestamp Badge */}
                {isLive && (
                  <div className="absolute top-3 right-3 z-10 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-white/90 font-mono text-[10px] font-medium shadow-xs">
                    {feed.timestamp}
                  </div>
                )}

                {/* Offline overlay */}
                {!isLive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <div className="w-11 h-11 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-500 flex items-center justify-center mb-1.5 animate-pulse">
                      <AlertOctagon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-rose-500">
                      FEED OFFLINE
                    </span>
                    <span className="text-[11px] font-normal text-slate-300 mt-0.5">
                      {feed.lastSeen || 'Signal Disconnected'}
                    </span>
                  </div>
                )}

                {/* Expand Icon */}
                <div className="absolute bottom-2.5 right-2.5 z-10">
                  <div className="w-7 h-7 rounded-md bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 transition-colors shadow-xs">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card metadata */}
              <div className="p-3 sm:p-3.5 px-3.5 sm:px-4 bg-white flex items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
                    <Landmark className="w-4 h-4 text-slate-700" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 text-xs truncate leading-snug group-hover:text-blue-600 transition-colors">
                      {feed.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                      {feed.cameraId} • <span className="font-sans text-slate-500">{feed.location}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className={`text-xs font-black ${isLive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {feed.uptime}
                  </div>
                  <div className={`text-[10px] font-semibold ${isLive ? 'text-emerald-700' : 'text-rose-700'}`}>
                    Uptime
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FULLSCREEN MODAL ── */}
      {activeFeed && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-fade-in"
          onClick={() => setActiveFeed(null)}
        >
          <div
            className="bg-[#0B0F19] text-white w-full sm:max-w-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 rounded-t-3xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 px-5 border-b border-slate-800 flex justify-between items-center bg-[#070A11]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <div>
                  <h3 className="font-bold text-white text-sm truncate max-w-[220px] sm:max-w-none">{activeFeed.name}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{activeFeed.cameraId} • {activeFeed.location}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveFeed(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src={activeFeed.img}
                alt="Active Stream"
                className={`w-full h-full object-cover ${activeFeed.status === 'OFFLINE' ? 'grayscale opacity-30' : ''}`}
              />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-emerald-400 border border-white/10">
                SECURE RTSP STREAM • AES-256 • {activeFeed.status}
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 px-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#070A11]">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>Uptime: <strong className="text-white">{activeFeed.uptime}</strong></span>
                <span>Signal: <strong className="text-emerald-400">Optimal</strong></span>
              </div>
              <button
                onClick={() => alert('Snapshot captured and geotagged for inspection report.')}
                className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Capture Inspection Snapshot
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
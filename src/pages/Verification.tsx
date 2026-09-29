import React, { useState } from 'react';
import { 
  FileText, ShieldCheck, Clock, AlertTriangle, Download, Plus, 
  Search, Filter, ChevronDown, LayoutGrid, RotateCw, CheckCircle2,
  TrendingUp, ExternalLink, MoreVertical, Eye
} from 'lucide-react';
import { 
  IndiaNetworkMap, 
  EmptyStateIllustration, 
  BotanicalAccent 
} from '../components/GovernmentEmblems';

interface VerificationRecord {
  id: string;
  subjectName: string;
  location: string;
  status: 'Verified' | 'Pending' | 'Flagged';
  createdAt: string;
  type: string;
}

export default function Verification() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('This Month');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncTime, setSyncTime] = useState('28 Sep 2026 • 19:03 IST');
  const [viewMode, setViewMode] = useState<'empty' | 'populated'>('empty');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Sample records for when populated view is toggled or after refresh
  const sampleRecords: VerificationRecord[] = [
    {
      id: 'VR-2026-9841',
      subjectName: 'Pimpalgaon Senior Care Rehab',
      location: 'Nashik, Maharashtra',
      status: 'Verified',
      createdAt: '28 Sep 2026 • 18:45 IST',
      type: 'Biometric & CCTV'
    },
    {
      id: 'VR-2026-9842',
      subjectName: 'Arogya Welfare Hospital Ward 3',
      location: 'Pune, Maharashtra',
      status: 'Verified',
      createdAt: '28 Sep 2026 • 17:30 IST',
      type: 'On-site Geotag'
    },
    {
      id: 'VR-2026-9843',
      subjectName: 'Vidya Divyang Residential Facility',
      location: 'Bhiwandi, Maharashtra',
      status: 'Pending',
      createdAt: '28 Sep 2026 • 16:15 IST',
      type: 'Attendance Cross-Check'
    },
    {
      id: 'VR-2026-9844',
      subjectName: 'Central Divyang Empowerment Centre',
      location: 'Ahmedabad, Gujarat',
      status: 'Flagged',
      createdAt: '28 Sep 2026 • 15:00 IST',
      type: 'Fund Bill & Log Match'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      };
      const datePart = now.toLocaleDateString('en-GB', options);
      const timePart = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      setSyncTime(`${datePart} • ${timePart} IST`);
    }, 800);
  };

  const filteredRecords = sampleRecords.filter(r => {
    const matchesSearch = searchQuery === '' || 
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1680px] mx-auto space-y-6 bg-[#F8FAFC] w-full font-sans">
      
      {/* 1. HERO BANNER CARD */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:shadow-md">
        {/* Soft Fluid Background Gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(108deg, #FFFFFF 0%, #F5F7FF 32%, #EEF4FE 68%, #F0FDF4 100%)',
            opacity: 0.95
          }}
        />

        {/* Decorative Mesh Overlay Curve */}
        <svg 
          viewBox="0 0 1200 180" 
          className="absolute bottom-0 left-0 right-0 w-full h-24 pointer-events-none opacity-40"
          preserveAspectRatio="none"
          fill="none"
        >
          <path 
            d="M0 120 Q300 160 600 100 T1200 140 L1200 180 L0 180 Z" 
            fill="url(#wave-banner-grad)" 
          />
          <defs>
            <linearGradient id="wave-banner-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#A7F3D0" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left Title & Shield Icon */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-100/90 to-blue-50/60 border border-blue-200/70 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
              <ShieldCheck className="w-8 h-8 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Verification
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Identity & Evidence Operations
              </p>
            </div>
          </div>

          {/* Right Slogan & India Network Map */}
          <div className="flex items-center gap-8 self-end md:self-center">
            {/* Elegant Quote */}
            <div className="text-right hidden sm:block">
              <span className="text-blue-400 font-serif text-2xl leading-none">“</span>
              <p className="font-serif italic text-slate-700 text-sm md:text-base font-medium tracking-wide -mt-2">
                Verified Today,
              </p>
              <p className="font-serif italic text-slate-700 text-sm md:text-base font-medium tracking-wide">
                Safer Tomorrow <span className="text-blue-400 font-serif text-2xl leading-none">”</span>
              </p>
            </div>

            {/* India Network Watermark Silhouette */}
            <IndiaNetworkMap className="w-56 h-36 md:w-64 md:h-40 -mr-2" />
          </div>
        </div>
      </div>

      {/* 2. STATS ROW (3 Stats + Action Buttons & Flagged Card) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        
        {/* Card 1: Total Records */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 stroke-[2]" />
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Records</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">2,481</h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span className="text-sm">↗</span>
            <span>12%</span>
            <span className="font-normal text-slate-500">from last month</span>
          </div>
        </div>

        {/* Card 2: Verified */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">2,316</h3>
          </div>
          <div className="mt-4">
            <span className="text-xs font-bold text-emerald-600">93.4%</span>
          </div>
        </div>

        {/* Card 3: Pending */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 stroke-[2]" />
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">112</h3>
          </div>
          <div className="mt-4">
            <span className="text-xs font-bold text-amber-600">4.5%</span>
          </div>
        </div>

        {/* Column 4: Top Action Buttons + Bottom Flagged Card */}
        <div className="flex flex-col justify-between gap-3">
          {/* Top Actions: Export CSV + New Action */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => alert('Exporting Verification records as CSV...')}
              className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Export CSV</span>
            </button>
            <button 
              onClick={() => alert('Initiate New Verification Action')}
              className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Action</span>
            </button>
          </div>

          {/* Bottom Card: Flagged */}
          <div className="bg-gradient-to-br from-[#FFF1F2] to-[#FFE4E6] rounded-2xl p-4 border border-rose-100 shadow-sm relative overflow-hidden flex items-center justify-between">
            {/* Subtle Circular Radar Watermark in Top Right */}
            <div className="absolute top-0 right-0 w-24 h-24 -mr-4 -mt-4 pointer-events-none opacity-40">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <circle cx="80" cy="20" r="30" stroke="#F43F5E" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="80" cy="20" r="45" stroke="#F43F5E" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="80" cy="20" r="60" stroke="#F43F5E" strokeWidth="1" />
              </svg>
            </div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-white/90 text-rose-600 flex items-center justify-center shadow-xs border border-rose-100">
                <AlertTriangle className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Flagged</p>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">53</h3>
              </div>
            </div>

            <div className="relative z-10 text-right">
              <span className="text-xs font-bold text-rose-600 bg-white/80 px-2 py-0.5 rounded-md border border-rose-200/60">
                2 2.1%
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. MAIN DATA TABLE CARD WITH EMPTY STATE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 overflow-hidden relative min-h-[500px] flex flex-col justify-between">
        
        {/* Botanical corner accent watermark on bottom right */}
        <BotanicalAccent />

        <div>
          {/* Toolbar: Search & Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search verification by record ID, name, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center flex-wrap gap-2.5">
              <button 
                onClick={() => alert('Advanced Filter panel opened')}
                className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>Filters</span>
              </button>

              {/* Status Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Status: <span className="text-slate-900">{statusFilter}</span></span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {showStatusDropdown && (
                  <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 text-xs">
                    {['All', 'Verified', 'Pending', 'Flagged'].map((st) => (
                      <button
                        key={st}
                        onClick={() => { setStatusFilter(st); setShowStatusDropdown(false); }}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700 font-medium"
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                  className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Date: <span className="text-slate-900">{dateFilter}</span></span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {showDateDropdown && (
                  <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 text-xs">
                    {['Today', 'This Week', 'This Month', 'All Time'].map((dt) => (
                      <button
                        key={dt}
                        onClick={() => { setDateFilter(dt); setShowDateDropdown(false); }}
                        className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-700 font-medium"
                      >
                        {dt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid / Layout Toggle Icon */}
              <button 
                onClick={() => setViewMode(viewMode === 'empty' ? 'populated' : 'empty')}
                title="Toggle between Empty State and Populated Table View"
                className={`p-2.5 border rounded-xl transition-colors shadow-xs cursor-pointer ${
                  viewMode === 'populated' 
                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table Header Row */}
          <div className="mt-4 bg-[#F8FAFC] rounded-lg px-6 py-3.5 border border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="w-1/6">Record ID</span>
            <span className="w-1/4">Subject Name</span>
            <span className="w-1/5">Location</span>
            <span className="w-1/6">Status</span>
            <span className="w-1/6">Created At</span>
            <span className="w-16 text-right">Actions</span>
          </div>

          {/* Table Content: EITHER Empty State OR Populated Table */}
          {viewMode === 'empty' ? (
            /* EXACT EMPTY STATE MATCHING REFERENCE PICTURE */
            <div className="py-16 md:py-20 flex flex-col items-center justify-center text-center relative z-10">
              {/* Cute illustration */}
              <EmptyStateIllustration />

              {/* Heading */}
              <h3 className="text-base md:text-lg font-bold text-slate-800 mt-5">
                No records found
              </h3>

              {/* Subtitle */}
              <p className="text-xs text-slate-500 font-medium mt-1">
                No verification records match your current criteria.
              </p>

              {/* Last Sync Timestamp */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Last synchronization</span>
                <span className="text-slate-600 font-semibold">{syncTime}</span>
              </div>

              {/* Refresh Records Button */}
              <button
                onClick={handleRefresh}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-blue-400 text-blue-600 bg-white hover:bg-blue-50/70 text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
                <span>{isRefreshing ? 'Synchronizing...' : 'Refresh Records'}</span>
              </button>
            </div>
          ) : (
            /* POPULATED RECORDS (AVAILABLE UPON TOGGLING OR FILTERING) */
            <div className="divide-y divide-slate-100 relative z-10 mt-1">
              {filteredRecords.map((rec) => (
                <div 
                  key={rec.id} 
                  className="px-6 py-4 flex items-center justify-between text-xs hover:bg-blue-50/30 transition-colors group cursor-pointer"
                  onClick={() => alert(`Inspecting verification record ${rec.id}`)}
                >
                  <span className="w-1/6 font-mono font-semibold text-blue-600">{rec.id}</span>
                  <div className="w-1/4">
                    <p className="font-semibold text-slate-800">{rec.subjectName}</p>
                    <p className="text-[10px] text-slate-400">{rec.type}</p>
                  </div>
                  <span className="w-1/5 text-slate-600 font-medium">{rec.location}</span>
                  <div className="w-1/6">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      rec.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      rec.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {rec.status}
                    </span>
                  </div>
                  <span className="w-1/6 text-slate-500">{rec.createdAt}</span>
                  <div className="w-16 text-right">
                    <button className="p-1 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

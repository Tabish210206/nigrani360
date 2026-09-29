import React, { useState } from 'react';
import { 
  Building2, MapPin, Search, Filter, ChevronDown, 
  ArrowUpRight, ArrowDownRight, Activity, Clock, 
  ChevronRight, Plus, Check, AlertTriangle, Video, 
  SlidersHorizontal, CheckCircle2, ShieldAlert, 
  GraduationCap, PlusSquare, Landmark, Layers, Map as MapIcon,
  X, Sparkles, UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectItem {
  id: string;
  name: string;
  code: string;
  type: 'Rehab' | 'Hospital' | 'School' | 'Govt. Office' | 'Entrance' | 'Training';
  avatarEmoji: string;
  avatarBg: string;
  district: string;
  state: string;
  status: 'Active' | 'Under Review' | 'Flagged';
  riskLevel: 'high' | 'medium' | 'low';
  cctvHealth: string;
  inspectionHealth: 'OK' | 'Overdue' | 'Due Soon';
  lastInspectionDate: string;
  lastInspectionRelative: string;
}

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'MH-042',
    name: 'Pimpalgaon Community Centre',
    code: 'C1B12E4B',
    type: 'Rehab',
    avatarEmoji: '👥',
    avatarBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    district: 'Nashik',
    state: 'Maharashtra',
    status: 'Active',
    riskLevel: 'high',
    cctvHealth: '98%',
    inspectionHealth: 'OK',
    lastInspectionDate: '12 Sep 2026',
    lastInspectionRelative: '5 days ago'
  },
  {
    id: 'MH-089',
    name: 'District Hospital, Ward 3',
    code: '0A33081E',
    type: 'Hospital',
    avatarEmoji: '➕',
    avatarBg: 'bg-rose-50 text-rose-600 border-rose-100',
    district: 'Pune',
    state: 'Maharashtra',
    status: 'Active',
    riskLevel: 'medium',
    cctvHealth: '98%',
    inspectionHealth: 'OK',
    lastInspectionDate: '10 Sep 2026',
    lastInspectionRelative: '7 days ago'
  },
  {
    id: 'MH-112',
    name: 'Govt School, Main Block',
    code: 'C61B5C54',
    type: 'School',
    avatarEmoji: '🎓',
    avatarBg: 'bg-blue-50 text-blue-600 border-blue-100',
    district: 'Thane',
    state: 'Maharashtra',
    status: 'Active',
    riskLevel: 'low',
    cctvHealth: '98%',
    inspectionHealth: 'OK',
    lastInspectionDate: '14 Sep 2026',
    lastInspectionRelative: '3 days ago'
  },
  {
    id: 'GJ-021',
    name: 'Central Records Office',
    code: '3898B041',
    type: 'Govt. Office',
    avatarEmoji: '🏢',
    avatarBg: 'bg-teal-50 text-teal-600 border-teal-100',
    district: 'Ahmedabad',
    state: 'Gujarat',
    status: 'Active',
    riskLevel: 'low',
    cctvHealth: '98%',
    inspectionHealth: 'OK',
    lastInspectionDate: '11 Sep 2026',
    lastInspectionRelative: '6 days ago'
  },
  {
    id: 'RJ-044',
    name: 'State Facility Entrance',
    code: '0C24563F',
    type: 'Entrance',
    avatarEmoji: '🏛️',
    avatarBg: 'bg-purple-50 text-purple-600 border-purple-100',
    district: 'Jaipur',
    state: 'Rajasthan',
    status: 'Active',
    riskLevel: 'medium',
    cctvHealth: '98%',
    inspectionHealth: 'OK',
    lastInspectionDate: '9 Sep 2026',
    lastInspectionRelative: '8 days ago'
  },
  {
    id: 'MP-055',
    name: 'Rural Dev. Training Centre',
    code: '7A12D390',
    type: 'Training',
    avatarEmoji: '🏫',
    avatarBg: 'bg-amber-50 text-amber-700 border-amber-100',
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    status: 'Active',
    riskLevel: 'low',
    cctvHealth: '98%',
    inspectionHealth: 'OK',
    lastInspectionDate: '13 Sep 2026',
    lastInspectionRelative: '4 days ago'
  }
];

export default function Projects() {
  const navigate = useNavigate();
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedRisk, setSelectedRisk] = useState('All Risk Levels');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    name: '',
    type: 'Rehab' as ProjectItem['type'],
    district: '',
    state: 'Maharashtra',
    riskLevel: 'low' as ProjectItem['riskLevel']
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.district) return;

    const avatarsByType: Record<string, { emoji: string; bg: string }> = {
      Rehab: { emoji: '👥', bg: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
      Hospital: { emoji: '➕', bg: 'bg-rose-50 text-rose-600 border-rose-100' },
      School: { emoji: '🎓', bg: 'bg-blue-50 text-blue-600 border-blue-100' },
      'Govt. Office': { emoji: '🏢', bg: 'bg-teal-50 text-teal-600 border-teal-100' },
      Entrance: { emoji: '🏛️', bg: 'bg-purple-50 text-purple-600 border-purple-100' },
      Training: { emoji: '🏫', bg: 'bg-amber-50 text-amber-700 border-amber-100' },
    };

    const typeMeta = avatarsByType[newProject.type] || { emoji: '🏢', bg: 'bg-slate-50 text-slate-600 border-slate-200' };

    const item: ProjectItem = {
      id: `IN-${Math.floor(100 + Math.random() * 900)}`,
      name: newProject.name,
      code: Math.random().toString(36).substring(2, 10).toUpperCase(),
      type: newProject.type,
      avatarEmoji: typeMeta.emoji,
      avatarBg: typeMeta.bg,
      district: newProject.district,
      state: newProject.state,
      status: 'Active',
      riskLevel: newProject.riskLevel,
      cctvHealth: '99%',
      inspectionHealth: 'OK',
      lastInspectionDate: 'Today',
      lastInspectionRelative: 'Just now'
    };

    setProjectsList([item, ...projectsList]);
    setIsAddModalOpen(false);
    setNewProject({ name: '', type: 'Rehab', district: '', state: 'Maharashtra', riskLevel: 'low' });
  };

  // Filter projects
  const filteredProjects = projectsList.filter(p => {
    if (selectedState !== 'All States' && p.state !== selectedState) return false;
    if (selectedType !== 'All Types' && p.type !== selectedType) return false;
    if (selectedRisk !== 'All Risk Levels') {
      if (selectedRisk === 'High Risk' && p.riskLevel !== 'high') return false;
      if (selectedRisk === 'Medium Risk' && p.riskLevel !== 'medium') return false;
      if (selectedRisk === 'Low Risk' && p.riskLevel !== 'low') return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = p.name.toLowerCase().includes(q) ||
                    p.code.toLowerCase().includes(q) ||
                    p.district.toLowerCase().includes(q) ||
                    p.state.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 bg-[#F8FAFC] w-full font-sans antialiased text-slate-800">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <span>PROJECTS & FACILITIES</span>
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Projects & Centres Registry
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and monitor all social welfare sites nationwide.
          </p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* 5 KPI Metric Cards Row (Matching Reference) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        
        {/* Total Projects */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 text-lg">
            🏢
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Projects</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{projectsList.length}</p>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-0.5">
              <span>↑</span>
              <span>+2 this month</span>
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 text-lg">
            📊
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">48</p>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-0.5">
              <span>↑</span>
              <span>+6 this month</span>
            </div>
          </div>
        </div>

        {/* High Risk */}
        <div className="bg-rose-50/50 rounded-2xl p-4 sm:p-5 border border-rose-200/80 shadow-xs hover:shadow-sm transition-shadow flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-100/70 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 text-lg">
            ⚠️
          </div>
          <div>
            <p className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">High Risk</p>
            <p className="text-2xl font-black text-rose-600 mt-0.5">
              {projectsList.filter(p => p.riskLevel === 'high').length}
            </p>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 mt-0.5">
              <span>↓</span>
              <span>-1 this month</span>
            </div>
          </div>
        </div>

        {/* Inspection Overdue */}
        <div className="bg-amber-50/40 rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-xs hover:shadow-sm transition-shadow flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 text-lg">
            ⏱️
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Inspection Overdue</p>
            <p className="text-2xl font-black text-amber-700 mt-0.5">11</p>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 mt-0.5">
              <span>↑</span>
              <span>+3 this month</span>
            </div>
          </div>
        </div>

        {/* CCTV Offline */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow flex items-start gap-3.5 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 text-lg">
            📹
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CCTV Offline</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">3</p>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-0.5">
              <span>↑</span>
              <span>-2 this month</span>
            </div>
          </div>
        </div>

      </div>

      {/* Filter and Control Toolbar (Matching Reference) */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search projects, IDs, locations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
          />
        </div>

        {/* Middle: Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* State Filter */}
          <div className="relative">
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer text-xs"
            >
              <option value="All States">All States</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer text-xs"
            >
              <option value="All Types">All Types</option>
              <option value="Rehab">Rehab</option>
              <option value="Hospital">Hospital</option>
              <option value="School">School</option>
              <option value="Govt. Office">Govt. Office</option>
              <option value="Entrance">Entrance</option>
              <option value="Training">Training</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Risk Level Filter */}
          <div className="relative">
            <select
              value={selectedRisk}
              onChange={e => setSelectedRisk(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer text-xs"
            >
              <option value="All Risk Levels">All Risk Levels</option>
              <option value="High Risk">High Risk Only</option>
              <option value="Medium Risk">Medium Risk</option>
              <option value="Low Risk">Low Risk</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Compliance Health Filter */}
          <div className="relative hidden xl:block">
            <select
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer text-xs"
            >
              <option>Compliance Health</option>
              <option>Above 95%</option>
              <option>85% - 95%</option>
              <option>Below 85%</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort By */}
          <div className="relative hidden sm:block">
            <select
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer text-xs"
            >
              <option>⇅ Sort by</option>
              <option>Risk: High to Low</option>
              <option>Name (A-Z)</option>
              <option>Recently Inspected</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right: View Switcher (List vs Grid) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            title="List View"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            title="Grid View"
          >
            <MapIcon className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Dedicated Projects Card List (< md) */}
      <div className="md:hidden space-y-2">
        {filteredProjects.map((p) => {
          const isOverdue = p.riskLevel === 'high' || p.name.includes('Pimpalgaon') || p.name.includes('Nashik');
          return (
            <div 
              key={p.id}
              onClick={() => navigate(`/site/${p.id}`)}
              className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs hover:border-blue-400 transition-all space-y-2 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900 text-xs leading-tight truncate">{p.name}</h3>
                  <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                    <span>{p.district}, {p.state}</span>
                  </p>
                </div>
                <span className="text-[9px] font-mono text-slate-400 font-bold shrink-0">{p.code}</span>
              </div>

              {/* Status & Risk Badges: ● Active   ● High Risk */}
              <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  Active
                </span>
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${
                  p.riskLevel === 'high' 
                    ? 'bg-rose-50 text-rose-700 border-rose-200' 
                    : p.riskLevel === 'medium'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  <span className={`w-1 h-1 rounded-full ${
                    p.riskLevel === 'high' ? 'bg-rose-500 animate-pulse' : p.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                  }`} />
                  {p.riskLevel === 'high' ? 'High Risk' : p.riskLevel === 'medium' ? 'Medium Risk' : 'Healthy'}
                </span>
              </div>

              {/* Metrics Row: 98% CCTV | Inspection Overdue */}
              <div className="flex items-center justify-between text-[10px] py-1.5 px-2.5 bg-slate-50/80 rounded-lg border border-slate-100 font-medium text-slate-600">
                <div className="flex items-center gap-1">
                  <Video className="w-3 h-3 text-blue-600" />
                  <span className="font-bold text-slate-900">{p.cctvHealth}</span>
                  <span className="text-[9px] text-slate-500">CCTV</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span className={isOverdue ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                    {isOverdue ? 'Overdue' : 'OK'}
                  </span>
                </div>
              </div>

              {/* Primary Action Button: View Site */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/site/${p.id}`);
                }}
                className="w-full py-1.5 px-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-[10px] rounded-lg border border-blue-200/60 shadow-2xs flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span>View Site →</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Projects Table (Desktop Only - >= md) */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            
            {/* Table Header */}
            <thead className="bg-slate-50/70 border-b border-slate-200/80 text-[10px] uppercase tracking-wider text-slate-400 font-extrabold select-none">
              <tr>
                <th className="py-3.5 px-6">PROJECT / CENTRE</th>
                <th className="py-3.5 px-6">LOCATION</th>
                <th className="py-3.5 px-6">STATUS & RISK</th>
                <th className="py-3.5 px-6">COMPLIANCE HEALTH</th>
                <th className="py-3.5 px-6">LAST INSPECTION</th>
                <th className="py-3.5 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((p) => (
                <tr 
                  key={p.id}
                  onClick={() => navigate(`/site/${p.id}`)}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  
                  {/* Column 1: Project with colored Avatar */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg shrink-0 ${p.avatarBg}`}>
                        <span>{p.avatarEmoji}</span>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-[13px] group-hover:text-blue-600 transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {p.code} • <span className="font-sans font-medium text-slate-500">{p.type}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Location */}
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-800 text-xs">{p.district}</div>
                        <div className="text-[11px] text-slate-400">{p.state}</div>
                      </div>
                    </div>
                  </td>

                  {/* Column 3: Status & Risk Badges */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3 h-3 stroke-[3]" /> Active
                      </span>

                      {p.riskLevel === 'high' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider">
                          <AlertTriangle className="w-3 h-3 text-rose-500" /> High Risk
                        </span>
                      )}

                      {p.riskLevel === 'medium' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
                          <AlertTriangle className="w-3 h-3 text-amber-600" /> Medium Risk
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Column 4: Compliance Health */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4 text-xs">
                      {/* CCTV Pulse */}
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
                        <span className="text-slate-900">{p.cctvHealth}</span>
                        <span className="text-[10px] font-medium text-slate-400">CCTV</span>
                      </div>

                      {/* Inspection Clock */}
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50/70 border border-emerald-100 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>Insp. OK</span>
                      </div>
                    </div>
                  </td>

                  {/* Column 5: Last Inspection Date */}
                  <td className="py-4 px-6">
                    <div className="text-xs font-semibold text-slate-800">{p.lastInspectionDate}</div>
                    <div className="text-[11px] text-slate-400">{p.lastInspectionRelative}</div>
                  </td>

                  {/* Column 6: Actions */}
                  <td className="py-4 px-6 text-right">
                    <button className="p-1.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all rounded-lg">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Modal: Add New Project */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-lg">
                ✨
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Add New Centre / Facility</h3>
                <p className="text-xs text-slate-500">Register a new social welfare institution under Nigrani360</p>
              </div>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Facility Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Navjeevan Divyang Empowerment Centre"
                  value={newProject.name}
                  onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Facility Type</label>
                  <select
                    value={newProject.type}
                    onChange={e => setNewProject({ ...newProject, type: e.target.value as any })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="Rehab">Rehab Centre</option>
                    <option value="Hospital">Hospital / Clinic</option>
                    <option value="School">School / Hostel</option>
                    <option value="Govt. Office">Govt. Office</option>
                    <option value="Entrance">Main Facility</option>
                    <option value="Training">Training Centre</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Risk Classification</label>
                  <select
                    value={newProject.riskLevel}
                    onChange={e => setNewProject({ ...newProject, riskLevel: e.target.value as any })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="low">Normal (Low Risk)</option>
                    <option value="medium">Medium Risk</option>
                    <option value="high">High Risk Alert</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">District</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Nashik"
                    value={newProject.district}
                    onChange={e => setNewProject({ ...newProject, district: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                  <select
                    value={newProject.state}
                    onChange={e => setNewProject({ ...newProject, state: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-colors"
                >
                  Save & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
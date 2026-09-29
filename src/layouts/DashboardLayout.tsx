import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Map, LayoutGrid, ClipboardCheck, Users,
  AlertTriangle, Video, Activity, Headphones,
  LogOut, Bell, Search, Calendar, ChevronDown, Globe,
  IndianRupee, FileText, Package, Sliders, ChevronRight,
  Building2, Shield, Menu, X, User, MapPin, MoreHorizontal, Settings
} from 'lucide-react';
import { AshokaEmblem, IndianFlagBadge, NigraniLogo, SidebarBottomArtwork } from '../components/GovernmentEmblems';
import { useAuth, type UserRole } from '../context/AuthContext';

// All navigation items with role access restrictions
type NavItem = { name: string; path: string; icon: any };
type NavGroup = { title: string; items: NavItem[] };

function getNavGroupsForRole(role: UserRole): NavGroup[] {
  if (role === 'FIELD_INSPECTOR') {
    return [
      {
        title: 'FIELD OPERATIONS',
        items: [
          { name: 'Duty Dashboard', path: '/inspections', icon: ClipboardCheck },
          { name: 'Route & Map', path: '/map', icon: Map },
          { name: 'Duty Orders', path: '/assignments', icon: Users },
        ]
      },
      {
        title: 'INTELLIGENCE',
        items: [
          { name: 'Zone Risk Alerts', path: '/alerts', icon: AlertTriangle },
          { name: 'Monitored CCTV', path: '/cctv', icon: Video },
        ]
      },
      {
        title: 'ADMINISTRATION',
        items: [
          { name: 'Settings', path: '/demo', icon: Settings },
        ]
      }
    ];
  }
  if (role === 'NGO_INSTITUTE') {
    return [
      {
        title: 'MY FACILITY',
        items: [
          { name: 'Centre Overview', path: '/ngo-portal', icon: Building2 },
          { name: 'Grant & FundTrace', path: '/fundtrace', icon: IndianRupee },
          { name: 'Facility CCTV', path: '/cctv', icon: Video },
        ]
      },
      {
        title: 'ADMINISTRATION',
        items: [
          { name: 'Settings', path: '/demo', icon: Settings },
        ]
      }
    ];
  }
  // PMU_DIRECTOR (Default / National Command)
  return [
    {
      title: 'OPERATIONS',
      items: [
        { name: 'Dashboard', path: '/overview', icon: Home },
        { name: 'National Map', path: '/map', icon: Map },
        { name: 'Projects & Centres', path: '/projects', icon: LayoutGrid },
        { name: 'Inspection Oversight', path: '/inspections', icon: ClipboardCheck },
        { name: 'Duty Orders', path: '/assignments', icon: Users },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { name: 'Risk Alerts', path: '/alerts', icon: AlertTriangle },
        { name: 'CCTV Network', path: '/cctv', icon: Video },
        { name: 'Video Verification', path: '/verification', icon: Shield },
        { name: 'Beneficiary Signals', path: '/beneficiaries', icon: Activity },
        { name: 'Seva-Samadhan', path: '/complaints', icon: Headphones },
      ]
    },
    {
      title: 'COMPLIANCE',
      items: [
        { name: 'FundTrace', path: '/fundtrace', icon: IndianRupee },
        { name: 'Reports', path: '/reports', icon: FileText },
        { name: 'Assets & Stock', path: '/assets', icon: Package },
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { name: 'Settings', path: '/demo', icon: Settings },
      ]
    }
  ];
}

// Full categorized list for Mobile Drawer Navigation
const MOBILE_DRAWER_ITEMS: NavGroup[] = [
  {
    title: 'OPERATIONS & SITES',
    items: [
      { name: 'Projects & Centres', path: '/projects', icon: LayoutGrid },
      { name: 'Inspection Oversight', path: '/inspections', icon: ClipboardCheck },
      { name: 'CCTV Surveillance', path: '/cctv', icon: Video },
    ]
  },
  {
    title: 'INTELLIGENCE & AUDIT',
    items: [
      { name: 'Video Verification', path: '/verification', icon: Shield },
      { name: 'Reports & Analytics', path: '/reports', icon: FileText },
      { name: 'Grant FundTrace', path: '/fundtrace', icon: IndianRupee },
      { name: 'Assets & Stock', path: '/assets', icon: Package },
    ]
  },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const [selectedGeo, setSelectedGeo] = useState(() => 
    user?.role === 'FIELD_INSPECTOR' ? 'Maharashtra West' : 'National'
  );
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [geoDropdownOpen, setGeoDropdownOpen] = useState(false);
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.role;
  const visibleGroups = getNavGroupsForRole(role);

  // Mobile Bottom Navigation Tabs Configuration based on user role
  const bottomNavTabs = (() => {
    if (role === 'FIELD_INSPECTOR') {
      return [
        {
          id: 'home',
          name: 'Home',
          path: '/inspections',
          icon: Home,
          isActive: location.pathname === '/inspections'
        },
        {
          id: 'map',
          name: 'Map',
          path: '/map',
          icon: Map,
          isActive: location.pathname === '/map'
        },
        {
          id: 'orders',
          name: 'Orders',
          path: '/assignments',
          icon: ClipboardCheck,
          isActive: location.pathname === '/assignments'
        },
        {
          id: 'alerts',
          name: 'Alerts',
          path: '/alerts',
          icon: Bell,
          badge: 3,
          isActive: location.pathname === '/alerts'
        },
        {
          id: 'more',
          name: 'More',
          path: '#more',
          icon: MoreHorizontal,
          isButton: true,
          onClick: () => setMobileMenuOpen(true),
          isActive: mobileMenuOpen
        }
      ];
    }

    if (role === 'NGO_INSTITUTE') {
      return [
        {
          id: 'home',
          name: 'Centre',
          path: '/ngo-portal',
          icon: Building2,
          isActive: location.pathname === '/ngo-portal'
        },
        {
          id: 'grants',
          name: 'Grants',
          path: '/fundtrace',
          icon: IndianRupee,
          isActive: location.pathname === '/fundtrace'
        },
        {
          id: 'cctv',
          name: 'CCTV',
          path: '/cctv',
          icon: Video,
          isActive: location.pathname === '/cctv'
        },
        {
          id: 'alerts',
          name: 'Alerts',
          path: '/alerts',
          icon: Bell,
          badge: 2,
          isActive: location.pathname === '/alerts'
        },
        {
          id: 'more',
          name: 'More',
          path: '#more',
          icon: MoreHorizontal,
          isButton: true,
          onClick: () => setMobileMenuOpen(true),
          isActive: mobileMenuOpen
        }
      ];
    }

    // PMU_DIRECTOR (Default)
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/overview',
        icon: Home,
        isActive: location.pathname === '/overview' || location.pathname === '/'
      },
      {
        id: 'map',
        name: 'Map',
        path: '/map',
        icon: Map,
        isActive: location.pathname === '/map'
      },
      {
        id: 'projects',
        name: 'Projects',
        path: '/projects',
        icon: LayoutGrid,
        isActive: location.pathname === '/projects'
      },
      {
        id: 'alerts',
        name: 'Alerts',
        path: '/alerts',
        icon: Bell,
        badge: 4,
        isActive: location.pathname === '/alerts'
      },
      {
        id: 'more',
        name: 'More',
        path: '#more',
        icon: MoreHorizontal,
        isButton: true,
        onClick: () => setMobileMenuOpen(true),
        isActive: mobileMenuOpen
      }
    ];
  })();

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-800 font-sans antialiased selection:bg-blue-100">

      {/* MOBILE BACKDROP */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* MOBILE SLIDE-OVER DRAWER */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-[82vw] max-w-sm bg-white shadow-2xl flex flex-col md:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Profile Card Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs shrink-0"
              />
            ) : (
              <div className={`w-10 h-10 rounded-full ${user.avatarColor || 'bg-[#00875A]'} text-white font-extrabold flex items-center justify-center text-xs shadow-xs shrink-0`}>
                {user.initials}
              </div>
            )}
            <div>
              <h2 className="font-extrabold text-slate-900 text-sm leading-tight">
                {user.name}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {role === 'FIELD_INSPECTOR' ? 'Field Officer' : role === 'NGO_INSTITUTE' ? 'NGO Facility Head' : 'Command Director'}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {user.subtitle || 'Maharashtra West'}
              </p>
            </div>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Navigation Groups in Mobile Drawer */}
        <div className="flex-1 overflow-y-auto py-2.5 px-2.5 space-y-3 custom-scrollbar">
          {visibleGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <h4 className="px-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {group.title}
              </h4>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[12px] font-semibold transition-all min-h-[38px] ${
                        isActive
                          ? 'bg-[#EEF4FF] text-blue-600 font-bold shadow-2xs'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}
                        strokeWidth={isActive ? 2.3 : 1.9}
                      />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Logout inside drawer list for easy reach on mobile */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold text-rose-600 bg-rose-50/70 hover:bg-rose-100 border border-rose-100 transition-all cursor-pointer shadow-xs"
            >
              <LogOut className="w-4.5 h-4.5 text-rose-600" strokeWidth={2.2} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Settings & Logout (Bottom Footer of Mobile Drawer) */}
        <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/80">
          <Link
            to="/demo"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[14px] font-semibold text-slate-700 hover:bg-white transition-all"
          >
            <Settings className="w-5 h-5 text-slate-400" strokeWidth={1.9} />
            <span>Settings</span>
          </Link>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[14px] font-bold text-white bg-rose-600 hover:bg-rose-700 transition-all shadow-sm cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5 text-white" strokeWidth={2.2} />
            <span>Secure Log Out</span>
          </button>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-white text-slate-700 flex-col border-r border-slate-200/80 shrink-0 select-none shadow-xs">
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <NigraniLogo className="w-9 h-9 shrink-0 drop-shadow-sm" />
            <div>
              <h1 className="font-extrabold text-slate-900 tracking-tight text-[18px] leading-tight">
                Nigrani360
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">
                National Command Centre
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5 custom-scrollbar mt-1">
          {visibleGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path ||
                    (item.path === '/overview' && location.pathname === '/');
                  return (
                    <li key={item.name} className="relative">
                      {isActive && (
                        <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-600 rounded-r-md z-10" />
                      )}
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150 ${
                          isActive
                            ? 'bg-[#EEF4FF] text-blue-600 font-bold shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <item.icon
                          className={`w-[18px] h-[18px] ${isActive ? 'text-blue-600' : 'text-slate-400'}`}
                          strokeWidth={isActive ? 2.4 : 1.9}
                        />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Secure Logout with rest of buttons */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all duration-150 cursor-pointer group"
            >
              <LogOut
                className="w-[18px] h-[18px] text-slate-400 group-hover:text-rose-600 transition-colors"
                strokeWidth={1.9}
              />
              <span>Secure Logout</span>
            </button>
          </div>
        </nav>

        {/* User Card at Bottom of Desktop Sidebar (Matches Screenshot) */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 min-w-0">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs shrink-0"
                />
              ) : (
                <div className={`w-9 h-9 rounded-full ${user.avatarColor || 'bg-[#00875A]'} text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0`}>
                  {user.initials}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-bold text-slate-900 text-xs truncate group-hover:text-blue-600 transition-colors">
                  {user.name}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {role === 'FIELD_INSPECTOR' ? 'Field Officer' : 'Command Director'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-[#F8FAFC]">

        {/* TOPBAR (Responsive for Mobile & Desktop) */}
        <header className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-6 z-10 bg-white border-b border-slate-200/80 shadow-2xs shrink-0 select-none">

          {/* Left: Mobile Brand & Dropdown / Desktop Title & Emblems */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Mobile View: Flag + Nigrani360 + compact region dropdown */}
            <div className="flex items-center gap-2 md:hidden">
              <NigraniLogo className="w-7 h-7 shrink-0 drop-shadow-xs" />
              <div>
                <h1 className="font-extrabold text-slate-900 tracking-tight text-[15px] leading-tight">
                  Nigrani360
                </h1>
                {/* Mobile Region Pill Dropdown */}
                <div className="relative inline-block">
                  <button
                    onClick={() => setGeoDropdownOpen(!geoDropdownOpen)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <span>{selectedGeo}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                  {geoDropdownOpen && (
                    <div className="fixed inset-x-4 top-16 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-2 text-xs">
                      <div className="px-4 py-1.5 font-bold text-slate-400 text-[10px] uppercase tracking-wider">Select Region</div>
                      {['Maharashtra West', 'Maharashtra East', 'Gujarat', 'Karnataka', 'Rajasthan', 'Uttar Pradesh', 'National'].map(g => (
                        <button 
                          key={g} 
                          onClick={() => { setSelectedGeo(g); setGeoDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2 hover:bg-blue-50 font-medium ${selectedGeo === g ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop View: Ashoka Emblem + Title + Selectors */}
            <div className="hidden md:flex items-center gap-3.5">
              <AshokaEmblem className="w-6 h-8 shrink-0" />
              <div className="h-5 w-[1px] bg-slate-200" />
              <h2 className="text-[15px] font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
                National Command Centre
              </h2>
              <div className="h-5 w-[1px] bg-slate-200" />

              {/* Geography Dropdown Pill */}
              <div className="relative">
                <button
                  onClick={() => { setGeoDropdownOpen(!geoDropdownOpen); setPeriodDropdownOpen(false); }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{selectedGeo}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {geoDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 py-1.5 text-xs">
                    {['Maharashtra West', 'Maharashtra East', 'Gujarat', 'Karnataka', 'Rajasthan', 'Uttar Pradesh', 'National'].map(g => (
                      <button 
                        key={g} 
                        onClick={() => { setSelectedGeo(g); setGeoDropdownOpen(false); }}
                        className="w-full text-left px-3.5 py-1.5 hover:bg-blue-50 text-slate-700 font-medium"
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date period Pill */}
              <div className="relative">
                <button
                  onClick={() => { setPeriodDropdownOpen(!periodDropdownOpen); setGeoDropdownOpen(false); }}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>{selectedPeriod}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {periodDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-36 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 py-1.5 text-xs">
                    {['Today', 'This Week', 'This Month', 'This Quarter', 'Year to Date'].map(p => (
                      <button key={p} onClick={() => { setSelectedPeriod(p); setPeriodDropdownOpen(false); }}
                        className="w-full text-left px-3.5 py-1.5 hover:bg-blue-50 text-slate-700 font-medium">{p}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* LIVE Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
                <span className="text-[11px] text-slate-400 hidden xl:inline">Last synced 12:49 IST</span>
              </div>
            </div>
          </div>

          {/* Right: Notifications & Profile / Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Notification Bell (Visible on both Mobile & Desktop) */}
            <button 
              onClick={() => navigate('/alerts')}
              className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors rounded-xl hover:bg-slate-100 cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Quick Logout Button */}
            <button 
              onClick={() => logout()}
              title="Secure Logout"
              className="flex p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors rounded-xl cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-slate-500 hover:text-rose-600" />
            </button>

            <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

            {/* User Profile Avatar Pill (Desktop) */}
            <div className="hidden md:flex items-center gap-2.5 pl-1 shrink-0">
              <div className="text-right whitespace-nowrap leading-tight">
                <div className="font-bold text-slate-900 text-xs tracking-tight whitespace-nowrap">{user.name}</div>
                <div className="text-[10px] text-slate-400 font-medium whitespace-nowrap mt-0.5">{user.subtitle}</div>
              </div>
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs shrink-0"
                />
              ) : (
                <div className={`w-9 h-9 rounded-full ${user.avatarColor || 'bg-[#00875A]'} text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0`}>
                  {user.initials}
                </div>
              )}
            </div>

            {/* Mobile Hamburger / Profile button to open Drawer */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full overflow-hidden ring-1.5 ring-slate-200 hover:ring-blue-500 transition-all cursor-pointer ml-1"
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full ${user.avatarColor || 'bg-[#00875A]'} text-white font-bold flex items-center justify-center text-[11px]`}>
                  {user.initials}
                </div>
              )}
            </button>
          </div>

        </header>

        {/* PAGE CONTENT ROUTED (Safe bottom padding on mobile for fixed bottom nav bar) */}
        <div className={`flex-1 ${location.pathname === '/map' ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden custom-scrollbar pb-24 md:pb-12'}`}>
          <Outlet />
        </div>

        {/* MOBILE FIXED BOTTOM NAVIGATION BAR */}
        <nav 
          aria-label="Mobile Navigation"
          className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)] min-h-[56px]"
        >
          {bottomNavTabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.isActive;

            if (tab.isButton) {
              return (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
                  className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer active:scale-95 ${
                    active ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <Icon 
                      className={`w-5 h-5 transition-transform ${active ? 'text-blue-600 scale-110' : 'text-slate-500'}`} 
                      strokeWidth={active ? 2.3 : 1.8} 
                    />
                    {active && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <span className={`text-[10px] mt-1 leading-none tracking-tight whitespace-nowrap transition-colors ${active ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
                    {tab.name}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={tab.id}
                to={tab.path}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <div
                  className={`flex flex-col items-center justify-center w-full py-1 transition-all active:scale-95 ${
                    active ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <Icon 
                      className={`w-5 h-5 transition-transform ${active ? 'text-blue-600 scale-110' : 'text-slate-500'}`} 
                      strokeWidth={active ? 2.3 : 1.8} 
                    />
                    {tab.badge && (
                      <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                    )}
                    {active && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <span className={`text-[10px] mt-1 leading-none tracking-tight whitespace-nowrap transition-colors ${active ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
                    {tab.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

      </main>

    </div>
  );
}


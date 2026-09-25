import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Map, FolderTree, ClipboardCheck, ListTodo, AlertTriangle, 
  Cctv, Video, Activity, HeadphonesIcon, IndianRupee, FileText, 
  Package, History, FileLineChart, ShieldAlert, Settings, Users, 
  Globe, Sliders, Server, LogOut, Bell, Search, Calendar, ChevronDown 
} from 'lucide-react';

export default function DashboardLayout() {
  const location = useLocation();

  const sidebarGroups = [
    {
      title: 'OPERATIONS',
      items: [
        { name: 'Command Centre', path: '/overview', icon: LayoutDashboard },
        { name: 'Regional Map', path: '/map', icon: Map },
        { name: 'Projects & Centres', path: '/projects', icon: FolderTree },
        { name: 'Inspections', path: '/inspections', icon: ClipboardCheck },
        { name: 'Assignments', path: '/assignments', icon: ListTodo },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { name: 'Risk & Alerts', path: '/alerts', icon: AlertTriangle },
        { name: 'CCTV Command', path: '/cctv', icon: Cctv },
        { name: 'Video Verification', path: '/verification', icon: Video },
        { name: 'Beneficiary Signals', path: '/beneficiaries', icon: Activity },
        { name: 'Seva-Samadhan', path: '/complaints', icon: HeadphonesIcon },
      ]
    },
    {
      title: 'COMPLIANCE',
      items: [
        { name: 'FundTrace', path: '/fundtrace', icon: IndianRupee },
        { name: 'SakshyaChain', path: '/sakshyachain', icon: FileText },
        { name: 'Assets & Stock', path: '/assets', icon: Package },
        { name: 'Corrective Actions', path: '/corrective-action', icon: History },
        { name: 'Reports & Audit', path: '/reports', icon: FileLineChart },
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { name: 'Users & Roles', path: '/users', icon: Users },
        { name: 'Geography', path: '/geography', icon: Globe },
        { name: 'Rules & Thresholds', path: '/rules', icon: Sliders },
        { name: 'Demo Control Centre', path: '/demo', icon: Sliders },
        { name: 'System Health', path: '/health', icon: Server },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[var(--color-off-white)] overflow-hidden text-[var(--color-charcoal)] font-sans antialiased selection:bg-blue-100">
      
      {/* Premium Sidebar */}
      <aside className="w-64 bg-[#0B0F19] text-gray-300 flex flex-col z-20 border-r border-gray-800 shrink-0">
        <div className="p-5 flex items-start gap-4 border-b border-gray-800/50">
          <div className="w-8 h-8 rounded bg-white flex flex-col overflow-hidden relative flex-shrink-0 shadow-sm mt-0.5">
             <div className="h-1/3 bg-[#FF9933]"></div>
             <div className="h-1/3 bg-white flex items-center justify-center">
               <div className="w-2 h-2 rounded-full border-[1.5px] border-blue-900 opacity-90"></div>
             </div>
             <div className="h-1/3 bg-[#138808]"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-white tracking-tight text-lg leading-none mb-1">Nigrani360</h1>
            <p className="text-[9px] text-gray-400 font-medium uppercase tracking-[0.15em] leading-tight">
              Govt. of India<br/>MoSJE
            </p>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-3 custom-scrollbar">
          {sidebarGroups.map((group, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="px-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{group.title}</h3>
              <ul className="space-y-0.5 px-3">
                {group.items.map((item) => {
                  const isActive = location.pathname.includes(item.path) || (location.pathname === '/' && item.path === '/overview');
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                          isActive 
                            ? 'bg-blue-500/15 text-blue-400' 
                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                        }`}
                      >
                        <item.icon className={`w-[16px] h-[16px] ${isActive ? 'opacity-100' : 'opacity-70'}`} strokeWidth={isActive ? 2.5 : 2} />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-800/50 bg-[#070A11]">
          <Link to="/login" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
            <LogOut className="w-[16px] h-[16px] opacity-70" strokeWidth={2} />
            Secure Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-[#F4F6F8]">
        {/* Premium Topbar */}
        <header className="h-14 flex items-center justify-between px-6 z-10 bg-white border-b border-gray-200 shadow-sm shrink-0">
          
          <div className="flex items-center gap-4">
            <h2 className="text-[15px] font-bold tracking-tight text-gray-900 flex items-center gap-2">
              National Command Centre
            </h2>
            <div className="h-4 w-[1px] bg-gray-300"></div>
            
            <button className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <Globe className="w-3.5 h-3.5 text-blue-600" /> Geography: National <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
            <button className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <Calendar className="w-3.5 h-3.5 text-blue-600" /> This Month <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 mr-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-md border border-green-200 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                LIVE
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-200 uppercase tracking-wider">
                SYSTEM NORMAL
              </span>
            </div>

            <button onClick={() => alert('Search Intelligence module')} className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md text-xs font-medium">
              <Search className="w-3.5 h-3.5" /> <span>Search</span> <kbd className="font-mono text-[9px] bg-white border border-gray-200 px-1 py-0.5 rounded text-gray-400">⌘K</kbd>
            </button>
            
            <button onClick={() => alert('Notifications')} className="relative text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="h-6 w-[1px] bg-gray-200"></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-[13px] font-semibold text-gray-900 leading-none">Arjun Mehta</p>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-medium">Joint Director, PMU</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-blue-900 text-white flex items-center justify-center font-bold text-xs shadow-sm border border-blue-900/10">
                AM
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1f2937;
          border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #374151;
        }
      `}</style>
    </div>
  );
}

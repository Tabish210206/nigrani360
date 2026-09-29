import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, ArrowRight, X, Check,
  Landmark, HardHat, Users, Mail, Lock, Eye, EyeOff,
  BarChart2, RefreshCw
} from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';
import { AshokaEmblem, IndianFlagBadge } from '../components/GovernmentEmblems';

interface RoleOption {
  role: UserRole;
  label: string;
  subtitle: string;
  badgeId: string;
  defaultEmail: string;
  icon: typeof Landmark;
  iconBg: string;
  iconColor: string;
  accentBg: string;
  accentBorder: string;
  buttonText: string;
  description: string;
}

const ROLES: RoleOption[] = [
  {
    role: 'PMU_DIRECTOR',
    label: 'PMU Director',
    subtitle: 'National Command Centre',
    badgeId: 'GOI-PMU-8801',
    defaultEmail: 'director.pmu@nigrani360.gov.in',
    icon: Landmark,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    accentBg: 'bg-blue-600 hover:bg-blue-700',
    accentBorder: 'border-blue-200 ring-blue-500/20',
    buttonText: 'Continue to Command Centre',
    description: 'Full strategic oversight of nationwide PM-AJAY & grant utilization, live CCTV telemetrics, regional command, and statutory audit compliance.'
  },
  {
    role: 'FIELD_INSPECTOR',
    label: 'Field Inspector',
    subtitle: 'Mobile Operations',
    badgeId: 'INS-MH-2026',
    defaultEmail: 'officer.sharma@nigrani360.gov.in',
    icon: HardHat,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    accentBg: 'bg-emerald-600 hover:bg-emerald-700',
    accentBorder: 'border-emerald-200 ring-emerald-500/20',
    buttonText: 'Continue to Field Portal',
    description: 'Execution of geotagged ground inspections, offline evidence capture, discrepancy logging, and rapid site verification.'
  },
  {
    role: 'NGO_INSTITUTE',
    label: 'NGO / Institute',
    subtitle: 'Restricted Oversight',
    badgeId: 'NGO-MH-042',
    defaultEmail: 'admin.sahyog@nigrani360.gov.in',
    icon: Users,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    accentBg: 'bg-purple-600 hover:bg-purple-700',
    accentBorder: 'border-purple-200 ring-purple-500/20',
    buttonText: 'Continue to NGO Portal',
    description: 'Single-institution portal for GFR 12-A Utilization Certificates, CCTV camera health, compliance notices, and resolution workflows.'
  }
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const activeRole = ROLES[selectedRoleIndex];

  const [email, setEmail] = useState(activeRole.defaultEmail);
  const [password, setPassword] = useState('GovPass@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSelect = (index: number) => {
    setSelectedRoleIndex(index);
    setEmail(ROLES[index].defaultEmail);
    setRoleModalOpen(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your Officer ID or Email');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your Password / PIN');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      login(activeRole.role);
      const role = activeRole.role;
      if (role === 'PMU_DIRECTOR') navigate('/overview', { replace: true });
      else if (role === 'FIELD_INSPECTOR') navigate('/inspections', { replace: true });
      else if (role === 'NGO_INSTITUTE') navigate('/ngo-portal', { replace: true });
    }, 400);
  };

  const ActiveIcon = activeRole.icon;

  return (
    <div className="min-h-screen w-full bg-[#F4F7FB] flex flex-col justify-between font-sans select-none relative overflow-y-auto overflow-x-hidden">
      
      {/* Soft Ambient Blurred Light Orbs */}
      <div className="fixed -top-20 -left-20 w-[45vw] max-w-[450px] h-[45vw] max-h-[450px] rounded-full bg-blue-400/20 blur-[100px] pointer-events-none" />
      <div className="fixed -bottom-20 -right-20 w-[45vw] max-w-[450px] h-[45vw] max-h-[450px] rounded-full bg-amber-400/18 blur-[110px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[35vw] max-w-[380px] h-[35vw] max-h-[380px] rounded-full bg-emerald-400/12 blur-[90px] pointer-events-none" />

      {/* Subtle India Map Watermark with Glowing Radar Nodes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[850px] lg:w-[1000px] h-auto text-blue-100/50"
          viewBox="0 0 800 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized geometric India outline contour */}
          <path
            d="M390 120 C420 140 440 180 430 210 C450 220 520 230 550 250 C580 270 630 300 660 350 C620 370 590 410 560 440 C550 500 520 560 480 620 C450 670 420 730 400 780 C380 730 350 670 320 620 C280 560 250 500 240 440 C210 410 180 370 140 350 C170 300 220 270 250 250 C280 230 350 220 370 210 Z"
            fill="currentColor"
            fillOpacity="0.45"
            stroke="#93C5FD"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {/* Dotted Connection Lines */}
          <line x1="380" y1="280" x2="490" y2="380" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="490" y1="380" x2="330" y2="460" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="330" y1="460" x2="410" y2="580" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="490" y1="380" x2="440" y2="450" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* Interactive Radar Pins */}
          <circle cx="380" cy="280" r="14" fill="#10B981" fillOpacity="0.15" />
          <circle cx="380" cy="280" r="5.5" fill="#10B981" />
          <circle cx="380" cy="280" r="2.5" fill="white" />

          <circle cx="490" cy="380" r="16" fill="#F59E0B" fillOpacity="0.15" />
          <circle cx="490" cy="380" r="5.5" fill="#F59E0B" />
          <circle cx="490" cy="380" r="2.5" fill="white" />

          <circle cx="330" cy="460" r="20" fill="#EF4444" fillOpacity="0.18" />
          <circle cx="330" cy="460" r="6.5" fill="#EF4444" />
          <circle cx="330" cy="460" r="3" fill="white" />

          <circle cx="440" cy="450" r="14" fill="#3B82F6" fillOpacity="0.15" />
          <circle cx="440" cy="450" r="5" fill="#3B82F6" />
          <circle cx="440" cy="450" r="2" fill="white" />

          <circle cx="410" cy="580" r="16" fill="#10B981" fillOpacity="0.15" />
          <circle cx="410" cy="580" r="5.5" fill="#10B981" />
          <circle cx="410" cy="580" r="2.5" fill="white" />
        </svg>
      </div>

      {/* Frosted Glass Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 backdrop-blur-[2px]" />

      {/* Main Container - Fully Responsive (Mobile -> Tablet -> Desktop) */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full my-auto">
          
          {/* Left Column / Brand Info (Hidden on very small screens, visible on md/lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 md:space-y-6">
            
            {/* Government Emblem Header */}
            <div className="flex items-center gap-3">
              <AshokaEmblem className="w-6 h-8 sm:w-7 sm:h-9 text-slate-800 shrink-0" />
              <div className="h-7 w-[1px] bg-slate-300" />
              <IndianFlagBadge className="w-5 h-3.5 sm:w-6 sm:h-4 shrink-0 shadow-2xs" />
              <div>
                <p className="text-[11px] sm:text-xs font-black tracking-widest text-slate-900 uppercase leading-tight">
                  Government of India
                </p>
                <p className="text-[9.5px] sm:text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                  Ministry of Social Justice & Empowerment
                </p>
              </div>
            </div>

            {/* Main Brand Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">
                <span>Nigrani</span>
                <span className="text-blue-600">360</span>
              </h1>
              <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-800 tracking-tight mb-2">
                National Monitoring & Inspection Command Centre
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg leading-relaxed">
                Unified real-time monitoring, geotagged inspection oversight, and statutory compliance for a transparent and accountable nation.
              </p>
            </div>

            {/* 3 Core Value Props - Responsive Grid on Tablet / Stack on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 max-w-xl">
              <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/80 backdrop-blur-xs border border-white/70 shadow-2xs">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                  <BarChart2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">Real-time Monitoring</h4>
                  <p className="text-[10.5px] text-slate-500 font-medium">Live CCTV & facility telemetrics</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/80 backdrop-blur-xs border border-white/70 shadow-2xs">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">Inspection Oversight</h4>
                  <p className="text-[10.5px] text-slate-500 font-medium">Geotagged verified field logs</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/80 backdrop-blur-xs border border-white/70 shadow-2xs">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-xs">
                  <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">Collaborative Governance</h4>
                  <p className="text-[10.5px] text-slate-500 font-medium">PMU, Field & NGO portal in one</p>
                </div>
              </div>
            </div>

            {/* Landscape Illustration on Desktop / Tablets */}
            <div className="hidden sm:block relative w-full max-w-lg h-20 sm:h-24 overflow-hidden rounded-xl border border-slate-200/50 shadow-2xs">
              <img
                src="/rashtrapati_bhavan_footer.jpg"
                alt="Government of India Illustration"
                className="w-full h-full object-cover object-bottom [mask-image:linear-gradient(to_bottom,transparent,black_20%,black)]"
              />
            </div>

          </div>

          {/* Right Column / Login Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/90 ring-1 ring-slate-900/5 relative">
              
              {/* Card Header */}
              <div className="flex flex-col items-center text-center mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 shadow-xs border border-blue-100">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Secure Officer Access
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Sign in with authorized credentials
                </p>
              </div>

              {/* Active Role Selector Strip */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
                <div className="min-w-0 pr-2">
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight truncate">
                    {activeRole.label}
                  </div>
                  <div className="text-[10.5px] text-slate-500 font-medium mt-0.5 truncate">
                    {activeRole.subtitle}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRoleModalOpen(true)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Switch Role</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                {errorMessage && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Officer ID or Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Enter email / ID"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Password / Security PIN
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => alert('For security PIN resets, please contact your state Nodal Officer or PMU Administrator.')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Forgot credentials?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{activeRole.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Secure network indicator */}
                <div className="flex items-center justify-center gap-1.5 pt-1 text-xs font-semibold text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>End-to-end encrypted • Government of India</span>
                </div>
              </form>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-400 font-medium">
                <AshokaEmblem className="w-3 h-4 text-slate-400 shrink-0" />
                <span>Ministry of Social Justice & Empowerment</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Role Selection Modal */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            onClick={() => setRoleModalOpen(false)} 
            className="absolute inset-0"
          />
          
          <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-5 sm:p-6 z-10 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Select User Role
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Choose your designated authorization level
                </p>
              </div>
              <button
                onClick={() => setRoleModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 pt-1">
              {ROLES.map((roleOpt, idx) => {
                const Icon = roleOpt.icon;
                const isSelected = idx === selectedRoleIndex;

                return (
                  <button
                    key={roleOpt.label}
                    onClick={() => handleRoleSelect(idx)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-50/60 border-blue-400 ring-2 ring-blue-500/20 shadow-xs' 
                        : 'bg-white hover:bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl ${roleOpt.iconBg} ${roleOpt.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-slate-900 text-sm">
                            {roleOpt.label}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-500 font-bold px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                            {roleOpt.badgeId}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-blue-600 mt-0.5">
                          {roleOpt.subtitle}
                        </p>
                        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                          {roleOpt.description}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

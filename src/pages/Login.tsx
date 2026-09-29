import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, BarChart3, ShieldCheck, Users, Landmark, 
  HardHat, ArrowRight, ArrowLeft, HelpCircle, X, CheckCircle2,
  Lock, Mail, Eye, EyeOff, KeyRound, Loader2
} from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';
import { AshokaEmblem, IndianFlagBadge, NigraniLogo } from '../components/GovernmentEmblems';

interface RoleOption {
  role: UserRole;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  activeColor: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  description: string;
  defaultEmail: string;
  badgeId: string;
  permissions: string[];
  checklist: string[];
}

const ROLES: RoleOption[] = [
  {
    role: 'PMU_DIRECTOR',
    label: 'PMU Director',
    subtitle: 'National Command Centre',
    icon: <Landmark className="w-5 h-5 text-blue-600" />,
    activeColor: 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500/20',
    iconBg: 'bg-blue-100/70',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    defaultEmail: 'director.pmu@nigrani360.gov.in',
    badgeId: 'GOI-PMU-8801',
    description: 'Full strategic oversight of nationwide PM-AJAY & grant utilization, live CCTV telemetrics, regional command, and statutory audit compliance.',
    permissions: ['National Overview', 'Live CCTV Grid', 'Regional Telemetry Map', 'Risk Intelligence AI', 'Statutory Reports', 'Admin Controls'],
    checklist: [
      'Full access to national monitoring',
      'View all projects and sites',
      'Inspection reports and analytics',
      'Manage field operations'
    ]
  },
  {
    role: 'FIELD_INSPECTOR',
    label: 'Field Inspector',
    subtitle: 'Mobile Operations',
    icon: <HardHat className="w-5 h-5 text-emerald-600" />,
    activeColor: 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/20',
    iconBg: 'bg-emerald-100/70',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    defaultEmail: 'officer.sharma@nigrani360.gov.in',
    badgeId: 'INS-MH-2026',
    description: 'Execution of geotagged ground inspections, offline evidence capture, discrepancy logging, and rapid site verification.',
    permissions: ['Assigned Inspections', 'Offline Sync Mode', 'Geotagged Photo Upload', 'CCTV Live View', 'Incident Logging'],
    checklist: [
      'Assigned geotagged site inspections',
      'Offline sync mode & checklists',
      'Live photo & evidence capture',
      'Direct escalation to PMU Command'
    ]
  },
  {
    role: 'NGO_INSTITUTE',
    label: 'NGO / Institute',
    subtitle: 'Restricted Oversight',
    icon: <Users className="w-5 h-5 text-purple-600" />,
    activeColor: 'border-purple-500 bg-purple-50/40 ring-1 ring-purple-500/20',
    iconBg: 'bg-purple-100/70',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    defaultEmail: 'admin.sahyog@nigrani360.gov.in',
    badgeId: 'NGO-MH-042',
    description: 'Single-institution portal for GFR 12-A Utilization Certificates, CCTV camera health, compliance notices, and resolution workflows.',
    permissions: ['Institution Dashboard', 'GFR 12-A Submission', 'Camera Status', 'Audit Notice Responses', 'Fund Milestone History'],
    checklist: [
      'Single-institution facility oversight',
      'GFR 12-A compliance submission',
      'Live CCTV status & camera telemetry',
      'Grievance & audit responses'
    ]
  }
];

/**
 * Tricolor wave footer matching Phone 2 design
 */
const TricolorWaveFooter: React.FC = () => (
  <div className="relative w-full overflow-hidden select-none pointer-events-none mt-auto pt-4">
    <svg viewBox="0 0 400 90" className="w-full h-20" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveSaffron" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFA048" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FB923C" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="waveGreen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Saffron Ribbon Wave */}
      <path d="M0,45 C100,15 220,70 400,30 L400,90 L0,90 Z" fill="url(#waveSaffron)" />
      {/* Green Ribbon Wave */}
      <path d="M0,60 C140,30 260,80 400,50 L400,90 L0,90 Z" fill="url(#waveGreen)" />
    </svg>
    <div className="absolute inset-x-0 bottom-2 text-center">
      <p className="text-[10px] font-semibold text-slate-500">Nigrani360 v1.0.0</p>
      <p className="text-[9px] font-medium text-slate-400">Government of India</p>
    </div>
  </div>
);

/**
 * City Skyline & Trees illustration for bottom of Phone 1
 */
const CitySkylineGraphic: React.FC = () => (
  <div className="relative w-full h-20 sm:h-24 overflow-hidden pointer-events-none select-none flex items-end justify-center">
    <svg viewBox="0 0 500 130" className="w-full h-full opacity-40" fill="none" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64748B" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="treesGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Buildings */}
      <rect x="25" y="70" width="35" height="60" fill="url(#skylineGrad)" rx="2" />
      <rect x="70" y="52" width="40" height="78" fill="url(#skylineGrad)" rx="2" />
      <rect x="120" y="65" width="32" height="65" fill="url(#skylineGrad)" rx="2" />
      
      {/* Central Rashtrapati / Secretariat Dome */}
      <path d="M210 130 L210 75 Q210 50 250 40 Q290 50 290 75 L290 130 Z" fill="url(#skylineGrad)" />
      <circle cx="250" cy="38" r="4" fill="#64748B" />
      <line x1="250" y1="24" x2="250" y2="35" stroke="#64748B" strokeWidth="2" />
      
      {/* Right buildings */}
      <rect x="345" y="60" width="35" height="70" fill="url(#skylineGrad)" rx="2" />
      <rect x="390" y="45" width="40" height="85" fill="url(#skylineGrad)" rx="2" />
      <rect x="440" y="68" width="45" height="62" fill="url(#skylineGrad)" rx="2" />

      {/* Foreground lush trees */}
      <circle cx="15" cy="115" r="24" fill="url(#treesGrad)" />
      <circle cx="45" cy="118" r="22" fill="url(#treesGrad)" />
      <circle cx="170" cy="120" r="20" fill="url(#treesGrad)" />
      <circle cx="195" cy="116" r="24" fill="url(#treesGrad)" />
      <circle cx="305" cy="116" r="24" fill="url(#treesGrad)" />
      <circle cx="330" cy="120" r="20" fill="url(#treesGrad)" />
      <circle cx="480" cy="116" r="26" fill="url(#treesGrad)" />
    </svg>
    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent" />
  </div>
);

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Mobile step state: 'welcome' or 'roles'
  const [mobileStep, setMobileStep] = useState<'welcome' | 'roles'>('roles');
  // Selected role for expansion
  const [expandedRole, setExpandedRole] = useState<UserRole | null>(null);
  
  // Desktop selection state
  const [desktopRole, setDesktopRole] = useState<UserRole>('PMU_DIRECTOR');

  // Credentials State
  const [email, setEmail] = useState('director.pmu@nigrani360.gov.in');
  const [password, setPassword] = useState('GovPass@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Modals
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setDesktopRole(role);
    const roleConfig = ROLES.find(r => r.role === role);
    if (roleConfig) {
      setEmail(roleConfig.defaultEmail);
    }
    setPassword('GovPass@2026');
    setLoginError('');
  };

  const handleMobileRoleExpand = (role: UserRole) => {
    setExpandedRole(role);
    const roleConfig = ROLES.find(r => r.role === role);
    if (roleConfig) {
      setEmail(roleConfig.defaultEmail);
    }
    setPassword('GovPass@2026');
    setLoginError('');
  };

  const handleLoginSubmit = (role: UserRole) => {
    if (!email.trim()) {
      setLoginError('Please enter your Officer ID / Email');
      return;
    }
    if (!password.trim()) {
      setLoginError('Please enter your Security Password / PIN');
      return;
    }

    setIsLoggingIn(true);
    setLoginError('');

    setTimeout(() => {
      login(role);
      if (role === 'PMU_DIRECTOR') navigate('/overview');
      else if (role === 'FIELD_INSPECTOR') navigate('/inspections');
      else if (role === 'NGO_INSTITUTE') navigate('/ngo-portal');
    }, 500);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-[#F8FAFC] overflow-x-hidden font-sans select-none">
      
      {/* Background Ambience: Subtle Radial Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-slate-100/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-50/60 rounded-full blur-3xl" />
      </div>

      {/* ======================================================== */}
      {/* MOBILE EXPERIENCE (Strictly matching user's 3 phone mockups) */}
      {/* ======================================================== */}
      <div className="md:hidden w-full min-h-[100dvh] flex flex-col bg-[#F8FAFC] relative z-10">

        {/* ---------------------------------------------------- */}
        {/* PHONE 1: Welcome & Overview Screen                   */}
        {/* ---------------------------------------------------- */}
        {false && (
          <div className="w-full h-[100dvh] flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              
              {/* Top Crest: Ashoka Lion Capital + Flag */}
              <div className="pt-4 pb-1 px-5 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-1">
                  <AshokaEmblem className="w-5 h-7 text-slate-800 shrink-0" />
                  <IndianFlagBadge className="w-5 h-4 shrink-0 shadow-2xs" />
                </div>
                <p className="text-[9px] font-black tracking-widest text-slate-900 uppercase">
                  Government of India
                </p>
                <p className="text-[8px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                  Ministry of Social Justice & Empowerment
                </p>

                {/* Main Centered Title */}
                <h1 className="font-display text-3xl font-black text-slate-900 tracking-tight mt-2.5 mb-1">
                  <span>Nigrani</span>
                  <span className="text-blue-600">360</span>
                </h1>
                <h2 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug max-w-xs">
                  National Monitoring & Inspection Command Centre
                </h2>
                <p className="text-[11px] text-slate-500 font-medium max-w-xs leading-tight mt-1">
                  Unified monitoring, inspection and compliance for a safer, stronger nation.
                </p>
              </div>

              {/* 3 Feature Cards */}
              <div className="px-5 space-y-2 z-10">
                {/* Prop 1 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">Real-time Monitoring</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Track facilities and field operations</p>
                  </div>
                </div>

                {/* Prop 2 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">Inspection Oversight</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Ensure compliance and accountability</p>
                  </div>
                </div>

                {/* Prop 3 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 shadow-2xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">Collaborative Governance</h4>
                    <p className="text-[10px] text-slate-500 font-medium">PMU, Field and NGO access in one platform</p>
                  </div>
                </div>
              </div>

              {/* City skyline at the bottom */}
              <div className="relative w-full overflow-hidden mt-auto">
                <CitySkylineGraphic />
              </div>
            </div>

            {/* Bottom Floating CTA Button */}
            <div className="p-2 bg-white/90 backdrop-blur-xs border-t border-slate-100 z-20">
              <button
                onClick={() => setMobileStep('roles')}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Choose Operational Role</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* PHONE 2 & 3: Role Selection / Expanded Role Screen   */}
        {/* ---------------------------------------------------- */}
        {mobileStep === 'roles' && (
          <div className="w-full min-h-[100dvh] flex flex-col justify-between bg-white animate-in fade-in duration-200">
            
            {/* Top Header Bar */}
            <header className="h-11 px-3 flex items-center justify-between bg-white border-b border-slate-100 shrink-0 select-none z-10 sticky top-0">
              <div className="flex items-center gap-2">
                {/* Back Arrow Button (Only shown when a role is expanded) */}
                {expandedRole && (
                  <button
                    onClick={() => setExpandedRole(null)}
                    className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer active:scale-95"
                    aria-label="Back to roles"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                
                {/* Brand Logo & Name */}
                <div className="flex items-center gap-1.5">
                  <IndianFlagBadge className="w-4 h-3.5 shrink-0 shadow-2xs" />
                  <span className="font-extrabold text-sm text-slate-900 tracking-tight">
                    Nigrani<span className="text-blue-600">360</span>
                  </span>
                </div>
              </div>

              {/* Help Button in Circle */}
              <button
                onClick={() => setShowHelpModal(true)}
                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 cursor-pointer transition-colors active:scale-95"
                aria-label="Help"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col px-4 pt-3 pb-2">
              
              {/* Shield & Title (Only shown when no role is expanded) */}
              {!expandedRole && (
                <div className="flex flex-col items-center text-center my-2 animate-in fade-in duration-200">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm mb-2">
                    <Shield className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <h3 className="font-display text-lg font-black text-slate-900 tracking-tight">
                    Secure Access
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Choose your operational role to continue
                  </p>
                </div>
              )}

              {/* Role Cards List */}
              <div className="space-y-2 mt-1">
                {ROLES.map((roleItem) => {
                  const isCurrentExpanded = expandedRole === roleItem.role;

                  // PHONE 3: The Active Expanded Card with Credentials Form
                  if (isCurrentExpanded) {
                    return (
                      <form
                        key={roleItem.role}
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleLoginSubmit(roleItem.role);
                        }}
                        className="w-full p-3.5 rounded-2xl border-2 border-blue-500 bg-white shadow-md space-y-3 animate-in fade-in zoom-in-95 duration-200"
                      >
                        {/* Header */}
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${roleItem.iconBg} ${roleItem.iconColor}`}>
                            {roleItem.icon}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                              {roleItem.label}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                              {roleItem.subtitle} · <span className="font-mono text-[10px] text-blue-600 font-bold">{roleItem.badgeId}</span>
                            </p>
                          </div>
                        </div>

                        {/* Credentials Inputs */}
                        <div className="space-y-2 pt-1">
                          {/* Officer ID / Email */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                              Officer ID / Email
                            </label>
                            <div className="relative flex items-center">
                              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                              <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@nigrani360.gov.in"
                                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                              />
                            </div>
                          </div>

                          {/* Security Password / PIN */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                              Password / Security PIN
                            </label>
                            <div className="relative flex items-center">
                              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Security Password"
                                className="w-full pl-8 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                              >
                                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          {/* Error message */}
                          {loginError && (
                            <p className="text-[10px] text-rose-600 font-bold bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-md">
                              ⚠ {loginError}
                            </p>
                          )}
                        </div>

                        {/* Primary Sign In Button */}
                        <button
                          type="submit"
                          disabled={isLoggingIn}
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2 disabled:opacity-75"
                        >
                          {isLoggingIn ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Authenticating...</span>
                            </>
                          ) : (
                            <>
                              <span>Sign In as {roleItem.label}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </form>
                    );
                  }

                  // Collapsed Card
                  return (
                    <button
                      key={roleItem.role}
                      type="button"
                      onClick={() => handleMobileRoleExpand(roleItem.role)}
                      className="w-full p-3 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-xs active:scale-[0.99] transition-all flex items-center justify-between group cursor-pointer text-left shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${roleItem.iconBg} ${roleItem.iconColor}`}>
                          {roleItem.icon}
                        </div>
                        <div className="truncate">
                          <span className="block font-bold text-sm text-slate-900">
                            {roleItem.label}
                          </span>
                          <span className="block text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                            {roleItem.subtitle}
                          </span>
                        </div>
                      </div>
                      <div className="pl-2 shrink-0">
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                          expandedRole ? 'text-slate-400' : 'text-blue-600'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Need help? View access permissions (Shown on Phone 2) */}
              {!expandedRole && (
                <div className="flex items-center justify-between text-[11px] px-1 mt-3 mb-2">
                  <button 
                    onClick={() => setShowHelpModal(true)}
                    className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Need help?</span>
                  </button>

                  <button 
                    onClick={() => setShowPermissionsModal(true)}
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View access permissions</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Tricolor Wave Footer (Shown on Phone 2) */}
            {!expandedRole && <TricolorWaveFooter />}
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* DESKTOP EXPERIENCE (Screens >= md)                       */}
      {/* ======================================================== */}
      <div className="hidden md:flex relative z-10 w-full max-w-6xl mx-auto px-6 py-4 md:py-6 lg:py-8 items-center justify-between gap-6 lg:gap-12">
        
        {/* LEFT COLUMN: Official Branding, Title, Tagline & Value Props */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
          
          {/* Government of India Crest + Flag Badge */}
          <div className="flex items-center gap-3.5">
            <AshokaEmblem className="w-7 h-9 text-slate-800 shrink-0" />
            <IndianFlagBadge className="w-6 h-5 shrink-0 shadow-xs" />
            <div className="border-l border-slate-200 pl-3">
              <p className="text-[11px] font-black tracking-widest text-slate-900 uppercase">
                Government of India
              </p>
              <p className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                Ministry of Social Justice & Empowerment
              </p>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-3 sm:gap-4">
              <NigraniLogo className="w-11 h-11 sm:w-13 sm:h-13 shrink-0 drop-shadow-md" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight flex items-baseline">
                <span>Nigrani</span>
                <span className="text-blue-600">360</span>
              </h1>
            </div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-800 tracking-tight leading-snug">
              National Monitoring & Inspection Command Centre
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md leading-relaxed">
              Unified monitoring, inspection and compliance for a safer, stronger nation.
            </p>
          </div>

          {/* 3 Value Propositions */}
          <div className="space-y-2.5 pt-1">
            
            {/* Prop 1 */}
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm transition-transform group-hover:scale-105">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                  Real-time Monitoring
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Track facilities and field operations
                </p>
              </div>
            </div>

            {/* Prop 2 */}
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm transition-transform group-hover:scale-105">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                  Inspection Oversight
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Ensure compliance and accountability
                </p>
              </div>
            </div>

            {/* Prop 3 */}
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 shadow-sm transition-transform group-hover:scale-105">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                  Collaborative Governance
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  PMU, Field and NGO access in one platform
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: The Clean, Floating "Secure Access" Role Selection Card */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="w-full max-w-[440px] bg-white rounded-[28px] shadow-2xl shadow-slate-200/80 border border-slate-200/90 p-5 sm:p-7 flex flex-col transition-all">
            
            {/* Top Shield Emblem */}
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50/80 border border-blue-100/90 flex items-center justify-center text-blue-600 shadow-inner">
                <Shield className="w-6 h-6 stroke-[1.8]" />
              </div>
            </div>

            {/* Card Titles */}
            <div className="text-center mb-4">
              <h3 className="font-display text-2xl font-black text-slate-900 tracking-tight">
                Secure Access
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Choose your operational role to continue
              </p>
            </div>

            {/* 3 Interactive Role Selection Buttons */}
            <div className="space-y-2.5">
              {ROLES.map((roleItem) => {
                const isSelected = desktopRole === roleItem.role;

                return (
                  <div
                    key={roleItem.role}
                    className={`w-full rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isSelected 
                        ? 'border-blue-500 bg-white ring-2 ring-blue-500/20 shadow-md' 
                        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => handleRoleChange(roleItem.role)}
                      className="w-full p-3 flex items-center justify-between group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${roleItem.iconBg} ${roleItem.iconColor}`}>
                          {roleItem.icon}
                        </div>
                        <div className="truncate">
                          <span className="block font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                            {roleItem.label}
                          </span>
                          <span className="block text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                            {roleItem.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="pl-2 shrink-0">
                        <ArrowRight className={`w-4 h-4 transition-all duration-200 ${
                          isSelected 
                            ? 'text-blue-600 translate-x-0.5' 
                            : 'text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5'
                        }`} />
                      </div>
                    </button>

                    {/* Desktop Expanded Credentials Form and Action Button */}
                    {isSelected && (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleLoginSubmit(roleItem.role);
                        }}
                        className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3"
                      >
                        {/* Credentials inputs */}
                        <div className="space-y-2.5">
                          {/* Officer ID / Email */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                              Officer ID / Email
                            </label>
                            <div className="relative flex items-center">
                              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                              <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@nigrani360.gov.in"
                                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                              />
                            </div>
                          </div>

                          {/* Password */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                                Password / PIN
                              </label>
                              <span className="text-[10px] font-mono text-blue-600 font-bold">{roleItem.badgeId}</span>
                            </div>
                            <div className="relative flex items-center">
                              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Security Password"
                                className="w-full pl-8 pr-8 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                              >
                                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          {loginError && (
                            <p className="text-[10px] text-rose-600 font-bold bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-md">
                              ⚠ {loginError}
                            </p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isLoggingIn}
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
                        >
                          {isLoggingIn ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Authenticating...</span>
                            </>
                          ) : (
                            <>
                              <span>Sign In as {roleItem.label}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Card Footer Links */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button 
                onClick={() => setShowHelpModal(true)}
                className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Need help?</span>
              </button>

              <button 
                onClick={() => setShowPermissionsModal(true)}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View access permissions</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Permissions Modal */}
      {showPermissionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-slate-900 text-base">Operational Clearance Matrix</h3>
              </div>
              <button 
                onClick={() => setShowPermissionsModal(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              {ROLES.map((role) => (
                <div key={role.role} className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/50">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="font-extrabold text-sm text-slate-900">{role.label}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {role.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2 leading-relaxed">{role.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.permissions.map(perm => (
                      <span key={perm} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 shadow-2xs">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button 
                onClick={() => setShowPermissionsModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-slate-900 text-base">Command Centre Helpdesk</h3>
              </div>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p>
                <strong>Nigrani360</strong> is an authorized platform administered under the 
                <strong> Ministry of Social Justice & Empowerment</strong>.
              </p>
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1.5 text-blue-900">
                <p className="font-bold text-[11px]">Direct Support Channels:</p>
                <p>• PMU Operations Desk: <span className="font-mono font-semibold">support-pmu@nigrani360.gov.in</span></p>
                <p>• NIC Technical Helpline: <span className="font-mono font-semibold">1800-11-2026 (Toll Free)</span></p>
              </div>
              <p className="text-[11px] text-slate-400">
                For role delegation or SSO credentials, contact your state nodal officer.
              </p>
            </div>

            <div className="pt-2 text-right">
              <button 
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

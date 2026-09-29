import React, { useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Lock, Mail, Eye, EyeOff,
  Loader2, Shield, Landmark, HardHat, Users
} from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';
import { IndianFlagBadge, AshokaEmblem } from '../components/GovernmentEmblems';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Role configuration                                                   */
/* ------------------------------------------------------------------ */
interface RoleConfig {
  role: UserRole;
  label: string;
  subtitle: string;
  badgeId: string;
  defaultEmail: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  accentColor: string;        // Tailwind color name for gradient
  accentClass: string;        // button bg class
  accentHoverClass: string;   // button hover bg class
  ringClass: string;
  badgeClass: string;
  checklist: string[];
}

const ROLE_CONFIGS: Record<string, RoleConfig> = {
  pmu_director: {
    role: 'PMU_DIRECTOR',
    label: 'PMU Director',
    subtitle: 'National Command Centre',
    badgeId: 'GOI-PMU-8801',
    defaultEmail: 'director.pmu@nigrani360.gov.in',
    description: 'Full strategic oversight of nationwide PM-AJAY & grant utilization, live CCTV telemetrics, regional command, and statutory audit compliance.',
    icon: <Landmark className="w-6 h-6" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    accentColor: 'blue',
    accentClass: 'bg-blue-600',
    accentHoverClass: 'hover:bg-blue-700',
    ringClass: 'ring-blue-500/20',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    checklist: [
      'Full access to national monitoring',
      'View all projects and sites',
      'Inspection reports and analytics',
      'Manage field operations',
    ],
  },
  field_inspector: {
    role: 'FIELD_INSPECTOR',
    label: 'Field Inspector',
    subtitle: 'Mobile Operations',
    badgeId: 'INS-MH-2026',
    defaultEmail: 'officer.sharma@nigrani360.gov.in',
    description: 'Geotagged ground inspections, offline evidence capture, discrepancy logging, and rapid site verification.',
    icon: <HardHat className="w-6 h-6" />,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    accentColor: 'emerald',
    accentClass: 'bg-emerald-600',
    accentHoverClass: 'hover:bg-emerald-700',
    ringClass: 'ring-emerald-500/20',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    checklist: [
      'Assigned geotagged site inspections',
      'Offline sync mode & checklists',
      'Live photo & evidence capture',
      'Direct escalation to PMU Command',
    ],
  },
  ngo_institute: {
    role: 'NGO_INSTITUTE',
    label: 'NGO / Institute',
    subtitle: 'Restricted Oversight',
    badgeId: 'NGO-MH-042',
    defaultEmail: 'admin.sahyog@nigrani360.gov.in',
    description: 'Single-institution portal for GFR 12-A Utilization Certificates, CCTV health, compliance notices, and resolution workflows.',
    icon: <Users className="w-6 h-6" />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
    accentColor: 'purple',
    accentClass: 'bg-purple-600',
    accentHoverClass: 'hover:bg-purple-700',
    ringClass: 'ring-purple-500/20',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    checklist: [
      'Single-institution facility oversight',
      'GFR 12-A compliance submission',
      'Live CCTV status & camera telemetry',
      'Grievance & audit responses',
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */
export default function RoleLoginPage() {
  const { role: roleParam } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const config = roleParam ? ROLE_CONFIGS[roleParam.toLowerCase()] : undefined;

  // If unknown role, redirect back to login
  if (!config) return <Navigate to="/login" replace />;

  const [email, setEmail] = useState(config.defaultEmail);
  const [password, setPassword] = useState('GovPass@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setLoginError('Please enter your Officer ID / Email'); return; }
    if (!password.trim()) { setLoginError('Please enter your Security Password / PIN'); return; }

    setIsLoggingIn(true);
    setLoginError('');

    setTimeout(() => {
      login(config.role);
      const role = config.role;
      if (role === 'PMU_DIRECTOR') navigate('/overview', { replace: true });
      else if (role === 'FIELD_INSPECTOR') navigate('/inspections', { replace: true });
      else if (role === 'NGO_INSTITUTE') navigate('/ngo-portal', { replace: true });
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F8FAFC] font-sans select-none overflow-x-hidden">

      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-3xl" />
      </div>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 h-12 flex items-center justify-between px-4 sm:px-6 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-xs font-semibold hidden sm:inline">Back to roles</span>
          </button>
          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
        </div>

        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <IndianFlagBadge className="w-4 h-3.5 shrink-0 shadow-xs" />
          <span className="font-extrabold text-sm text-slate-900 tracking-tight">
            Nigrani<span className="text-blue-600">360</span>
          </span>
        </div>

        {/* Badge ID chip */}
        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border ${config.badgeClass}`}>
          {config.badgeId}
        </span>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Role Identity Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/90 overflow-hidden">

            {/* Top Role Banner */}
            <div className="px-6 pt-7 pb-5 flex items-start gap-4 border-b border-slate-100">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${config.iconBg} ${config.iconColor}`}>
                {config.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-black text-xl text-slate-900 tracking-tight leading-tight">
                    {config.label}
                  </h1>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${config.badgeClass}`}>
                    {config.subtitle}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                  {config.description}
                </p>
              </div>
            </div>

            {/* Checklist Strip */}
            <div className="px-6 py-3 bg-slate-50/70 border-b border-slate-100 grid grid-cols-2 gap-x-3 gap-y-1.5">
              {config.checklist.map((item) => (
                <div key={item} className="flex items-start gap-1.5">
                  <Shield className={`w-3 h-3 mt-0.5 shrink-0 ${config.iconColor}`} />
                  <span className="text-[10px] text-slate-600 font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                  Officer ID / Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    id="role-login-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@nigrani360.gov.in"
                    autoComplete="username"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                    Password / Security PIN
                  </label>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    id="role-login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Security Password"
                    autoComplete="current-password"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-600 font-bold bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl"
                >
                  ⚠ {loginError}
                </motion.p>
              )}

              <button
                id="role-login-submit"
                type="submit"
                disabled={isLoggingIn}
                className={`w-full py-3 ${config.accentClass} ${config.accentHoverClass} active:scale-[0.99] text-white font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75 mt-1`}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In as {config.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Gov Branding */}
          <div className="flex items-center justify-center gap-2 mt-5 text-center">
            <AshokaEmblem className="w-3.5 h-5 text-slate-400 shrink-0" />
            <p className="text-[10px] text-slate-400 font-medium">
              Authorized Government Platform · Ministry of Social Justice & Empowerment
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

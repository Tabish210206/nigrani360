import React, { useState } from 'react';
import { 
  IndianRupee, TrendingUp, AlertTriangle, CheckCircle2, 
  ChevronRight, FileWarning, Upload, FileText, Download, 
  ArrowUpRight, Building2, ShieldCheck, Clock, ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function FundTrace() {
  const { user } = useAuth();
  const isNGO = user?.role === 'NGO_INSTITUTE';
  const [expanded, setExpanded] = useState<string | null>(null);

  // NGO VIEW: My Grants & Utilization Ledger
  if (isNGO) {
    const invoices = [
      {
        id: 'INV-2026-892',
        desc: 'Braille & Sensory Assistive Kit',
        vendor: 'Nashik Rehab Instruments Ltd',
        date: '18 Sep 2026',
        amount: '₹24,000',
        status: 'query' as const,
      },
      {
        id: 'INV-2026-840',
        desc: 'Biometric Device Installation & SIM',
        vendor: 'GovTech Solutions India',
        date: '02 Sep 2026',
        amount: '₹18,500',
        status: 'verified' as const,
      },
      {
        id: 'INV-2026-791',
        desc: 'Q2 Beneficiary Nutrition & Meals (August)',
        vendor: 'Pimpalgaon Mahila Bachat Gat',
        date: '28 Aug 2026',
        amount: '₹62,000',
        status: 'verified' as const,
      },
    ];

    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-[1300px] mx-auto space-y-4 sm:space-y-6 bg-[#F8FAFC] w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                Grantee Financial Portal
              </span>
              <span className="text-xs text-slate-500 font-medium">Sahyog Sanstha (MH-042)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <IndianRupee className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 shrink-0" /> Grant & Expenditure Ledger
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 hidden sm:block">
              Track central ministry grant disbursements, submit utilization certificates, and resolve audit queries.
            </p>
          </div>

          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors uppercase tracking-wider whitespace-nowrap">
            <Upload className="w-4 h-4 shrink-0" />
            <span>Upload UC (GFR 12-A)</span>
          </button>
        </div>

        {/* Audit Flag Notice */}
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3">
          <FileWarning className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider">Audit Clarification Requested</h4>
            <p className="text-xs text-rose-700 mt-0.5">
              Invoice <strong>INV-2026-892 (₹24,000)</strong> requires vendor GSTIN verification and geotagged asset proof before Tranche 2 release.
            </p>
          </div>
          <button className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shrink-0 transition-colors uppercase tracking-wider">
            Submit
          </button>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sanctioned</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5">₹5,00,000</p>
            <p className="text-xs text-slate-500 mt-1">FY 2026-27 Sanction</p>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Disbursed</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1.5">₹2,25,000</p>
            <p className="text-xs text-blue-700 font-medium mt-1">Tranche 1 (45%) Cleared</p>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expenditure</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1.5">₹2,01,000</p>
            <p className="text-xs text-slate-500 mt-1">89.3% of Tranche 1</p>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Tranche</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1.5">₹1,75,000</p>
            <p className="text-xs text-amber-700 font-medium mt-1">Pending inspection review</p>
          </div>
        </div>

        {/* Vouchers: Mobile Card View + Desktop Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Submitted Vouchers & Invoices</h3>
              <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">Verified via Ministry PFMS-matching</p>
            </div>
            <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" /> New Invoice
            </button>
          </div>

          {/* Mobile card list */}
          <div className="md:hidden divide-y divide-slate-100 p-3 space-y-2">
            {invoices.map(inv => (
              <div key={inv.id} className="bg-white rounded-xl border border-slate-100 p-3.5 space-y-2.5 shadow-2xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs font-bold text-slate-900">{inv.id}</p>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">{inv.desc}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{inv.vendor}</p>
                  </div>
                  {inv.status === 'query' ? (
                    <span className="shrink-0 bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase flex items-center gap-1">
                      <FileWarning className="w-3 h-3" /> Query
                    </span>
                  ) : (
                    <span className="shrink-0 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{inv.amount}</span>
                    <span className="text-slate-400 ml-2">{inv.date}</span>
                  </div>
                  <button className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                    inv.status === 'query'
                      ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
                    {inv.status === 'query' ? 'Upload Proof' : 'Receipt'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Invoice / Ref ID</th>
                  <th className="p-4">Description / Vendor</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Verification Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-rose-50/30 transition-colors">
                  <td className="p-4 font-mono text-xs font-bold text-slate-900">INV-2026-892</td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800 text-xs">Braille & Sensory Assistive Kit</div>
                    <div className="text-[11px] text-slate-400">Nashik Rehab Instruments Ltd</div>
                  </td>
                  <td className="p-4 text-xs text-slate-500">18 Sep 2026</td>
                  <td className="p-4 font-bold text-slate-900">₹24,000</td>
                  <td className="p-4">
                    <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                      <FileWarning className="w-3 h-3" /> Query Raised
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs font-bold rounded-lg transition-colors">Upload Proof</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs font-bold text-slate-900">INV-2026-840</td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800 text-xs">Biometric Device Installation & SIM</div>
                    <div className="text-[11px] text-slate-400">GovTech Solutions India</div>
                  </td>
                  <td className="p-4 text-xs text-slate-500">02 Sep 2026</td>
                  <td className="p-4 font-bold text-slate-900">₹18,500</td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" /> PFMS Verified
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold rounded-lg transition-colors">Receipt</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs font-bold text-slate-900">INV-2026-791</td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800 text-xs">Q2 Beneficiary Nutrition & Meals (August)</div>
                    <div className="text-[11px] text-slate-400">Pimpalgaon Mahila Bachat Gat</div>
                  </td>
                  <td className="p-4 text-xs text-slate-500">28 Aug 2026</td>
                  <td className="p-4 font-bold text-slate-900">₹62,000</td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" /> PFMS Verified
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold rounded-lg transition-colors">Receipt</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  // PMU DIRECTOR VIEW (Default)
  // ──────────────────────────────────────────────
  const billRows = [
    {
      ref: 'INV-2026-892',
      project: 'MH-042 (Nashik)',
      amount: '₹24,000',
      flag: 'Geotag Mismatch',
      flagColor: 'bg-rose-50 text-rose-700' as const,
      action: 'Investigate',
      actionColor: 'bg-rose-100 text-rose-700 hover:bg-rose-200' as const,
    },
    {
      ref: 'UTR-HDFC-991',
      project: 'GJ-011 (Ahmedabad)',
      amount: '₹85,000',
      flag: 'Verified',
      flagColor: 'text-emerald-600' as const,
      action: 'Audit View',
      actionColor: 'bg-slate-100 text-slate-700 hover:bg-slate-200' as const,
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1920px] mx-auto space-y-4 sm:space-y-6 bg-[#F8FAFC] w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              National Treasury Oversight
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">PFMS & Escrow Linkage</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <IndianRupee className="w-6 h-6 text-emerald-600 shrink-0" /> FundTrace Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 hidden sm:block">Financial oversight, budget utilization tracking, and automated bill mismatch detection.</p>
        </div>
      </div>

      {/* KPI Cards — 2 cols mobile, 5 cols desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase">Sanctioned</h3>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">₹4.2Cr</div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase">Released</h3>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1">₹2.8Cr</div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase">Verified Exp.</h3>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">₹1.9Cr</div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase">Pending Bills</h3>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">18</div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-200 shadow-sm bg-rose-50/50 sm:col-span-1 col-span-2">
          <h3 className="text-[10px] font-bold text-rose-800 uppercase">Flagged Review</h3>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1">3</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">

        {/* Bill Review: Mobile cards + Desktop table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm">National Bill Review Queue</h3>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">3 flagged across 28 states</span>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-100 p-3 space-y-2">
            {billRows.map(row => (
              <div key={row.ref} className="bg-white rounded-xl border border-slate-100 p-3.5 space-y-2 shadow-2xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs font-bold text-slate-900">{row.ref}</p>
                    <p className="text-xs text-slate-600 font-semibold mt-0.5">{row.project}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${row.flagColor}`}>
                    {row.flag === 'Geotag Mismatch' && <FileWarning className="w-3 h-3" />}
                    {row.flag === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                    {row.flag}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 text-sm">{row.amount}</span>
                  <button className={`px-3 py-1 text-xs font-bold rounded-lg uppercase transition-colors ${row.actionColor}`}>
                    {row.action}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                <tr>
                  <th className="p-4">Invoice / UTR</th>
                  <th className="p-4">Project</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Risk Flag</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-rose-50/30 transition-colors">
                  <td className="p-4 font-mono text-xs">INV-2026-892</td>
                  <td className="p-4 font-semibold text-slate-800">MH-042 (Nashik)</td>
                  <td className="p-4 font-bold text-slate-900">₹24,000</td>
                  <td className="p-4"><span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><FileWarning className="w-3 h-3"/>Geotag Mismatch</span></td>
                  <td className="p-4 text-right"><button className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-lg uppercase hover:bg-rose-200 transition-colors">Investigate</button></td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-4 font-mono text-xs">UTR-HDFC-991</td>
                  <td className="p-4 font-semibold text-slate-800">GJ-011 (Ahmedabad)</td>
                  <td className="p-4 font-bold text-slate-900">₹85,000</td>
                  <td className="p-4"><span className="text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3"/>Verified</span></td>
                  <td className="p-4 text-right"><button className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg uppercase hover:bg-slate-200 transition-colors">Audit View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Utilization Score Card */}
        <div className="bg-[#0B0F19] rounded-2xl border border-slate-800 shadow-xl p-6 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div>
            <h3 className="font-bold text-emerald-400 text-sm tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> National Utilisation Readiness
            </h3>
            <div className="text-5xl font-black mb-2">92%</div>
            <p className="text-slate-400 text-xs leading-relaxed">Overall financial compliance score across all 1,247 monitored projects. 3 projects currently under active discrepancy query.</p>
          </div>
          <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors">
            Generate Financial Audit Summary
          </button>
        </div>
      </div>
    </div>
  );
}
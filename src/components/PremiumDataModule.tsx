import React, { useState } from 'react';
import { Search, Filter, Download, Plus, ChevronRight, X, AlertTriangle, Activity, Database } from 'lucide-react';

export default function PremiumDataModule({ title, description, kpis, columns, data, onRowClick }: any) {
  const [search, setSearch] = useState('');
  
  return (
    <div className="p-6 max-w-[1920px] mx-auto space-y-6 bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors tracking-wide">
            <Plus className="w-4 h-4" /> New Action
          </button>
        </div>
      </div>

      {/* KPIs */}
      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {kpis.map((kpi: any, idx: number) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{kpi.label}</h3>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold tracking-tight ${kpi.color || 'text-gray-900'}`}>{kpi.value}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Table Area */}
      <div className="bg-white border border-gray-200/80 rounded-xl shadow-sm flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={`Search ${title.toLowerCase()}...`} 
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                {columns.map((col: any, idx: number) => (
                  <th key={idx} className="px-6 py-4">{col.header}</th>
                ))}
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Database className="w-12 h-12 mb-3 opacity-20" />
                      <p className="text-sm font-medium">No records found matching criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((row: any, rIdx: number) => (
                  <tr key={rIdx} className="hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={() => onRowClick && onRowClick(row)}>
                    {columns.map((col: any, cIdx: number) => (
                      <td key={cIdx} className="px-6 py-4">
                        {col.render ? col.render(row) : (
                          <span className="text-sm font-medium text-gray-700">{row[col.accessor]}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center text-xs text-gray-500 font-medium">
          <span>Showing {data.length} records</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50">Prev</button>
            <button className="px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

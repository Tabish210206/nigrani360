import React, { useState, useEffect } from 'react';
import PremiumDataModule from '../components/PremiumDataModule';
import { useLocation } from 'react-router-dom';
import { Loader2, X, FileText, Database } from 'lucide-react';

export default function ModulePage() {
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRecord, setActiveRecord] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    // Simulate generic fetch for all modules
    fetch(`/api/data/${path}`)
      .then(r => r.json())
      .then(d => {
        setData(d.records || []);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setData([]);
        setLoading(false);
      });
  }, [path]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F4F6F8] min-h-[calc(100vh-56px)]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest animate-pulse">Loading {path}...</p>
        </div>
      </div>
    );
  }

  // Configurations for different routes
  const configs: any = {
    alerts: {
      title: 'Risk & Alerts',
      description: 'Review and manage high-priority operational intelligence signals.',
      kpis: [
        { label: 'High Priority', value: data.filter(d => d.riskLevel === 'high').length, color: 'text-red-600' },
        { label: 'Medium Priority', value: data.filter(d => d.riskLevel === 'medium').length, color: 'text-amber-600' },
        { label: 'Total Alerts', value: data.length, color: 'text-gray-900' }
      ],
      columns: [
        { header: 'Project ID', accessor: 'projectId' },
        { header: 'Alert Type', render: (row: any) => <span className="font-bold">{row.type || 'System Alert'}</span> },
        { header: 'Location', render: (row: any) => `${row.district || 'Unknown'}, ${row.state || 'Unknown'}` },
        { header: 'Risk', render: (row: any) => (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${row.riskLevel === 'high' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
            {row.riskLevel || 'Normal'}
          </span>
        )}
      ]
    },
    inspections: {
      title: 'Field Inspections',
      description: 'Manage physical surprise inspections and field verification records.',
      kpis: [
        { label: 'Total Inspections', value: data.length, color: 'text-blue-600' },
        { label: 'Overdue', value: data.filter(d => d.status === 'overdue').length, color: 'text-red-600' },
      ],
      columns: [
        { header: 'ID', accessor: 'id' },
        { header: 'Project', accessor: 'projectId' },
        { header: 'Date', render: (row: any) => row.date ? new Date(row.date).toLocaleDateString() : 'N/A' },
        { header: 'Compliance', render: (row: any) => <span className="font-bold">{row.compliance}</span> },
        { header: 'Status', accessor: 'status' }
      ]
    },
    fundtrace: {
      title: 'FundTrace Intelligence',
      description: 'Monitor fund utilisation and automatically flag financial discrepancies.',
      kpis: [
        { label: 'Total Grants', value: data.length, color: 'text-gray-900' },
        { label: 'Flagged Bills', value: data.filter(d => d.flagged && d.flagged !== 'None').length, color: 'text-red-600' },
      ],
      columns: [
        { header: 'Grant ID', accessor: 'id' },
        { header: 'Project', accessor: 'projectId' },
        { header: 'Amount', accessor: 'amount' },
        { header: 'Utilised', accessor: 'utilised' },
        { header: 'Status', render: (row: any) => (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${(row.flagged && row.flagged !== 'None') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {(row.flagged && row.flagged !== 'None') ? 'Flagged' : 'Verified'}
          </span>
        )}
      ]
    },
    default: {
      title: path.charAt(0).toUpperCase() + path.slice(1),
      description: 'Operational Module',
      kpis: [
        { label: 'Total Records', value: data.length, color: 'text-blue-600' }
      ],
      columns: [
        { header: 'Record ID', render: (row: any) => <span className="font-mono text-xs">{row.id ? row.id.substring(0,8).toUpperCase() : 'N/A'}</span> },
        { header: 'Status', render: (row: any) => <span className="font-bold text-gray-700">{row.status || 'Active'}</span> },
        { header: 'Created', render: (row: any) => <span className="text-gray-500">{new Date().toLocaleDateString()}</span> }
      ]
    }
  };

  const config = configs[path] || { ...configs.default, title: path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ') };

  return (
    <>
      <PremiumDataModule 
        title={config.title}
        description={config.description}
        kpis={config.kpis}
        columns={config.columns}
        data={data}
        onRowClick={(row: any) => setActiveRecord(row)}
      />

      {/* Detail Drawer */}
      {activeRecord && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm transition-opacity">
          <div className="w-[600px] h-full bg-white shadow-2xl flex flex-col border-l border-gray-200 animate-slideInRight">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mt-2 leading-tight">Record Detail</h2>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  ID: {activeRecord.id ? activeRecord.id.substring(0,8).toUpperCase() : 'UNKNOWN'}
                </p>
              </div>
              <button onClick={() => setActiveRecord(null)} className="p-1.5 bg-gray-100 text-gray-400 hover:text-gray-900 rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-5">
                <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <Database className="w-4 h-4" /> System Record Detail
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(activeRecord).map(([key, val]) => {
                    if (typeof val === 'object' || key === 'id' || key === 'projectId') return null;
                    return (
                      <div key={key}>
                        <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">{key}</span>
                        <span className="text-gray-900 font-medium text-sm">{String(val)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-200 transition-colors">
                  Request Clarification
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors tracking-wide">
                  Execute Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

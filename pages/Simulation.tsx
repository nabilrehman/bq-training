
import React, { useState, useEffect } from 'react';
import { ModelType, SimulationResult } from '../types';
import { SQL_TEMPLATES } from '../constants';
import { Play, RotateCcw, Table, Loader2 } from 'lucide-react';

const Simulation: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>(ModelType.LINEAR_REGRESSION);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const generateFakeResults = (type: ModelType): SimulationResult => {
    switch(type) {
      case ModelType.LINEAR_REGRESSION:
        return {
          columns: ['category', 'predicted_total_sales', 'confidence_interval'],
          data: [
            { category: 'Electronics', predicted_total_sales: 125000, confidence_interval: '+/- 5%' },
            { category: 'Home Decor', predicted_total_sales: 45000, confidence_interval: '+/- 8%' },
            { category: 'Apparel', predicted_total_sales: 82000, confidence_interval: '+/- 4%' }
          ]
        };
      case ModelType.LOGISTIC_REGRESSION:
        return {
          columns: ['customer_id', 'churn_probability', 'predicted_label'],
          data: [
            { customer_id: 'C-00124', churn_probability: 0.89, predicted_label: 1 },
            { customer_id: 'C-08521', churn_probability: 0.12, predicted_label: 0 },
            { customer_id: 'C-00993', churn_probability: 0.55, predicted_label: 1 }
          ]
        };
      case ModelType.K_MEANS:
        return {
          columns: ['centroid_id', 'member_count', 'avg_total_spend'],
          data: [
            { centroid_id: 1, member_count: 4500, avg_total_spend: 12.50 },
            { centroid_id: 2, member_count: 1200, avg_total_spend: 155.20 },
            { centroid_id: 3, member_count: 8000, avg_total_spend: 42.10 }
          ]
        };
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setResult(null);
    setTimeout(() => {
      setIsRunning(false);
      setResult(generateFakeResults(selectedModel));
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6 h-full flex flex-col pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Interactive Demo Console</h2>
          <p className="text-slate-500 text-sm">Experience the power of BigQuery ML in a simulated environment.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-slate-700">Model Type:</label>
          <select 
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value as ModelType);
              handleReset();
            }}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {Object.values(ModelType).map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Mock Editor */}
      <div className="flex-1 min-h-[400px] flex flex-col bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-4">SQL Editor</span>
          </div>
          <div className="flex items-center gap-2">
             <button 
              onClick={handleReset}
              className="p-1.5 hover:bg-slate-700 rounded text-slate-400 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg active:scale-95"
            >
              {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              RUN QUERY
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 font-mono text-sm overflow-auto text-blue-300">
          <pre className="whitespace-pre-wrap">
            {SQL_TEMPLATES[selectedModel].split('\n').map((line, i) => {
              const matchesKeyword = line.match(/^(CREATE OR REPLACE MODEL|OPTIONS|SELECT|FROM|WHERE|AS)/);
              if (matchesKeyword) {
                return (
                  <div key={i}>
                    <span className="text-white font-bold">{matchesKeyword[0]}</span>
                    {line.replace(matchesKeyword[0], '')}
                  </div>
                );
              }
              return <div key={i}>{line}</div>;
            })}
          </pre>
        </div>

        {/* Console Results Output */}
        <div className="h-1/2 border-t border-slate-800 flex flex-col bg-[#0b111e]">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-[10px] font-bold text-slate-400">
            <Table className="w-3 h-3" /> QUERY RESULTS
          </div>
          <div className="flex-1 overflow-auto p-4">
            {isRunning && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-xs font-medium animate-pulse">Running job: bigquery-demo-72819...</p>
              </div>
            )}
            {!isRunning && !result && (
              <div className="h-full flex items-center justify-center text-slate-600 text-sm">
                Run the query to see predictions and model performance.
              </div>
            )}
            {!isRunning && result && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/50">
                        {result.columns.map(col => (
                          <th key={col} className="px-4 py-2 font-bold uppercase tracking-wider text-slate-500">{col.replace(/_/g, ' ')}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.data.map((row, i) => (
                        <tr key={i} className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                          {result.columns.map(col => (
                            <td key={col} className="px-4 py-3">{row[col]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  QUERY COMPLETE (0.8s, 14.2 MB processed)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;

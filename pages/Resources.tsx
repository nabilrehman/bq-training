
import React from 'react';
import { RESOURCE_CARDS } from '../constants';
import { Copy, Terminal } from 'lucide-react';

const Resources: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple notification would go here
    alert("Syntax copied to clipboard!");
  };

  return (
    <div className="space-y-12 py-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">SQL Syntax Reference</h2>
        <p className="text-lg text-slate-600">The 3 core operations you'll demonstrate to every customer.</p>
      </header>

      <div className="space-y-8">
        {RESOURCE_CARDS.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-xs">
                <Terminal className="w-4 h-4" /> BQML Function
              </div>
              <h3 className="text-2xl font-bold text-slate-800">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              <div className="pt-2">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Common Use Case</h4>
                <p className="text-slate-700 text-sm font-medium">{item.useCase}</p>
              </div>
            </div>
            
            <div className="p-8 flex-1 bg-slate-50 relative group">
              <button 
                onClick={() => copyToClipboard(item.syntax)}
                className="absolute top-4 right-4 p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all opacity-0 group-hover:opacity-100"
                title="Copy Syntax"
              >
                <Copy className="w-4 h-4" />
              </button>
              <div className="font-mono text-sm text-slate-800 bg-white p-6 rounded-xl border border-slate-200 shadow-inner">
                <pre className="whitespace-pre-wrap">{item.syntax}</pre>
              </div>
              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                   <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                   STANDARD SQL
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                   <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                   COMPATIBLE WITH BIGQUERY STUDIO
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Need deeper technical docs?</h3>
          <p className="text-blue-100 text-sm">Access the official Google Cloud BigQuery ML documentation for advanced configurations.</p>
        </div>
        <a 
          href="https://cloud.google.com/bigquery/docs/bqml-introduction" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
        >
          View Documentation
        </a>
      </section>
    </div>
  );
};

export default Resources;


import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Bot, 
  Database, 
  Loader2, 
  Table, 
  ChevronDown, 
  Save, 
  MoreVertical, 
  Menu, 
  Settings, 
  PlusCircle, 
  GraduationCap, 
  ArrowRightCircle, 
  Zap, 
  FileText, 
  SearchCode, 
  Globe, 
  History, 
  MousePointer2
} from 'lucide-react';
import { AI_SQL_TEMPLATES } from '../constants';

const ClickMe = ({ label = "CLICK" }: { label?: string }) => (
  <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-[100] text-blue-600 animate-bounce flex flex-col items-center pointer-events-none">
     <span className="text-[10px] font-black uppercase bg-blue-600 text-white px-2 py-1 rounded shadow-lg whitespace-nowrap mb-1">{label}</span>
     <MousePointer2 className="w-8 h-8 fill-current drop-shadow-lg" />
  </div>
);

const AIFeaturesDemo: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<keyof typeof AI_SQL_TEMPLATES>('SCALE_ENRICHMENT');
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  const getTargetRows = (key: keyof typeof AI_SQL_TEMPLATES) => {
    switch (key) {
      case 'SCALE_ENRICHMENT': return 1542091;
      case 'ENTITY_EXTRACTION': return 2810452;
      case 'GROUNDING': return 850394;
      default: return 1000000;
    }
  };

  const getScenarioDetail = (key: keyof typeof AI_SQL_TEMPLATES) => {
    switch (key) {
      case 'SCALE_ENRICHMENT':
        return {
          title: "Scale Enrichment",
          what: "Categorizing 1.5M messy product descriptions into structured JSON attributes.",
          how: "Uses AI.GENERATE to scan the entire table, returning Category, Color, and Target Audience as queryable columns.",
          pitch: "Eliminate manual labeling. Turn unstructured catalogs into searchable databases in minutes."
        };
      case 'ENTITY_EXTRACTION':
        return {
          title: "Entity Extraction",
          what: "Parsing 2.8M rows of feedback to extract PII and metadata.",
          how: "Identifies entities (Name, Age, Location) and Sentiment from free-text user reviews directly in SQL.",
          pitch: "Extract insights from raw text directly within the data warehouse security perimeter."
        };
      case 'GROUNDING':
        return {
          title: "Web Grounding",
          what: "Real-time market research for 850k SKUs against the live web.",
          how: "Enables 'googleSearch' tools for Gemini to research current competitor pricing for each SKU.",
          pitch: "Break the 'knowledge cutoff'. Give your LLM access to real-time web data for trading decisions."
        };
      default:
        return { title: "Custom AI.GENERATE", what: "Flexible prompt control.", how: "Custom model parameters.", pitch: "Full technical control." };
    }
  };

  const runSimulation = () => {
    setIsRunning(true);
    setShowResult(false);
    setRowCount(0);
    const target = getTargetRows(selectedExample);
    const duration = 2500;
    const startTime = Date.now();
    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setRowCount(Math.floor(progress * target));
      if (progress < 1) {
        timerRef.current = requestAnimationFrame(update);
      } else {
        setIsRunning(false);
        setShowResult(true);
      }
    };
    timerRef.current = requestAnimationFrame(update);
  };

  const getResultData = () => {
    if (selectedExample === 'SCALE_ENRICHMENT') {
      return [
        { product_id: 'SKU-001', raw_description: 'Midnight Blue Ergonomic Chair...', category: 'Furniture', color: 'Midnight Blue' },
        { product_id: 'SKU-992', raw_description: 'Fast 5G Smartphone...', category: 'Electronics', color: 'Black' }
      ];
    }
    return [{ status: 'Processed', processed_at: new Date().toISOString() }];
  };

  const details = getScenarioDetail(selectedExample);

  return (
    <div className="h-full flex flex-col -m-4 md:-m-8 lg:-m-12 overflow-hidden bg-slate-50">
      
      {/* Top Header Selector */}
      <section className="bg-white border-b border-slate-200 px-8 py-5 shrink-0 z-[60] shadow-sm">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              AI.GENERATE (Custom Scenarios)
            </h2>
            <p className="text-[11px] text-slate-500 uppercase font-black tracking-widest">Full Prompt Control & Multi-modal processing at scale</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {(['SCALE_ENRICHMENT', 'ENTITY_EXTRACTION', 'GROUNDING'] as Array<keyof typeof AI_SQL_TEMPLATES>).map((key) => {
              const isActive = selectedExample === key;
              const scene = getScenarioDetail(key);
              return (
                <div key={key} className="relative group/card h-full">
                  {!isActive && key === 'ENTITY_EXTRACTION' && !showResult && <ClickMe label="TRAIN NOW" />}
                  <button 
                    onClick={() => {setSelectedExample(key); setShowResult(false); setRowCount(0);}}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex flex-col h-full ${
                      isActive 
                        ? 'border-indigo-600 bg-indigo-50 shadow-md ring-4 ring-indigo-500/10' 
                        : 'border-slate-100 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                        {key === 'SCALE_ENRICHMENT' && <Zap className="w-5 h-5" />}
                        {key === 'ENTITY_EXTRACTION' && <FileText className="w-5 h-5" />}
                        {key === 'GROUNDING' && <SearchCode className="w-5 h-5" />}
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-widest truncate">
                        {key.replace('_', ' ')}
                      </h4>
                    </div>
                    <p className="text-[11px] font-bold leading-relaxed flex-1">{scene.what}</p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interface */}
      <header className="h-10 bg-white border-b border-slate-200 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Menu className="w-4 h-4 text-slate-500" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-[9px]">G</div>
            <span className="text-slate-700 font-medium text-xs">Google Cloud</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Explorer */}
        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Explorer</span>
            <PlusCircle className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex-1 overflow-y-auto pt-4 px-2 space-y-4">
            <div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50/50 rounded mb-1">
                Custom Scenarios
              </div>
              {['SCALE_ENRICHMENT', 'ENTITY_EXTRACTION', 'GROUNDING'].map(key => (
                <div key={key} onClick={() => {setSelectedExample(key as any); setShowResult(false);}}
                  className={`flex items-center gap-2 py-1.5 px-2 text-[10px] rounded cursor-pointer transition-all ${selectedExample === key ? 'bg-indigo-50 text-indigo-700 font-black' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {key.replace('_', ' ')}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Editor */}
        <main className="flex-1 flex flex-col bg-white min-w-0">
          <div className="flex bg-slate-50 border-b border-slate-200 h-10 shrink-0">
            <div className="flex items-center px-4 py-2 bg-white border-r border-slate-200 text-[11px] font-bold gap-2 border-b-2 border-b-indigo-600">
               AI.GENERATE Editor
            </div>
          </div>
          <div className="bg-white border-b border-slate-200 px-4 py-1.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1 relative">
              {!isRunning && !showResult && <ClickMe label="RUN ANALYSIS" />}
              <button onClick={runSimulation} disabled={isRunning} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-5 py-1.5 rounded text-xs font-bold transition-all shadow-sm">
                {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                Run
              </button>
            </div>
          </div>
          <div className="flex-1 p-6 font-mono text-[13px] overflow-auto text-slate-800 leading-relaxed bg-white">
            <pre className="whitespace-pre-wrap">{AI_SQL_TEMPLATES[selectedExample]}</pre>
          </div>
          <div className={`transition-all duration-500 ${showResult || isRunning ? 'h-1/2' : 'h-10'} bg-white border-t border-slate-200 flex flex-col`}>
             <div className="h-10 px-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-2">Results</span>
             </div>
             <div className="flex-1 p-4 overflow-auto">
               {isRunning ? (
                 <div className="h-full flex flex-col items-center justify-center gap-2">
                   <div className="text-3xl font-black tabular-nums">{rowCount.toLocaleString()}</div>
                   <div className="text-[10px] font-black uppercase text-slate-400">Rows Scaled</div>
                 </div>
               ) : showResult ? (
                 <table className="w-full text-left text-[11px] border-collapse">
                    <thead className="bg-slate-50">
                      <tr>{Object.keys(getResultData()[0]).map(k => <th key={k} className="p-2 border border-slate-200 uppercase">{k}</th>)}</tr>
                    </thead>
                    <tbody>
                      {getResultData().map((row, i) => (
                        <tr key={i}>{Object.values(row).map((v, j) => <td key={j} className="p-2 border border-slate-200">{v.toString()}</td>)}</tr>
                      ))}
                    </tbody>
                 </table>
               ) : null}
             </div>
          </div>
        </main>

        {/* Training Context */}
        <aside className="w-80 border-l border-slate-200 bg-white p-6 space-y-8 overflow-y-auto shrink-0 hidden xl:block">
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest"><GraduationCap className="w-4 h-4" /> Technical Guide</div>
              <h4 className="text-lg font-bold text-slate-900 leading-tight">{details?.title}</h4>
              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 space-y-3">
                 <p className="text-[11px] text-slate-700 leading-relaxed font-bold">{details?.what}</p>
                 <p className="text-[10px] text-slate-500 leading-relaxed italic">{details?.how}</p>
              </div>
           </div>
           <div className="space-y-4 pt-6 border-t border-slate-100">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">The Sales Pitch</h5>
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl relative overflow-hidden group">
                 <p className="text-xs font-bold text-indigo-900 leading-relaxed italic relative z-10">"{details?.pitch}"</p>
              </div>
           </div>
           <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-xl space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-60 text-indigo-400 mb-1">
                 <History className="w-3 h-3" /> Seller Secret
              </div>
              <p className="text-[11px] font-bold leading-relaxed">"AI.GENERATE gives the user absolute control over model parameters like temperature and topK while keeping data inside the warehouse."</p>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-indigo-600/10 rounded-full blur-xl" />
           </div>
        </aside>
      </div>
    </div>
  );
};

export default AIFeaturesDemo;

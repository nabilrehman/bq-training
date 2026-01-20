
import React, { useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Play, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Bot, 
  Database, 
  MessageSquare,
  Search,
  MapPin,
  ChevronRight,
  Code,
  Loader2,
  Table
} from 'lucide-react';
import { AI_SQL_TEMPLATES } from '../constants';

const AIFunctions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'managed'>('generate');
  const [selectedExample, setSelectedExample] = useState<keyof typeof AI_SQL_TEMPLATES>('CITY_DESC');
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    setShowResult(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowResult(true);
    }, 1800);
  };

  const getResultData = () => {
    if (selectedExample === 'CITY_DESC') {
      return [
        { city: 'Seattle', result: 'Seattle is a vibrant city nestled between mountains and water...' },
        { city: 'Paris', result: 'Paris is a romantic city renowned for its iconic landmarks...' },
        { city: 'London', result: 'London, a vibrant global metropolis brimming with history...' }
      ];
    }
    if (selectedExample === 'ENTITY_EXTRACTION') {
      return [{ name: 'John Smith', age: 20, location: 'Kirkland, WA', is_married: false }];
    }
    return [{ name: 'Seattle', weather: 'Cloudy, 52°F. High probability of light rain.' }];
  };

  return (
    <div className="space-y-12 py-6 pb-20">
      {/* Header */}
      <header className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase rounded-full w-fit tracking-[0.2em] border border-indigo-200">
          <Sparkles className="w-3 h-3" /> Advanced GenAI Tools
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          BigQuery <span className="text-indigo-600">AI Functions</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Operationalize foundation models without writing a single line of Python. BigQuery AI functions let you analyze petabytes of multi-modal data using SQL.
        </p>
      </header>

      {/* Selector Tabs */}
      <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit border border-slate-200 shadow-sm">
        <button 
          onClick={() => setActiveTab('generate')}
          className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'generate' ? 'bg-white text-indigo-700 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Bot className="w-4 h-4" /> AI.GENERATE
        </button>
        <button 
          onClick={() => setActiveTab('managed')}
          className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'managed' ? 'bg-white text-indigo-700 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Layers className="w-4 h-4" /> Managed AI Functions
        </button>
      </div>

      {activeTab === 'generate' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Documentation & Logic */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                <Code className="w-4 h-4" /> Function Overview
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800">AI.GENERATE</span> is the unified interface to Gemini models. It allows you to:
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <MessageSquare className="w-4 h-4" />, text: "Generate text or structured output" },
                  { icon: <Search className="w-4 h-4" />, text: "Use Google Search grounding" },
                  { icon: <MapPin className="w-4 h-4" />, text: "Use Google Maps grounding" },
                  { icon: <Database className="w-4 h-4" />, text: "Process ObjectRefs (Images/Video)" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-xs text-slate-500 font-medium">
                    <div className="mt-0.5 text-indigo-500">{item.icon}</div>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Choose a Demo scenario</label>
                <div className="space-y-2">
                   {(Object.keys(AI_SQL_TEMPLATES) as Array<keyof typeof AI_SQL_TEMPLATES>).map(key => (
                     <button 
                      key={key}
                      onClick={() => {setSelectedExample(key); setShowResult(false);}}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border-2 ${selectedExample === key ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 hover:border-slate-200 text-slate-600'}`}
                     >
                       {key.replace('_', ' ')}
                     </button>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Playground */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[600px]">
               {/* Toolbar */}
               <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/30" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                      <div className="w-3 h-3 rounded-full bg-green-500/30" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">BigQuery SQL Editor</span>
                  </div>
                  <button 
                    onClick={runSimulation}
                    disabled={isRunning}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:bg-slate-700"
                  >
                    {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                    Run Query
                  </button>
               </div>

               {/* Editor area */}
               <div className="flex-1 p-8 overflow-auto">
                  <pre className="font-mono text-sm text-indigo-300 leading-relaxed whitespace-pre-wrap">
                    {AI_SQL_TEMPLATES[selectedExample]}
                  </pre>
               </div>

               {/* Results Area */}
               <div className="h-48 border-t border-slate-800 bg-[#0b1120] p-6">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
                     <Table className="w-3 h-3" /> Execution Results
                  </div>
                  {isRunning && (
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                       <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                       <span className="text-[10px] font-bold text-slate-400 animate-pulse">CALLING VERTEX AI ENDPOINT...</span>
                    </div>
                  )}
                  {showResult && !isRunning && (
                    <div className="overflow-auto max-h-full">
                       <table className="w-full text-left text-[11px] font-medium text-slate-300 border-collapse">
                          <thead>
                            <tr className="border-b border-slate-800">
                               {Object.keys(getResultData()[0]).map(k => (
                                 <th key={k} className="px-4 py-2 text-slate-500 font-bold uppercase">{k}</th>
                               ))}
                            </tr>
                          </thead>
                          <tbody>
                            {getResultData().map((row, i) => (
                              <tr key={i} className="border-b border-slate-800/50">
                                {Object.values(row).map((v, j) => (
                                  <td key={j} className="px-4 py-3">{typeof v === 'boolean' ? v.toString() : v}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                       </table>
                       <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-green-500">
                          <CheckCircle2 className="w-3 h-3" /> QUERIED 3 ROWS SUCCESSFULLY
                       </div>
                    </div>
                  )}
                  {!isRunning && !showResult && (
                    <div className="h-full flex items-center justify-center text-slate-600 text-xs italic">
                      Execute the query to trigger Gemini-based analysis.
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
           {/* Managed AI placeholders */}
           {[
             { title: "ML.GENERATE_TEXT", desc: "Native integration for text generation tasks on large datasets.", status: "Managed" },
             { title: "ML.GENERATE_EMBEDDING", desc: "Convert text or images into semantic vectors for RAG workflows.", status: "Coming Soon" },
             { title: "ML.UNDERSTAND_IMAGE", desc: "Extract metadata and labels from visual assets natively.", status: "Coming Soon" },
             { title: "ML.EXPLAIN_PREDICT", desc: "Get explainability reports for GenAI outputs.", status: "In Preview" },
             { title: "ML.TRANSLATE", desc: "Translate text columns into 100+ languages directly in BQ.", status: "Placeholder" },
             { title: "ML.SEARCH", desc: "Trigger semantic search across your data warehouse.", status: "Placeholder" }
           ].map((fn, i) => (
             <div key={i} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex items-center justify-between">
                   <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Cpu className="w-5 h-5" />
                   </div>
                   <span className="text-[10px] font-black text-indigo-400 border border-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-widest">{fn.status}</span>
                </div>
                <h4 className="font-bold text-slate-800">{fn.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{fn.desc}</p>
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Reference <ChevronRight className="w-3 h-3" />
                </button>
                {/* Visual Accent */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
             </div>
           ))}
        </div>
      )}

      {/* Narrative Section */}
      <section className="bg-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-6">
              <h3 className="text-3xl font-bold">The Seller Pivot: From Predictions to Reasoning</h3>
              <p className="text-indigo-200 leading-relaxed">
                When talking to startups, move beyond simple numeric regression. BigQuery AI functions mean they don't need to hire expensive MLOps engineers to build GenAI features.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <h5 className="text-xs font-bold text-indigo-300 uppercase mb-1">Before</h5>
                    <p className="text-xs text-slate-100">"We need a Python microservice and a vector DB to build our review analyzer."</p>
                 </div>
                 <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <h5 className="text-xs font-bold text-green-300 uppercase mb-1">After (BQML)</h5>
                    <p className="text-xs text-slate-100">"We analyzed all reviews with a single SELECT statement and Gemini."</p>
                 </div>
              </div>
           </div>
           <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center relative shadow-2xl">
                 <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
                 <div className="p-10 bg-[#0b1120] rounded-full border-8 border-indigo-400/20 flex items-center justify-center">
                    <Sparkles className="w-20 h-20 text-indigo-400 animate-pulse" />
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default AIFunctions;

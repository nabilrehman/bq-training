
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Layers, 
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
  ShieldAlert, 
  TrendingUp, 
  Tag,
  History,
  MousePointer2,
  ListFilter,
  StarHalf,
  FileText,
  Bot,
  Zap
} from 'lucide-react';
import { AI_SQL_TEMPLATES } from '../constants';

const ClickMe = ({ label = "CLICK" }: { label?: string }) => (
  <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-[100] text-blue-600 animate-bounce flex flex-col items-center pointer-events-none">
     <span className="text-[10px] font-black uppercase bg-blue-600 text-white px-2 py-1 rounded shadow-lg whitespace-nowrap mb-1">{label}</span>
     <MousePointer2 className="w-8 h-8 fill-current drop-shadow-lg" />
  </div>
);

const ManagedAIFunctions: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<keyof typeof AI_SQL_TEMPLATES>('AI_IF_PHISHING');
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  const getTargetRows = (key: keyof typeof AI_SQL_TEMPLATES) => {
    switch (key) {
      case 'AI_IF_PHISHING': return 5201844;
      case 'AI_SCORE_RESUMES': return 120452;
      case 'AI_CLASSIFY_TICKETS': return 2104921;
      default: return 1000000;
    }
  };

  const getScenarioDetail = (key: keyof typeof AI_SQL_TEMPLATES) => {
    switch (key) {
      case 'AI_IF_PHISHING':
        return {
          title: "AI.IF: Logical Filtering",
          what: "Detecting Phishing attempts in 5.2M security logs using natural language conditions.",
          how: "BigQuery optimizes your prompt and returns a simple BOOL. Allows 'Natural Language Filtering' directly in the WHERE clause.",
          pitch: "Move beyond regex. Filter petabytes of logs based on 'reasoning' rather than just keywords."
        };
      case 'AI_SCORE_RESUMES':
        return {
          title: "AI.SCORE: Intelligent Ranking",
           what: "Automatically rating 120k candidate resumes against a job description on a scale of 1-100.",
          how: "BigQuery creates a consistent scoring rubric from your prompt. It returns a FLOAT64 for instant ranking.",
          pitch: "Ranking is the heart of most startup features. AI.SCORE gives you a production-ready ranking engine with zero infra management."
        };
      case 'AI_CLASSIFY_TICKETS':
        return {
          title: "AI.CLASSIFY: Smart Routing",
          what: "Categorizing 2.1M support tickets into high-level business topics (Billing, Tech, etc.) without pre-training.",
          how: "BigQuery structures the input to ensure the model picks the 'best fit' from your provided list.",
          pitch: "Replace fragile hard-coded routing rules with LLM-powered classification that understands context and intent."
        };
      default:
        return { title: "Managed AI", what: "Simplified GenAI interface.", how: "Direct model integration.", pitch: "Scale instantly." };
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
    if (selectedExample === 'AI_IF_PHISHING') {
      return [
        { email_id: 'EM-772', sender: 'urgent@helpdesk-google.biz', subject: 'PASSWORD RESET REQUIRED', is_suspicious: 'TRUE' },
        { email_id: 'EM-901', sender: 'noreply@bank-notify.com', subject: 'Your account restricted', is_suspicious: 'TRUE' },
        { email_id: 'EM-442', sender: 'it@internal-corp.sh', subject: 'Health insurance portal', is_suspicious: 'FALSE' }
      ];
    }
    if (selectedExample === 'AI_SCORE_RESUMES') {
      return [
        { candidate_name: 'Sarah Chen', matching_score: 98.5, top_skill: 'Distributed Systems' },
        { candidate_name: 'Alex Rivera', matching_score: 94.2, top_skill: 'Vector Databases' },
        { candidate_name: 'Jordan Lee', matching_score: 89.1, top_skill: 'LLM Fine-tuning' }
      ];
    }
    if (selectedExample === 'AI_CLASSIFY_TICKETS') {
      return [
        { ticket_id: 'T-1002', user_query: 'I cannot log in help', route_to: 'Account Access' },
        { ticket_id: 'T-1005', user_query: 'API returning 500 error', route_to: 'Technical Support' },
        { ticket_id: 'T-1012', user_query: 'Update credit card info', route_to: 'Billing' }
      ];
    }
    return [{ status: 'Complete', processed_at: new Date().toISOString() }];
  };

  const details = getScenarioDetail(selectedExample);

  return (
    <div className="h-full flex flex-col -m-4 md:-m-8 lg:-m-12 overflow-hidden bg-slate-50">
      
      {/* Top Selector */}
      <section className="bg-white border-b border-slate-200 px-8 py-5 shrink-0 z-[60] shadow-sm">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-600" />
              Managed AI Functions
            </h2>
            <p className="text-[11px] text-slate-500 uppercase font-black tracking-widest">Demonstrating: AI.IF, AI.SCORE, and AI.CLASSIFY</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {(['AI_IF_PHISHING', 'AI_SCORE_RESUMES', 'AI_CLASSIFY_TICKETS'] as Array<keyof typeof AI_SQL_TEMPLATES>).map((key) => {
              const isActive = selectedExample === key;
              const scene = getScenarioDetail(key);
              return (
                <div key={key} className="relative group/card h-full">
                  {!isActive && key === 'AI_SCORE_RESUMES' && !showResult && <ClickMe label="TRAIN NOW" />}
                  <button 
                    onClick={() => {setSelectedExample(key); setShowResult(false); setRowCount(0);}}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex flex-col h-full ${
                      isActive 
                        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-500/10' 
                        : 'border-slate-100 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                        {key === 'AI_IF_PHISHING' && <ShieldAlert className="w-5 h-5" />}
                        {key === 'AI_SCORE_RESUMES' && <StarHalf className="w-5 h-5" />}
                        {key === 'AI_CLASSIFY_TICKETS' && <ListFilter className="w-5 h-5" />}
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-widest truncate">
                        {key.replace('AI_', '').replace('_', ' ')}
                      </h4>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 leading-relaxed flex-1">{scene.what}</p>
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
        <div className="flex items-center gap-4">
          <Settings className="w-3.5 h-3.5 text-slate-500" />
          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">JD</div>
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
              <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50/50 rounded mb-1">
                Managed Functions
              </div>
              {['AI_IF_PHISHING', 'AI_SCORE_RESUMES', 'AI_CLASSIFY_TICKETS'].map(key => (
                <div key={key} onClick={() => {setSelectedExample(key as any); setShowResult(false);}}
                  className={`flex items-center gap-2 py-1.5 px-2 text-[10px] rounded cursor-pointer transition-all ${selectedExample === key ? 'bg-blue-50 text-blue-700 font-black' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {key.replace('AI_', '').replace('_', ' ')}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Editor */}
        <main className="flex-1 flex flex-col bg-white min-w-0">
          <div className="flex bg-slate-50 border-b border-slate-200 h-10 shrink-0">
            <div className="flex items-center px-4 py-2 bg-white border-r border-slate-200 text-[11px] font-bold gap-2 border-b-2 border-b-blue-600">
               Managed AI Logic Console
            </div>
          </div>
          <div className="bg-white border-b border-slate-200 px-4 py-1.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1 relative">
              {!isRunning && !showResult && <ClickMe label="RUN NOW" />}
              <button onClick={runSimulation} disabled={isRunning} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-5 py-1.5 rounded text-xs font-bold transition-all shadow-sm">
                {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                Run
              </button>
            </div>
          </div>
          <div className="flex-1 p-6 font-mono text-[13px] overflow-auto text-slate-800 leading-relaxed bg-white">
            <pre className="whitespace-pre-wrap">{AI_SQL_TEMPLATES[selectedExample]}</pre>
          </div>
          <div className={`transition-all duration-500 ${showResult || isRunning ? 'h-1/2' : 'h-10'} bg-white border-t border-slate-200 overflow-hidden flex flex-col shadow-2xl z-20`}>
             <div className="h-10 px-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2">Output results</span>
                <span className="text-[9px] font-bold text-slate-400">STATUS: {isRunning ? 'EXECUTING...' : 'COMPLETE'}</span>
             </div>
             <div className="flex-1 p-4 overflow-auto">
               {isRunning ? (
                 <div className="h-full flex flex-col items-center justify-center gap-2">
                   <div className="text-3xl font-black tabular-nums">{rowCount.toLocaleString()}</div>
                   <div className="text-[10px] font-black uppercase text-slate-400">Records Analyzed</div>
                 </div>
               ) : showResult ? (
                 <table className="w-full text-left text-[11px] border-collapse border border-slate-100">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr>{Object.keys(getResultData()[0]).map(k => <th key={k} className="p-2 border border-slate-200 uppercase text-slate-500">{k}</th>)}</tr>
                    </thead>
                    <tbody>
                      {getResultData().map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">{Object.values(row).map((v, j) => <td key={j} className={`p-2 border border-slate-200 ${typeof v === 'string' && (v === 'TRUE' || v.includes('.')) ? 'text-blue-600 font-black' : ''}`}>{v.toString()}</td>)}</tr>
                      ))}
                    </tbody>
                 </table>
               ) : null}
             </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-80 border-l border-slate-200 bg-white p-6 space-y-8 overflow-y-auto shrink-0 hidden xl:block">
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest"><GraduationCap className="w-4 h-4" /> Technical Deep Dive</div>
              <h4 className="text-lg font-bold text-slate-900 leading-tight">{details?.title}</h4>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
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
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-60 text-blue-400 mb-1">
                 <History className="w-3 h-3" /> Seller Advantage
              </div>
              <p className="text-[11px] font-bold leading-relaxed italic">"By using Managed functions, customers avoid complex JSON formatting. The model outputs native types like BOOL and FLOAT directly."</p>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-600/10 rounded-full blur-xl" />
           </div>
        </aside>
      </div>
    </div>
  );
};

export default ManagedAIFunctions;

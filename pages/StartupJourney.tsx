
import React, { useState } from 'react';
import { 
  Rocket, 
  TrendingUp, 
  Zap, 
  Database, 
  ChevronRight, 
  BrainCircuit, 
  Sparkles, 
  Layers, 
  Target,
  BarChart,
  LineChart,
  Code
} from 'lucide-react';

const STAGES = [
  {
    id: 'seed',
    title: 'Seed / Early Stage',
    focus: 'Product-Market Fit & Data Foundations',
    description: 'At this stage, startups are just beginning to collect data. They need to understand their users and forecast basic burn vs. revenue.',
    products: [
      { name: 'BigQuery Core', role: 'Central source of truth for all events.' },
      { name: 'BQML Linear Regression', role: 'Basic revenue and burn rate forecasting.' }
    ],
    scenario: 'A fintech app predicting monthly active users (MAU) to plan server capacity for the next 3 months.',
    icon: <Rocket className="w-6 h-6" />,
    color: 'blue'
  },
  {
    id: 'series-a',
    title: 'Series A / Growth',
    focus: 'Optimization & Retention',
    description: 'Data volume is increasing. The focus shifts to keeping the users they have and optimizing the unit economics.',
    products: [
      { name: 'BQML Logistic Regression', role: 'Predicting user churn risk.' },
      { name: 'BQML K-Means Clustering', role: 'Segmenting users for targeted marketing.' },
      { name: 'AI.CLASSIFY', role: 'Auto-routing the flood of support tickets.' }
    ],
    scenario: 'An e-commerce platform grouping users into "High Value" and "Discount Seekers" to optimize ad spend.',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'indigo'
  },
  {
    id: 'scale',
    title: 'Series B+ / Scale',
    focus: 'Automation & Generative Experiences',
    description: 'Operations are complex. The startup needs to automate manual processes and build "magic" AI features to stay ahead.',
    products: [
      { name: 'AI.GENERATE', role: 'Enriching massive catalogs and creating dynamic content.' },
      { name: 'Vector Search', role: 'Building RAG-based smart search and recommendations.' },
      { name: 'AI.SCORE', role: 'Intelligent ranking for marketplace supply and demand.' }
    ],
    scenario: 'A marketplace startup using Gemini via BigQuery to automatically write unique SEO descriptions for 1M+ product listings.',
    icon: <Zap className="w-6 h-6" />,
    color: 'purple'
  }
];

const StartupJourney: React.FC = () => {
  const [activeStage, setActiveStage] = useState(STAGES[0].id);

  const currentStage = STAGES.find(s => s.id === activeStage)!;

  return (
    <div className="space-y-12 py-6">
      <header className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-full w-fit tracking-[0.2em] border border-blue-200">
          <Rocket className="w-3 h-3" /> Adoption Roadmap
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          BigQuery AI <span className="text-blue-600">Startup Journey</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Startups don't adopt AI all at once. Understand the maturity levels and which BigQuery capabilities solve the specific pain points of each growth stage.
        </p>
      </header>

      {/* Stage Selector */}
      <div className="flex flex-col md:flex-row gap-4">
        {STAGES.map((stage) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(stage.id)}
            className={`flex-1 p-6 rounded-3xl border-2 transition-all text-left flex items-start gap-4 ${
              activeStage === stage.id 
                ? 'bg-white border-blue-600 shadow-lg ring-4 ring-blue-500/10' 
                : 'bg-white border-slate-100 hover:border-slate-300'
            }`}
          >
            <div className={`p-3 rounded-2xl ${
              activeStage === stage.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-400'
            }`}>
              {stage.icon}
            </div>
            <div>
              <h3 className={`font-bold ${activeStage === stage.id ? 'text-slate-900' : 'text-slate-500'}`}>{stage.title}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{stage.id === 'seed' ? 'Maturity: Level 1' : stage.id === 'series-a' ? 'Maturity: Level 2' : 'Maturity: Level 3'}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in duration-500">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Growth Focus</span>
                <h2 className="text-3xl font-bold text-slate-900 leading-tight">{currentStage.focus}</h2>
                <p className="text-slate-600 leading-relaxed">{currentStage.description}</p>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Key AI Products for this Stage</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStage.products.map((p, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                      <div className="p-1.5 bg-white rounded-lg text-blue-600 shadow-sm">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{p.name}</p>
                        <p className="text-[11px] text-slate-500 leading-tight mt-1">{p.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-widest">
                   <Target className="w-4 h-4" /> Real-World Scenario
                </div>
                <p className="text-xl font-medium leading-relaxed italic">
                  "{currentStage.scenario}"
                </p>
                <div className="flex items-center gap-4 pt-4">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">BigQuery Benefit</span>
                      <span className="text-xs font-bold text-blue-400">Low Latency Decision Making</span>
                   </div>
                   <div className="w-px h-8 bg-white/10" />
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Startup Value</span>
                      <span className="text-xs font-bold text-blue-400">Zero Dev Overhead</span>
                   </div>
                </div>
             </div>
             <div className="absolute bottom-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                {React.cloneElement(currentStage.icon as React.ReactElement, { className: 'w-32 h-32' })}
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm space-y-6">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                 <BrainCircuit className="w-4 h-4 text-indigo-500" /> Seller Narratives
              </h4>
              
              <div className="space-y-4">
                 {[
                   { q: "Why start now?", a: "Early adoption creates a 'Data Flywheel'. The sooner they train in BQ, the better their product experience becomes." },
                   { q: "The Cost Pivot", a: "By using BQ for AI, they avoid the 'AI Tax' of data egress and duplicate processing clusters." },
                   { q: "Developer Velocity", a: "Startups are often engineer-starved. BQ AI lets analysts do the work of data scientists." }
                 ].map((narrative, i) => (
                   <div key={i} className="space-y-1">
                      <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest">{narrative.q}</p>
                      <p className="text-sm text-slate-600 leading-relaxed italic">"{narrative.a}"</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <h4 className="text-sm font-black uppercase tracking-widest">Quick Pitch Tip</h4>
                 <p className="text-sm font-medium leading-relaxed">
                   "Startups love speed. Tell them: BigQuery AI is the only platform that allows you to move from <strong>raw data</strong> to <strong>deployed AI model</strong> in a single SQL statement."
                 </p>
                 <div className="flex items-center gap-2 text-indigo-200 font-bold text-[10px] uppercase">
                    <Zap className="w-3 h-3" /> Technical Advantage
                 </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default StartupJourney;

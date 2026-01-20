
import React, { useState, useEffect } from 'react';
import { VALUE_PROPS } from '../constants';
import { 
  CheckCircle2, 
  XCircle, 
  Database, 
  Cpu, 
  ArrowRight, 
  Layers, 
  Zap, 
  AlertTriangle,
  Globe,
  Activity,
  ShieldCheck,
  Server,
  Cloud,
  Share2
} from 'lucide-react';

const WorkflowAnimation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#0b1120] rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
      <div className="relative z-10 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">Operational Reality</span>
          <h3 className="text-3xl font-bold">Why BQML Wins the Workflow</h3>
        </div>

        <div className="grid grid-cols-1 gap-16">
          
          {/* TRADITIONAL WORKFLOW */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 text-red-400 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-red-300">Traditional ML Flow: Fragmented & Manual</h4>
              </div>
              <div className="text-[10px] font-bold text-red-400 bg-red-400/10 px-3 py-1 rounded-full animate-pulse uppercase">
                High Latency + Security Risk
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-2 py-12 px-6 bg-white/5 rounded-2xl border border-white/10 overflow-visible">
              {/* Warehouse */}
              <div className="flex flex-col items-center gap-2 z-20">
                <div className="w-14 h-14 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center shadow-lg">
                  <Database className="w-6 h-6 text-slate-400" />
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase">Warehouse</span>
              </div>

              {/* ETL Step */}
              <div className="flex-1 flex flex-col items-center gap-2 px-2 z-10 relative">
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden relative">
                  <div className={`absolute inset-0 bg-red-500 transition-all duration-700 ${activeStep >= 1 ? 'w-full' : 'w-0'}`} />
                </div>
                <div className={`text-[8px] font-black uppercase transition-colors ${activeStep === 1 ? 'text-red-400' : 'text-slate-600'}`}>ETL & Data Export</div>
                
                {activeStep === 1 && (
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
                    <div className="text-[10px] font-black text-red-500 bg-white px-3 py-1.5 rounded shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-bounce whitespace-nowrap border border-red-100">
                      ! ETL LATENCY
                    </div>
                  </div>
                )}
              </div>

              {/* Clusters */}
              <div className="flex flex-col items-center gap-2 z-20 relative">
                <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shadow-lg transition-all duration-500 ${activeStep >= 2 ? 'bg-red-900/30 border-red-500 text-red-400 scale-110' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                  <Server className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase text-center">External Clusters</span>
                
                {activeStep === 2 && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50">
                    <div className="text-[10px] font-black text-red-500 bg-white px-3 py-1.5 rounded shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-bounce whitespace-nowrap border border-red-100">
                      ! PYTHON DEPS
                    </div>
                  </div>
                )}
              </div>

              {/* API Layer */}
              <div className="flex-1 flex flex-col items-center gap-2 px-2 z-10 relative">
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden relative">
                  <div className={`absolute inset-0 bg-red-500/50 transition-all duration-700 ${activeStep >= 3 ? 'w-full' : 'w-0'}`} />
                </div>
                <div className={`text-[8px] font-black uppercase transition-colors ${activeStep === 3 ? 'text-red-400' : 'text-slate-600'}`}>API / Serving Layer</div>
                
                {activeStep === 3 && (
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
                    <div className="text-[10px] font-black text-red-500 bg-white px-3 py-1.5 rounded shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-bounce whitespace-nowrap border border-red-100">
                      ! INFRA TO MANAGE
                    </div>
                  </div>
                )}
              </div>

              {/* App */}
              <div className="flex flex-col items-center gap-2 z-20">
                <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shadow-lg transition-all duration-500 ${activeStep >= 4 ? 'bg-slate-700 border-slate-500 text-slate-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase">App</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
             <div className="px-6 py-2 bg-blue-600 text-white text-xs font-black uppercase tracking-[0.3em] rounded-full shadow-lg animate-pulse border-4 border-slate-900 z-30">
                The BQML Advantage
             </div>
          </div>

          {/* BIGQUERY ML WORKFLOW */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-blue-300">BigQuery ML Flow: Unified & Serverless</h4>
              </div>
              <div className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full uppercase">
                Zero Data Movement
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 py-12 px-10 bg-blue-600/5 rounded-3xl border border-blue-500/20">
              
              {/* Central Box */}
              <div className="relative group">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-3xl bg-slate-900 border-4 border-blue-500/40 flex flex-col items-center justify-center gap-4 relative z-10 shadow-[0_0_50px_rgba(37,99,235,0.15)] overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0,transparent_70%)]" />
                   
                   <div className="p-4 bg-blue-600 rounded-2xl shadow-lg relative z-20">
                      <Database className="w-10 h-10 text-white" />
                   </div>
                   
                   <div className="text-center z-20 space-y-1">
                      <p className="text-lg font-black text-white tracking-tight uppercase">BigQuery</p>
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-[9px] font-bold text-blue-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> NO ETL REQUIRED
                        </span>
                        <span className="text-[9px] font-bold text-blue-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> AUTO-SCALING SLOTS
                        </span>
                        <span className="text-[9px] font-bold text-blue-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> SQL SYNTAX (CREATE MODEL)
                        </span>
                      </div>
                   </div>

                   {/* Internal "Training" Pulse */}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full border-2 border-blue-500/20 rounded-2xl animate-ping opacity-20" />
                   </div>
                </div>
                
                {/* Security Tag */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg border-4 border-slate-900 flex items-center gap-1 z-30">
                  <ShieldCheck className="w-3 h-3" /> ENTERPRISE SECURITY
                </div>
              </div>

              {/* Serving Path */}
              <div className="flex flex-col items-center gap-4">
                 <div className="flex items-center gap-2">
                    <ArrowRight className="w-8 h-8 text-blue-500 animate-[bounce-x_1s_infinite]" />
                 </div>
                 <div className="text-[9px] font-black text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    Instant Serving via ML.PREDICT
                 </div>
              </div>

              {/* Step 3: Application */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-blue-600/20 rounded-2xl border-2 border-blue-500/40 flex items-center justify-center shadow-inner group">
                  <Globe className="w-8 h-8 text-blue-400 group-hover:text-blue-200 transition-colors" />
                </div>
                <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest mt-2">Product App</span>
              </div>

              {/* Floating "In-Place" Labels */}
              <div className="absolute top-10 left-10 text-[8px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Layers className="w-3 h-3" /> Unified Data & ML
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
};

const ValueProp: React.FC = () => {
  return (
    <div className="space-y-16 py-6 pb-20">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="w-fit mx-auto px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200 mb-2">
           Solving Data Gravity
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Why BigQuery ML?</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          The biggest hurdle for startups isn't the algorithm—it's the <b>infrastructure friction</b>. BQML eliminates the gap between storage and intelligence.
        </p>
      </header>

      {/* ANIMATION SECTION */}
      <section className="max-w-5xl mx-auto">
        <WorkflowAnimation />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50 p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-700 flex items-center gap-3">
              <div className="p-1.5 bg-red-100 rounded text-red-600">
                <XCircle className="w-5 h-5" />
              </div>
              Traditional ML Pain Points
            </h3>
          </div>
          <div className="p-8 flex-1 space-y-6">
            <ul className="space-y-5">
              {[
                { label: "Export data from warehouse (ETL)", sub: "Massive egress costs and duplicate data storage." },
                { label: "Configure external clusters (Spark/Python)", sub: "Needs specialized devops skills to manage infrastructure." },
                { label: "Manage complex Python dependencies", sub: "Environmental drift leads to production failures." },
                { label: "Manually scale training infrastructure", sub: "Slow cycles; you pay for idle cluster time." },
                { label: "Build separate API for model serving", sub: "Adds a new point of failure and maintenance." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-blue-50/30 rounded-3xl border border-blue-100 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-blue-600 p-6 border-b border-blue-700">
            <h3 className="font-bold text-white flex items-center gap-3">
              <div className="p-1.5 bg-blue-500 rounded text-white shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              The BigQuery ML Advantage
            </h3>
          </div>
          <div className="p-8 flex-1 space-y-6">
            <ul className="space-y-5">
              {[
                { label: "Data stays inside BigQuery (No ETL)", sub: "Zero egress costs. One source of truth for your data." },
                { label: "Standard SQL syntax (CREATE MODEL)", sub: "Empower your existing analysts to become ML engineers." },
                { label: "No infrastructure to manage", sub: "Fully managed serverless environment. Scales on demand." },
                { label: "Automatic scaling using BQ slots", sub: "Train on petabytes as easily as megabytes." },
                { label: "Instant serving via ML.PREDICT", sub: "Go from model to application logic in minutes, not weeks." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.label}</p>
                    <p className="text-xs text-blue-600/60 font-medium">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        {VALUE_PROPS.map((prop, idx) => (
          <div key={idx} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="p-3 bg-blue-50 w-fit rounded-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {React.cloneElement(prop.icon as React.ReactElement, { className: 'w-6 h-6' })}
            </div>
            <h4 className="font-bold text-slate-800 mb-3">{prop.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{prop.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValueProp;

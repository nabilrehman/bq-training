
import React from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../constants';
import { ArrowRight, Sparkles, Terminal, Cpu, Database, BrainCircuit, Zap, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-12 py-6">
      <header className="space-y-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase rounded-full w-fit tracking-wider border border-indigo-200 shadow-sm">
           <ShieldCheck className="w-3 h-3" /> Internal Seller Enablement Only
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          BigQuery <span className="text-[#1a73e8]">AI Technical Deep Dive</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
          Master the full BigQuery AI portfolio. This platform is designed for sellers to build technical intuition through realistic simulations of ML and GenAI features.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {NAVIGATION_LINKS.filter(link => link.path !== '/').map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="group p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between h-64"
          >
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit group-hover:bg-[#1a73e8] group-hover:text-white transition-colors">
                {link.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{link.label}</h3>
                <p className="text-slate-500 mt-1 text-sm leading-relaxed">
                  {link.path === '/value-prop' && "Learn the 'Data Gravity' narrative. Understand why moving AI to the data is the core winning strategy for modern startups."}
                  {link.path === '/ai-features' && "Master high-level Gemini scenarios. Understand web grounding and multi-modal SQL so you can pitch the full breadth of Gemini."}
                  {link.path === '/managed-ai' && "Deep dive into serverless logical functions. Learn to explain how AI.IF and AI.SCORE bring LLM reasoning to SQL."}
                  {link.path === '/wizard-demo' && "Internal walkthrough of BigQuery ML model creation. Understand the BQ Studio workflow to better handle technical discovery."}
                  {link.path === '/startup-journey' && "Understand the maturity levels and which BigQuery capabilities solve specific pain points of each growth stage."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#1a73e8] font-bold text-sm">
              Start Learning Module <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-blue-400" />
              Internal Simulation Environment
            </h2>
            <blockquote className="text-lg italic text-slate-300 border-l-4 border-blue-600 pl-4 py-2">
              "You will never show this demo to a customer. This sandbox is built for you to understand the product logic so you can pitch with absolute technical confidence."
            </blockquote>
            <p className="mt-6 text-slate-400 text-sm leading-relaxed">
              By simulating the BigQuery Studio interface, you can experience the exact technical flow your customers will take, allowing you to identify pain points and value drivers during discovery calls.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                <BrainCircuit className="w-5 h-5 text-blue-400 mb-2" />
                <span className="text-blue-400 font-bold block mb-1 text-sm">Technical Intuition</span>
                <span className="text-[11px] text-slate-400">Build a mental model of how BigQuery processes ML logic internally.</span>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                <Database className="w-5 h-5 text-blue-400 mb-2" />
                <span className="text-blue-400 font-bold block mb-1 text-sm">Scale Mastery</span>
                <span className="text-[11px] text-slate-400">See how BQ handles millions of rows effortlessly through mock processing logs.</span>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                <Sparkles className="w-5 h-5 text-blue-400 mb-2" />
                <span className="text-blue-400 font-bold block mb-1 text-sm">Gemini Fluency</span>
                <span className="text-[11px] text-slate-400">Practice translating complex GenAI capabilities into standard SQL value statements.</span>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                <Zap className="w-5 h-5 text-blue-400 mb-2" />
                <span className="text-blue-400 font-bold block mb-1 text-sm">Seller Secrets</span>
                <span className="text-[11px] text-slate-400">Access built-in narratives and 'pivots' hidden within every technical module.</span>
             </div>
          </div>
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
      </section>
    </div>
  );
};

export default Home;

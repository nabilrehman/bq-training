
import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Loader2, 
  Zap,
  ShieldCheck,
  MessageCircle,
  Database,
  ChevronDown,
  ChevronRight,
  MousePointer2,
  HelpCircle,
  TrendingUp,
  BarChart3,
  PieChart
} from 'lucide-react';
import { BQML_MODELS } from '../constants';

const WizardDemo: React.FC = () => {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1); // 1: Name, 2: Method, 3: Objective, 4: Options
  const [modelName, setModelName] = useState('');
  const [dataset, setDataset] = useState('startup_training_v1');
  const [creationMethod, setCreationMethod] = useState('');
  const [objectiveId, setObjectiveId] = useState<string>('');
  const [modelType, setModelType] = useState('linear_reg');
  const [isCreating, setIsCreating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Sync subStep with main step logic
  useEffect(() => {
    if (step === 1) setSubStep(1);
    if (step === 2 && !creationMethod) setSubStep(2);
    if (step === 2 && creationMethod) setSubStep(3);
    if (step === 3) setSubStep(4);
  }, [step, creationMethod]);

  const selectedModel = BQML_MODELS.find(m => m.id === objectiveId);

  const handleContinue = () => {
    if (step < 3) setStep(step + 1);
  };

  const createModel = () => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      setIsFinished(true);
    }, 2500);
  };

  const activeGlow = "ring-4 ring-blue-500 ring-offset-2 shadow-[0_0_25px_rgba(26,115,232,0.6)] animate-pulse border-blue-500";
  
  const ClickMe = () => (
    <div className="absolute -left-10 top-1/2 -translate-y-1/2 z-50 text-blue-600 animate-bounce flex flex-col items-center">
       <MousePointer2 className="w-8 h-8 fill-current drop-shadow-lg" />
       <span className="text-[9px] font-black uppercase bg-blue-600 text-white px-1 rounded mt-1 shadow-md">CLICK</span>
    </div>
  );

  // Visualization Components based on Model Type
  const ModelVisualization = ({ type }: { type: string }) => {
    switch (type) {
      case 'regression':
      case 'forecasting':
        return (
          <div className="h-48 w-full bg-slate-50 rounded-xl border border-slate-100 p-4 relative overflow-hidden group">
            <div className="flex items-end justify-between h-full gap-1">
              {[40, 45, 42, 50, 55, 52, 60, 65, 62, 75, 85, 95].map((h, i) => (
                <div 
                  key={i} 
                  className={`w-full rounded-t-sm transition-all duration-1000 ${i > 8 ? 'bg-blue-400 opacity-60' : 'bg-blue-600'}`} 
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-blue-600" />
               <span className="text-[10px] font-bold text-slate-500 uppercase">Revenue Growth Trend (Actual vs Forecast)</span>
            </div>
            <div className="absolute top-4 right-4 flex gap-3 text-[9px] font-bold">
               <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-600 rounded-full" /> Historical</div>
               <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-400 opacity-60 rounded-full" /> ML Forecast</div>
            </div>
          </div>
        );
      case 'classification':
        return (
          <div className="h-48 w-full bg-slate-50 rounded-xl border border-slate-100 p-6 flex flex-col justify-center gap-4">
             <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Churn Probability</span>
                <span className="text-xs font-black text-red-500">HIGH RISK</span>
             </div>
             <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 w-[85%] relative">
                   <div className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse" />
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-white p-3 rounded-lg border border-slate-100 text-center">
                   <div className="text-[10px] font-bold text-slate-400 uppercase">Precision</div>
                   <div className="text-lg font-bold text-slate-800">94.2%</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-100 text-center">
                   <div className="text-[10px] font-bold text-slate-400 uppercase">Recall</div>
                   <div className="text-lg font-bold text-slate-800">89.1%</div>
                </div>
             </div>
          </div>
        );
      case 'clustering':
        return (
          <div className="h-48 w-full bg-slate-50 rounded-xl border border-slate-100 p-4 relative overflow-hidden">
             <div className="absolute top-4 left-4 text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <PieChart className="w-3 h-3 text-indigo-500" /> Customer Centroids
             </div>
             <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-32 h-32">
                   <div className="absolute top-2 left-4 w-12 h-12 bg-blue-500 rounded-full opacity-40 animate-pulse border-2 border-blue-600" />
                   <div className="absolute bottom-4 right-2 w-16 h-16 bg-indigo-500 rounded-full opacity-40 animate-pulse delay-700 border-2 border-indigo-600" />
                   <div className="absolute top-10 right-4 w-8 h-8 bg-purple-500 rounded-full opacity-40 animate-pulse delay-1000 border-2 border-purple-600" />
                   <div className="absolute center w-2 h-2 bg-slate-800 rounded-full" />
                </div>
             </div>
          </div>
        );
      default:
        return (
          <div className="h-48 w-full bg-slate-50 rounded-xl border border-slate-100 p-6 flex flex-col justify-between">
             <div className="text-[10px] font-bold text-slate-500 uppercase">Model Feature Importance</div>
             <div className="space-y-3">
                {[
                  { label: 'User Tenure', val: 92 },
                  { label: 'Avg Basket Size', val: 78 },
                  { label: 'Login Frequency', val: 45 },
                  { label: 'Region', val: 32 }
                ].map((f, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[9px] font-bold text-slate-600">
                       <span>{f.label}</span>
                       <span>{f.val}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full">
                       <div className="h-full bg-blue-600 rounded-full" style={{ width: `${f.val}%` }} />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );
    }
  };

  if (isFinished && selectedModel) {
    return (
      <div className="h-full bg-white flex flex-col animate-in fade-in zoom-in-95 duration-500 border border-slate-200 rounded-lg shadow-sm">
        {/* Success Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#3367d6] rounded flex items-center justify-center text-white shadow-md border border-blue-700">
               {React.cloneElement(selectedModel.icon as React.ReactElement, { className: 'w-6 h-6' })}
             </div>
             <div className="flex flex-col">
                <h2 className="text-xl font-medium text-slate-900 leading-none">Success: {modelName || 'test'} operationalized</h2>
                <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-1">Training Status: Complete</span>
             </div>
          </div>
          <button 
            onClick={() => {setIsFinished(false); setStep(1); setObjectiveId(''); setModelName(''); setCreationMethod('');}}
            className="px-6 py-2.5 bg-[#3367d6] text-white rounded text-sm font-bold hover:bg-[#2b55b3] shadow-lg border border-[#3367d6] transition-all hover:scale-105 active:scale-95"
          >
            Start New Tutorial
          </button>
        </div>

        <div className="flex-1 overflow-auto p-10 space-y-10 max-w-6xl mx-auto w-full">
          {/* Main Layout: Graph + Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
             {/* Left Column: The Graph Visualization */}
             <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-blue-600" /> Model Performance Dashboard
                      </h3>
                      <div className="flex gap-2">
                         <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-bold">V1.0.0</span>
                         <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100 font-bold">DEPLOYED</span>
                      </div>
                   </div>
                   <ModelVisualization type={selectedModel.id} />
                   <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium italic">
                      <span>* Simulated metrics based on typical {selectedModel.title} benchmarks.</span>
                      <div className="flex items-center gap-2">
                         <Check className="w-4 h-4 text-green-600" /> Evaluation Verified
                      </div>
                   </div>
                </div>

                {/* Seller Insights Box */}
                <div className="bg-blue-50/50 border border-blue-200/50 rounded-3xl p-8 flex items-start gap-6 shadow-sm relative overflow-hidden">
                   <div className="p-3 bg-white rounded-2xl border border-blue-100 text-blue-600 flex-shrink-0 shadow-sm relative z-10">
                     <MessageCircle className="w-6 h-6" />
                   </div>
                   <div className="space-y-2 relative z-10">
                      <h3 className="text-[10px] font-black text-blue-800 uppercase tracking-[0.2em]">The Sales Value Proposition</h3>
                      <p className="text-2xl text-slate-800 font-medium italic leading-tight">
                        "{selectedModel.sellerInsights.valueProp}"
                      </p>
                   </div>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-10 -mt-10 blur-2xl" />
                </div>
             </div>

             {/* Right Column: Value Stacks */}
             <div className="space-y-6">
                <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4 border-l-8 border-l-blue-500 transition-all hover:shadow-md">
                   <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.15em]">
                      <Zap className="w-5 h-5" /> The CTO Narrative (Product ROI)
                   </div>
                   <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                     "{selectedModel.startupUseCases.product}"
                   </p>
                </div>
                <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4 border-l-8 border-l-indigo-500 transition-all hover:shadow-md">
                   <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.15em]">
                      <ShieldCheck className="w-5 h-5" /> The CFO Narrative (Ops Efficiency)
                   </div>
                   <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                     "{selectedModel.startupUseCases.internal}"
                   </p>
                </div>
                <div className="p-6 bg-[#0b1120] text-white rounded-3xl shadow-xl space-y-4 relative overflow-hidden group">
                   <div className="relative z-10">
                      <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Module Summary</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        You've successfully demonstrated how BigQuery ML eliminates MLOps complexity for startups. 
                        The model is now ready to serve predictions directly from the warehouse.
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-400">
                         <Check className="w-3 h-3" /> Training Completed
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl -mr-8 -mt-8" />
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-100 flex overflow-hidden">
      {/* Main Console Simulation */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden m-4 animate-in fade-in duration-500">
        {/* realistic GCP Toolbar */}
        <div className="px-5 py-3 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400 font-medium flex items-center gap-1">BigQuery <ChevronRight className="w-4 h-4" /></span>
              <span className="text-slate-900 font-medium">Create new ML model</span>
          </div>
          <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-[#e8f0fe] text-[#1a73e8] rounded-full text-[10px] font-bold uppercase border border-[#d2e3fc]">
                <Database className="w-3 h-3" /> STARTUP-SOE-DATA-SANDBOX
              </div>
              <HelpCircle className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sub-Sidebar Nav */}
          <div className="w-64 border-r border-slate-200 bg-white flex flex-col pt-6">
            {[
              { id: 1, label: 'Model name' },
              { id: 2, label: 'Creation method' },
              { id: 3, label: 'Model options' },
            ].map((s) => (
              <div 
                key={s.id}
                className={`flex items-center gap-4 px-6 py-4 border-l-4 transition-all ${
                  step === s.id ? 'border-[#1a73e8] bg-blue-50 text-[#1a73e8]' : 'border-transparent text-slate-500'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                  step >= s.id ? 'bg-[#1a73e8] text-white shadow-sm' : 'bg-slate-200 text-slate-400'
                }`}>
                  {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
                </div>
                <span className={`text-sm font-medium ${step === s.id ? 'text-[#1a73e8]' : 'text-slate-600'}`}>{s.label}</span>
              </div>
            ))}
            <div className="mt-8 px-6">
              <button 
                  disabled={true}
                  className={`w-full py-2 rounded text-sm font-medium border border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed`}
              >
                  Create model
              </button>
            </div>
          </div>

          {/* Console Working Area */}
          <div className="flex-1 overflow-y-auto p-12 bg-white relative">
            
            {step === 1 && (
              <div className="space-y-10 animate-in slide-in-from-right-4 fade-in duration-500">
                <h2 className="text-3xl text-slate-800 font-light">Create new ML model</h2>
                
                <div className="max-w-md space-y-8">
                    {/* Dataset Select */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Dataset *</label>
                      <div className="relative">
                        <select 
                          value={dataset}
                          onChange={(e) => setDataset(e.target.value)}
                          className="w-full border border-slate-300 rounded p-2.5 text-sm appearance-none focus:outline-none focus:border-[#1a73e8] bg-white transition-all hover:border-slate-400"
                        >
                          <option value="startup_training_v1">startup_training_v1</option>
                          <option value="Cymbal_Score">Cymbal_Score</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Model Name Input */}
                    <div className="space-y-2 relative">
                      <label className="text-xs font-bold text-slate-700">Model name *</label>
                      <div className="relative">
                        {subStep === 1 && !modelName && <ClickMe />}
                        <input 
                          type="text" 
                          placeholder="e.g. revenue_predictor_v1"
                          value={modelName}
                          autoFocus
                          onChange={(e) => setModelName(e.target.value)}
                          className={`w-full border border-slate-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#1a73e8] transition-all ${subStep === 1 && !modelName ? activeGlow : 'bg-white'}`}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">Provide a unique name for this model (e.g., your_project_name_v1)</p>
                    </div>

                    <button 
                      onClick={handleContinue}
                      disabled={!modelName}
                      className={`px-8 py-2.5 border border-[#1a73e8] text-[#1a73e8] rounded text-sm font-bold hover:bg-blue-50 transition-all relative ${modelName ? activeGlow : 'opacity-30 cursor-not-allowed'}`}
                    >
                      {modelName && subStep === 1 && <ClickMe />}
                      Continue
                    </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 animate-in slide-in-from-right-4 fade-in duration-500">
                <h2 className="text-3xl text-slate-800 font-light">Creation method</h2>
                
                <div className="space-y-8">
                    <div className="space-y-4">
                      {[
                        { id: 'train', label: 'Train a model in BigQuery', sub: 'The most efficient way for startups. Zero movement of data results in the lowest TCO and best security posture.' },
                        { id: 'vertex', label: 'Connect to Vertex AI LLM service (Gemini)', sub: 'Using SQL syntax to trigger generative AI workflows for text and vision tasks.' },
                        { id: 'remote', label: 'Connect to user managed Vertex AI endpoints', sub: 'Connect BigQuery to pre-trained endpoints for real-time inference.' },
                      ].map(opt => (
                        <label key={opt.id} className={`flex items-start gap-4 cursor-pointer p-5 rounded-2xl border-2 transition-all relative ${creationMethod === opt.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-transparent hover:bg-slate-50'}`}>
                          {subStep === 2 && opt.id === 'train' && !creationMethod && <ClickMe />}
                          <div className={`w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 transition-all ${
                            creationMethod === opt.id ? 'border-[#1a73e8]' : 'border-slate-300'
                          } ${subStep === 2 && opt.id === 'train' && !creationMethod ? activeGlow : ''}`}>
                            {creationMethod === opt.id && <div className="w-3 h-3 bg-[#1a73e8] rounded-full"></div>}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{opt.label}</p>
                            <p className="text-[11px] text-slate-500 leading-tight max-w-xl mt-1">{opt.sub}</p>
                          </div>
                          <input type="radio" name="method" className="hidden" checked={creationMethod === opt.id} onChange={() => setCreationMethod(opt.id)} />
                        </label>
                      ))}
                    </div>

                    {creationMethod === 'train' && (
                      <div className="pt-10 space-y-8 animate-in slide-in-from-bottom-6 duration-700 relative">
                        <h3 className="text-2xl text-slate-800 font-light border-t border-slate-100 pt-10">Modeling objective</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {BQML_MODELS.map(opt => (
                            <label key={opt.id} className={`flex items-start gap-4 cursor-pointer p-6 border-2 rounded-3xl transition-all relative ${
                              objectiveId === opt.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'
                            } ${subStep === 3 && !objectiveId && opt.id === 'regression' ? activeGlow : ''}`}>
                               {subStep === 3 && !objectiveId && opt.id === 'regression' && <ClickMe />}
                               <div className={`w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 transition-all ${
                                 objectiveId === opt.id ? 'border-[#1a73e8]' : 'border-slate-300'
                               }`}>
                                  {objectiveId === opt.id && <div className="w-3.5 h-3.5 bg-[#1a73e8] rounded-full"></div>}
                               </div>
                               <div>
                                 <div className="flex items-center gap-2 mb-2">
                                   <div className="p-1.5 bg-slate-50 rounded-lg text-blue-600">
                                      {React.cloneElement(opt.icon as React.ReactElement, { className: 'w-4 h-4' })}
                                   </div>
                                   <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">{opt.title}</p>
                                 </div>
                                 <p className="text-[11px] text-slate-500 leading-relaxed">{opt.desc}</p>
                               </div>
                               <input type="radio" name="objective" className="hidden" checked={objectiveId === opt.id} onChange={() => setObjectiveId(opt.id)} />
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-8 flex items-center gap-4">
                      <button 
                        onClick={handleContinue}
                        disabled={!objectiveId}
                        className={`px-10 py-3 bg-[#1a73e8] text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md relative ${objectiveId ? activeGlow : 'opacity-30 cursor-not-allowed'}`}
                      >
                        {objectiveId && subStep === 3 && <ClickMe />}
                        Continue
                      </button>
                    </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10 animate-in slide-in-from-right-4 fade-in duration-500">
                <h2 className="text-3xl text-slate-800 font-light">Model options</h2>
                
                <div className="space-y-10">
                    <div className="space-y-2 relative">
                      <label className="text-xs font-bold text-slate-700">Model type *</label>
                      <div className="relative max-w-md">
                        {subStep === 4 && <ClickMe />}
                        <select 
                          value={modelType}
                          onChange={(e) => setModelType(e.target.value)}
                          className={`w-full border border-slate-300 rounded p-3 text-sm appearance-none focus:outline-none focus:border-[#1a73e8] bg-white transition-all shadow-sm ${subStep === 4 ? activeGlow : ''}`}
                        >
                          <option value="linear_reg">Arima Plus XReg (Recommended for Forecasts)</option>
                          <option value="logistic_reg">Logistic Regression (Churn Predictors)</option>
                          <option value="kmeans">K-Means Clustering (User Segments)</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xl text-slate-800 font-light">Training data source</h4>
                      <div className="flex items-center border border-slate-200 rounded-xl w-fit overflow-hidden text-sm shadow-sm bg-slate-50 p-1.5">
                        <button className="px-8 py-2 font-bold text-[#1a73e8] bg-white rounded-lg shadow-sm border border-blue-100">Table / View</button>
                        <button className="px-8 py-2 font-medium text-slate-500">Raw SQL Query</button>
                      </div>

                      <div className="space-y-6 pt-2 max-w-lg">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Project</label>
                            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 font-bold text-xs">
                              STARTUP-SOE-DATA-SANDBOX
                              <button className="text-[#1a73e8] text-[10px] font-black uppercase tracking-widest border border-blue-200 px-2 py-1 rounded bg-white">Browse</button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Source Table *</label>
                            <div className="relative">
                              <select className="w-full border border-slate-300 rounded-xl p-4 text-sm appearance-none focus:outline-none bg-white font-medium">
                                <option>historical_timeseries_v2</option>
                                <option>customer_transaction_logs</option>
                                <option>user_activity_snapshot</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-4.5 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-10 border-t border-slate-100">
                      <button 
                        onClick={createModel}
                        className={`px-16 py-4 bg-[#1a73e8] text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95 relative ${subStep === 4 ? activeGlow : ''}`}
                      >
                        {subStep === 4 && <ClickMe />}
                        {isCreating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Create model'}
                      </button>
                      <button onClick={() => setStep(2)} className="px-8 py-4 text-slate-400 font-bold text-xs uppercase hover:text-slate-600 transition-colors">Back</button>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isCreating && (
          <div className="absolute top-0 left-0 right-0 h-2 bg-blue-50 overflow-hidden z-[100]">
            <div className="h-full bg-blue-600 animate-progress shadow-[0_0_15px_rgba(26,115,232,0.8)]"></div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-progress { animation: progress 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default WizardDemo;

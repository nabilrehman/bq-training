
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ValueProp from './pages/ValueProp';
import WizardDemo from './pages/WizardDemo';
import AIFeaturesDemo from './pages/AIFeaturesDemo';
import ManagedAIFunctions from './pages/ManagedAIFunctions';
import StartupJourney from './pages/StartupJourney';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/startup-journey" element={<StartupJourney />} />
          <Route path="/value-prop" element={<ValueProp />} />
          <Route path="/wizard-demo" element={<WizardDemo />} />
          <Route path="/managed-ai" element={<ManagedAIFunctions />} />
          <Route path="/ai-features" element={<AIFeaturesDemo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;

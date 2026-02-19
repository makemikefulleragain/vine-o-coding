import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Toolkit from './components/Toolkit';
import DataOwnership from './components/guides/DataOwnership';
import VendorLockin from './components/guides/VendorLockin';
import CostTransparency from './components/guides/CostTransparency';
import AIReadiness from './components/guides/AIReadiness';
import About from './components/About';
import Services from './components/Services';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import FAQ from './components/FAQ';
import Insights from './components/Insights';
import AdminGate from './components/AdminGate';
import ContentGenerator from './components/ContentGenerator';

function App() {
  const [answers, setAnswers] = useState({});

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/audit" element={<Quiz onComplete={setAnswers} />} />
        <Route path="/results" element={<Results answers={answers} />} />
        <Route path="/toolkit" element={<Toolkit />} />
        <Route path="/toolkit/data-ownership" element={<DataOwnership />} />
        <Route path="/toolkit/vendor-lockin" element={<VendorLockin />} />
        <Route path="/toolkit/cost-transparency" element={<CostTransparency />} />
        <Route path="/toolkit/ai-readiness" element={<AIReadiness />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/admin" element={<AdminGate><ContentGenerator /></AdminGate>} />
      </Routes>
    </Layout>
  );
}

export default App;

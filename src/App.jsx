import React, { useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import PortfolioPage from '@/pages/PortfolioPage';
import CaseStudyPage from '@/pages/CaseStudyPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AboutPage from '@/pages/AboutPage';
import TeamPage from '@/pages/TeamPage';
import ContactPage from '@/pages/ContactPage';
import DigitalServicesPage from '@/pages/DigitalServicesPage';
import AIAgentsPage from '@/pages/AIAgentsPage';
import ConversationalAIPage from '@/pages/ConversationalAIPage';
import ScrollToTop from '@/components/ScrollToTop';
import ComparisonLandingPage from '@/pages/comparison-landing-page.jsx';
import WebsiteComparisonTool from '@/pages/website-comparison-tool.jsx';
import RealComparisonDemo from '@/pages/real-comparison-demo.jsx';


function App() {
  const location = useLocation();

// useEffect(() => {
//   // const scriptId = "convertkit-popup";
//   const existingScript = document.getElementById(scriptId);

//   // Prevent double loading
//   if (!existingScript) {
//     const script = document.createElement("script");
//     script.id = scriptId;
//     script.async = true;
//     script.dataset.uid = "4643ba99ac";
//     // script.src = "https://99-agents-agency.kit.com/4643ba99ac/index.js";
//     document.body.appendChild(script);
//   }

//   return () => {
//     // Optional cleanup (not needed in most cases)
//     const s = document.getElementById(scriptId);
//     if (s) s.remove();
//   };
// }, []);
{/* <button
  data-formkit-toggle="4643ba99ac"
  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
>
  Join 99 Agents Briefing
</button> */}


  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:projectId" element={<CaseStudyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/comparison-landing-page" element={<ComparisonLandingPage />} />
            <Route path="/website-comparison-page" element={<WebsiteComparisonTool />} />
            <Route path="/realComparison-example" element={<RealComparisonDemo />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/digital-services" element={<DigitalServicesPage />} />
            <Route path="/ai-agents" element={<AIAgentsPage />} />
            <Route path="/ai-agents/conversational-ai" element={<ConversationalAIPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
        <Toaster />
      </div>
    </>
  );
}

export default App;

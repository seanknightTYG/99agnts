import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ProjectSlideshow from '@/components/ProjectSlideshow';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useNavigate } from "react-router-dom";
import {
 
  ArrowRight,

} from "lucide-react";

const HomePage = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const location = useLocation();
const navigate = useNavigate();
  const sectionRefs = {
    Home: heroRef,
    Services: servicesRef,
    Portfolio: projectsRef,
    About: aboutRef,
    Contact: contactRef,
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const section = Object.keys(sectionRefs).find(key => key.toLowerCase() === id);
      if (section && sectionRefs[section].current) {
        sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Web Development & AI Solutions Eureka | 99 Agents Humboldt County</title>
         <meta
          name="description"
          content="Local Humboldt County agency specializing in AI-powered web development. Smart websites, automation, and digital innovation for businesses in Eureka & Arcata."
        />
        <meta
          name="keywords"
          content="web development Humboldt County, AI web development Eureka, business automation Arcata, AI websites Northern California"
        />
        <link rel="canonical" href="https://99agents.agency/" />

        {/* Open Graph / Twitter */}
        <meta property="og:title" content="99 Agents | AI & Web Development Humboldt County" />
        <meta property="og:description" content="Next-generation web development and AI solutions for businesses in Eureka, Arcata & Northern California." />
        <meta property="og:image" content="https://99agents.agency/images/og-image.jpg" />
        <meta property="og:url" content="https://99agents.agency/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="99 Agents | AI & Web Development Humboldt County" />
        <meta name="twitter:description" content="Next-generation web development and AI solutions for Humboldt County businesses." />
        <meta name="twitter:image" content="https://99agents.agency/images/twitter-card.jpg" />
      </Helmet>
      <Header sectionRefs={sectionRefs} />
      <main>
        
        <div ref={heroRef}><Hero /></div>
        
        <div ref={servicesRef}><Services /></div>
        <div ref={projectsRef}><ProjectSlideshow /></div>
        
        <div>
          <div className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-400 rounded-2xl p-12 text-center shadow-2xl shadow-cyan-500/50">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">             
                Ready to Stop Losing Customers to AI-Savvy Competitors?
              </h2>
              <p className="text-xl text-slate-800 mb-8">
                AI assistants are recommending businesses right now. Is yours one of them?
Get your free competitive analysis in 60 seconds and see exactly where you stand.
              </p>
              <button
                 onClick={() => navigate("/website-comparison-page")}
                className="px-10 py-5 bg-slate-900 text-white rounded-lg font-bold text-xl hover:bg-slate-800 transition-all shadow-lg inline-flex items-center gap-3"
              >
                Analyze My Website Now
                <ArrowRight className="w-6 h-6" />
              </button>
              {/* <p className="text-sm text-slate-700 mt-6">
                Join 10,000+ businesses who've already discovered what they're
                missing
              </p> */}
            </div>
          </div>
        </div>
        <div ref={aboutRef}><About /></div>
        </div>
        <div ref={contactRef}><Contact /></div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
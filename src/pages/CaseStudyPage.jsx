import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Target, Zap, ExternalLink, Lightbulb, Settings, MapPin, Briefcase } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/data/projects';
import Contact from '@/components/Contact';

const CaseStudyPage = () => {
  const { projectId } = useParams();
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return <Navigate to="/portfolio" />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const overviewItems = project.overview ? [
    { icon: <Briefcase className="w-4 h-4" />, label: 'Client', value: project.overview.client },
    { icon: <Settings className="w-4 h-4" />, label: 'Industry', value: project.overview.industry },
    { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: project.overview.location },
    { icon: <Zap className="w-4 h-4" />, label: 'Services', value: project.overview.services },
    { icon: <Lightbulb className="w-4 h-4" />, label: 'Core Technology', value: project.overview.coreTechnology },
  ] : [
    { icon: <Briefcase className="w-4 h-4" />, label: 'Client', value: `${project.title.split(' ')[0]} Inc.` },
    { icon: <Zap className="w-4 h-4" />, label: 'Services', value: project.category },
  ];

  return (
    <>
      <Helmet>
        <title>{`${project.title} | Case Study`}</title>
        <meta name="description" content={project.snippet} />
      </Helmet>
      <Header />
      <main className="pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.section variants={itemVariants} className="container mx-auto px-6 mb-12">
            <div className="mb-8">
              <Button asChild variant="ghost" className="text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
                <Link to="/portfolio">
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back to Portfolio
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold py-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl">
              {project.snippet}
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="container mx-auto px-6 mb-16">
            <div className="relative bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-4 shadow-2xl shadow-slate-900/50">
              <img alt={project.image} className="w-full h-auto max-h-[600px] object-cover rounded-xl" src="/multimodal.png" />
            </div>
          </motion.section>

          <div className="container mx-auto px-6">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              <aside className="lg:col-span-4 lg:sticky top-28 self-start mb-12 lg:mb-0">
                <motion.div 
                  variants={itemVariants}
                  className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Project Highlights</h3>
                  <div className="space-y-5">
                    {overviewItems.map(item => (
                      <div key={item.label}>
                        <span className="text-sm font-semibold text-emerald-400 flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.label}</span>
                        </span>
                        <p className="text-gray-200 mt-1">{item.value}</p>
                      </div>
                    ))}
                     {project.overview && (
                      <div>
                        <span className="text-sm font-semibold text-emerald-400 flex items-center">
                          <CheckCircle className="w-4 h-4" />
                          <span className="ml-2">Result</span>
                        </span>
                        <p className="text-gray-200 mt-1">Improved lead quality and faster sales cycle</p>
                      </div>
                    )}
                  </div>
                  <Button asChild className="w-full mt-8 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white group">
                    <a href="https://www.lostcoastsigns.com" target="_blank" rel="noopener noreferrer">
                      Visit Lost Coast Signs & Swag <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </motion.div>
              </aside>

              <article className="lg:col-span-8">
                <motion.div variants={itemVariants} className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-headings:font-bold">
                  <div className="p-8 bg-slate-800/30 rounded-2xl border border-blue-500/10 mb-12">
                    <div className="flex items-center mb-4">
                      <Target className="w-8 h-8 text-blue-400" />
                      <h2 className="text-3xl ml-4">The Challenge</h2>
                    </div>
                    <p>{project.challenge}</p>
                  </div>

                  <div className="p-8 bg-slate-800/30 rounded-2xl border border-blue-500/10 mb-12">
                    <div className="flex items-center mb-4">
                      <Zap className="w-8 h-8 text-emerald-400" />
                      <h2 className="text-3xl ml-4">Our Solution</h2>
                    </div>
                    <p>{project.solution}</p>
                    {project.techSpotlight && (
                      <div className="mt-6 p-4 bg-slate-700/30 border border-blue-400/20 rounded-lg">
                        <h4 className="font-bold text-blue-400 flex items-center"><Lightbulb className="w-5 h-5 mr-2"/> Technology Spotlight</h4>
                        <p className="text-sm mt-2 whitespace-pre-line">{project.techSpotlight}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-center text-white mb-8">Project Gallery</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {project.images.map((img, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="relative bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-2 group overflow-hidden"
                        >
                          <img alt={img} className="w-full h-64 object-cover rounded-md group-hover:scale-105 transition-transform duration-300" src={img} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-2xl border border-green-400/20">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                      <h2 className="text-3xl ml-4">The Business Outcome</h2>
                    </div>
                    <p>{project.results}</p>
                  </div>
                </motion.div>
              </article>
            </div>
          </div>
          
          <div className="mt-24">
             <Contact ctaHeadline="Ready to Build Your AI-Powered Advantage?" />
          </div>

        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudyPage;
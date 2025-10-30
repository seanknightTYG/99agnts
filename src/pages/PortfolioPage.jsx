import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Construction } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/data/projects';

const PortfolioPage = () => {
  const contactRef = useRef(null);
  const [latestProject] = projectsData;

  const placeholderProjects = Array(6).fill({
    id: 'coming-soon',
    title: 'Project Coming Soon',
    snippet: 'This project is currently under construction. Check back soon for exciting updates!',
    image: null,
  });

  return (
    <>
      <Helmet>
        <title>Portfolio - 99AGENTS.AGENCY</title>
        <meta name="description" content="Explore our portfolio of innovative projects, from AI solutions to stunning web and graphic design." />
      </Helmet>
      <Header sectionRefs={{ Contact: contactRef }} />
      <main className="pt-24">
        {/* Featured Project Hero */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition duration-500"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-4">
                <img alt={latestProject.title} className="w-full h-auto object-cover rounded-xl" src={latestProject.image} />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-emerald-400 font-semibold">Latest Project</span>
              <h1 className="text-4xl lg:text-6xl font-bold text-white">
                {latestProject.title}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {latestProject.snippet}
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white group">
                <Link to={`/portfolio/${latestProject.id}`}>
                  View Case Study <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Projects Grid */}
        <section className="py-20 px-6 bg-slate-900/50">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {placeholderProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-4">
                        <Construction className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-6">{project.snippet}</p>
                  </div>
                  <span className="font-semibold text-gray-500 flex items-center group cursor-not-allowed">
                    Coming Soon <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div ref={contactRef}>
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PortfolioPage;
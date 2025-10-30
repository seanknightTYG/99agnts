import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Founder & AI Strategist',
    bio: 'Visionary leader with a passion for leveraging AI to solve real-world business problems.',
    image: 'Alex Johnson, AI Strategist',
  },
  {
    name: 'Samantha Lee',
    role: 'Creative Director',
    bio: 'The artistic force behind our designs, turning complex ideas into beautiful, intuitive user experiences.',
    image: 'Samantha Lee, Creative Director',
  },
  {
    name: 'Michael Chen',
    role: 'Lead Web Developer',
    bio: 'Master of code and architecture, ensuring our web solutions are fast, scalable, and secure.',
    image: 'Michael Chen, Lead Web Developer',
  },
  {
    name: 'Jessica Rodriguez',
    role: 'Automation Specialist',
    bio: 'Expert in streamlining workflows and eliminating inefficiencies to boost client productivity.',
    image: 'Jessica Rodriguez, Automation Specialist',
  },
];

const TeamPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Team | 99AGENTS.AGENCY</title>
        <meta name="description" content="Meet the talented team of strategists, designers, and developers at 99AGENTS.AGENCY." />
      </Helmet>
      <Header />
      <main className="pt-32 pb-16 text-white">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="container mx-auto px-6 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Meet the Innovators
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are a curated team of experts united by a passion for building the future of digital business.
          </p>
        </motion.section>

        <section className="container mx-auto px-6 mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-xl border border-blue-500/20 overflow-hidden text-center group"
              >
                <div className="relative h-64 bg-slate-700">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={member.name}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-emerald-400 mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TeamPage;
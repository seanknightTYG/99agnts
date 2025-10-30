import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Target, Eye } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | 99AGENTS.AGENCY</title>
        <meta name="description" content="Learn about 99AGENTS.AGENCY, our mission, vision, and the values that drive our digital transformation services." />
      </Helmet>
      <Header />
      <div className='bg-slate-900/50'>
      <main className="pt-32 pb-16 text-white ">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="container mx-auto px-6 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            About 99AGENTS.AGENCY
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are a collective of innovators, designers, and strategists dedicated to bridging the gap between ambitious ideas and tangible digital impact.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="container mx-auto px-6 mt-20 "
        >
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-500/20">
              <Users className="w-12 h-12 mx-auto text-emerald-400 mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Who We Are</h2>
              <p className="text-gray-400">
                A passionate team of digital natives with a shared love for technology and design. We thrive on solving complex challenges and building elegant solutions that drive growth for our clients.
              </p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-500/20">
              <Target className="w-12 h-12 mx-auto text-emerald-400 mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Our Mission</h2>
              <p className="text-gray-400">
                To empower businesses with transformative digital tools and strategies. We aim to democratize access to cutting-edge technology, making AI, automation, and high-end design accessible to all.
              </p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-500/20">
              <Eye className="w-12 h-12 mx-auto text-emerald-400 mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Our Vision</h2>
              <p className="text-gray-400">
                To be the leading catalyst for digital innovation in Northern California and beyond, creating a future where businesses of all sizes can harness the full potential of the digital world.
              </p>
            </div>
          </div>
        </motion.section>
      </main>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center text-center px-6 pt-32 pb-24">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 opacity-90"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-slate-700/[0.05] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          className="lg:w-1/2 lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-400 text-sm font-medium">AI-Powered Success Stories</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white my-4 leading-tight">
            Creative Solutions, <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Intelligent Results
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8">
            We merge cutting-edge AI with stunning design to build digital experiences that captivate, convert, and conquer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/portfolio">
              <motion.button 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button 
                className="w-full sm:w-auto bg-slate-700/50 border border-slate-600 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className='flex justify-center items-center'>
            <img 
              src='https://plus.unsplash.com/premium_photo-1664127685218-fe853c62c9f3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
              alt='AI-powered creative design solutions'
              className="rounded-2xl shadow-2xl shadow-blue-500/10 w-full max-w-md"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
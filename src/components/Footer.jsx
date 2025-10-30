import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleSocialClick = (platform) => {
    toast({
      title: `${platform} Link`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleLinkClick = (link) => {
    toast({
      title: `${link} Page`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const socialLinks = [
    // { icon: <Facebook className="w-5 h-5" />, name: "Facebook" },
    // { icon: <Twitter className="w-5 h-5" />, name: "Twitter" },
    // { icon: <Instagram className="w-5 h-5" />, name: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn" }
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' }
  ];

  const serviceLinks = [
    { name: 'AI Agents', path: '/ai-agents' },
    { name: 'Website Comparision', path: '/comparison-landing-page' },
    { name: 'Graphic Design', action: () => handleLinkClick('Graphic Design') },
    { name: 'Web Development', action: () => handleLinkClick('Web Development') },
    { name: 'Automation', action: () => handleLinkClick('Automation') },
    { name: 'Digital Strategy', action: () => handleLinkClick('Digital Strategy') },
    { name: 'Mobile Apps', action: () => handleLinkClick('Mobile Apps') },
  ];

  return (
    <footer className="bg-slate-900 border-t border-blue-500/20 py-16 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              <img src="/99logo.png" alt="99AGENTS.AGENCY Logo" className="w-[200px] h-auto" />
            </Link>
            <p className="text-gray-300 mt-4 leading-relaxed">
              Transforming businesses through AI-powered solutions, stunning design, and innovative technology in Northern California.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-lg font-semibold text-white mb-6 block">Services</span>
            <div className="space-y-3">
              {serviceLinks.map((service) => (
                service.path ? (
                  <Link
                    key={service.name}
                    to={service.path}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                ) : (
                  <button
                    key={service.name}
                    onClick={service.action}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {service.name}
                  </button>
                )
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-lg font-semibold text-white mb-6 block">Company</span>
            <div className="space-y-3">
              {companyLinks.map((item) => (
                 <Link
                  key={item.name}
                  to={item.path}
                  className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <span className="text-lg font-semibold text-white mb-6 block">Contact Us</span>
            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Northern California</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>99agnts@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              {/* <Phone className="w-4 h-4 text-emerald-400" /> */}
              {/* <span>+1(707)926-3091</span> */}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-blue-500/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 99AGENTS.AGENCY. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    onClick={() => handleSocialClick(social.name)}
                    className="p-2 bg-slate-800/50 border border-blue-500/20 rounded-lg text-gray-400 hover:text-white hover:border-emerald-500/40 transition-all duration-300"
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
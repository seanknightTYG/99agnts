import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ sectionRefs }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScrollToSection = (section) => {
    if (sectionRefs && sectionRefs[section] && sectionRefs[section].current) {
      sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${section.toLowerCase()}`);
    }
    setIsMenuOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'Home', action: () => handleNavigate('/') },
    { label: 'Services', action: () => handleScrollToSection('Services') },
    { label: 'AI Agents', action: () => handleNavigate('/ai-agents') },
    { label: 'Portfolio', action: () => handleNavigate('/portfolio') },
    { label: 'About', action: () => handleScrollToSection('About') },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-blue-500/20"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            <motion.div 
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 0 4px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))"
              }}
              transition={{ duration: 0.3 }}
            >
              <img src="/99logo.png" alt="99AGENTS.AGENCY Logo" className="w-[200px] h-auto" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={item.action}
                className="text-white text-lg hover:text-blue-400 transition-colors duration-300"
              >
                {item.label}
              </motion.button>
            ))}
            <Button
              onClick={() => handleScrollToSection('Contact')}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white"
            >
              Have an Idea? Let's Chat
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-white text-lg hover:text-blue-400 transition-colors duration-300 text-left"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => handleScrollToSection('Contact')}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 w-full text-white"
              >
                Have an Idea? Let's Chat
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
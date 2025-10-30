import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | 99AGENTS.AGENCY</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <div className="relative inline-block mb-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <AlertTriangle className="w-24 h-24 text-emerald-400" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 w-48 h-48 bg-emerald-400/10 rounded-full -z-10"
              style={{ x: '-50%', y: '-50%' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Oops! Page Not Found.
          </h2>
          <p className="text-gray-300 max-w-md mx-auto mb-8">
            It seems you've ventured into uncharted territory. The page you're looking for might have been moved, deleted, or never existed.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white group">
            <Link to="/">
              <Home className="mr-2 w-5 h-5" />
              Return to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;
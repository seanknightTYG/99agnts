import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | 99AGENTS.AGENCY</title>
        <meta name="description" content="Get in touch with 99AGENTS.AGENCY to discuss your project or learn more about our digital transformation services." />
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Contact />
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
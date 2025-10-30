
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Zap, MessageSquare, UserCheck, BarChart2, Brush, GitMerge, PhoneCall, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AIAgentsPage = () => {
  const sections = [
    {
      icon: <Zap className="w-8 h-8 text-emerald-400" />,
      title: 'AI Automation & Operational Efficiency',
      content: 'Streamline repetitive tasks and automate complex workflows with intelligent AI agents. From lead capture and appointment booking to providing \'always-on\' support, our solutions free up your team to focus on high-value activities, driving productivity and reducing operational costs.',
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-emerald-400" />,
      title: 'Conversational AI (Voice & Chat)',
      content: 'Engage customers 24/7 with sophisticated AI-powered chatbots and voice assistants. These agents provide instant, accurate responses to sales and support inquiries, seamlessly escalating complex issues to human experts when needed, ensuring a flawless customer experience.',
      link: '/ai-agents/conversational-ai',
    },
    {
      icon: <UserCheck className="w-8 h-8 text-emerald-400" />,
      title: 'Personalization & Customer Experience',
      content: 'Leverage AI to analyze user data in real-time, delivering hyper-personalized product recommendations, dynamic content, and targeted messaging. This tailored approach boosts customer engagement, increases conversion rates, and fosters long-term loyalty by making every interaction feel unique.',
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-emerald-400" />,
      title: 'Insights & Predictive Analytics',
      content: 'Unlock the power of your data with AI agents that uncover hidden trends and predict future customer behaviors. By transforming raw data into actionable insights, we help you make faster, smarter decisions, identify new market opportunities, and stay ahead of the competition.',
    },
    {
      icon: <Brush className="w-8 h-8 text-emerald-400" />,
      title: 'AI-Enhanced Creative & Marketing',
      content: 'Accelerate your content creation with AI tools designed for generating compelling ad copy, social media posts, and stunning design elements. Our AI-enhanced solutions speed up production and ensure brand consistency across all channels, allowing you to scale your marketing efforts effortlessly.',
    },
    {
      icon: <GitMerge className="w-8 h-8 text-emerald-400" />,
      title: 'Integration & Support',
      content: 'We ensure our AI solutions integrate seamlessly with your existing systems, including CRMs, e-commerce platforms, and support desks. With continuous human oversight for reliability and optimization, we provide end-to-end support to guarantee your AI agents deliver maximum business value.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-32 pb-16 text-white"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4 py-4">
              AI Agents for Business
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Unlock unparalleled efficiency and innovation by integrating intelligent AI agents into your core business processes.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-8 flex flex-col items-start hover:border-emerald-500/40 hover:bg-slate-800 transition-all duration-300 shadow-lg"
              >
                <div className="p-3 bg-slate-900 border border-blue-500/30 rounded-lg mb-6">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                <p className="text-gray-300 leading-relaxed flex-grow">{section.content}</p>
                {section.link && (
                  <Link to={section.link} className="mt-6">
                    <Button variant="link" className="text-emerald-400 p-0 h-auto hover:text-emerald-300">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 mt-24"
        >
          <div className="bg-gradient-to-r from-blue-900/50 to-emerald-900/50 border border-emerald-500/30 rounded-xl p-8 md:p-12 text-center shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-slate-800 border border-emerald-500/40 rounded-full">
                <PhoneCall className="w-10 h-10 text-emerald-400" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Test Our Live AI Voice Agent!</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-lg">
              Ready to test out a voice agent? Give Dex a call, our in-house digital assistant. He can book a meeting with one of the team.
            </p>
            <a 
              href="tel:+17079263091" 
              className="inline-block bg-emerald-500 text-slate-900 font-bold text-xl px-8 py-4 rounded-lg hover:bg-emerald-400 transition-all duration-300 shadow-lg"
            >
              +1 (707) 926-3091
            </a>
          </div>
        </motion.div>

      </motion.div>
      <Contact ctaHeadline="Ready to Transform Your Business with AI?" />
      <Footer />
    </>
  );
};

export default AIAgentsPage;

import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Code, Database, Server, Smartphone, GitBranch, Puzzle, Zap, Palette, Search } from 'lucide-react';

const DigitalServicesPage = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="w-6 h-6 text-blue-400" />,
      skills: ["HTML5, CSS3, JavaScript (ES6+)", "Responsive Web Design (Flexbox, Grid)", "React.js, Vue.js, Angular", "Tailwind CSS, Bootstrap, Material UI", "Redux, Zustand, Pinia, Vuex", "Next.js / Nuxt.js (SSR, SSG)", "Web Performance Optimization", "Cross-browser Compatibility", "Accessibility (WCAG standards)"]
    },
    {
      title: "Backend Development",
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      skills: ["Node.js (Express.js, Nest.js)", "PHP (Laravel, CodeIgniter, Core PHP)", "BigCommerce, Shopify", "Python (Django, Flask, FastAPI)", "RESTful API Development", "GraphQL APIs", "Authentication & Authorization (JWT, OAuth2)"]
    },
    {
      title: "Database Management",
      icon: <Database className="w-6 h-6 text-blue-400" />,
      skills: ["SQL: MySQL, PostgreSQL, MariaDB", "NoSQL: MongoDB, Firebase, DynamoDB", "ORMs: Prisma, Sequelize, TypeORM, Eloquent", "Database Design & Optimization", "Caching: Redis, Memcached"]
    },
    {
      title: "Mobile App Development",
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      skills: ["React Native", "Flutter"]
    },
    {
      title: "CMS & eCommerce",
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      skills: ["WordPress (Theme & Plugin Development)", "Shopify (Custom Themes, Liquid)", "WooCommerce", "Magento", "Headless CMS (Strapi, Sanity, Contentful)"]
    },
    {
      title: "Version Control & Collaboration",
      icon: <GitBranch className="w-6 h-6 text-emerald-400" />,
      skills: ["Git, GitHub, GitLab, Bitbucket", "Agile / Scrum Methodologies", "JIRA, Trello, Asana, ClickUp"]
    },
    {
      title: "Other Skills",
      icon: <Puzzle className="w-6 h-6 text-blue-400" />,
      skills: ["API Integration (Payment gateways, social logins)", "WebSockets (Real-time apps)", "AI Integration (OpenAI, LangChain, Vertex AI)", "SEO Optimization", "Graphic Design"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Technical Expertise & Digital Services - 99AGENTS.AGENCY</title>
        <meta name="description" content="Explore our vast technical capabilities, from frontend and backend development with React, Node.js, and Python, to mobile apps, CMS, and AI integration." />
      </Helmet>
      <Header />
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white my-4 leading-tight">
              Our Technical
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              We leverage a comprehensive stack of modern technologies to build robust, scalable, and innovative digital solutions. Explore the tools and technologies our expert team masters.
            </p>
          </motion.div>

          <div className="space-y-16">
            {skillCategories.map((category) => (
              <motion.section 
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  {category.icon}
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{category.title}</h2>
                </div>
                <motion.div 
                  className="flex flex-wrap gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={itemVariants}
                      className="bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 text-slate-200 text-sm md:text-base"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-24"
          >
            <h3 className="text-4xl font-bold text-white mb-6">Have a Project in Mind?</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our technical expertise can bring your vision to life.
            </p>
            <Link to="/contact">
              <motion.button 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Free Consultation <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DigitalServicesPage;
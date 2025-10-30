import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Palette, Code, Bot, Zap, Globe, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Intelligent AI Solutions",
      description: "Leverage the power of artificial intelligence to redefine your operations. Our custom AI solutions integrate seamlessly into your existing workflows, automating complex tasks, uncovering valuable data insights, and paving the way for smarter, data-driven decisions that give you a competitive edge.",
      features: [
        "Machine Learning & Predictive Analytics",
        "Business Process Automation (BPA)",
        "Natural Language Processing (NLP) & Chatbots",
        "Custom AI Model Integration"
      ],
      gradient: "from-blue-500 to-emerald-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Creative Graphic Design & Branding",
      description: "Your brand is more than a logo—it's an experience. We create compelling visual identities, branding packages, and marketing materials that capture attention and communicate your unique story. From a complete brand overhaul to engaging digital assets, our designs ensure you make a memorable first impression.",
      features: [
        "Logo Design & Visual Identity Systems",
        "UI/UX Design for Web & Mobile",
        "Marketing & Sales Collateral",
        "Brand Style Guides"
      ],
      gradient: "from-emerald-500 to-blue-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Modern Web Development",
      description: "Your website is your most powerful digital asset. We build modern, lightning-fast, and responsive websites and web applications that deliver exceptional user experiences on any device. Our development process prioritizes clean code, scalability, and SEO best practices to ensure your site not only looks great but performs brilliantly.",
      features: [
        "Custom Website & Web App Development",
        "E-commerce & Online Store Solutions",
        "Content Management System (CMS) Integration",
        "Website Maintenance & Security"
      ],
      gradient: "from-blue-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Workflow & Business Automation",
      description: "Stop wasting valuable time on repetitive manual tasks. Our intelligent automation solutions streamline your business processes, reduce human error, and free up your team to focus on what matters most—growth. We identify bottlenecks and implement systems that save you time and boost your bottom line.",
      features: [
        "Custom Workflow Automation",
        "CRM & Marketing Automation",
        "Third-Party API Integrations",
        "Robotic Process Automation (RPA)"
      ],
      gradient: "from-emerald-500 to-blue-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Data-Driven Digital Strategy",
      description: "Navigate the digital landscape with a clear, actionable plan. We partner with you to develop a comprehensive digital transformation strategy tailored to your specific business goals. Our data-driven approach ensures every decision is designed to maximize your online presence, engage your target audience, and deliver measurable ROI.",
      features: [
        "Market & Competitor Analysis",
        "Technology & Platform Consulting",
        "Digital Marketing Roadmaps",
        "SEO & Content Strategy"
      ],
      gradient: "from-blue-500 to-emerald-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Engaging Mobile App Development",
      description: "Connect with your customers wherever they are. We design and develop intuitive, high-performance mobile applications for iOS and Android. Whether you need a native app for maximum performance or a cross-platform solution for broader reach, we build engaging mobile experiences that drive loyalty and keep users coming back.",
      features: [
        "Native iOS & Android App Development",
        "Cross-Platform App Development",
        "App Store Optimization (ASO)",
        "Mobile UI/UX Design"
      ],
      gradient: "from-emerald-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Our Digital Transformation Services
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We bridge the gap between idea and impact. From intelligent AI-powered solutions to captivating visual designs, we deliver a comprehensive suite of digital services engineered to grow your business, optimize your operations, and create unforgettable user experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Link to="/digital-services" className="group w-full h-full">
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-8 h-full hover:border-emerald-500/40 transition-all duration-300 flex flex-col"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 self-start`}>
                    <div className="text-white">{service.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center font-semibold text-blue-400 group-hover:text-emerald-400 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
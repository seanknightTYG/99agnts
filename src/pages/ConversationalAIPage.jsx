import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { MessageSquare, Clock, Smile, DollarSign, Settings, Languages, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ConversationalAIPage = () => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-emerald-400" />,
      title: '24/7 Availability',
      description: 'Provide round-the-clock support and sales assistance, ensuring you never miss a customer interaction, day or night.',
    },
    {
      icon: <Smile className="w-8 h-8 text-emerald-400" />,
      title: 'Enhanced Customer Satisfaction',
      description: 'Deliver instant, accurate answers to customer queries, reducing wait times and improving the overall user experience.',
    },
    {
      icon: <DollarSign className="w-8 h-8 text-emerald-400" />,
      title: 'Reduced Operational Costs',
      description: 'Automate routine inquiries and tasks, freeing up your human agents to focus on more complex, high-value interactions.',
    },
  ];

  const features = [
    {
      icon: <Settings className="w-8 h-8 text-blue-400" />,
      title: 'Seamless CRM Integration',
      description: 'Connect your AI agents to your existing CRM for a unified view of customer interactions and automated data entry.',
    },
    {
      icon: <Languages className="w-8 h-8 text-blue-400" />,
      title: 'Multi-Language Support',
      description: 'Engage a global audience with AI agents that can communicate fluently in multiple languages.',
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: 'Human Handoff',
      description: 'Intelligently escalate complex conversations to human agents, ensuring a smooth transition and optimal issue resolution.',
    },
  ];

  const testimonials = [
    {
      quote: "The AI chatbot transformed our customer support. We're handling 50% more inquiries with the same team size. Incredible!",
      name: 'Sarah Johnson',
      company: 'CEO of Tech Innovators',
      avatar: 'https://images.unsplash.com/photo-1649399045831-40bfde3ef21d',
    },
    {
      quote: "Our sales team is closing deals faster than ever, thanks to the AI voice agent qualifying leads around the clock. It's a game-changer.",
      name: 'Michael Chen',
      company: 'VP of Sales, Future Solutions',
      avatar: '/jurica.jpg',
    },
    {
      quote: "We were skeptical about AI, but the results speak for themselves. Customer satisfaction is at an all-time high.",
      name: 'Emily Rodriguez',
      company: 'Founder of Creative Minds Co.',
      avatar: '/aiony.jpg',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Conversational AI (Voice & Chat) - 99AGENTS.AGENCY</title>
        <meta name="description" content="Elevate your customer engagement with our advanced Conversational AI solutions. Deploy intelligent voice and chatbots for 24/7 sales and support." />
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
            className="text-center mb-20"
          >
            <div className="inline-block p-4 bg-slate-800/50 border border-blue-500/20 rounded-xl mb-6">
              <MessageSquare className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Conversational AI Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Engage customers with intelligent voice and chatbots that provide instant support, drive sales, and streamline communication.
            </p>
          </motion.div>

          <section className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Key Benefits</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/50 border border-emerald-500/20 rounded-xl p-8 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-3 bg-slate-900 border border-emerald-500/30 rounded-lg">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img alt="Abstract visualization of AI chat bubbles and sound waves" className="rounded-xl shadow-2xl w-full h-auto" src="https://images.unsplash.com/photo-1675023035272-3426884896f8" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Powerful Features</h2>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-slate-800 border border-blue-500/30 rounded-lg mt-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">What Our Clients Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card className="bg-slate-800/50 border-blue-500/20 h-full flex flex-col">
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="flex space-x-1 text-yellow-400 mb-4">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                      </div>
                      <p className="text-gray-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <img alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" src={testimonial.avatar} />
                        <div>
                          <p className="font-bold text-white">{testimonial.name}</p>
                          <p className="text-sm text-gray-400">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </motion.div>
      <Contact ctaHeadline="Ready to Revolutionize Your Customer Engagement?" />
      <Footer />
    </>
  );
};

export default ConversationalAIPage;
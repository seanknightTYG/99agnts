import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Award, Target } from "lucide-react";

const About = () => {
  const stats = [
    { icon: <Users className="w-6 h-6" />, number: "50+", label: "Happy Clients" },
    { icon: <Award className="w-6 h-6" />, number: "100+", label: "Projects Completed" },
    { icon: <Target className="w-6 h-6" />, number: "5+", label: "Years Experience" },
    { icon: <MapPin className="w-6 h-6" />, number: "1", label: "Northern CA Location" },
  ];

  return (
    <section className=" py-24 overflow-hidden bg-slate-900/50 ">
      {/* angled background accent */}
      <div className="absolute inset-0 -skew-y-3 bg-gradient-to-br  via-slate-800 to-slate-900 opacity-90"></div>

      <div className="container relative mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight text-white">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">99AGENTS</span>
              </h2>
              <div className="h-1 w-24 mt-4 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"></div>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              Based in beautiful Northern California, we're a cutting-edge digital agency
              specializing in AI-powered solutions, stunning graphic design, and innovative web development.
            </p>

            <p className="text-base text-gray-400 leading-relaxed">
              Our team combines creative excellence with technical expertise to deliver transformative digital experiences. 
              We believe in the power of AI and automation to revolutionize how businesses operate and connect with their audiences.
            </p>

            {/* Stats redesigned */}
            {/* <div className="mt-8 space-y-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 text-emerald-400">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>

          {/* Right Content - Floating Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                alt="99AGENTS team working on AI and design projects"
                className="w-full h-[450px] object-cover"
                src="https://images.unsplash.com/photo-1596591624582-00488d03a623?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

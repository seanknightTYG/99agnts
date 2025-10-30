import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Airtable from "airtable";

const Contact = ({ ctaHeadline }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    goals: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetOptions = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Unsure / Still planning"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBudgetChange = (value) => {
    setFormData({
      ...formData,
      budget: value
    });
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

    try {
    const response = await fetch(
      `https://api.airtable.com/v0/apprqMpXV3bN0RS0b/Leads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: formData.name,
            Email: formData.email,
            Company: formData.company,
            "Project Goals": formData.goals,
            Budget: formData.budget,
            Status: "New",
            Notes: "",
            "Lead Source": "Website Form",
            "Contacted?": false,
          },
        }),
      }
    );

    const data = await response.json();
    console.log(data,"fs");
    

    if (!response.ok) {
      throw new Error(data.error?.message || "Airtable request failed");
    }

    toast({
      title: "Success!",
      description: "Redirecting you to book your call...",
      className: "bg-emerald-500 text-white",
    });

    // Redirect to Calendly
     window.location.href = `https://calendly.com/99agnts/digital-discovery-call-clone?name=${encodeURIComponent(
    formData.name
  )}&email=${encodeURIComponent(formData.email)}&a1=${encodeURIComponent(
    formData.company
  )}&a2=${encodeURIComponent(formData.goals)}`;
} catch (error) {
    console.error("Error:", error);
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was an error submitting the form. Please try again.",
    });
  }

  setIsSubmitting(false);
};

  return (
    <section className="py-20 px-6 bg-slate-900/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              {ctaHeadline || "Let's Outline Your Path to Success."}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            You have the vision; we have the expertise to bring it to life. In just 30 minutes, we can map out a clear strategy for your project. No fluff, no sales pitch—just a productive conversation about your goals.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-8 lg:p-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Book Your Complimentary Discovery Call
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="block text-white font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500/50 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-white font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500/50 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company" className="block text-white font-medium mb-2">
                  What is your website or company name?
                </Label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500/50 focus:outline-none transition-colors"
                  placeholder="e.g., 99agents.agency"
                />
              </div>

              <div>
                <Label htmlFor="goals" className="block text-white font-medium mb-2">
                  Tell us about your project goals. <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500/50 focus:outline-none transition-colors resize-none"
                  placeholder="What are you hoping to achieve?"
                />
              </div>

              <div>
                <Label className="block text-white font-medium mb-3">
                  What is your estimated budget for this project? <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  required
                  name="budget"
                  onValueChange={handleBudgetChange}
                  value={formData.budget}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {budgetOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="text-gray-300 font-normal">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white py-4 text-lg group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Book My Call
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

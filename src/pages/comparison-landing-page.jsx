import React, { useState } from "react";
import {
  Target,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Search,
  Shield,
} from "lucide-react";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import CompareModal from "../components/CompareModal";

export default function ComparisonLandingPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Helmet>
        <title>
          Website Comparison Tool | AI-Powered SEO & Performance Audit -
          99agents.agency
        </title>
        <meta
          name="description"
          content="Transform your Humboldt County business with AI solutions. Chatbots, automation, data analysis & intelligent systems. Serving Eureka, Arcata & Northern California."
        />
        <meta
          name="keywords"
          content="AI solutions Humboldt County, business automation Eureka, AI chatbots Arcata, artificial intelligence Northern California"
        />
      </Helmet>
      <Header />

      <div className="mt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-cyan-950 border border-cyan-500 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-semibold">
                  Powered by Google Lighthouse + Claude AI
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Is Your Website{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                  Losing Customers
                </span>{" "}
                to Your Competitors?
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Discover exactly where your website falls short. Get an
                AI-powered competitive analysis in 60 seconds that reveals why
                visitors choose your competitors over you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  // onClick={() => setIsModalOpen(true)}
                  onClick={() => navigate("/website-comparison-page")}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-900 rounded-lg font-bold text-lg hover:from-cyan-400 hover:to-teal-300 transition-all shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2"
                >
                  Analyze My Website Now
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate("/realComparison-example")}
                  className="px-8 py-4 bg-slate-800 border-2 border-cyan-500 text-white rounded-lg font-bold text-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  See Example Report
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <span>Free Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <span>Results in 60 Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        <div className="bg-slate-950 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Every Day Your Website Underperforms,
                <br />
                You're Handing Money to Your Competitors
              </h2>
              <p className="text-xl text-slate-400">
                Here's what's happening right now while you're reading this:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-red-950 to-slate-900 border border-red-900 rounded-xl p-6">
                <div className="text-4xl font-bold text-red-400 mb-3">53%</div>
                <div className="text-white font-semibold mb-2">
                  of mobile visitors leave
                </div>
                <div className="text-slate-400 text-sm">
                  if your site takes longer than 3 seconds to load
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-950 to-slate-900 border border-orange-900 rounded-xl p-6">
                <div className="text-4xl font-bold text-orange-400 mb-3">
                  88%
                </div>
                <div className="text-white font-semibold mb-2">
                  won't return after
                </div>
                <div className="text-slate-400 text-sm">
                  a single bad experience on your website
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-950 to-slate-900 border border-yellow-900 rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-400 mb-3">
                  $2.6M
                </div>
                <div className="text-white font-semibold mb-2">
                  lost per year
                </div>
                <div className="text-slate-400 text-sm">
                  on average due to slow page load times
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border-l-4 border-cyan-500 rounded-lg p-6">
              <p className="text-slate-300 text-lg">
                <strong className="text-white">The worst part?</strong> You
                probably don't even know your website is the problem. Your
                competitors do the same thing you do, but their website loads
                faster, ranks higher, and converts better. You're losing deals
                you'll never hear about.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                See Exactly Where You're Losing to Competitors
              </h2>
              <p className="text-xl text-slate-400">
                Our AI-powered tool runs a Google Lighthouse audit on both
                websites and uses Claude AI to analyze the results
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="bg-slate-800 border-2 border-cyan-500 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    1. Enter Both URLs
                  </h3>
                  <p className="text-slate-400">
                    Simply paste your website and your competitor's website. No
                    signup required.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-cyan-500" />
                </div>
              </div>

              <div className="relative">
                <div className="bg-slate-800 border-2 border-slate-600 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    2. AI Analysis
                  </h3>
                  <p className="text-slate-400">
                    Google Lighthouse measures performance, SEO, accessibility,
                    and best practices. Claude AI compares the results.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-cyan-500" />
                </div>
              </div>

              <div className="bg-slate-800 border-2 border-slate-600 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  3. Get Your Report
                </h3>
                <p className="text-slate-400">
                  Receive a detailed PDF report with specific recommendations on
                  how to beat your competition.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <div className="bg-slate-950 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What's Inside Your Free Analysis Report
              </h2>
              <p className="text-xl text-slate-400">
                Everything you need to know about why you're losing to
                competitors
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-cyan-950 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Performance Score Comparison
                  </h3>
                  <p className="text-slate-400 text-sm">
                    See side-by-side how your website's speed stacks up.
                    Includes Core Web Vitals, page load times, and time to
                    interactive.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-cyan-950 rounded-lg flex items-center justify-center">
                    <Search className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    SEO Battle Analysis
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Discover why your competitor ranks higher. Get insights on
                    meta tags, structured data, mobile-friendliness, and more.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-cyan-950 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Security & Best Practices
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Identify security vulnerabilities and technical issues that
                    could be costing you customers and search rankings.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-cyan-950 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    AI-Powered Action Plan
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Claude AI analyzes the data and provides specific,
                    prioritized recommendations you can implement immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Trusted by Forward-Thinking Companies
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-cyan-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 mb-4">
                  "This tool showed us we were losing 40% of mobile traffic due
                  to slow load times. After implementing their recommendations,
                  our conversion rate doubled."
                </p>
                <div className="text-sm">
                  <div className="text-white font-semibold">Sarah Chen</div>
                  <div className="text-slate-400">
                    Head of Marketing, TechFlow
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-cyan-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 mb-4">
                  "I had no idea my competitor's SEO was beating us by 30
                  points. The AI recommendations were spot-on and easy to
                  implement. We're now ranking #1."
                </p>
                <div className="text-sm">
                  <div className="text-white font-semibold">
                    Marcus Rodriguez
                  </div>
                  <div className="text-slate-400">Founder, GrowthLabs</div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-cyan-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 mb-4">
                  "Best free tool I've ever used. The PDF report was so
                  detailed, we used it to convince our CEO to invest in website
                  optimization. ROI was 10x."
                </p>
                <div className="text-sm">
                  <div className="text-white font-semibold">Emily Thompson</div>
                  <div className="text-slate-400">VP of Digital, RetailCo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Credibility */}
        <div className="bg-slate-950 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Powered by Industry-Leading Technology
              </h2>
              <p className="text-xl text-slate-400">
                We use the same tools Google and Fortune 500 companies rely on
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-800 border-2 border-cyan-500 rounded-xl p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔦</div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Google Lighthouse
                  </h3>
                  <p className="text-slate-400">
                    The same auditing tool Google uses to measure website
                    quality. It's the industry standard for performance testing.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800 border-2 border-cyan-500 rounded-xl p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Claude AI
                  </h3>
                  <p className="text-slate-400">
                    Anthropic's advanced AI analyzes the data and provides
                    human-readable insights and actionable recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-400 rounded-2xl p-12 text-center shadow-2xl shadow-cyan-500/50">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Ready to Stop Losing Customers?
              </h2>
              <p className="text-xl text-slate-800 mb-8">
                Get your free competitive analysis in the next 60 seconds. No
                signup, no credit card, no tricks.
              </p>
              <button
                // onClick={() => setIsModalOpen(true)}
                onClick={() => navigate("/website-comparison-page")}
                className="px-10 py-5 bg-slate-900 text-white rounded-lg font-bold text-xl hover:bg-slate-800 transition-all shadow-lg inline-flex items-center gap-3"
              >
                Analyze My Website Now
                <ArrowRight className="w-6 h-6" />
              </button>
              <p className="text-sm text-slate-700 mt-6">
                Join 10,000+ businesses who've already discovered what they're
                missing
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-950 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  Is this really free?
                </h3>
                <p className="text-slate-400">
                  Yes, 100% free. No credit card required. We built this tool to
                  help businesses understand their competitive position. If you
                  need help implementing the recommendations, we offer that as a
                  paid service.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  How accurate is the analysis?
                </h3>
                <p className="text-slate-400">
                  We use Google Lighthouse, the same tool Google uses to measure
                  website quality. The AI analysis from Claude provides insights
                  based on proven SEO and performance best practices.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  Can I compare multiple competitors?
                </h3>
                <p className="text-slate-400">
                  The free version compares one-on-one. If you need to compare
                  against multiple competitors or want ongoing monitoring,
                  contact us for our premium analysis service.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  What if I need help implementing the recommendations?
                </h3>
                <p className="text-slate-400">
                  That's what we do! 99agents.agency specializes in website
                  optimization and AI-powered solutions. Schedule a free
                  consultation and we'll create a custom implementation plan for
                  you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-slate-400 mb-6">
              Built with ❤️ by 99agents.agency - Creative Solutions, Intelligent
              Results
            </p>
            <button 
            onClick={() => navigate("/website-comparison-page")}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-900 rounded-lg font-bold hover:from-cyan-400 hover:to-teal-300 transition-all inline-flex items-center gap-2">
              Start Your Free Analysis
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <CompareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

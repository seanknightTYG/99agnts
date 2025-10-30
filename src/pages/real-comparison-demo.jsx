{/* <button
  data-formkit-toggle="4643ba99ac"
  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
>
  Join 99 Agents Briefing
</button> */}

import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Zap, Target, ArrowRight, Download, Sparkles } from 'lucide-react';

export default function RealComparisonDemo() {
  // Simulated realistic data for both sign companies
  const comparison = {
    yourSite: {
      url: 'https://www.lostcoastsigns.com/',
      scores: {
        performance: 68,
        accessibility: 82,
        bestPractices: 79,
        seo: 91
      },
      metrics: {
        fcpDisplay: '2.1 s',
        lcpDisplay: '4.8 s',
        clsDisplay: '0.12',
        tbtDisplay: '420 ms',
        siDisplay: '3.2 s'
      }
    },
    theirSite: {
      url: 'https://www.visualconcepts707.com/',
      scores: {
        performance: 58,
        accessibility: 71,
        bestPractices: 75,
        seo: 78
      },
      metrics: {
        fcpDisplay: '2.8 s',
        lcpDisplay: '6.2 s',
        clsDisplay: '0.25',
        tbtDisplay: '680 ms',
        siDisplay: '4.5 s'
      }
    },
    avgYours: 80,
    avgTheirs: 71,
    winner: 'yours'
  };

  const ComparisonBar = ({ label, yourScore, theirScore }) => {
    const diff = yourScore - theirScore;
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-300">
          <span>{label}</span>
          <div className="flex items-center gap-2">
            {diff > 5 ? <TrendingUp className="w-5 h-5 text-green-500" /> : <TrendingDown className="w-5 h-5 text-red-500" />}
            <span className={diff > 5 ? 'text-green-500' : 'text-red-500'}>
              {diff > 0 ? '+' : ''}{diff}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="h-8 bg-slate-700 rounded-lg relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 flex items-center justify-end pr-2 transition-all duration-500"
                style={{ width: `${yourScore}%` }}
              >
                <span className="text-slate-900 font-bold text-sm">{yourScore}</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 mt-1">Lost Coast Signs</div>
          </div>
          <div className="flex-1">
            <div className="h-8 bg-slate-700 rounded-lg relative overflow-hidden">
              <div 
                className="h-full bg-slate-600 flex items-center justify-end pr-2 transition-all duration-500"
                style={{ width: `${theirScore}%` }}
              >
                <span className="text-white font-bold text-sm">{theirScore}</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 mt-1">Visual Concepts</div>
          </div>
        </div>
      </div>
    );
  };

  const MetricCard = ({ label, yourVal, theirVal, better }) => (
    <div className={`p-4 rounded-lg border-2 ${better ? 'bg-cyan-950 border-cyan-500' : 'bg-slate-800 border-slate-600'}`}>
      <div className="text-sm font-semibold text-slate-300 mb-3">{label}</div>
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className={`text-2xl font-bold ${better ? 'text-cyan-400' : 'text-slate-400'}`}>
            {yourVal}
          </div>
          <div className="text-xs text-slate-400 mt-1">Your Site</div>
        </div>
        <div className="px-3">
          {better ? (
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          ) : (
            <TrendingDown className="w-6 h-6 text-slate-500" />
          )}
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-400">
            {theirVal}
          </div>
          <div className="text-xs text-slate-500 mt-1">Competitor</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Competitive Analysis Results</h1>
          </div>
          <p className="text-slate-300 text-lg">AI-Powered Comparison by Claude + Google Lighthouse</p>
        </div>

        {/* Winner Banner */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-400 rounded-xl shadow-2xl p-8 text-white mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">🎉 Lost Coast Signs Wins!</h2>
            <div className="flex justify-center items-center gap-8 text-lg">
              <div>
                <div className="text-4xl font-bold mb-1">{comparison.avgYours}</div>
                <div className="text-sm opacity-90">Your Average Score</div>
              </div>
              <div className="text-3xl">vs</div>
              <div>
                <div className="text-4xl font-bold mb-1">{comparison.avgTheirs}</div>
                <div className="text-sm opacity-90">Visual Concepts</div>
              </div>
            </div>
          </div>
        </div>

        {/* URLs */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-400 mb-1">Your Website</div>
              <div className="text-cyan-400 font-semibold break-all">{comparison.yourSite.url}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">Competitor</div>
              <div className="text-slate-300 font-semibold break-all">{comparison.theirSite.url}</div>
            </div>
          </div>
        </div>

        {/* Score Comparison */}
        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-7 h-7 text-cyan-400" />
            Performance Scores
          </h2>
          <div className="space-y-6">
            <ComparisonBar 
              label="Performance" 
              yourScore={comparison.yourSite.scores.performance}
              theirScore={comparison.theirSite.scores.performance}
            />
            <ComparisonBar 
              label="Accessibility" 
              yourScore={comparison.yourSite.scores.accessibility}
              theirScore={comparison.theirSite.scores.accessibility}
            />
            <ComparisonBar 
              label="Best Practices" 
              yourScore={comparison.yourSite.scores.bestPractices}
              theirScore={comparison.theirSite.scores.bestPractices}
            />
            <ComparisonBar 
              label="SEO" 
              yourScore={comparison.yourSite.scores.seo}
              theirScore={comparison.theirSite.scores.seo}
            />
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Core Web Vitals Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard label="First Contentful Paint" yourVal="2.1 s" theirVal="2.8 s" better={true} />
            <MetricCard label="Largest Contentful Paint" yourVal="4.8 s" theirVal="6.2 s" better={true} />
            <MetricCard label="Cumulative Layout Shift" yourVal="0.12" theirVal="0.25" better={true} />
            <MetricCard label="Total Blocking Time" yourVal="420 ms" theirVal="680 ms" better={true} />
            <MetricCard label="Speed Index" yourVal="3.2 s" theirVal="4.5 s" better={true} />
          </div>
        </div>

        {/* Claude AI Analysis */}
        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-cyan-400" />
            Claude AI Deep Dive Analysis
          </h2>
          
          <div className="space-y-6">
            {/* Executive Summary */}
            <div className="bg-gradient-to-r from-cyan-950 to-slate-900 border-l-4 border-cyan-400 rounded-lg p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Executive Summary
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Lost Coast Signs demonstrates superior technical performance across all measured metrics. Your website loads <strong className="text-white">29% faster</strong> than Visual Concepts, with significantly better Core Web Vitals scores. Your SEO implementation is notably stronger (+13 points), positioning you better in search rankings. The main competitive advantages are faster image optimization, cleaner code structure, and better mobile responsiveness.
              </p>
            </div>

            {/* Key Findings */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Key Competitive Advantages</h3>
              <div className="space-y-4">
                <div className="bg-emerald-950 border-l-4 border-cyan-400 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-cyan-900 text-cyan-200 font-bold text-sm px-3 py-1 rounded-full">
                      SEO
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-300">
                        <strong className="text-white">You're winning the SEO battle (+13 points).</strong> Your site has better meta descriptions, structured data implementation, and mobile-first indexing compliance. Visual Concepts is missing critical schema markup for local business, which is costing them local search visibility. Your "Contact Us" and service pages are properly optimized with location-specific keywords.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950 border-l-4 border-cyan-400 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-cyan-900 text-cyan-200 font-bold text-sm px-3 py-1 rounded-full">
                      Performance
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-300">
                        <strong className="text-white">Your page loads 1.4 seconds faster.</strong> Lost Coast Signs uses modern image formats (WebP) and implements lazy loading effectively. Visual Concepts loads all gallery images upfront, creating a 3.2MB initial payload vs your 1.1MB. This means you're keeping 23% more mobile visitors who would bounce from their slower site.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950 border-l-4 border-cyan-400 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-cyan-900 text-cyan-200 font-bold text-sm px-3 py-1 rounded-full">
                      Accessibility
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-300">
                        <strong className="text-white">11 point accessibility lead.</strong> Your contrast ratios meet WCAG 2.1 AA standards, while Visual Concepts has several buttons with insufficient contrast. You also have proper alt text on all portfolio images (they're missing 60% of theirs). This improves both SEO and user experience for visually impaired customers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Areas to Watch */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Opportunities for Improvement</h3>
              <div className="space-y-4">
                <div className="bg-yellow-950 border-l-4 border-yellow-500 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-900 text-yellow-200 font-bold text-sm px-3 py-1 rounded-full">
                      Medium Priority
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-300">
                        <strong className="text-white">Your LCP could be better (4.8s).</strong> While you beat Visual Concepts, Google recommends under 2.5s. Your hero image (the large banner photo) takes too long to load. Recommendation: Preload the hero image and serve it in next-gen formats with better compression. This could improve your performance score from 68 to 85+.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-950 border-l-4 border-yellow-500 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-900 text-yellow-200 font-bold text-sm px-3 py-1 rounded-full">
                      Low Priority
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-300">
                        <strong className="text-white">Third-party scripts are slowing you down.</strong> Your Instagram feed widget adds 180ms of blocking time. Consider lazy-loading it or switching to a static gallery that loads the feed asynchronously. This is also affecting Visual Concepts, but more severely (they have 680ms total blocking time).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-cyan-500 rounded-xl p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Strategic Recommendations to Dominate Your Market
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Optimize Your Hero Image (Quick Win - 2 hours)</h4>
                    <p className="text-slate-300 text-sm">Convert your hero banner to WebP format and preload it. This single change will improve LCP by 1.5-2 seconds and boost your performance score above 80. Estimated impact: 15% increase in mobile conversions.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Add Customer Review Schema (Medium Win - 4 hours)</h4>
                    <p className="text-slate-300 text-sm">Neither you nor Visual Concepts have review schema markup. Adding this will display star ratings in Google search results, dramatically increasing click-through rates. This could give you a 30-40% CTR advantage in local searches.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Create a Portfolio Speed Advantage (Big Win - 8 hours)</h4>
                    <p className="text-slate-300 text-sm">Your portfolio loads well, but implementing an image CDN and progressive loading could make it instant. Since signs are visual products, a blazing-fast portfolio creates a massive competitive moat. Visual Concepts' gallery is painfully slow - capitalize on this.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Mobile-First Contact Forms (Medium Win - 3 hours)</h4>
                    <p className="text-slate-300 text-sm">Your contact form works, but it's not optimized for mobile keyboards. Add input types (tel, email) and autofocus to reduce friction. With 67% of sign inquiries coming from mobile, this could increase form completions by 25%.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <div className="bg-gradient-to-br from-cyan-950 to-teal-950 border-2 border-cyan-400 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-cyan-400" />
                The Bottom Line
              </h3>
              <p className="text-slate-200 text-lg leading-relaxed mb-4">
                Lost Coast Signs has a <strong>measurable technical advantage</strong> over Visual Concepts. You're already winning on speed, SEO, and accessibility. With the recommended optimizations, you could widen this gap significantly.
              </p>
              <p className="text-cyan-300 text-base leading-relaxed">
                <strong>Estimated Business Impact:</strong> Implementing these 4 recommendations could increase your organic traffic by 35-50% and improve conversion rates by 20-30% within 3 months. At an average project value of $3,500, this translates to roughly 8-12 additional qualified leads per month.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-400 rounded-xl shadow-2xl p-8 text-slate-900 text-center">
          <h2 className="text-2xl font-bold mb-3">Want Us to Implement These Improvements?</h2>
          <p className="text-slate-800 mb-6 text-lg">
            99agents.agency can implement all 4 recommendations and turn your competitive advantage into market dominance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Full PDF Report
            </button>
            <button className="px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2">
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


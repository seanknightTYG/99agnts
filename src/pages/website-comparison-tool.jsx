import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Minus, Target, Zap, Download, Sparkles,Info } from 'lucide-react';
import { useLocation } from 'react-router-dom'
import ModernReactLoader from "../components/Loader";

export default function WebsiteComparisonTool() {
  const location = useLocation()
  const [jsPDFLoaded, setJsPDFLoaded] = useState(false);
  const [yourUrl, setYourUrl] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState(null);
  const [error, setError] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [submittingEmail, setSubmittingEmail] = useState(false);

   useEffect(() => {
    if (location.state?.yourUrl && location.state?.competitorUrl) {
      setYourUrl(location.state.yourUrl);
      setCompetitorUrl(location.state.competitorUrl);
    }
  }, [location.state]);

  useEffect(() => {
  if (location.state?.yourUrl && location.state?.competitorUrl) {
    setYourUrl(location.state.yourUrl);
    setCompetitorUrl(location.state.competitorUrl);
    compareWebsites(); 
  }
}, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => setJsPDFLoaded(true);
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  

  const analyzeSite = async (url) => {
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY;
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(cleanUrl)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile&key=${apiKey}`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Failed to analyze ${cleanUrl}`);
    
    const data = await response.json();
    const lighthouse = data.lighthouseResult;
    
    return {
      url: cleanUrl,
      scores: {
        performance: Math.round(lighthouse.categories.performance.score * 100),
        accessibility: Math.round(lighthouse.categories.accessibility.score * 100),
        bestPractices: Math.round(lighthouse.categories['best-practices'].score * 100),
        seo: Math.round(lighthouse.categories.seo.score * 100)
      },
      metrics: {
        fcp: lighthouse.audits['first-contentful-paint']?.numericValue || 0,
        fcpDisplay: lighthouse.audits['first-contentful-paint']?.displayValue || 'N/A',
        lcp: lighthouse.audits['largest-contentful-paint']?.numericValue || 0,
        lcpDisplay: lighthouse.audits['largest-contentful-paint']?.displayValue || 'N/A',
        cls: lighthouse.audits['cumulative-layout-shift']?.numericValue || 0,
        clsDisplay: lighthouse.audits['cumulative-layout-shift']?.displayValue || 'N/A',
        tbt: lighthouse.audits['total-blocking-time']?.numericValue || 0,
        tbtDisplay: lighthouse.audits['total-blocking-time']?.displayValue || 'N/A',
        si: lighthouse.audits['speed-index']?.numericValue || 0,
        siDisplay: lighthouse.audits['speed-index']?.displayValue || 'N/A'
      }
    };
  };

  // Calculate AEO (AI Readiness Score)
const calculateAEO = (scores) => {
  return Math.round(
    (scores.seo * 0.4) +
    (scores.accessibility * 0.2) +
    (scores.performance * 0.2) +
    (scores.bestPractices * 0.2)
  );
};




  const compareWebsites = async () => {
    if (!yourUrl || !competitorUrl) return;
    
    setLoading(true);
    setError(null);
    setComparison(null);

    try {
      const [yourSite, theirSite] = await Promise.all([
        analyzeSite(yourUrl),
        analyzeSite(competitorUrl)
      ]);

      yourSite.scores.aeo = calculateAEO(yourSite.scores);
      theirSite.scores.aeo = calculateAEO(theirSite.scores);

      const differences = {
        performance: yourSite.scores.performance - theirSite.scores.performance,
        accessibility: yourSite.scores.accessibility - theirSite.scores.accessibility,
        bestPractices: yourSite.scores.bestPractices - theirSite.scores.bestPractices,
        seo: yourSite.scores.seo - theirSite.scores.seo,
        aeo: yourSite.scores.aeo - theirSite.scores.aeo 
      };

      const avgYours = Object.values(yourSite.scores).reduce((a, b) => a + b, 0) / 5;
const avgTheirs = Object.values(theirSite.scores).reduce((a, b) => a + b, 0) / 5;

  
      const yourAEO = calculateAEO(yourSite.scores);
      const theirAEO = calculateAEO(theirSite.scores);

      setComparison({
        yourSite,
        theirSite,
        differences,
        avgYours: Math.round(avgYours),
        avgTheirs: Math.round(avgTheirs),
        winner: avgYours > avgTheirs ? 'yours' : avgYours < avgTheirs ? 'theirs' : 'tie',
        yourAEO,
        theirAEO
      });
      setLoading(false);

      // Generate Claude prompt dynamically
const prompt = `
Compare the following two websites and provide insights for improvement:
- Your site: ${yourUrl}
- Competitor: ${competitorUrl}

Scores:
Your site:
Performance: ${yourSite.scores.performance}
Accessibility: ${yourSite.scores.accessibility}
Best Practices: ${yourSite.scores.bestPractices}
SEO: ${yourSite.scores.seo}
AEO: get AEO score on the basis of data provided by pagespeed for ${yourUrl}

Competitor:
Performance: ${theirSite.scores.performance}
Accessibility: ${theirSite.scores.accessibility}
Best Practices: ${theirSite.scores.bestPractices}
SEO: ${theirSite.scores.seo}
AEO: get AEO score on the basis of data provided by pagespeed for ${competitorUrl}

Please provide concise and actionable insights (max 4-5 bullet points) for how the user can improve their website to outperform the competitor.
`;

const aiResponse = await getClaudeInsights(prompt);
setComparison(prev => ({ ...prev, aiInsights: aiResponse }));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getClaudeInsights = async (prompt) => {
  try {
    const response = await fetch("https://archon.99agents.agency/api/mcp/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (err) {
    console.error("Error calling Claude API:", err);
    return "Sorry, I couldn’t generate AI insights at this time.";
  }
};


  const generateAIInsights = () => {
    if (!comparison) return [];
    
    const insights = [];
    const { yourSite, theirSite, differences } = comparison;

    if (differences.performance < -10) {
      insights.push({
        type: 'critical',
        category: 'Performance',
        message: `Your site is significantly slower than your competitor (-${Math.abs(differences.performance)} points). Focus on optimizing images, reducing JavaScript, and enabling caching.`
      });
    } else if (differences.performance > 10) {
      insights.push({
        type: 'success',
        category: 'Performance',
        message: `Excellent! Your site loads ${differences.performance} points faster than your competitor. This gives you a competitive edge.`
      });
    }

    if (differences.accessibility < -10) {
      insights.push({
        type: 'warning',
        category: 'Accessibility',
        message: `Your accessibility score is ${Math.abs(differences.accessibility)} points lower. Improve color contrast, add alt text to images, and ensure keyboard navigation works.`
      });
    } else if (differences.accessibility > 10) {
      insights.push({
        type: 'success',
        category: 'Accessibility',
        message: `Great accessibility score! You're ${differences.accessibility} points ahead, making your site more inclusive.`
      });
    }

    if (differences.seo < -10) {
      insights.push({
        type: 'critical',
        category: 'SEO',
        message: `Your SEO score is ${Math.abs(differences.seo)} points lower. Add meta descriptions, improve heading structure, and ensure mobile-friendliness.`
      });
    } else if (differences.seo > 10) {
      insights.push({
        type: 'success',
        category: 'SEO',
        message: `Your SEO is ${differences.seo} points better. You're more likely to rank higher in search results.`
      });
    }

     if (differences.yourAEO < -10) {
      insights.push({
        type: 'critical',
        category: 'AEO',
        message: `Your AEO score is ${Math.abs(differences.yourAEO)} points lower. Add meta descriptions, improve heading structure, and ensure mobile-friendliness.`
      });
    } else if (differences.yourAEO > 10) {
      insights.push({
        type: 'success',
        category: 'AEO',
        message: `Your AEO is ${differences.AEO} points better. You're more likely to rank higher in search results.`
      });
    }

    if (yourSite.metrics.lcp > theirSite.metrics.lcp) {
      const diff = Math.round((yourSite.metrics.lcp - theirSite.metrics.lcp) / 1000 * 10) / 10;
      insights.push({
        type: 'warning',
        category: 'Speed',
        message: `Your Largest Contentful Paint is ${diff}s slower. Users may leave before your page fully loads. Optimize your largest images and hero sections.`
      });
    }

    if (insights.length === 0) {
      insights.push({
        type: 'success',
        category: 'Overall',
        message: 'Your site performs competitively! Continue monitoring and optimizing to maintain your edge.'
      });
    }

    return insights;
  };
  
  const exportToPDF = () => {
    if (!jsPDFLoaded || !comparison) return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let y = 20;
    
    // First page (existing content)
    doc.setFontSize(22);
    doc.setTextColor(67, 56, 202);
    doc.text('Competitive Website Analysis Report', margin, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, y);
    
    y += 15;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Your Website:', margin, y);
    doc.setTextColor(37, 99, 235);
    doc.text(comparison.yourSite.url, margin + 35, y);
    
    y += 8;
    doc.setTextColor(0, 0, 0);
    doc.text('Competitor:', margin, y);
    doc.setTextColor(75, 85, 99);
    doc.text(comparison.theirSite.url, margin + 35, y);
    
    y += 15;
    
    doc.setFillColor(comparison.winner === 'yours' ? 34 : comparison.winner === 'theirs' ? 239 : 59, 
                     comparison.winner === 'yours' ? 197 : comparison.winner === 'theirs' ? 68 : 130,
                     comparison.winner === 'yours' ? 94 : comparison.winner === 'theirs' ? 68 : 246);
    doc.rect(margin, y, pageWidth - 2 * margin, 25, 'F');
    
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    const winnerText = comparison.winner === 'yours' ? 'Your Site Wins!' : 
                       comparison.winner === 'theirs' ? 'Competitor Ahead' : 'Tied Performance';
    doc.text(winnerText, pageWidth / 2, y + 10, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Your Average: ${comparison.avgYours}  vs  Competitor: ${comparison.avgTheirs}`, 
             pageWidth / 2, y + 18, { align: 'center' });
    
    y += 35;
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Performance Scores', margin, y);
    y += 8;
    
    const scores = [
      ['Performance', comparison.yourSite.scores.performance, comparison.theirSite.scores.performance],
      ['Accessibility', comparison.yourSite.scores.accessibility, comparison.theirSite.scores.accessibility],
      ['Best Practices', comparison.yourSite.scores.bestPractices, comparison.theirSite.scores.bestPractices],
      ['SEO', comparison.yourSite.scores.seo, comparison.theirSite.scores.seo],
      ['AEO', comparison.yourSite.scores.aeo, comparison.theirSite.scores.aeo]
    ];
    
    doc.setFontSize(10);
    scores.forEach(([label, yourScore, theirScore]) => {
      const diff = yourScore - theirScore;
      
      doc.setTextColor(0, 0, 0);
      doc.text(label, margin, y);
      
      doc.setTextColor(yourScore >= 90 ? 22 : yourScore >= 50 ? 202 : 220, 
                       yourScore >= 90 ? 163 : yourScore >= 50 ? 138 : 38,
                       yourScore >= 90 ? 74 : yourScore >= 50 ? 4 : 4);
      doc.text(`${yourScore}`, margin + 60, y);
      
      doc.setTextColor(75, 85, 99);
      doc.text(`${theirScore}`, margin + 90, y);
      
      doc.setTextColor(diff > 0 ? 22 : diff < 0 ? 220 : 100, 
                       diff > 0 ? 163 : diff < 0 ? 38 : 100,
                       diff > 0 ? 74 : diff < 0 ? 38 : 100);
      doc.text(`${diff > 0 ? '+' : ''}${diff}`, margin + 120, y);
      
      y += 7;
    });
    
    y += 10;
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Core Web Vitals', margin, y);
    y += 8;
    
    const metrics = [
      ['First Contentful Paint', comparison.yourSite.metrics.fcpDisplay, comparison.theirSite.metrics.fcpDisplay],
      ['Largest Contentful Paint', comparison.yourSite.metrics.lcpDisplay, comparison.theirSite.metrics.lcpDisplay],
      ['Cumulative Layout Shift', comparison.yourSite.metrics.clsDisplay, comparison.theirSite.metrics.clsDisplay],
      ['Total Blocking Time', comparison.yourSite.metrics.tbtDisplay, comparison.theirSite.metrics.tbtDisplay],
      ['Speed Index', comparison.yourSite.metrics.siDisplay, comparison.theirSite.metrics.siDisplay]
    ];
    
    doc.setFontSize(10);
    metrics.forEach(([label, yourVal, theirVal]) => {
      doc.setTextColor(0, 0, 0);
      doc.text(label, margin, y);
      doc.setTextColor(37, 99, 235);
      doc.text(yourVal, margin + 70, y);
      doc.setTextColor(75, 85, 99);
      doc.text(theirVal, margin + 110, y);
      y += 7;
    });
    
    y += 10;
    
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('AI-Powered Insights', margin, y);
    y += 8;
    
    const insights = generateAIInsights();
    doc.setFontSize(9);
    
    insights.forEach((insight) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFillColor(insight.type === 'critical' ? 254 : insight.type === 'warning' ? 254 : 220,
                       insight.type === 'critical' ? 226 : insight.type === 'warning' ? 240 : 252,
                       insight.type === 'critical' ? 226 : insight.type === 'warning' ? 138 : 231);
      doc.roundedRect(margin, y - 3, 30, 6, 2, 2, 'F');
      
      doc.setTextColor(insight.type === 'critical' ? 127 : insight.type === 'warning' ? 161 : 22,
                       insight.type === 'critical' ? 29 : insight.type === 'warning' ? 98 : 163,
                       insight.type === 'critical' ? 29 : insight.type === 'warning' ? 7 : 74);
      doc.text(insight.category, margin + 15, y + 1, { align: 'center' });
      
      doc.setTextColor(55, 65, 81);
      const splitMessage = doc.splitTextToSize(insight.message, pageWidth - margin * 2 - 35);
      doc.text(splitMessage, margin + 35, y);
      
      y += splitMessage.length * 5 + 8;
    });
    
    // Add new page with metrics explanations (EMOJI-FREE VERSION)
    doc.addPage();
    y = 20;
    
    // Score Comparison Metrics Section
    doc.setFontSize(16);
    doc.setTextColor(67, 56, 202);
    doc.text('Score Comparison Metrics', margin, y);
    y += 12;
    
    // // Add decorative element instead of emoji
    // doc.setFillColor(67, 56, 202);
    // doc.rect(margin, y - 2, 3, 12, 'F');
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    const metricSections = [
      {
        title: 'PERFORMANCE',
        color: [37, 99, 235],
        items: [
          'What it is: How fast your website loads and becomes usable',
          'Why it matters: Slow sites lose visitors - 53% of people leave if a page takes over 3 seconds to load',
          'What\'s measured: Page load speed, image optimization, JavaScript efficiency',
          'SCORE RANGE: Good (90-100) | Needs work (50-89) | Poor (0-49)'
        ]
      },
      {
        title: 'ACCESSIBILITY', 
        color: [16, 185, 129],
        items: [
          'What it is: How well your site works for people with disabilities',
          'Why it matters: 15% of people have disabilities, plus it\'s legally required (ADA compliance) and helps SEO',
          'What\'s measured: Screen reader compatibility, keyboard navigation, color contrast, image descriptions',
          'SCORE RANGE: Good (90-100) | Needs work (50-89) | Poor (0-49)'
        ]
      },
      {
        title: 'BEST PRACTICES',
        color: [245, 158, 11],
        items: [
          'What it is: Whether your site follows modern web standards for security and quality',
          'Why it matters: Builds user trust, ensures browser compatibility, and prevents security issues',
          'What\'s measured: HTTPS security, console errors, modern image formats, safe external links',
          'SCORE RANGE: Good (90-100) | Needs work (50-89) | Poor (0-49)'
        ]
      },
      {
        title: 'SEO (SEARCH ENGINE OPTIMIZATION)',
        color: [139, 92, 246],
        items: [
          'What it is: How well your site is set up to rank in Google search results',
          'Why it matters: 93% of online experiences start with a search engine - higher rankings = more free traffic',
          'What\'s measured: Meta titles/descriptions, heading structure, mobile-friendliness, sitemaps, internal linking',
          'SCORE RANGE: Good (90-100) | Needs work (50-89) | Poor (0-49)'
        ]
      },
      {
        title: 'AEO (ANSWER ENGINE OPTIMIZATION)',
        color: [236, 72, 153],
        items: [
          'What it is: How well AI assistants can understand and quote your content',
          'Why it matters: 50% of searches are now voice/AI-powered - this is the future of search',
          'What\'s measured: Structured data, FAQ sections, clear Q&A format, direct answers',
          'SCORE RANGE: Good (80-100) | Needs work (40-79) | Poor (0-39)'
        ]
      }
    ];
    
    metricSections.forEach(section => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      
      // Section header with colored background
      doc.setFillColor(...section.color);
      doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
      
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(section.title, margin + 5, y + 5);
      
      y += 12;
      
      // Section content
      doc.setFontSize(9);
      doc.setTextColor(75, 85, 99);
      
      section.items.forEach(item => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        
        // Use bullet points with same color as section
        doc.setFillColor(...section.color);
        doc.circle(margin + 2, y - 1, 1, 'F');
        
        doc.setTextColor(55, 65, 81);
        const splitText = doc.splitTextToSize(item, pageWidth - 2 * margin - 10);
        doc.text(splitText, margin + 8, y);
        y += splitText.length * 4.5;
      });
      
      y += 8;
    });
    
    // Core Web Vitals Section
    if (y > 180) {
      doc.addPage();
      y = 20;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(67, 56, 202);
    doc.text('Core Web Vitals (Google\'s Speed Metrics)', margin, y);
    y += 12;
    
    // // Add decorative element
    // doc.setFillColor(67, 56, 202);
    // doc.rect(margin, y - 2, 3, 12, 'F');
    
    const webVitals = [
      {
        title: 'FIRST CONTENTFUL PAINT (FCP)',
        subtitle: 'When content first appears',
        color: [59, 130, 246],
        items: [
          'What it is: When the first text or image appears on screen',
          'Why it matters: Users need to see something happening or they\'ll think the site is broken',
          'PERFORMANCE: Good (<1.8s) | Needs work (1.8-3s) | Poor (>3s)'
        ]
      },
      {
        title: 'LARGEST CONTENTFUL PAINT (LCP)',
        subtitle: 'When main content loads', 
        color: [16, 185, 129],
        items: [
          'What it is: When the main content (biggest image/text block) becomes visible',
          'Why it matters: Users feel the page is "mostly loaded" - directly impacts Google rankings',
          'PERFORMANCE: Good (<2.5s) | Needs work (2.5-4s) | Poor (>4s)'
        ]
      },
      {
        title: 'CUMULATIVE LAYOUT SHIFT (CLS)',
        subtitle: 'Visual stability during load',
        color: [245, 158, 11],
        items: [
          'What it is: How much content moves around while the page loads',
          'Why it matters: Moving elements cause misclicks and user frustration',
          'PERFORMANCE: Good (<0.1) | Needs work (0.1-0.25) | Poor (>0.25)',
          'Note: Lower numbers are better!'
        ]
      },
      {
        title: 'TOTAL BLOCKING TIME (TBT)',
        subtitle: 'Page responsiveness',
        color: [239, 68, 68],
        items: [
          'What it is: How long the page freezes and can\'t respond to user input',
          'Why it matters: Frozen pages feel broken and cause "rage clicking"',
          'PERFORMANCE: Good (<200ms) | Needs work (200-600ms) | Poor (>600ms)'
        ]
      },
      {
        title: 'SPEED INDEX',
        subtitle: 'Overall perceived speed',
        color: [139, 92, 246],
        items: [
          'Performance: "Your site is losing customers - every second of delay costs 7% in conversions"',
          'Accessibility: "You\'re missing 15% of potential customers and risking legal issues"',
          'PERFORMANCE: Good (<3.4s) | Moderate (3.4-5.8s) | Slow (>5.8s)'
        ]
      },
      {
        title: 'QUICK TIPS',
        subtitle: 'Tips',
        color: [236, 72, 153],
        items: [
          'What it is: How quickly the page content visually fills in',
          'Why it matters: Measures the overall feeling of speed user experience',
          'PERFORMANCE: Good (<3.4s) | Moderate (3.4-5.8s) | Slow (>5.8s)',
          'SEO: "Your competitors are getting free traffic while you\'re invisible to Google"',
          'AEO: "You\'re missing the AI revolution - competitors will dominate voice search"',
          'Core Web Vitals: "Google is actively penalizing your rankings - these are official ranking factors"',
        ]
      },
      {
        title: 'THE BOTTOM LINE',
        subtitle: 'Summary',
        color: [67, 56, 202],
        items: [
         'Performance + Core Web Vitals = How fast your site feels',
      'SEO = How visible you are in traditional Google search', 
      'AEO = How visible you are to AI and voice assistants',
      'Accessibility = How many people can actually use your site',
      'Best Practices = How trustworthy and reliable your site is',
      '',
      'Each metric directly impacts either:',
      '  - Traffic (SEO/AEO)',
      '  - Conversions (Performance/Accessibility)', 
      '  - Trust (Best Practices)',
      '',
      'All leading to more revenue and business growth.'
        ]
      }
    ];
    
    webVitals.forEach((vital, index) => {
      if (vital.title === 'THE BOTTOM LINE') {
    doc.addPage();
    y = 20;
  }

  if (y > 230 && index < webVitals.length - 1) {
    doc.addPage();
    y = 20;
  }
      
      // Vital header
      doc.setFillColor(...vital.color);
      doc.rect(margin, y, pageWidth - 2 * margin, 6, 'F');
      
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text(vital.title, margin + 5, y + 4);
      
      y += 9;
      
      // Vital subtitle
      doc.setFontSize(8);
      doc.setTextColor(...vital.color);
      doc.text(vital.subtitle, margin + 5, y);
      
      y += 5;
      
      // Vital content
      doc.setFontSize(8);
      doc.setTextColor(75, 85, 99);
      
      vital.items.forEach(item => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        
        doc.setFillColor(...vital.color);
        doc.circle(margin + 2, y - 1, 0.8, 'F');
        
        doc.setTextColor(55, 65, 81);
        const splitText = doc.splitTextToSize(item, pageWidth - 2 * margin - 10);
        doc.text(splitText, margin + 8, y);
        y += splitText.length * 4;
      });
      
      y += 8;
    });
    
  
    
    // Footer on all pages
    const addFooter = (doc) => {
      const footerY = doc.internal.pageSize.height - 10;
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('Want to improve your scores? Contact us for professional optimization services.', 
               pageWidth / 2, footerY, { align: 'center' });
      
      // Page numbers
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, footerY);
      }
    };
    
    addFooter(doc);
    
    const filename = `competitive-analysis-${new Date().getTime()}.pdf`;
    doc.save(filename);
  };

  const handleDownloadClick = () => {
    if (emailSubmitted) {
      exportToPDF();
    } else {
      setShowEmailModal(true);
    }
  };

  const handleEmailSubmit = async () => {
    setEmailError('');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setSubmittingEmail(true);

    try {
      console.log('Email submitted:', email);
      console.log('Analysis data:', {
        yourUrl: comparison.yourSite.url,
        competitorUrl: comparison.theirSite.url,
        yourScore: comparison.avgYours,
        competitorScore: comparison.avgTheirs
      });

       // 🔹 Airtable Integration
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
            fld50HRVR2TWgeXbM: email,
            fldxcotbbyVi7SXQb: comparison.yourSite.url,
            fld7z0sp8ccuRfimy: comparison.theirSite.url,
            fldagv6C6PUddS8iv: "New",
            fldm1q8RJRMODlQ2Y: "Website Comparison Tool",
            fldW8j6qd5POWN3IO: false,
          },
        }),
      }
    );

     if (!response.ok) {
      throw new Error("Failed to save data to Airtable");
    }


    console.log("Saved to Airtable successfully!");

      setEmailSubmitted(true);
      setShowEmailModal(false);
      
      setTimeout(() => exportToPDF(), 300);
      
    } catch (err) {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setSubmittingEmail(false);
    }
  };

  const getDifferenceIcon = (diff) => {
    if (diff > 5) return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (diff < -5) return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-400" />;
  };

  const getDifferenceColor = (diff) => {
    if (diff > 5) return 'text-green-600';
    if (diff < -5) return 'text-red-600';
    return 'text-gray-600';
  };

  const ComparisonBar = ({ label, yourScore, theirScore, difference }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold text-slate-300">
        <span>{label}</span>
        <div className="flex items-center gap-2">
          {getDifferenceIcon(difference)}
          <span className={getDifferenceColor(difference)}>
            {difference > 0 ? '+' : ''}{difference}
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
          <div className="text-xs text-slate-400 mt-1">Your Site</div>
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
          <div className="text-xs text-slate-400 mt-1">Competitor</div>
        </div>
      </div>
    </div>
  );

  const coreWebVitalTooltips = {
  "First Contentful Paint": "Measures how quickly the first piece of content appears on the screen. Aim for < 1.8s.",
  "Largest Contentful Paint": "Measures how quickly the main content loads. Good LCP is under 2.5s.",
  "Cumulative Layout Shift": "Tracks unexpected layout shifts. Lower CLS (<0.1) is better.",
  "Total Blocking Time": "Measures main thread blocking during load. Lower is faster and more responsive.",
  "Speed Index": "Shows how quickly content is visually displayed. Lower is better (<3.4s ideal)."
};

const Tooltip = ({ text, children }) => (
  <div className="relative group inline-block">
    {children}
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-900/95 backdrop-blur-md text-slate-200 text-xs rounded-md px-2 py-1 shadow-lg w-56 text-center z-50">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/95 rotate-45"></div>
    </div>
  </div>
);

  const MetricComparison = ({
  label,
  yourValue,
  theirValue,
  yourDisplay,
  theirDisplay,
  lower = false
}) => {
  const isBetter = lower ? yourValue < theirValue : yourValue > theirValue;

  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        isBetter
          ? "bg-cyan-950 border-cyan-500"
          : "bg-slate-800 border-slate-600"
      }`}
    >
      <div className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-1">
        <Tooltip text={coreWebVitalTooltips[label]}>
          <div className="flex items-center cursor-help">
            <span>{label}</span>
            <Info className="w-4 h-4 text-slate-400 ml-1" />
          </div>
        </Tooltip>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-center">
          <div
            className={`text-2xl font-bold ${
              isBetter ? "text-cyan-400" : "text-cyan-300"
            }`}
          >
            {yourDisplay}
          </div>
          <div className="text-xs text-slate-400 mt-1">Your Site</div>
        </div>

        <div className="px-3">
          {isBetter ? (
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          ) : (
            <TrendingDown className="w-6 h-6 text-slate-500" />
          )}
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-slate-400">
            {theirDisplay}
          </div>
          <div className="text-xs text-slate-500 mt-1">Competitor</div>
        </div>
      </div>
    </div>
  );
};

  return (
    <>
    {loading && <ModernReactLoader />}

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* <Target className="w-12 h-12 text-cyan-400" /> */}
            <img
          src="/99logo.png"
          alt="99Agents Logo"
          loading="lazy"
            className="h-12 sm:h-7 md:h-8 lg:h-10 w-auto 
            object-contain transition-transform duration-300 hover:scale-105"
        />
            
            <h1 className="text-4xl font-bold text-white">Competitive Website Analysis</h1>
          </div>
          <p className="text-slate-300 text-lg">Compare your website against competitors and get actionable insights</p>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 mb-8 border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Your Website</label>
              <input
                type="text"
                value={yourUrl}
                onChange={(e) => setYourUrl(e.target.value)}
                placeholder="yourbusiness.com"
                className="w-full px-4 py-3 bg-slate-900 border-2 border-cyan-500 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-slate-500"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Competitor Website</label>
              <input
                type="text"
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                placeholder="competitor.com"
                className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-600 rounded-lg focus:border-slate-500 focus:outline-none text-white placeholder-slate-500"
                disabled={loading}
              />
            </div>
          </div>

          <button
            onClick={compareWebsites}
            disabled={loading || !yourUrl || !competitorUrl}
            className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-900 rounded-lg font-semibold hover:from-cyan-400 hover:to-teal-300 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all text-lg"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                Analyzing Both Websites...
              </>
            ) : (
              <>
                <Target className="w-6 h-6" />
                Compare Websites
                <ArrowRight className="w-6 h-6" />
                {/* <button
  data-formkit-toggle="4643ba99ac"
  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
>
  Join 99 Agents Briefing
</button> */}
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-900 border-2 border-red-700 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-red-200 text-lg mb-2">Analysis Failed</h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {comparison && (
          <div className="space-y-8">
            <div className={`rounded-xl shadow-2xl p-8 ${
              comparison.winner === 'yours' 
                ? 'bg-gradient-to-r from-cyan-500 to-teal-400' 
                : comparison.winner === 'theirs'
                ? 'bg-gradient-to-r from-red-600 to-orange-600'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
            } text-white`}>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                  {comparison.winner === 'yours' 
                    ? '🎉 Your Site Wins!' 
                    : comparison.winner === 'theirs'
                    ? '⚠️ Competitor Ahead'
                    : '🤝 Tied Performance'}
                </h2>
                <div className="flex justify-center items-center gap-8 text-lg">
                  <div>
                    <div className="text-4xl font-bold mb-1">{comparison.avgYours}</div>
                    <div className="text-sm opacity-90">Your Average Score</div>
                  </div>
                  <div className="text-3xl">vs</div>
                  <div>
                    <div className="text-4xl font-bold mb-1">{comparison.avgTheirs}</div>
                    <div className="text-sm opacity-90">Their Average Score</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-7 h-7 text-cyan-400" />
                Score Comparison
              </h2>
              <div className="space-y-6">
                <ComparisonBar 
                  label="Performance" 
                  yourScore={comparison.yourSite.scores.performance}
                  theirScore={comparison.theirSite.scores.performance}
                  difference={comparison.differences.performance}
                />
                <ComparisonBar 
                  label="Accessibility" 
                  yourScore={comparison.yourSite.scores.accessibility}
                  theirScore={comparison.theirSite.scores.accessibility}
                  difference={comparison.differences.accessibility}
                />
                <ComparisonBar 
                  label="Best Practices" 
                  yourScore={comparison.yourSite.scores.bestPractices}
                  theirScore={comparison.theirSite.scores.bestPractices}
                  difference={comparison.differences.bestPractices}
                />
                <ComparisonBar 
                  label="SEO" 
                  yourScore={comparison.yourSite.scores.seo}
                  theirScore={comparison.theirSite.scores.seo}
                  difference={comparison.differences.seo}
                />
                <ComparisonBar 
                  label="AEO" 
                  yourScore={comparison.yourSite.scores.aeo}
                  theirScore={comparison.theirSite.scores.aeo}
                  difference={comparison.differences.aeo}
                />
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Core Web Vitals Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetricComparison 
                  label="First Contentful Paint"
                  yourValue={comparison.yourSite.metrics.fcp}
                  theirValue={comparison.theirSite.metrics.fcp}
                  yourDisplay={comparison.yourSite.metrics.fcpDisplay}
                  theirDisplay={comparison.theirSite.metrics.fcpDisplay}
                  lower={true}
                />
                <MetricComparison 
                  label="Largest Contentful Paint"
                  yourValue={comparison.yourSite.metrics.lcp}
                  theirValue={comparison.theirSite.metrics.lcp}
                  yourDisplay={comparison.yourSite.metrics.lcpDisplay}
                  theirDisplay={comparison.theirSite.metrics.lcpDisplay}
                  lower={true}
                />
                <MetricComparison 
                  label="Cumulative Layout Shift"
                  yourValue={comparison.yourSite.metrics.cls}
                  theirValue={comparison.theirSite.metrics.cls}
                  yourDisplay={comparison.yourSite.metrics.clsDisplay}
                  theirDisplay={comparison.theirSite.metrics.clsDisplay}
                  lower={true}
                />
                <MetricComparison 
                  label="Total Blocking Time"
                  yourValue={comparison.yourSite.metrics.tbt}
                  theirValue={comparison.theirSite.metrics.tbt}
                  yourDisplay={comparison.yourSite.metrics.tbtDisplay}
                  theirDisplay={comparison.theirSite.metrics.tbtDisplay}
                  lower={true}
                />
                <MetricComparison 
                  label="Speed Index"
                  yourValue={comparison.yourSite.metrics.si}
                  theirValue={comparison.theirSite.metrics.si}
                  yourDisplay={comparison.yourSite.metrics.siDisplay}
                  theirDisplay={comparison.theirSite.metrics.siDisplay}
                  lower={true}
                />
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-cyan-400" />
                AI-Powered Insights
              </h2>
              <div className="space-y-4">

             {comparison?.aiInsights && (
  <div className="relative rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 p-8 shadow-[0_0_40px_-10px_rgba(0,255,255,0.2)] overflow-hidden group transition-all duration-500 hover:shadow-[0_0_60px_-10px_rgba(0,255,255,0.35)] hover:border-cyan-500/50">

    {/* Glow gradient background */}
    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-teal-400/5 to-transparent opacity-70 blur-3xl pointer-events-none"></div>

    {/* Animated corner accents */}
    <div className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-cyan-400/60 to-transparent animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-1/3 h-[1px] bg-gradient-to-l from-cyan-400/60 to-transparent animate-pulse"></div>

    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-400 flex items-center gap-2 tracking-tight">
          <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
          Claude AI Insights
        </h2>

        <div className="px-3 py-1 text-xs rounded-full bg-slate-800/70 border border-slate-600 text-slate-300 tracking-wide">
          Generated • {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* INSIGHTS CONTENT */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-xl shadow-inner transition-all duration-300 group-hover:bg-slate-900/70">
        {comparison.aiInsights === "Fetching AI insights..." ? (
          // 🌀 Shimmer loader while waiting for Claude AI response
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-full h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-md animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
            <p className="text-slate-400 italic mt-4 text-sm">Generating insights...</p>
          </div>
        ) : (
          // ✅ Final AI Insights
          comparison.aiInsights
            .split(/\n+/)
            .filter((line) => line.trim() !== "")
            .map((line, idx) => (
              <div
                key={idx}
                className="text-slate-200 text-base leading-relaxed mb-3 flex items-start gap-3 group/item hover:translate-x-1 transition-transform"
              >
                <span className="text-cyan-400 mt-1.5">•</span>
                <span
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: line
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-cyan-300 font-semibold">$1</strong>'
                      )
                      .replace(
                        /(\d+%)/g,
                        '<span class="text-teal-300 font-bold">$1</span>'
                      ),
                  }}
                ></span>
              </div>
            ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-slate-400 text-right italic">
        ✨ Powered by <span className="text-cyan-300 font-medium">Claude AI</span> — transforming Lighthouse data into insights
      </div>
    </div>
  </div>
)}




              </div>
            </div>

            {!emailSubmitted && (
              <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border-2 border-cyan-500">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-400 rounded-full flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-slate-900" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">Want More Insights?</h3>
                    <p className="text-slate-300 mb-4">Join our newsletter to receive weekly tips on improving your website performance, SEO strategies, and competitive analysis.</p>
                    <button 
                      onClick={() => setShowEmailModal(true)}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-900 rounded-lg font-semibold hover:from-cyan-400 hover:to-teal-300 transition-all inline-flex items-center gap-2"
                    >
                      Subscribe to Newsletter
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {emailSubmitted && (
              <div className="bg-gradient-to-r from-cyan-950 to-teal-950 border-2 border-cyan-400 rounded-xl shadow-2xl p-8 text-center">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">You're Subscribed! 🎉</h3>
                <p className="text-slate-300 mb-4">Thank you for joining our newsletter. Check your inbox for your first optimization tips!</p>
                <p className="text-sm text-cyan-300">Your email: <span className="font-semibold">{email}</span></p>
              </div>
            )}

            <div className="bg-gradient-to-r from-cyan-500 to-teal-400 rounded-xl shadow-2xl p-8 text-slate-900 text-center">
              <h2 className="text-2xl font-bold mb-3">Ready to Outperform Your Competition?</h2>
              <p className="text-slate-800 mb-6 text-lg">Let us optimize your website to dominate search rankings and convert more visitors.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={handleDownloadClick}
                  disabled={!jsPDFLoaded}
                  className="px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  {jsPDFLoaded ? (emailSubmitted ? 'Download PDF Report' : 'Get Your Free PDF Report') : 'Loading PDF...'}
                </button>
                <button
  onClick={() => {
    window.location.href = "https://calendly.com/99agnts/digital-discovery-call-clone";
  }} 
  className="px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
>
  Schedule Free Consultation
</button>
              </div>
            </div>
          </div>
        )}

        {showEmailModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
            onClick={() => setShowEmailModal(false)}
          >
            <div 
              className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative border-2 border-cyan-500"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowEmailModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center text-2xl"
                type="button"
              >
                ×
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Report</h3>
                <p className="text-slate-300">Enter your email to download the full PDF analysis and receive exclusive website optimization tips.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 bg-slate-900 border-2 border-cyan-500 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-slate-500"
                    autoFocus
                  />
                  {emailError && (
                    <p className="text-red-400 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                <button
                  onClick={handleEmailSubmit}
                  disabled={submittingEmail}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-900 rounded-lg font-semibold hover:from-cyan-400 hover:to-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submittingEmail ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    'Download PDF Report'
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-400 text-center mt-4">
                By submitting, you agree to receive our newsletter with web optimization tips. Unsubscribe anytime.
              </p>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">What you'll get:</p>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>✓ Full PDF competitive analysis report</li>
                      <li>✓ Weekly website optimization tips</li>
                      <li>✓ Exclusive offers on our services</li>
                    </ul> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      
      </div>
    </div>
    </>
  );
}
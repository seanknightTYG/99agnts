import React, { useState } from 'react';
import { ArrowRight, Target, X, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CompareModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [yourUrl, setYourUrl] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');

  if (!isOpen) return null;

  const handleCompare = () => {
    if (!yourUrl || !competitorUrl) return;
    onClose();
    navigate('/website-comparison-page', {
      state: { yourUrl, competitorUrl },
    });
  };

  const isFilled = yourUrl && competitorUrl;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl max-w-md w-full shadow-2xl border border-cyan-800 p-8 transition-all scale-100">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
          Compare Your Websites
        </h2>

        {/* Inputs */}
        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              Your Website
            </label>
            <input
              type="text"
              placeholder="yourbusiness.com"
              value={yourUrl}
              onChange={(e) => setYourUrl(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white placeholder-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              Competitor Website
            </label>
            <input
              type="text"
              placeholder="competitor.com"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Compare Button */}
        <button
          onClick={handleCompare}
          disabled={!isFilled}
          className={`w-full px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all
            ${isFilled
              ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-900 hover:from-cyan-400 hover:to-teal-300'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
          `}
        >
          <Target className="w-5 h-5" />
          Compare Websites
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Visual Accent (optional mini card style) */}
        <div className="mt-8 p-4 rounded-lg border-2 bg-slate-800 border-slate-700 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-300">
            Get insights powered by Google Lighthouse + Claude AI
          </div>
          <TrendingUp className="w-5 h-5 text-cyan-400" />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

const SIZE_MAP = {
  sm: {
    spinner: 20,
    dot: 6,
    barHeight: 4,
    text: "text-sm",
  },
  md: {
    spinner: 36,
    dot: 8,
    barHeight: 6,
    text: "text-sm",
  },
  lg: {
    spinner: 48,
    dot: 10,
    barHeight: 8,
    text: "text-base",
  },
};

export default function ModernReactLoader({
  variant = "spinner",
  size = "md",
  text = "Analyzing your websites...",
  className = "",
}) {
  const s = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/70 backdrop-blur-sm">
      {/* Dots variant */}
      {variant === "dots" && (
        <div
          role="status"
          className={`flex flex-col items-center justify-center gap-3 ${className}`}
        >
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                aria-hidden
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.12,
                }}
                className="block rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
                style={{ width: s.dot, height: s.dot }}
              />
            ))}
          </div>
          <p className={`text-cyan-200 ${s.text} select-none`}>{text}</p>
        </div>
      )}

      {/* Bar variant */}
      {variant === "bar" && (
        <div
          role="status"
          className={`w-full max-w-xs mx-auto flex flex-col items-center gap-3 ${className}`}
        >
          <div
            className="w-full bg-slate-700/40 rounded-full overflow-hidden"
            style={{ height: s.barHeight }}
          >
            <motion.div
              className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 h-full"
              initial={{ x: "-40%" }}
              animate={{ x: "120%" }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "linear",
              }}
              style={{ width: "40%" }}
            />
          </div>
          <p className={`text-cyan-200 ${s.text} select-none`}>{text}</p>
        </div>
      )}

      {/* Spinner (default) */}
      {variant === "spinner" && (
        <div
          role="status"
          className={`flex flex-col items-center justify-center gap-3 ${className}`}
        >
          <svg
            width={s.spinner}
            height={s.spinner}
            viewBox="0 0 50 50"
            className="block"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              strokeWidth="5"
              stroke="rgba(255,255,255,0.2)"
              fill="none"
            />
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              stroke="url(#gradient)"
              strokeDasharray="80 80"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>

          <p className={`text-cyan-200 ${s.text} select-none`}>{text}</p>
        </div>
      )}
    </div>
  );
}

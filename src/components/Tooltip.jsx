const Tooltip = ({ text, children }) => (
  <div className="relative group inline-block">
    {children}
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-900 text-slate-200 text-xs rounded-md px-2 py-1 shadow-lg w-48 text-center z-50">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
    </div>
  </div>
);

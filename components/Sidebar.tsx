
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">AI</span>
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-800 leading-tight">BigQuery AI</h1>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Enablement</p>
        </div>
      </div>
      
      <nav className="flex-1 py-4 space-y-1">
        {NAVIGATION_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors
              ${isActive 
                ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Platform Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-600 font-medium">Ready for Demo</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

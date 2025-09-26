
import React from 'react';
import SearchIcon from '../icons/SearchIcon';

const SearchView: React.FC = () => {
  return (
    <div className="p-4 md:p-6 text-slate-900 dark:text-slate-100">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Search</h1>
      <div className="mt-6 p-6 bg-white/40 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-black/10 dark:border-white/10">
        <h2 className="text-2xl font-semibold mb-3">Find Anything</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Use the search bar below to explore content. The glassmorphism effect is applied consistently across all components for a unified look.
        </p>
        <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-slate-200/50 dark:bg-black/20 border border-slate-400/50 dark:border-white/20 rounded-lg py-3 pl-4 pr-12 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-white/50 transition-shadow" 
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none">
                 <SearchIcon className="w-6 h-6" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchView;
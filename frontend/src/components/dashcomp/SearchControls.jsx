import { LayoutGrid, List as ListIcon, Search } from 'lucide-react';
import RecommendedJobs from './RecommendedJobs';

const SearchControls = ({ searchQuery, setSearchQuery, activeView, setActiveView, onJobApplied }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center bg-white dark:bg-brand-800 border border-gray-200 dark:border-brand-700 rounded-xl px-4 py-2 w-full sm:w-96 shadow-sm focus-within:ring-2 focus-within:ring-brand-500 transition-all">
          <Search size={18} className="text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search companies or positions..." 
            className="ml-3 bg-transparent border-none focus:outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 bg-white dark:bg-brand-800 border border-gray-200 dark:border-brand-700 p-1 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveView('board')}
            className={`p-2 rounded-lg transition-all ${activeView === 'board' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
            title="Board View"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`p-2 rounded-lg transition-all ${activeView === 'list' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
            title="List View"
          >
            <ListIcon size={20} />
          </button>
        </div>
      </div>
      
      <RecommendedJobs onJobApplied={onJobApplied} />
    </div>
  );
};

export default SearchControls;

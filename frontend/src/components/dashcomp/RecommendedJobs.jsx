import { useState } from 'react';
import axios from 'axios';
import { ExternalLink, CheckCircle } from 'lucide-react';

const RECOMMENDED_JOBS = [
  {
    id: 1,
    title: "Pharmacy Assistant",
    company: "MedHealth Pharmacy",
    link: "https://www.linkedin.com/jobs/view/4461699383/",
    description: "MedHealth Pharmacy is a community-focused pharmacy dedicated to providing safe, accurate, and compassionate medication services to patients in Edmonton, AB. The pharmacy offers prescription fulfillment, medication counseling, and over-the-counter support..."
  },
  {
    id: 2,
    title: "IT Support Specialist",
    company: "Fleetworthy",
    link: "https://www.linkedin.com/jobs/view/4461495440/",
    description: "Fleetworthy offers the only complete technology suite for fleet readiness, uniting safety and compliance, toll management, and weigh station bypass solutions. We help fleets streamline operations, control costs, and operate with confidence..."
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "Affirm",
    link: "https://www.linkedin.com/jobs/view/4462336840/",
    description: "At Affirm, we exist for the moments that matter—giving people a clear, predictable way to pay over time, with no hidden fees, no surprises, and no tradeoffs on what matters most. Affirm is reinventing credit to make it more honest and friendly..."
  }
];

const RecommendedJobs = ({ onJobApplied }) => {
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const handleToggleAutoApply = async () => {
    if (autoApplyEnabled) {
      setAutoApplyEnabled(false);
      return;
    }
    
    setIsApplying(true);
    // Simulate applying to all recommended jobs for the demo
    for (const job of RECOMMENDED_JOBS) {
      if (!appliedJobs.has(job.id)) {
        try {
          const token = localStorage.getItem('access_token');
          const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
          
          const response = await axios.post('http://localhost:8000/api/applications/auto-apply/', {
            company: job.company,
            position: job.title,
            job_url: job.link,
          }, { headers });
          
          setAppliedJobs(prev => new Set(prev).add(job.id));
          if (onJobApplied && response.data) {
            onJobApplied(response.data);
          }
        } catch (error) {
          console.error("Failed to auto-apply via API, falling back to local update for demo:", error);
          // For demo purposes, we still show it as applied visually
          setAppliedJobs(prev => new Set(prev).add(job.id));
          if (onJobApplied) {
            onJobApplied({
              id: Math.random(),
              company_name: job.company,
              position_title: job.title,
              status: "Applied",
              date_applied: new Date().toISOString().split('T')[0]
            });
          }
        }
      }
    }
    setIsApplying(false);
    setAutoApplyEnabled(true);
  };

  return (
    <div className="mb-8 bg-white dark:bg-brand-800 border border-gray-200 dark:border-brand-700 rounded-xl p-5 shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          ✨ Recommended for You
        </h3>
        
        {/* Toggle Switch */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {isApplying ? "Applying..." : "Auto-Apply to Matches"}
          </span>
          <button 
            onClick={handleToggleAutoApply}
            disabled={isApplying}
            className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${
              autoApplyEnabled ? 'bg-brand-600' : 'bg-gray-300'
            } ${isApplying ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform transform ${
              autoApplyEnabled ? 'translate-x-7' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {RECOMMENDED_JOBS.map((job) => (
          <div key={job.id} className={`border rounded-lg p-4 flex flex-col transition-colors relative overflow-hidden ${
            appliedJobs.has(job.id) ? 'border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/20' : 'border-gray-100 dark:border-brand-700 bg-gray-50/50 dark:bg-brand-800 hover:border-brand-300 dark:hover:border-brand-500'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{job.title}</h4>
                <p className="text-sm font-medium text-brand-600 dark:text-brand-400">{job.company}</p>
              </div>
              <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-brand-500 transition-colors">
                <ExternalLink size={16} />
              </a>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
              {job.description}
            </p>
            
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-brand-700 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Auto Apply Match</span>
              
              {appliedJobs.has(job.id) ? (
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-semibold text-xs bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-md">
                  <CheckCircle size={14} /> Applied
                </div>
              ) : (
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                  Ready
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;


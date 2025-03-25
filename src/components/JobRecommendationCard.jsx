import React, { useState, useEffect } from 'react';
import { fetchJobRecommendations } from '../services';
import { Calendar, MapPin, Briefcase, Tag } from 'lucide-react';

const JobRecommendationCard = ({ job, onCardClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onCardClick(job)}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
        <span className="text-sm text-gray-500">{job.company}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600 mb-2">
        <MapPin size={16} />
        <span>{job.location}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600 mb-2">
        <Briefcase size={16} />
        <span>{job.jobType.replace('_', ' ')}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600 mb-4">
        <Calendar size={16} />
        <span>{new Date(job.publicationDate).toLocaleDateString()}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span 
            key={tag} 
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const JobDetailModal = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-3/4 max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          Close
        </button>
        <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-xl text-gray-700">{job.company}</span>
            <span className="text-gray-500">{job.location}</span>
          </div>
          <span className="text-green-600 font-semibold">{job.jobType.replace('_', ' ')}</span>
        </div>
        <div 
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag) => (
            <span 
              key={tag} 
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <a 
          href={job.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Full Job Listing
        </a>
      </div>
    </div>
  );
};

const JobRecommendations = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setIsLoading(true);
        const response = await fetchJobRecommendations();
        console.log("rec", response)
        if(response && response?.success){
            setJobs(response?.recommendations);
            setIsLoading(false);
        }else{
            setIsLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Job Recommendations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobRecommendationCard 
            key={job.id} 
            job={job} 
            onCardClick={setSelectedJob}
          />
        ))}
      </div>
      {selectedJob && (
        <JobDetailModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}
    </div>
  );
};

export default JobRecommendations;
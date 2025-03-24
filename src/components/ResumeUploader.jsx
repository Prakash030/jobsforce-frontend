import React, { useState, useEffect } from 'react';
import { fetchJobCategories } from '../services';

const ResumeUpload = () => {
  const [resume, setResume] = useState(null);
  const [domain, setDomain] = useState('');
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetchJobCategories();
      if(res){
        setCategories(res)
      }
    };
  
    fetchCategories();
  
  }, []);

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setResume(file);
    } else {
      alert('Please upload a valid PDF or DOC/DOCX file.');
      event.target.value = null; 
      setResume(null);
    }
  };

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!resume) {
      alert('Please upload a resume.');
      return;
    }
    if (!domain) {
      alert('Please select a domain.');
      return;
    }
    console.log('Resume:', resume);
    console.log('Domain:', domain);
    alert('Resume and Domain submitted (check console)');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Upload Resume</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
              Upload Resume (PDF/DOC/DOCX):
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
              Select Domain:
            </label>
            <select
              id="domain"
              value={domain}
              onChange={handleDomainChange}
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="">Select a domain</option>
              {categories?.map((cat) => (
                <option key={cat?.id} value={cat?.slug}>
                  {cat?.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeUpload;
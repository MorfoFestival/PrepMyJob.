import React, { useState, useCallback, useEffect } from 'react';
import { AnalysisDisplay } from '../components/AnalysisDisplay';
import { Loader } from '../components/Loader';
import { analyzeJobDescription } from '../services/geminiService';
import { translations } from '../constants';
import { useAppContext } from '../context/AppContext';
import type { Language, JobAnalysisResult } from '../types';

interface JobAnalysisProps {
    language: Language;
}

export const JobAnalysis: React.FC<JobAnalysisProps> = ({ language }) => {
  const { jobDescription, setJobDescription } = useAppContext();
  const [analysis, setAnalysis] = useState<JobAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const t = translations[language];

  const handleAnalyze = useCallback(async () => {
    if (!jobDescription.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeJobDescription(jobDescription, language);
      setAnalysis(result);
    } 
    // FIX: The catch block had a syntax error and has been corrected.
    catch (err) {
      setError(err instanceof Error ? err.message : t.error);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [jobDescription, language, t.error]);

  return (
    <div className="w-full flex flex-col items-center">
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-8">{t.subtitle}</p>
          
        <div className="w-full max-w-4xl">
            <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={t.placeholder}
                className="w-full h-60 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition text-gray-800 dark:text-gray-200 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 custom-scrollbar"
                disabled={isLoading}
            />
            <button
                onClick={handleAnalyze}
                disabled={isLoading || !jobDescription.trim()}
                className="mt-4 w-full md:w-auto flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-sm"
            >
                {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.buttonLoading}
                </>
                ) : (
                t.buttonText
                )}
            </button>
        </div>
          
        {isLoading && <Loader />}
        {error && <p className="mt-8 text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/30">{error}</p>}
        {analysis && <AnalysisDisplay analysis={analysis} language={language} />}
    </div>
  );
};
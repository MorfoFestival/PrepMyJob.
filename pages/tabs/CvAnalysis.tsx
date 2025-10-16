import React, { useState, useCallback } from 'react';
import { Loader } from '../../components/Loader';
import { Dropzone } from '../../components/Dropzone';
import { analyzeCvAndJob } from '../../services/geminiService';
import { translations } from '../../constants';
import { useAppContext } from '../../context/AppContext';
import type { Language, CvAnalysisResult } from '../../types';

interface CvAnalysisProps {
    language: Language;
}

const ResultCard: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
        <div className="text-gray-600 dark:text-gray-300 space-y-3">{children}</div>
    </div>
);

export const CvAnalysis: React.FC<CvAnalysisProps> = ({ language }) => {
    const { jobDescription, setJobDescription, cvText, setCvText, cvFileName, setCvFileName } = useAppContext();
    const [analysis, setAnalysis] = useState<CvAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const t = translations[language];
    const pageT = t.cvAnalysisPage;

    const handleFileProcessed = (text: string | null, fileName: string | null) => {
        setCvText(text || '');
        setCvFileName(fileName || '');
    };

    const handleAnalyze = useCallback(async () => {
        if (!jobDescription.trim() || !cvText.trim()) return;
        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const result = await analyzeCvAndJob(jobDescription, cvText, language);
            setAnalysis(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.error);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [jobDescription, cvText, language, t.error]);

    const scoreColor = (score: number) => {
        if (score > 75) return 'text-green-500';
        if (score > 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="w-full flex flex-col items-center">
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-8">{pageT.title}</p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-500 max-w-2xl mb-8 -mt-6">{pageT.subtitle}</p>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-md font-semibold text-gray-800 dark:text-gray-300 mb-2">{pageT.jobOfferTitle}</h3>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder={t.placeholder}
                        className="w-full h-48 md:h-60 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition custom-scrollbar"
                        disabled={isLoading}
                    />
                </div>
                 <div>
                    <h3 className="text-md font-semibold text-gray-800 dark:text-gray-300 mb-2">{pageT.cvTitle}</h3>
                    <Dropzone onFileProcessed={handleFileProcessed} language={language} initialFileName={cvFileName} />
                </div>
            </div>

            <button
                onClick={handleAnalyze}
                disabled={isLoading || !jobDescription.trim() || !cvText.trim()}
                className="w-full md:w-auto flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-sm"
            >
                {isLoading ? t.buttonLoading : t.buttonText}
            </button>

            {isLoading && <Loader />}
            {error && <p className="mt-8 text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/30">{error}</p>}

            {analysis && (
                <div className="mt-12 w-full max-w-5xl space-y-6">
                    <h2 className="text-2xl font-bold text-center dark:text-gray-100">{pageT.resultsTitle}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ResultCard title={pageT.score}>
                           <p className={`text-6xl font-bold text-center ${scoreColor(analysis.score)}`}>{analysis.score}<span className="text-3xl">%</span></p>
                        </ResultCard>
                        <div className="lg:col-span-2">
                            <ResultCard title={pageT.summary}>
                                <p>{analysis.summary}</p>
                            </ResultCard>
                        </div>
                    </div>
                    <ResultCard title={pageT.keywordMatch}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">{pageT.presentKeywords}</h4>
                                <ul className="flex flex-wrap gap-2">
                                    {analysis.keywordMatch.present.map((kw, i) => <li key={i} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-green-500/20 dark:text-green-300">{kw}</li>)}
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">{pageT.missingKeywords}</h4>
                                <ul className="flex flex-wrap gap-2">
                                    {analysis.keywordMatch.missing.map((kw, i) => <li key={i} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-red-500/20 dark:text-red-300">{kw}</li>)}
                                </ul>
                            </div>
                        </div>
                    </ResultCard>
                    <ResultCard title={pageT.recommendations}>
                         <ul className="space-y-3">
                            {analysis.recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start">
                                    <svg className="w-5 h-5 mr-3 mt-1 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </ResultCard>
                </div>
            )}
        </div>
    );
};
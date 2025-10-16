import React, { useState, useCallback } from 'react';
import { Loader } from '../components/Loader';
import { Dropzone } from '../components/Dropzone';
import { generateInterviewPrep, getFeedbackOnAnswer } from '../services/geminiService';
import { translations } from '../constants';
import { useAppContext } from '../context/AppContext';
import type { Language, InterviewPrepResult, InterviewQuestion, InterviewFeedbackResult } from '../types';

interface InterviewPrepProps {
    language: Language;
}

export const InterviewPrep: React.FC<InterviewPrepProps> = ({ language }) => {
    const { jobDescription, setJobDescription, cvText, setCvText, cvFileName, setCvFileName } = useAppContext();
    const [useCv, setUseCv] = useState(!!cvText);
    const [result, setResult] = useState<InterviewPrepResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const t = translations[language];
    const pageT = t.interviewPrepPage;

    const handleFileProcessed = (text: string | null, fileName: string | null) => {
        setCvText(text || '');
        setCvFileName(fileName || '');
    };

    const handleGenerate = useCallback(async () => {
        if (!jobDescription.trim()) return;
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const res = await generateInterviewPrep(jobDescription, useCv ? cvText : null, language);
            setResult(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.error);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [jobDescription, cvText, useCv, language, t.error]);

    return (
        <div className="w-full flex flex-col items-center">
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-8">{pageT.title}</p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-500 max-w-2xl mb-8 -mt-6">{pageT.subtitle}</p>

            <div className="w-full max-w-4xl space-y-4">
                 <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder={t.placeholder} className="w-full h-40 p-4 bg-white dark:bg-gray-800 border dark:border-gray-600 border-gray-300 rounded-lg custom-scrollbar" />
                <div className="flex items-center gap-4">
                    <input type="checkbox" id="useCv" checked={useCv} onChange={(e) => setUseCv(e.target.checked)} className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-100 dark:bg-gray-900" />
                    <label htmlFor="useCv" className="text-sm font-medium">{pageT.useCv}</label>
                </div>
                 {useCv && <Dropzone onFileProcessed={handleFileProcessed} language={language} initialFileName={cvFileName}/>}
            </div>
            
            <button onClick={handleGenerate} disabled={isLoading || !jobDescription.trim() || (useCv && !cvText)} className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600">
                {isLoading ? t.buttonLoading : pageT.generateButton}
            </button>

            {isLoading && <Loader />}
            {error && <p className="mt-8 text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/30">{error}</p>}
            
            {result && (
                <div className="mt-12 w-full max-w-4xl space-y-6">
                    <h2 className="text-2xl font-bold text-center dark:text-gray-100">{pageT.resultTitle}</h2>
                    {result.questions.map((q, i) => <QuestionBlock key={i} item={q} language={language} />)}
                </div>
            )}
        </div>
    );
};

const QuestionBlock: React.FC<{item: InterviewQuestion, language: Language}> = ({ item, language }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<InterviewFeedbackResult | null>(null);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
    const [feedbackError, setFeedbackError] = useState<string | null>(null);
    
    const t = translations[language];
    const pageT = t.interviewPrepPage;

    const handleFeedback = async () => {
        if (!userAnswer.trim()) return;
        setIsLoadingFeedback(true);
        setFeedback(null);
        setFeedbackError(null);
        try {
            const res = await getFeedbackOnAnswer(item.question, userAnswer, language);
            setFeedback(res);
        } catch(e) {
            setFeedbackError(e instanceof Error ? e.message : t.error);
            console.error(e);
        } finally {
            setIsLoadingFeedback(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">"{item.question}"</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 border-l-4 border-blue-200 dark:border-blue-700 pl-4 py-2 italic">"{item.answer}"</p>
            
            <div className="mt-6">
                 <h4 className="font-semibold text-md mb-2 dark:text-gray-200">{pageT.userAnswerTitle}</h4>
                 <textarea value={userAnswer} onChange={e => setUserAnswer(e.target.value)} placeholder={pageT.userAnswerPlaceholder} className="w-full h-24 p-2 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-md custom-scrollbar"></textarea>
                 <button onClick={handleFeedback} disabled={isLoadingFeedback || !userAnswer.trim()} className="mt-2 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 dark:text-gray-200 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-800">
                    {isLoadingFeedback ? t.buttonLoading : pageT.getFeedbackButton}
                 </button>
            </div>

            {isLoadingFeedback && <Loader />}
            {feedbackError && <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/30">{feedbackError}</p>}
            {feedback && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 rounded-md">
                     <h5 className="font-semibold mb-1 text-blue-800 dark:text-blue-300">{pageT.feedbackTitle}</h5>
                     <p className="text-sm text-blue-700 dark:text-blue-300/90">{feedback.feedback}</p>
                </div>
            )}
        </div>
    );
};
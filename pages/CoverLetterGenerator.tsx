import React, { useState, useCallback } from 'react';
import { Loader } from '../components/Loader';
import { Dropzone } from '../components/Dropzone';
import { generateCoverLetter } from '../services/geminiService';
import { translations } from '../constants';
import { useAppContext } from '../context/AppContext';
import { CopyIcon } from '../components/icons/CopyIcon';
import { CheckIcon } from '../components/icons/CheckIcon';
import type { Language, CoverLetterResult, Tone } from '../types';

interface CoverLetterGeneratorProps {
    language: Language;
}

export const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({ language }) => {
    const { jobDescription, setJobDescription, cvText, setCvText, cvFileName, setCvFileName } = useAppContext();
    const [userInfo, setUserInfo] = useState({ fullName: '', experience: '', objective: '', strengths: '' });
    const [tone, setTone] = useState<Tone>('professionnel');
    const [result, setResult] = useState<CoverLetterResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    
    const t = translations[language];
    const pageT = t.coverLetterPage;

    const handleFileProcessed = (text: string | null, fileName: string | null) => {
        setCvText(text || '');
        setCvFileName(fileName || '');
    };

    const handleGenerate = useCallback(async () => {
        if (!jobDescription.trim() || !cvText.trim() || !userInfo.fullName || !userInfo.experience || !userInfo.objective) return;
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const res = await generateCoverLetter(jobDescription, cvText, userInfo, tone, language);
            setResult(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.error);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [jobDescription, cvText, userInfo, tone, language, t.error]);

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.letter);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-8">{pageT.title}</p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-500 max-w-2xl mb-8 -mt-6">{pageT.subtitle}</p>

            <div className="w-full max-w-5xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder={t.placeholder} className="w-full h-60 p-4 bg-white dark:bg-gray-800 border dark:border-gray-600 border-gray-300 rounded-lg custom-scrollbar" />
                    <Dropzone onFileProcessed={handleFileProcessed} language={language} initialFileName={cvFileName} />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">{pageT.formTitle}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder={pageT.fullName} value={userInfo.fullName} onChange={e => setUserInfo(p => ({...p, fullName: e.target.value}))} className="p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:border-gray-600" />
                        <input type="text" placeholder={pageT.experienceLevel} value={userInfo.experience} onChange={e => setUserInfo(p => ({...p, experience: e.target.value}))} className="p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:border-gray-600" />
                        <input type="text" placeholder={pageT.objective} value={userInfo.objective} onChange={e => setUserInfo(p => ({...p, objective: e.target.value}))} className="p-2 border border-gray-300 rounded sm:col-span-2 bg-white dark:bg-gray-700 dark:border-gray-600" />
                        <textarea placeholder={pageT.keyStrengths} value={userInfo.strengths} onChange={e => setUserInfo(p => ({...p, strengths: e.target.value}))} className="p-2 border border-gray-300 rounded sm:col-span-2 bg-white dark:bg-gray-700 dark:border-gray-600 custom-scrollbar" />
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">{pageT.tone}</label>
                            <select value={tone} onChange={e => setTone(e.target.value as Tone)} className="p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-700 dark:border-gray-600">
                                {Object.keys(pageT.tones).map(key => <option key={key} value={key}>{pageT.tones[key as Tone]}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleGenerate} disabled={isLoading || !jobDescription || !cvText} className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600">
                {isLoading ? t.buttonLoading : pageT.generateButton}
            </button>

            {isLoading && <Loader />}
            {error && <p className="mt-8 text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:border-red-500/30">{error}</p>}
            
            {result && (
                <div className="mt-12 w-full max-w-4xl">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold dark:text-gray-100">{pageT.resultTitle}</h2>
                        <button onClick={handleCopy} disabled={isCopied} className="flex items-center text-sm font-semibold text-gray-600 hover:text-blue-600 disabled:text-green-500 dark:text-gray-400 dark:hover:text-blue-400 dark:disabled:text-green-400">
                           {isCopied ? <CheckIcon className="w-4 h-4 mr-1 text-green-500" /> : <CopyIcon className="w-4 h-4 mr-1" />}
                           {isCopied ? t.copied : t.copy}
                        </button>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 whitespace-pre-wrap font-serif text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {result.letter}
                    </div>
                </div>
            )}
        </div>
    );
};
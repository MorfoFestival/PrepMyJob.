import React, { useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { translations } from '../constants';
import { KeyIcon } from './icons/KeyIcon';
import { TasksIcon } from './icons/TasksIcon';
import { ToolsIcon } from './icons/ToolsIcon';
import { RoutineIcon } from './icons/RoutineIcon';
import { MotivationIcon } from './icons/MotivationIcon';
import { InterviewIcon } from './icons/InterviewIcon';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { PdfIcon } from './icons/PdfIcon';
import type { JobAnalysisResult, Language } from '../types';

interface AnalysisDisplayProps {
  analysis: JobAnalysisResult;
  language: Language;
}

const iconMap: Record<keyof JobAnalysisResult, React.ReactNode> = {
  keyPoints: <KeyIcon className="w-6 h-6 text-blue-600" />,
  dailyTasks: <TasksIcon className="w-6 h-6 text-blue-600" />,
  tools: <ToolsIcon className="w-6 h-6 text-blue-600" />,
  dailyRoutine: <RoutineIcon className="w-6 h-6 text-blue-600" />,
  motivation: <MotivationIcon className="w-6 h-6 text-blue-600" />,
  interviewPoints: <InterviewIcon className="w-6 h-6 text-blue-600" />,
};

interface AnalysisSectionProps {
    title: string;
    items: string[];
    icon: React.ReactNode;
    copyText: string;
    copiedText: string;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ title, items, icon, copyText, copiedText }) => {
    const [isCopied, setIsCopied] = useState(false);

    if (!items || items.length === 0) return null;

    const handleCopy = () => {
        const textToCopy = items.join('\n');
        navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                    <span className="me-3 flex-shrink-0">{icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                </div>
                <button 
                    onClick={handleCopy}
                    className="flex items-center text-xs font-semibold text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors disabled:text-green-500 dark:disabled:text-green-400"
                    disabled={isCopied}
                    aria-label={isCopied ? copiedText : copyText}
                >
                    {isCopied ? <CheckIcon className="w-4 h-4 me-1 text-green-500" /> : <CopyIcon className="w-4 h-4 me-1" />}
                    {isCopied ? copiedText : copyText}
                </button>
            </div>
            <ul className="space-y-3 ps-1 flex-grow">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                        <svg className="w-5 h-5 me-3 mt-1 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, language }) => {
  const t = translations[language];
  const keys = Object.keys(analysis) as Array<keyof JobAnalysisResult>;
  const analysisRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPdf = async () => {
    const element = analysisRef.current;
    if (!element) return;
    setIsExporting(true);

    // Temporarily switch to light mode for PDF generation for consistency
    const isDarkMode = document.documentElement.classList.contains('dark');
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    }

    // Delay canvas creation to allow styles to update
    await new Promise(resolve => setTimeout(resolve, 50));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    // Restore dark mode if it was enabled
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('PrepMyJob-Analysis.pdf');
    setIsExporting(false);
  };

  return (
    <div className="mt-8 w-full max-w-6xl mx-auto">
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in > div {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in > div:nth-child(1) { animation-delay: 0.1s; }
        .animate-fade-in > div:nth-child(2) { animation-delay: 0.2s; }
        .animate-fade-in > div:nth-child(3) { animation-delay: 0.3s; }
        .animate-fade-in > div:nth-child(4) { animation-delay: 0.4s; }
        .animate-fade-in > div:nth-child(5) { animation-delay: 0.5s; }
        .animate-fade-in > div:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
      <div className="flex justify-end mb-4">
        <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
            <PdfIcon className="w-5 h-5 me-2" />
            {isExporting ? t.buttonLoading : t.exportPdf}
        </button>
      </div>

      <div id="pdf-content" ref={analysisRef} className="bg-gray-50 dark:bg-gray-900 p-2 md:p-4">
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-6">
            {keys.map((key) => (
                <AnalysisSection
                    key={key}
                    title={t.analysisHeadings[key]}
                    items={analysis[key]}
                    icon={iconMap[key]}
                    copyText={t.copy}
                    copiedText={t.copied}
                />
            ))}
        </div>
      </div>
    </div>
  );
};
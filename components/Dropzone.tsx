import React, { useState, useCallback, useEffect } from 'react';
import { getTextFromFile } from '../utils/fileReader';
import { translations } from '../constants';
import { UploadIcon } from './icons/UploadIcon';
import { Loader } from './Loader';
import type { Language } from '../types';

interface DropzoneProps {
  onFileProcessed: (text: string | null, fileName: string | null) => void;
  language: Language;
  initialFileName?: string | null;
}

type DropzoneErrorKeys = keyof (typeof translations)[Language]['dropzone'];

export const Dropzone: React.FC<DropzoneProps> = ({ onFileProcessed, language, initialFileName }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorKey, setErrorKey] = useState<DropzoneErrorKeys | null>(null);
  const [fileName, setFileName] = useState<string | null>(initialFileName || null);
  
  const t = translations[language].dropzone;

  useEffect(() => {
    setFileName(initialFileName || null);
  }, [initialFileName]);

  const handleFile = useCallback(async (file: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorKey('sizeError');
      return;
    }
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      setErrorKey('unsupportedError');
      return;
    }

    setIsProcessing(true);
    setErrorKey(null);
    setFileName(file.name);
    try {
      const text = await getTextFromFile(file);
      onFileProcessed(text, file.name);
    } catch (e) {
      const messageKey = e instanceof Error ? e.message : 'genericError';
      if (Object.keys(t).includes(messageKey)) {
        setErrorKey(messageKey as DropzoneErrorKeys);
      } else {
        setErrorKey('genericError');
      }
      setFileName(null);
      onFileProcessed(null, null);
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  }, [onFileProcessed, t]);

  const handleClearFile = () => {
    setFileName(null);
    onFileProcessed(null, null);
    setErrorKey(null);
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  if (isProcessing) {
    return (
      <div className="w-full p-6 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
        <Loader />
        <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{t.processing}</p>
      </div>
    );
  }

  if (fileName) {
    return (
        <div className="w-full p-4 text-center bg-green-50 dark:bg-green-500/10 border border-green-300 dark:border-green-500/30 rounded-lg">
            <p className="text-sm font-semibold text-green-800 dark:text-green-300">{t.fileReady} <span className="font-bold">{fileName}</span></p>
            <button onClick={handleClearFile} className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                {t.changeFile}
            </button>
        </div>
    );
  }

  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative w-full p-6 text-center border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
      }`}
    >
      <input
        type="file"
        id="file-upload"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={onFileChange}
        accept=".pdf,.docx"
        aria-hidden="true"
      />
      <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
        <UploadIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{t.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{t.subtitle}</p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{t.accepted}</p>
        {errorKey && <p className="mt-2 text-xs text-red-500">{t[errorKey]}</p>}
      </label>
    </div>
  );
};
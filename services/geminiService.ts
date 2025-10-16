import { GoogleGenAI, Type } from "@google/genai";
import type { 
    JobAnalysisResult, 
    Language, 
    CvAnalysisResult,
    CoverLetterResult,
    InterviewPrepResult,
    InterviewFeedbackResult,
    Tone 
} from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

async function safeGenerateContent<T>(...args: Parameters<typeof ai.models.generateContent>): Promise<T> {
    try {
        const response = await ai.models.generateContent(...args);
        
        if (!response || !response.text) {
            throw new Error("Received an empty response from the AI.");
        }
        
        try {
            return JSON.parse(response.text) as T;
        } catch (e) {
            console.error("Failed to parse JSON from AI response:", response.text);
            throw new Error("The AI returned data in an unexpected format. Please try again.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            if (error.message.includes('API key not valid')) {
                throw new Error('Your API key is invalid. Please check your configuration.');
            }
             if (error.message.includes("empty response") || error.message.includes("unexpected format")) {
                throw error;
            }
        }
        throw new Error("An error occurred while communicating with the AI. Please check the job description and try again.");
    }
}


// --- JOB ANALYSIS FROM URL ---
export async function getJobDescriptionFromUrl(url: string, language: Language): Promise<string> {
    console.warn("URL scraping is a backend feature and is not implemented. Returning mock data.");
    // In a real application, this would involve a backend service to fetch and parse the URL.
    // For now, we simulate a successful extraction.
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    const mockDescription = language === 'fr' 
        ? `Ceci est une description de poste fictive extraite de ${url}. \n\nLe poste est pour un développeur Frontend expérimenté avec des compétences en React et TypeScript. Le candidat idéal aura 5 ans d'expérience.`
        : `This is a mock job description extracted from ${url}. \n\nThe role is for a senior Frontend Developer with skills in React and TypeScript. The ideal candidate will have 5 years of experience.`;
    return mockDescription;
}


// --- JOB ANALYSIS ---
const jobAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
    dailyTasks: { type: Type.ARRAY, items: { type: Type.STRING } },
    tools: { type: Type.ARRAY, items: { type: Type.STRING } },
    dailyRoutine: { type: Type.ARRAY, items: { type: Type.STRING } },
    motivation: { type: Type.ARRAY, items: { type: Type.STRING } },
    interviewPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ['keyPoints', 'dailyTasks', 'tools', 'dailyRoutine', 'motivation', 'interviewPoints'],
};
export async function analyzeJobDescription(jobDescription: string, language: Language): Promise<JobAnalysisResult> {
    const outputLanguage = language === 'fr' ? 'French' : 'English';
    const prompt = `Analyze this job description. Extract key info. Respond in ${outputLanguage}.\n\nJob Description:\n---\n${jobDescription}\n---`;

    return safeGenerateContent<JobAnalysisResult>({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json', responseSchema: jobAnalysisSchema, temperature: 0.2 },
    });
}

// --- CV ANALYSIS ---
const cvAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        score: { type: Type.INTEGER, description: "A compatibility score between 0 and 100." },
        summary: { type: Type.STRING, description: "A brief summary of the CV's strengths and weaknesses for this job." },
        keywordMatch: {
            type: Type.OBJECT,
            properties: {
                present: { type: Type.ARRAY, items: { type: Type.STRING } },
                missing: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['present', 'missing']
        },
        recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable recommendations to improve the CV." }
    },
    required: ['score', 'summary', 'keywordMatch', 'recommendations']
};
export async function analyzeCvAndJob(jobDescription: string, cvText: string, language: Language): Promise<CvAnalysisResult> {
    const outputLanguage = language === 'fr' ? 'French' : 'English';
    const prompt = `Analyze the CV against the Job Description. Provide a compatibility score, a summary, keyword matches, and actionable recommendations. Respond in ${outputLanguage}.\n\nJob Description:\n---\n${jobDescription}\n---\n\nCV:\n---\n${cvText}\n---`;
    
    return safeGenerateContent<CvAnalysisResult>({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json', responseSchema: cvAnalysisSchema, temperature: 0.3 },
    });
}

// --- COVER LETTER GENERATION ---
const coverLetterSchema = {
    type: Type.OBJECT,
    properties: {
        letter: { type: Type.STRING, description: "The full, well-formatted cover letter text." }
    },
    required: ['letter']
};
export async function generateCoverLetter(jobDescription: string, cvText: string, userInfo: { fullName: string, experience: string, objective: string, strengths?: string }, tone: Tone, language: Language): Promise<CoverLetterResult> {
    const outputLanguage = language === 'fr' ? 'French' : 'English';
    const prompt = `Generate a cover letter in ${outputLanguage}.
    Tone: ${tone}.
    Job Description: ${jobDescription}
    CV: ${cvText}
    Candidate Info:
    - Name: ${userInfo.fullName}
    - Experience: ${userInfo.experience}
    - Objective: ${userInfo.objective}
    - Strengths: ${userInfo.strengths || 'Not provided'}
    The letter should be professional, tailored, and compelling.`;
    
    return safeGenerateContent<CoverLetterResult>({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json', responseSchema: coverLetterSchema, temperature: 0.7 },
    });
}

// --- INTERVIEW PREP ---
const interviewPrepSchema = {
    type: Type.OBJECT,
    properties: {
        questions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING, description: "A well-crafted example answer." }
                },
                required: ['question', 'answer']
            }
        }
    },
    required: ['questions']
};
export async function generateInterviewPrep(jobDescription: string, cvText: string | null, language: Language): Promise<InterviewPrepResult> {
    const outputLanguage = language === 'fr' ? 'French' : 'English';
    const cvContext = cvText ? `\n\nHere is the candidate's CV for context:\n---\n${cvText}\n---` : '';
    const prompt = `Based on this job description, generate 5-7 common interview questions and provide excellent example answers. Tailor them to the role. Respond in ${outputLanguage}.${cvContext}\n\nJob Description:\n---\n${jobDescription}\n---`;
    
    return safeGenerateContent<InterviewPrepResult>({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json', responseSchema: interviewPrepSchema, temperature: 0.5 },
    });
}

// --- INTERVIEW ANSWER FEEDBACK ---
const feedbackSchema = {
    type: Type.OBJECT,
    properties: {
        feedback: { type: Type.STRING, description: "Constructive feedback on the user's answer." }
    },
    required: ['feedback']
};
export async function getFeedbackOnAnswer(question: string, userAnswer: string, language: Language): Promise<InterviewFeedbackResult> {
    const outputLanguage = language === 'fr' ? 'French' : 'English';
    const prompt = `Provide constructive feedback on the user's answer to the interview question. Be encouraging but helpful. Respond in ${outputLanguage}.\n\nQuestion: "${question}"\n\nUser's Answer: "${userAnswer}"`;
    
    return safeGenerateContent<InterviewFeedbackResult>({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json', responseSchema: feedbackSchema, temperature: 0.4 },
    });
}

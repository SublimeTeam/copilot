import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;

console.log(API_KEY);

export const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const isAIConfigured = !!API_KEY;

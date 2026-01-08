
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTribute = async (petName: string, traits: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, heart-wrenching yet beautiful one-sentence tribute for a pet named ${petName} based on these traits: ${traits}. Keep it under 150 characters.`,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
      },
    });
    return response.text?.trim() || "Forever in our hearts.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "A beautiful soul that will never be forgotten.";
  }
};

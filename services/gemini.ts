
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askFitnessCoach(question: string, context: { language: string, mode: string }) {
  const systemPrompt = `
    You are a professional world-class fitness coach and sports nutritionist. 
    You are assisting a user on their "workouts.promedic1" app.
    Current workout mode: ${context.mode}.
    User language: ${context.language}.
    Provide expert, scientifically-backed advice on training, recovery, and nutrition.
    Keep responses concise, motivating, and actionable. 
    If the user asks in Arabic, reply in Arabic. If in English, reply in English.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having a bit of a rest day right now. Please try again in a moment! / أعتذر، أنا في استراحة حالياً، يرجى المحاولة مرة أخرى لاحقاً.";
  }
}

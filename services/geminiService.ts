import { GoogleGenAI, Chat } from "@google/genai";
import { PERFUMES } from "../constants";

let chatSession: Chat | null = null;

// Convert perfume data to a string for context
const perfumeContext = PERFUMES.map(p => 
  `ID: ${p.id}, Name: ${p.name}, Brand: ${p.brand}, Price: $${p.price}, Category: ${p.category}, 
   Description: ${p.description}, 
   Notes: [Top: ${p.notes.top.join(', ')}, Middle: ${p.notes.middle.join(', ')}, Base: ${p.notes.base.join(', ')}]`
).join('\n---\n');

const systemInstruction = `
You are "Aura", the AI Concierge for Aura & Essence, a luxury perfume boutique. 
Your goal is to recommend perfumes from our specific catalog based on the user's mood, occasion, preferences, or personality.

Here is our complete catalog:
${perfumeContext}

Rules:
1. ONLY recommend products from the catalog above. If a user asks for something we don't have, politely suggest the closest match from our catalog or explain we don't carry that specific brand.
2. Be sophisticated, elegant, and helpful. Use sensory language to describe scents (e.g., "warm," "enveloping," "crisp," "radiant").
3. When recommending a perfume, mention its Name, Price, and *why* it fits the user's request (referencing specific notes).
4. Keep responses concise (under 100 words) unless the user asks for a detailed consultation.
5. If the user greets you, welcome them to Aura & Essence and ask what kind of scent they are looking for today.
6. Do not mention "ID" in the conversation, just use the names.
`;

export const getGeminiChatResponse = async (userMessage: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      console.error("API_KEY is missing");
      return "I apologize, but I am currently having trouble connecting to my fragrance database. Please try again later.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7, 
        },
      });
    }

    const result = await chatSession.sendMessage({ message: userMessage });
    return result.text || "I'm not sure how to describe that scent right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, I'm having a moment of olfactory fatigue (technical error). Please try again.";
  }
};

export const resetChatSession = () => {
  chatSession = null;
};

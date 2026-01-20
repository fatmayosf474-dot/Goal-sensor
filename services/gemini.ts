
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER, description: "Total score from 0 to 100" },
    breakdown: {
      type: Type.OBJECT,
      properties: {
        skill: { type: Type.NUMBER },
        accuracy: { type: Type.NUMBER },
        difficulty: { type: Type.NUMBER },
        aesthetics: { type: Type.NUMBER },
      },
      required: ["skill", "accuracy", "difficulty", "aesthetics"]
    },
    title: { type: Type.STRING, description: "A catchy title for the goal or clip" },
    verdict: { type: Type.STRING, description: "Professional scouting summary in Arabic" },
    evidence: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Specific details/events from the video as proof for the score"
    },
    tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Suggestions to improve the gameplay"
    }
  },
  required: ["score", "breakdown", "title", "verdict", "evidence", "tips"]
};

export async function analyzeGameplayVideo(videoBase64: string, mimeType: string): Promise<AnalysisResult> {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: videoBase64,
              mimeType: mimeType
            }
          },
          {
            text: `You are a professional football analyst and eFootball/PES gaming expert.
            Analyze this gameplay clip (likely a goal or highlight). 
            Provide a detailed evaluation based on:
            1. Player skill (dribbling, passing, timing).
            2. Finishing accuracy and power.
            3. Difficulty of the shot (distance, angle, pressure).
            4. Overall visual aesthetics and flair.

            Provide the score out of 100. Write the verdict and evidence details in Arabic (العربية) as the user is an Arabic speaker.
            Be critical but fair, like a professional scout. If it's a simple tap-in, score it lower. If it's a 30-yard curler after a skill move, score it very high.`
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
    }
  });

  const response = await model;
  return JSON.parse(response.text || '{}') as AnalysisResult;
}

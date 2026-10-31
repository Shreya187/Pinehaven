import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "Say hello to Pinehaven in one short sentence.",
  });

  console.log("GEMINI RESPONSE:");
  console.log(interaction.output_text);

} catch (error) {
  console.error("GEMINI TEST ERROR:");
  console.error(error);
}
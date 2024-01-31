import { OpenAI } from "openai";
import { env } from "@/app/_utils/env";

export const ai = new OpenAI({ apiKey: env.OPENAI_SECRET_KEY });

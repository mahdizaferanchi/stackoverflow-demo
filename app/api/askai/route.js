import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
// const devMode = process.env.NODE_ENV === "development";
// const hpa = devMode ? await import("https-proxy-agent") : null;
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { prompt } = await req.json();

  const payload = {
    messages: [
      {
        role: "system",
        content:
          "You are an assistant. Given a question from stackoverflow.com, you will provide a helpful response.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.0,
    top_p: 1,
    seed: 42,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
  };

  const response = await openai.chat.completions.create(
    payload
    // {
    //   httpAgent: new hpa.HttpsProxyAgent("http://127.0.0.1:10809"),
    // }
  );

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

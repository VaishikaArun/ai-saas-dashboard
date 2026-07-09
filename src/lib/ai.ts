import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_TOKEN);

export async function generateText(
  prompt: string,
  systemPrompt: string
) {
  const result = await hf.chatCompletion({
    model: "meta-llama/Llama-3.1-8B-Instruct",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 1024,
    temperature: 0.7,
  });

  return result.choices[0].message.content;
}
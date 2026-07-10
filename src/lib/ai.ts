export async function generateText(
  prompt: string,
  systemPrompt: string
) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen2.5:3b",
      prompt: `${systemPrompt}\n\nUser: ${prompt}\nAssistant:`,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to connect to Ollama");
  }

  const data = await response.json();

  return data.response;
}
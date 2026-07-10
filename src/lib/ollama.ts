const OLLAMA_URL = "http://localhost:11434";

export async function generateResponse(prompt: string) {
  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen2.5:3b",
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to connect to Ollama");
  }

  const data = await response.json();

  return data.response;
}
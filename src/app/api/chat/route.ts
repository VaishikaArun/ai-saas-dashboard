import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { generateText } from "@/lib/ai";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { chatId, message } = await req.json();
  if (!message?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const chat = chatId
    ? await prisma.chat.findFirst({
        where: { id: chatId, userId: session.user.id },
        include: { messages: { orderBy: { createdAt: "asc" } } },
      })
    : await prisma.chat.create({
        data: {
          userId: session.user.id,
          title: message.slice(0, 60),
        },
        include: { messages: true },
      });

  if (!chat) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  }

  await prisma.message.create({
    data: { chatId: chat.id, role: "user", content: message },
  });

  const history = [
    ...chat.messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content: message },
  ];

  const reply = await generateText(
  message,
  "You are a helpful, concise AI assistant."
);

  await prisma.message.create({
    data: { chatId: chat.id, role: "assistant", content: reply ?? "" },
  });

  return NextResponse.json({ chatId: chat.id, reply });
}

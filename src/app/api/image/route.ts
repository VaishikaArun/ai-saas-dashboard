import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { hf } from "@/lib/huggingface";
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await req.json();
    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

   const image = await hf.textToImage({
    model: "black-forest-labs/FLUX.1-dev",
    inputs: prompt,
});
   const arrayBuffer = await image.arrayBuffer();
   const base64 = Buffer.from(arrayBuffer).toString("base64");

const url = `data:image/png;base64,${base64}`;

const saved = await prisma.generatedImage.create({
  data: {
    userId: session.user.id,
    prompt,
    url,
  },
});

    return NextResponse.json({ image: saved });
  } catch (error) {
    console.error("Image generation failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const images = await prisma.generatedImage.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 24,
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Image fetch failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch images" },
      { status: 500 }
    );
  }
}

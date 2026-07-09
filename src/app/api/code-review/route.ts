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

  const { code, language } = await req.json();
  if (!code?.trim()) {
    return NextResponse.json({ error: "Code required" }, { status: 400 });
  }

   const feedback = await generateText(
  `Language: ${language}

${code}`,
  `You are a senior software engineer performing a code review.
Review the code for:
- Bugs
- Security issues
- Performance
- Best practices
- Readability

Return:
Summary
Issues Found
Suggested Fixes`
);

  const review = await prisma.codeReview.create({
    data: {
      userId: session.user.id,
      language: language || "unspecified",
      code,
      feedback: feedback ?? "",
    },
  });

  return NextResponse.json({ review });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reviews = await prisma.codeReview.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ reviews });
}

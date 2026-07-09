import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateText } from "@/lib/ai";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role, experience, skills } = await req.json();
  if (!role?.trim() || !experience?.trim()) {
    return NextResponse.json({ error: "Role and experience are required" }, { status: 400 });
  }

  const content = await generateText(
    `
Target role:
${role}

Experience:
${experience}

Skills:
${skills}
`,
    `
You are a professional resume writer.
Generate ATS-friendly resume content.
`
  );

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: role,
      content: { role, experience, skills, generated: content },
    },
  });

  return NextResponse.json({ resume });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ resumes });
}

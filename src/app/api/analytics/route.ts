import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [chats, images, resumes, reviews] = await Promise.all([
    prisma.chat.count({ where: { userId } }),
    prisma.generatedImage.count({ where: { userId } }),
    prisma.resume.count({ where: { userId } }),
    prisma.codeReview.count({ where: { userId } }),
  ]);

  // Last 7 days of combined activity, grouped by day
  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setHours(0, 0, 0, 0);

  const [chatDates, imageDates, resumeDates, reviewDates] = await Promise.all([
    prisma.chat.findMany({ where: { userId, createdAt: { gte: since } }, select: { createdAt: true } }),
    prisma.generatedImage.findMany({ where: { userId, createdAt: { gte: since } }, select: { createdAt: true } }),
    prisma.resume.findMany({ where: { userId, createdAt: { gte: since } }, select: { createdAt: true } }),
    prisma.codeReview.findMany({ where: { userId, createdAt: { gte: since } }, select: { createdAt: true } }),
  ]);

  const dayKey = (d: Date) => d.toISOString().slice(0, 10);
  const buckets: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    buckets[dayKey(d)] = 0;
  }
  [...chatDates, ...imageDates, ...resumeDates, ...reviewDates].forEach((row) => {
    const key = dayKey(new Date(row.createdAt));
    if (key in buckets) buckets[key] += 1;
  });

  const timeline = Object.entries(buckets).map(([date, count]) => ({ date, count }));

  return NextResponse.json({
    totals: { chats, images, resumes, reviews },
    timeline,
  });
}

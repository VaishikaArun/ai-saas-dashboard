import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { SignalStrip } from "@/components/dashboard/signal-strip";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen flex">
      <Sidebar userName={session.user.name ?? session.user.email} />
      <div className="flex-1 flex flex-col min-w-0">
        <SignalStrip />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

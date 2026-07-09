import { ReactNode } from "react";

export function ConsolePanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`console-panel ${className}`}>{children}</div>;
}

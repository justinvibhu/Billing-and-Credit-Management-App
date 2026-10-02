import type { ReactNode } from "react";
import { Heading } from "@/components/ui";

export default function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><Heading>{title}</Heading><p className="mt-1 text-sm text-slate-500">{description}</p></div>{action}</div>;
}

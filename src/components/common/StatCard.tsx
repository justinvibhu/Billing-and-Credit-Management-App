import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui";

export default function StatCard({ label, value, note, icon: Icon, tone = "blue" }: { label: string; value: string; note?: string; icon: LucideIcon; tone?: "blue" | "green" | "orange" | "red" }) {
  const tones = { blue: "bg-blue-50 text-blue-600", green: "bg-emerald-50 text-emerald-600", orange: "bg-amber-50 text-amber-600", red: "bg-red-50 text-red-600" };
  return <Card className="p-5"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-900">{value}</p>{note && <p className="mt-1 text-xs text-slate-400">{note}</p>}</div><div className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}><Icon className="size-5" /></div></div></Card>;
}

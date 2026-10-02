import { X } from "lucide-react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const cx = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  const styles = { primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-sm", secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50", ghost: "text-slate-600 hover:bg-slate-100", danger: "bg-red-600 text-white hover:bg-red-700" };
  return <button className={cx("inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50", styles[variant], className)} {...props} />;
}
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx("min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100", className)} {...props} />;
}
export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cx("min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100", className)} {...props}>{children}</select>;
}
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx("w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100", className)} {...props} />;
}
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cx("rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,.03)]", className)}>{children}</section>;
}
export function Heading({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cx("font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl", className)}>{children}</h1>;
}
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <label className={cx("mb-1.5 block text-sm font-semibold text-slate-700", className)}>{children}</label>;
}
export function Badge({ children, status }: { children: ReactNode; status?: string }) {
  const color = status === "Paid" || status === "Completed" || status === "In Stock" ? "bg-emerald-50 text-emerald-700" : status === "Overdue" || status === "Low Stock" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700";
  return <span className={cx("inline-flex rounded-full px-2.5 py-1 text-xs font-bold", color)}>{children}</span>;
}
export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm md:items-center md:p-4" onMouseDown={onClose}>
    <section className="max-h-[92vh] w-full overflow-auto rounded-t-3xl bg-white shadow-2xl md:max-w-lg md:rounded-2xl" onMouseDown={e => e.stopPropagation()}>
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5"><h2 className="font-display text-lg font-bold">{title}</h2><Button variant="ghost" className="size-10 p-0" onClick={onClose} aria-label="Close"><X className="size-5" /></Button></div>
      <div className="p-6">{children}</div>{footer && <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">{footer}</div>}
    </section>
  </div>;
}
export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <Card className="flex flex-col items-center p-10 text-center"><div className="mb-4 grid size-14 place-items-center rounded-2xl bg-slate-100 text-2xl">—</div><h3 className="font-display text-lg font-bold">{title}</h3><p className="mt-1 max-w-md text-sm text-slate-500">{description}</p>{action && <div className="mt-5">{action}</div>}</Card>;
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, BadgeIndianRupee, FileText, Plus, ReceiptIndianRupee, TrendingUp, Users, WalletCards } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import PaymentModal from "@/components/common/PaymentModal";
import { useApp } from "@/lib/store";
import { money, shortDate } from "@/utils/format";

const chart = [
  { day: "Mon", sales: 18200, collection: 14200 }, { day: "Tue", sales: 22400, collection: 16800 }, { day: "Wed", sales: 19800, collection: 17600 }, { day: "Thu", sales: 28600, collection: 21900 }, { day: "Fri", sales: 24500, collection: 18300 }, { day: "Sat", sales: 32800, collection: 26400 }, { day: "Sun", sales: 24850, collection: 18400 },
];
export default function Dashboard() {
  const navigate = useNavigate(); const { invoices, customers } = useApp(); const [period, setPeriod] = useState("7 Days"); const [payment, setPayment] = useState(false);
  return <div>
    <PageHeader title="Good morning, Sanjay" description="Here's how your business is doing today." action={<Button onClick={() => navigate("/billing")}><Plus className="size-4" /> Create Bill</Button>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard label="Today's Sales" value="₹24,850" note="+12.5% from yesterday" icon={TrendingUp} tone="blue" />
      <StatCard label="Today's Collection" value="₹18,400" note="74% of today's sales" icon={WalletCards} tone="green" />
      <StatCard label="Outstanding Udhar" value={money(customers.reduce((a,c) => a+c.outstanding,0))} note="Across active customers" icon={BadgeIndianRupee} tone="orange" />
      <StatCard label="Customers" value={String(248 + customers.length - 5)} note="12 added this month" icon={Users} tone="blue" />
      <StatCard label="Total Invoices" value={new Intl.NumberFormat("en-IN").format(1244 + invoices.length)} note="38 created this month" icon={FileText} tone="green" />
      <StatCard label="Pending Payments" value="₹42,500" note="8 invoices overdue" icon={ReceiptIndianRupee} tone="red" />
    </div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
      <Card className="p-5 md:p-6"><div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-display text-lg font-bold">Sales & collections</h2><p className="text-sm text-slate-500">Daily performance overview</p></div><div className="flex rounded-xl bg-slate-100 p-1">{["7 Days","30 Days","3 Months","1 Year"].map(v => <button key={v} onClick={() => setPeriod(v)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${period === v ? "bg-white text-brand-600 shadow-sm" : "text-slate-500"}`}>{v}</button>)}</div></div>
        <div className="h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart}><defs><linearGradient id="sales" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.24}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} /><YAxis hide /><Tooltip formatter={(v) => money(Number(v))} contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} /><Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} fill="url(#sales)" /><Area type="monotone" dataKey="collection" stroke="#10b981" strokeWidth={3} fill="transparent" /></AreaChart></ResponsiveContainer></div>
      </Card>
      <Card className="p-5 md:p-6"><h2 className="font-display text-lg font-bold">Quick actions</h2><p className="text-sm text-slate-500">Common tasks, one tap away</p><div className="mt-5 grid grid-cols-2 gap-3">{[{label:"Create Bill",icon:Plus,action:()=>navigate("/billing")},{label:"Add Customer",icon:Users,action:()=>navigate("/customers?add=1")},{label:"Record Payment",icon:WalletCards,action:()=>setPayment(true)},{label:"View Credit",icon:BadgeIndianRupee,action:()=>navigate("/credit")}].map(({label,icon:Icon,action}) => <button key={label} onClick={action} className="flex min-h-28 flex-col items-start justify-between rounded-2xl border border-slate-200 p-4 text-left transition hover:border-brand-500 hover:bg-brand-50"><div className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon className="size-5" /></div><span className="text-sm font-bold">{label}</span></button>)}</div></Card>
    </div>
    <Card className="mt-6 overflow-hidden"><div className="flex items-center justify-between p-5 md:px-6"><div><h2 className="font-display text-lg font-bold">Recent transactions</h2><p className="text-sm text-slate-500">Your latest invoice activity</p></div><Button variant="ghost" onClick={() => navigate("/invoices")}>View all <ArrowRight className="size-4" /></Button></div>
      <div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-sm"><thead className="border-y border-slate-100 bg-slate-50 text-xs uppercase text-slate-500"><tr>{["Customer","Invoice","Amount","Paid","Outstanding","Date","Status",""].map(x => <th key={x} className="px-6 py-3 font-semibold">{x}</th>)}</tr></thead><tbody>{invoices.slice(0,5).map(i => <tr key={i.id} className="border-b border-slate-100 last:border-0"><td className="px-6 py-4 font-semibold">{i.customerName}</td><td className="px-6 py-4 text-brand-600">{i.number}</td><td className="px-6 py-4">{money(i.total)}</td><td className="px-6 py-4 text-emerald-600">{money(i.paid)}</td><td className="px-6 py-4 font-semibold">{money(i.balance)}</td><td className="px-6 py-4 text-slate-500">{shortDate(i.date)}</td><td className="px-6 py-4"><Badge status={i.status}>{i.status}</Badge></td><td className="px-6 py-4"><Button variant="ghost" onClick={() => navigate(`/invoices/${i.id}`)}>View</Button></td></tr>)}</tbody></table></div>
      <div className="space-y-3 p-4 md:hidden">{invoices.slice(0,4).map(i => <button key={i.id} onClick={() => navigate(`/invoices/${i.id}`)} className="w-full rounded-xl border border-slate-100 p-4 text-left"><div className="flex items-center justify-between"><span className="font-bold">{i.customerName}</span><Badge status={i.status}>{i.status}</Badge></div><div className="mt-3 flex items-end justify-between"><span className="text-xs text-slate-400">{i.number} · {shortDate(i.date)}</span><span className="font-display text-lg font-bold">{money(i.total)}</span></div></button>)}</div>
    </Card><PaymentModal open={payment} onClose={() => setPayment(false)} />
  </div>;
}

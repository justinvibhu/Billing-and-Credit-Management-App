import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/store";
import type { PaymentMethod } from "@/types";
import { money } from "@/utils/format";
import { Button, Input, Label, Modal, Select, Textarea } from "@/components/ui";

export default function PaymentModal({ open, onClose, initialCustomerId }: { open: boolean; onClose: () => void; initialCustomerId?: string }) {
  const { customers, recordPayment } = useApp();
  const [customerId, setCustomerId] = useState(initialCustomerId || customers.find(c => c.outstanding > 0)?.id || "");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("UPI");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [remaining, setRemaining] = useState(0);
  useEffect(() => { if (initialCustomerId) setCustomerId(initialCustomerId); }, [initialCustomerId]);
  const customer = customers.find(c => c.id === customerId);
  const payment = Number(amount) || 0;
  const submit = () => { if (!customer || payment <= 0) return; const received = Math.min(payment, customer.outstanding); setRemaining(Math.max(0, customer.outstanding - received)); recordPayment(customerId, received, method, notes); setDone(true); };
  const close = () => { setDone(false); setAmount(""); setNotes(""); onClose(); };
  return <Modal open={open} onClose={close} title={done ? "Payment recorded" : "Record payment"}>
    {done ? <div className="py-4 text-center"><CheckCircle2 className="mx-auto size-14 text-emerald-500" /><p className="mt-4 text-sm text-slate-500">Remaining balance</p><p className="mt-1 font-display text-3xl font-extrabold">{money(remaining)}</p><Button className="mt-6 w-full" onClick={close}>Done</Button></div> :
    <div className="space-y-4">
      <div><Label>Customer</Label><Select value={customerId} onChange={e => setCustomerId(e.target.value)}>{customers.filter(c => c.outstanding > 0).map(c => <option key={c.id} value={c.id}>{c.name} · {money(c.outstanding)}</option>)}</Select></div>
      <div><Label>Payment amount</Label><Input type="number" min="1" max={customer?.outstanding} placeholder="Enter amount" value={amount} onChange={e => setAmount(e.target.value)} /></div>
      <div><Label>Payment method</Label><Select value={method} onChange={e => setMethod(e.target.value as PaymentMethod)}>{["Cash", "UPI", "Bank Transfer", "Card", "Other"].map(v => <option key={v}>{v}</option>)}</Select></div>
      <div><Label>Notes</Label><Textarea rows={2} placeholder="Optional note" value={notes} onChange={e => setNotes(e.target.value)} /></div>
      <div className="rounded-xl bg-slate-50 p-4 text-sm"><div className="flex justify-between text-slate-500"><span>Previous balance</span><span>{money(customer?.outstanding || 0)}</span></div><div className="mt-2 flex justify-between text-slate-500"><span>Payment</span><span>- {money(payment)}</span></div><div className="mt-3 flex justify-between border-t border-slate-200 pt-3 font-bold"><span>Remaining balance</span><span>{money(Math.max(0, (customer?.outstanding || 0) - payment))}</span></div></div>
      <Button className="w-full" disabled={!customer || payment <= 0} onClick={submit}>Record Payment</Button>
    </div>}
  </Modal>;
}

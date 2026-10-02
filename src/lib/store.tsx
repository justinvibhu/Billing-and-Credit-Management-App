import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { business as initialBusiness, customers as initialCustomers, invoices as initialInvoices, payments as initialPayments, products as initialProducts } from "@/data/mockData";
import type { Business, Customer, Invoice, Payment, Product } from "@/types";

interface Store {
  customers: Customer[]; products: Product[]; invoices: Invoice[]; payments: Payment[]; business: Business;
  addCustomer: (customer: Omit<Customer, "id" | "totalPurchases" | "totalPaid" | "outstanding" | "lastTransaction">) => Customer;
  addProduct: (product: Omit<Product, "id">) => Product;
  addInvoice: (invoice: Omit<Invoice, "id" | "number">) => Invoice;
  recordPayment: (customerId: string, amount: number, method: Payment["method"], notes?: string) => void;
  updateBusiness: (business: Business) => void;
}
const AppContext = createContext<Store | null>(null);
const load = <T,>(key: string, fallback: T): T => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } };

export function AppProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState(() => load("khata-customers", initialCustomers));
  const [products, setProducts] = useState(() => load("khata-products", initialProducts));
  const [invoices, setInvoices] = useState(() => load("khata-invoices", initialInvoices));
  const [payments, setPayments] = useState(() => load("khata-payments", initialPayments));
  const [business, setBusiness] = useState(() => load("khata-business", initialBusiness));
  useEffect(() => { localStorage.setItem("khata-customers", JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem("khata-products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("khata-invoices", JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem("khata-payments", JSON.stringify(payments)); }, [payments]);
  useEffect(() => { localStorage.setItem("khata-business", JSON.stringify(business)); }, [business]);

  const value = useMemo<Store>(() => ({
    customers, products, invoices, payments, business,
    addCustomer: (draft) => { const item: Customer = { ...draft, id: crypto.randomUUID(), totalPurchases: 0, totalPaid: 0, outstanding: 0, lastTransaction: new Date().toISOString() }; setCustomers(v => [item, ...v]); return item; },
    addProduct: (draft) => { const item = { ...draft, id: crypto.randomUUID() }; setProducts(v => [item, ...v]); return item; },
    addInvoice: (draft) => { const item: Invoice = { ...draft, id: crypto.randomUUID(), number: `INV-${1022 + invoices.length}` }; setInvoices(v => [item, ...v]); setCustomers(v => v.map(c => c.id === item.customerId ? { ...c, totalPurchases: c.totalPurchases + item.total, totalPaid: c.totalPaid + item.paid, outstanding: c.outstanding + item.balance, lastTransaction: item.date } : c)); if (item.paid > 0) setPayments(v => [{ id: crypto.randomUUID(), customerId: item.customerId, customerName: item.customerName, invoiceId: item.id, amount: item.paid, method: "Cash", date: item.date, status: "Completed" }, ...v]); return item; },
    recordPayment: (customerId, amount, method, notes) => { const customer = customers.find(c => c.id === customerId); if (!customer) return; setCustomers(v => v.map(c => c.id === customerId ? { ...c, totalPaid: c.totalPaid + amount, outstanding: Math.max(0, c.outstanding - amount), lastTransaction: new Date().toISOString() } : c)); setPayments(v => [{ id: crypto.randomUUID(), customerId, customerName: customer.name, amount, method, notes, date: new Date().toISOString(), status: "Completed" }, ...v]); setInvoices(v => { let left = amount; return v.map(i => { if (i.customerId !== customerId || i.balance <= 0 || left <= 0) return i; const used = Math.min(left, i.balance); left -= used; const balance = i.balance - used; return { ...i, paid: i.paid + used, balance, status: balance === 0 ? "Paid" : "Partially Paid" }; }); }); },
    updateBusiness: setBusiness,
  }), [customers, products, invoices, payments, business]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() { const value = useContext(AppContext); if (!value) throw new Error("useApp must be used inside AppProvider"); return value; }

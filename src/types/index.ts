export type Status = "Paid" | "Partially Paid" | "Unpaid" | "Overdue";
export type PaymentMethod = "Cash" | "UPI" | "Bank Transfer" | "Card" | "Other";

export interface Customer { id: string; name: string; phone: string; city: string; totalPurchases: number; totalPaid: number; outstanding: number; lastTransaction: string; dueDate?: string; }
export interface Product { id: string; name: string; sku: string; category: string; purchasePrice: number; sellingPrice: number; gst: number; stock: number; unit: string; barcode: string; }
export interface InvoiceItem { id: string; productId: string; name: string; quantity: number; rate: number; discount: number; tax: number; total: number; }
export interface Invoice { id: string; number: string; customerId: string; customerName: string; date: string; items: InvoiceItem[]; subtotal: number; discount: number; tax: number; total: number; paid: number; balance: number; status: Status; }
export interface Payment { id: string; customerId: string; customerName: string; invoiceId?: string; amount: number; method: PaymentMethod; date: string; status: "Completed" | "Pending"; notes?: string; }
export interface CreditTransaction { id: string; customerId: string; date: string; description: string; debit: number; credit: number; balance: number; }
export interface Business { name: string; address: string; phone: string; gstin: string; upi: string; }
export interface User { id: string; name: string; role: string; email: string; }
export interface Report { id: string; name: string; period: string; total: number; }

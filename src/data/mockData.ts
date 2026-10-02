import type { Business, Customer, Invoice, Payment, Product } from "@/types";

export const business: Business = { name: "Shree Ganesh Traders", address: "Pune, Maharashtra", phone: "98765 12345", gstin: "27ABCDE1234F1Z5", upi: "ganeshtraders@upi" };
export const customers: Customer[] = [
  { id: "c1", name: "Rahul Patil", phone: "98765 43210", city: "Pune, Maharashtra", totalPurchases: 85400, totalPaid: 70000, outstanding: 15400, lastTransaction: "2025-10-02", dueDate: "2025-10-20" },
  { id: "c2", name: "Suresh Kumar", phone: "98220 11223", city: "Nashik, Maharashtra", totalPurchases: 62500, totalPaid: 54000, outstanding: 8500, lastTransaction: "2025-10-05", dueDate: "2025-10-12" },
  { id: "c3", name: "Amit General Store", phone: "97655 22441", city: "Pune, Maharashtra", totalPurchases: 124000, totalPaid: 103000, outstanding: 21000, lastTransaction: "2025-10-08", dueDate: "2025-10-28" },
  { id: "c4", name: "Priya Enterprises", phone: "98811 34901", city: "Satara, Maharashtra", totalPurchases: 48900, totalPaid: 48900, outstanding: 0, lastTransaction: "2025-10-09" },
  { id: "c5", name: "Mahesh Traders", phone: "90110 77213", city: "Pune, Maharashtra", totalPurchases: 96800, totalPaid: 67200, outstanding: 29600, lastTransaction: "2025-10-10", dueDate: "2025-10-15" },
];
export const products: Product[] = [
  { id: "p1", name: "India Gate Basmati Rice", sku: "RICE-05", category: "Grains", purchasePrice: 520, sellingPrice: 680, gst: 5, stock: 42, unit: "5 kg bag", barcode: "890123450001" },
  { id: "p2", name: "Aashirvaad Wheat Flour", sku: "ATTA-05", category: "Flour", purchasePrice: 210, sellingPrice: 275, gst: 5, stock: 68, unit: "5 kg bag", barcode: "890123450002" },
  { id: "p3", name: "Madhur Sugar", sku: "SUGAR-1", category: "Grocery", purchasePrice: 42, sellingPrice: 52, gst: 5, stock: 120, unit: "1 kg", barcode: "890123450003" },
  { id: "p4", name: "Fortune Cooking Oil", sku: "OIL-01", category: "Oil", purchasePrice: 132, sellingPrice: 155, gst: 5, stock: 34, unit: "1 L", barcode: "890123450004" },
  { id: "p5", name: "Tata Tea Premium", sku: "TEA-500", category: "Beverages", purchasePrice: 230, sellingPrice: 285, gst: 5, stock: 24, unit: "500 g", barcode: "890123450005" },
  { id: "p6", name: "Parle-G Biscuits", sku: "BISC-01", category: "Snacks", purchasePrice: 8, sellingPrice: 10, gst: 18, stock: 180, unit: "pack", barcode: "890123450006" },
];
export const invoices: Invoice[] = [
  { id: "i1", number: "INV-1025", customerId: "c1", customerName: "Rahul Patil", date: "2025-10-10", items: [{ id: "x1", productId: "p1", name: "India Gate Basmati Rice", quantity: 8, rate: 680, discount: 200, tax: 5, total: 5502 }], subtotal: 5440, discount: 200, tax: 262, total: 5502, paid: 2000, balance: 3502, status: "Partially Paid" },
  { id: "i2", number: "INV-1024", customerId: "c3", customerName: "Amit General Store", date: "2025-10-09", items: [{ id: "x2", productId: "p4", name: "Fortune Cooking Oil", quantity: 50, rate: 155, discount: 0, tax: 5, total: 8138 }], subtotal: 7750, discount: 0, tax: 388, total: 8138, paid: 8138, balance: 0, status: "Paid" },
  { id: "i3", number: "INV-1023", customerId: "c5", customerName: "Mahesh Traders", date: "2025-10-08", items: [{ id: "x3", productId: "p2", name: "Aashirvaad Wheat Flour", quantity: 20, rate: 275, discount: 0, tax: 5, total: 5775 }], subtotal: 5500, discount: 0, tax: 275, total: 5775, paid: 0, balance: 5775, status: "Overdue" },
  { id: "i4", number: "INV-1022", customerId: "c4", customerName: "Priya Enterprises", date: "2025-10-07", items: [{ id: "x4", productId: "p5", name: "Tata Tea Premium", quantity: 12, rate: 285, discount: 100, tax: 5, total: 3486 }], subtotal: 3420, discount: 100, tax: 166, total: 3486, paid: 3486, balance: 0, status: "Paid" },
];
export const payments: Payment[] = [
  { id: "pay1", customerId: "c1", customerName: "Rahul Patil", invoiceId: "i1", amount: 2000, method: "UPI", date: "2025-10-10", status: "Completed" },
  { id: "pay2", customerId: "c3", customerName: "Amit General Store", invoiceId: "i2", amount: 8138, method: "Bank Transfer", date: "2025-10-09", status: "Completed" },
  { id: "pay3", customerId: "c4", customerName: "Priya Enterprises", invoiceId: "i4", amount: 3486, method: "Cash", date: "2025-10-07", status: "Completed" },
];

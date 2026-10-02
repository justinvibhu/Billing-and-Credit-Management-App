import { Navigate, createBrowserRouter } from "react-router";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Billing from "@/pages/Billing";
import Invoices from "@/pages/Invoices";
import InvoiceDetails from "@/pages/InvoiceDetails";
import Customers from "@/pages/Customers";
import CustomerDetails from "@/pages/CustomerDetails";
import Credit from "@/pages/Credit";
import Payments from "@/pages/Payments";
import Reports from "@/pages/Reports";
import Products from "@/pages/Products";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

export const router=createBrowserRouter([{path:"/",Component:AppLayout,children:[
  {index:true,element:<Navigate to="/dashboard" replace/>},
  {path:"dashboard",Component:Dashboard},{path:"billing",Component:Billing},
  {path:"invoices",Component:Invoices},{path:"invoices/:id",Component:InvoiceDetails},
  {path:"customers",Component:Customers},{path:"customers/:id",Component:CustomerDetails},
  {path:"credit",Component:Credit},{path:"payments",Component:Payments},
  {path:"reports",Component:Reports},{path:"products",Component:Products},
  {path:"settings",Component:Settings},{path:"*",Component:NotFound},
]}]);

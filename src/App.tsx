import { RouterProvider } from "react-router";
import { AppProvider } from "@/lib/store";
import { router } from "@/routes";

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

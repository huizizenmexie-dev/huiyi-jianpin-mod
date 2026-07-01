import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();
const root = document.getElementById("root")!;
const app = (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

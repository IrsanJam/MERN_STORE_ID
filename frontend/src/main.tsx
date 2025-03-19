import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./routes/App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  
);

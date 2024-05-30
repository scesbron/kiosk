import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./screens/dashboard.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;

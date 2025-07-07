import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HackerNewsTop10 from "./HackerNewsTop10";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HackerNewsTop10 />
    </QueryClientProvider>
  );
}

export default App;

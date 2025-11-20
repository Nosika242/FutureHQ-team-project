<<<<<<< HEAD
import AppWrapper from "./components/LayoutComponents/AppWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
=======
import AppWrapper from './components/LayoutComponents/AppWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
>>>>>>> 8c2fff928baa64bec30a1e5c4285e73e8d81ecbf
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
<<<<<<< HEAD
      <ReactQueryDevtools initialIsOpen={false} toggleButton={false} />
=======
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
>>>>>>> 8c2fff928baa64bec30a1e5c4285e73e8d81ecbf
    </QueryClientProvider>
  );
}

export default App;

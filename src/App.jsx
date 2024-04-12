import { Outlet } from 'react-router-dom';
import SearchHeader from "./components/SearchHeader";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  console.log(process.env.REACT_APP_YOUTUBE_API_KEY);
  return (
    <>
      <SearchHeader />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import WeatherHome from './Pages/WeatherHome';
import WeatherDetails from './Pages/WeatherDetails';
import { ThemeProvider } from './context/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <ThemeProvider defaultTheme='dark'>
      <Layout>
        <Routes>
          <Route path='/' element={<WeatherHome />} />
          <Route path='/city/:cityName' element={<WeatherDetails />} />
        </Routes>
      </Layout>
    </ThemeProvider>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

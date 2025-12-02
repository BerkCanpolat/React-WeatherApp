import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import WeatherHome from './Pages/WeatherHome';
import WeatherDetails from './Pages/WeatherDetails';
import { ThemeProvider } from './context/ThemeProvider';

function App() {

  return (
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
  )
}

export default App

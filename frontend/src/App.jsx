import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import SeriesPreviewPage from './pages/SeriesPreviewPage';
import Series1 from './pages/Series1';
import Series2 from './pages/Series2';
import Series3 from './pages/Series3';


// importing the inlines to external
import './styles/toast.css';

// protected routes for unauthorized peeps
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // hardcoded na toast message HAHAHAHAAHHA mb
    // no more hardcoded toast message to test the csp inline issue
    setTimeout(() => { 
      const toast = document.createElement("div");
      toast.textContent = "You must log in to access this page.";
      toast.classList.add("toast-message"); // Use the CSS class
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 3000);
    }, 100);

    return <Navigate to="/" />;
  }

  return children;
};


function App() {
  const location = useLocation(); 

  const hideNavbar = location.pathname === '/' || location.pathname === '/register';

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Protected Routes */}
        <Route path='/products' element={<PrivateRoute><SeriesPreviewPage /></PrivateRoute>} />
        <Route path='/products/all-products' element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
        <Route path='/create' element={<PrivateRoute><CreatePage /></PrivateRoute>} />
        <Route path='/products/series1' element={<PrivateRoute><Series1 /></PrivateRoute>} />
        <Route path='/products/series2' element={<PrivateRoute><Series2 /></PrivateRoute>} />
        <Route path='/products/series3' element={<PrivateRoute><Series3 /></PrivateRoute>} />
      </Routes>
    </Box>
  );
}

export default App;
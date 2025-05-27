import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import PackagesPage from './pages/PackagesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyBookings from './pages/MyBookings';
import BookingDetails from './pages/BookingDetails';
import ConfirmationPurchase from './pages/ConfirmationPurchase';
import PurchasedTrips from './pages/PurchasedTrips';
import { AuthProvider } from './components/auth/AuthContext';
import LoginAdmin from './pages/LoginAdmin';
import AdminPage from './pages/AdminPage';
import { FaPlane } from 'react-icons/fa'; // Icono de avión para el loader


const App = () => {
  const [bookings, setBookings] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 👉 loader inicial

  const handleAddBooking = (newBooking) => {
    setBookings([...bookings, newBooking]); 
  };

  useEffect(() => {
    // Simular una carga inicial (por ejemplo, 2 segundos)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 👉 Mostrar loader si está cargando
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <div className="absolute inset-0 bg-black opacity-50 flex justify-center items-center z-50">
            <FaPlane className="animate-spin text-4xl text-white" />
          </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/packages" element={<PackagesPage onAddBooking={handleAddBooking} />} />
          <Route path="/mis-viajes" element={<MyBookings />} />
          <Route path="/mis-viajes-comprados" element={<PurchasedTrips />} />
          <Route path="/seleccion-pasajes" element={<BookingDetails />} />
          <Route path="/confirmacion" element={<ConfirmationPurchase />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login-admin" element={<LoginAdmin setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/admin"
            element={isAuthenticated ? <AdminPage /> : <LoginAdmin setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;

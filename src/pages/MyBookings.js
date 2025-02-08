import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Verificación si el usuario está logueado
  const isLoggedIn = !!localStorage.getItem('user');

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(savedBookings);

    if (location.state?.newBooking) {
      const newBooking = location.state.newBooking;
      const isBookingExist = savedBookings.some(booking => booking.id === newBooking.id);
      if (!isBookingExist) {
        const updatedBookings = [...savedBookings, newBooking];
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      }
    }
  }, [location.state?.newBooking]);

  const handleRemoveBooking = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const handleSelectBooking = (booking) => {
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      setTimeout(() => {
        setShowLoginAlert(false);
      }, 5000);
      return;
    }
    navigate('/seleccion-pasajes', { state: { booking } });
  };

  const handleCreateNewBooking = () => {
    navigate('/packages');
  };

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">¡Aún no tienes reservas!</h1>
          <p className="text-gray-600 mb-6">Parece que aún no has reservado ningún viaje. ¿Qué tal si eliges uno ahora?</p>
          <button
            onClick={handleCreateNewBooking}
            className="py-3 px-6 bg-[rgb(26,54,93)] text-white rounded-md shadow-md hover:bg-[rgb(26,54,93,0.8)]"
          >
            Realizar una nueva reserva
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4">
      <div className="container mx-auto py-8 flex-grow">
        {showLoginAlert && (
          <div className="bg-red-500 text-white text-center py-3 rounded-md mb-6">
            <p>Debes estar logueado para poder realizar una compra. <strong><a href="/login" className="underline">Iniciar sesión</a></strong></p>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Tus Reservas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-white shadow-md rounded-xl p-4 transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className="flex items-center space-x-4">
                <img
                  src={booking.image || 'https://via.placeholder.com/200x150'}
                  alt={booking.name}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800">{booking.name}</h3>
                  <p className="text-sm text-gray-600">{booking.duration}</p>
                </div>
              </div>
              <div className="mt-4 text-gray-700 text-sm">
                <p>Precio: <span className="font-semibold text-[rgb(26,54,93)]">${booking.price}</span></p>
                <p className="text-gray-500">{booking.description}</p>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  className="py-2 px-4 bg-[rgb(26,54,93)] text-white rounded-lg hover:bg-[rgb(26,54,93,0.8)]"
                  onClick={() => handleSelectBooking(booking)}
                >
                  Comprar
                </button>
                <button
                  className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  onClick={() => handleRemoveBooking(index)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/mis-viajes-comprados')}
            className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md transition-all duration-200"
          >
            Ver mis viajes comprados
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;

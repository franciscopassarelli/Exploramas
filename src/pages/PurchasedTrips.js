import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PurchasedTrips = () => {
  const [purchasedTrips, setPurchasedTrips] = useState([]);
  const navigate = useNavigate();

  // Obtener el estado de login y usuario desde localStorage
  const isLoggedIn = !!localStorage.getItem('user'); // Chequear si hay un usuario logueado
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null; // Obtener los detalles del usuario

  useEffect(() => {
    if (isLoggedIn && user) {
      const userId = user.id; // Obtener el ID del usuario logueado
      const savedPurchases = JSON.parse(localStorage.getItem(`purchasedTrips_${userId}`)) || [];
      setPurchasedTrips(savedPurchases);
    }
  }, []); // Empty dependency array, effect runs only once when the component mounts
  

  const handleReturnToBookings = () => {
    navigate('/mis-viajes');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4">
      <div className="container mx-auto py-8 flex-grow">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Mis Viajes Comprados</h1>

        {purchasedTrips.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">No tienes viajes comprados todavía.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedTrips.map((trip, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={trip.image || 'https://via.placeholder.com/400x250'}
                  alt={trip.name}
                  className="w-full h-48 sm:h-60 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{trip.name}</h3>
                  <p>Precio: ${trip.price}</p>
                  <p>Duración: {trip.duration}</p>
                  <p>{trip.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={handleReturnToBookings}
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Volver a mis reservas
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchasedTrips;

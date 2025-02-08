import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PurchasedTripsTable from './PurchasedTripsTable';
import PurchasedTripsList from './PurchasedTripsList';

const PurchasedTrips = () => {
  const [purchasedTrips, setPurchasedTrips] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('user');
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    if (isLoggedIn && user) {
      const userId = user.id;
      const savedPurchases = JSON.parse(localStorage.getItem(`purchasedTrips_${userId}`)) || [];
      setPurchasedTrips(savedPurchases);
    }
  }, []); 

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
          <>
            <div className="hidden sm:block">
              <PurchasedTripsTable trips={purchasedTrips} />
            </div>
            <div className="sm:hidden">
              <PurchasedTripsList trips={purchasedTrips} />
            </div>
          </>
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

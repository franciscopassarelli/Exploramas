// Este es el componente de lista compacta para dispositivos móviles
import React from 'react';

const PurchasedTripsList = ({ trips }) => {
  return (
    <div className="space-y-6">
      {trips.map((trip, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:space-x-6">
          <img
            src={trip.image || 'https://via.placeholder.com/100x100'}
            alt={trip.name}
            className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold">{trip.name}</h3>
            <p className="text-gray-600">Precio: ${trip.price}</p>
            <p className="text-gray-600">Duración: {trip.duration}</p>
            <p className="text-gray-500">{trip.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchasedTripsList;

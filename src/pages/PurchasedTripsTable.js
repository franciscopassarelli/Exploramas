// Este es el componente de tabla tradicional para pantallas grandes
import React from 'react';

const PurchasedTripsTable = ({ trips }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Imagen</th>
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Precio</th>
            <th className="p-4 text-left">Duración</th>
            <th className="p-4 text-left">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">
                <img
                  src={trip.image || 'https://via.placeholder.com/100x100'}
                  alt={trip.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </td>
              <td className="p-4">{trip.name}</td>
              <td className="p-4">${trip.price}</td>
              <td className="p-4">{trip.duration}</td>
              <td className="p-4">{trip.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchasedTripsTable;

// components/ProductCardList.jsx
import React from 'react';

const ProductCardList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white shadow-lg rounded-lg p-4"
          >
            <div className="flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center text-gray-600 mb-2">
                <span className="text-sm">{product.duration}</span>
                <span className="font-semibold text-primary text-sm">${product.price}</span>
              </div>
              <div className="text-yellow-500 mb-2">
                {"★".repeat(Math.floor(product.rating))}
                <span className="text-gray-400 ml-1 text-sm">({product.rating})</span>
              </div>
              {onEdit && onDelete && (
                <div className="flex space-x-2">
                  <button onClick={() => onEdit(product.id)} className="text-blue-500 hover:underline">Editar</button>
                  <button onClick={() => onDelete(product.id)} className="text-red-500 hover:underline">Eliminar</button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No hay productos para mostrar.</p>
      )}
    </div>
  );
};

export default ProductCardList;

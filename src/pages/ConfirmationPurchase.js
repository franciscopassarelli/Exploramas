import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationPurchase = () => {
  const location = useLocation();
  const { booking, quantity, totalPrice } = location.state || {}; // Obtener los datos de la reserva
  const navigate = useNavigate();

  const [transactionId, setTransactionId] = useState(null); // ID de transacción
  const [purchaseDate] = useState(new Date()); // Fecha de compra
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Función para formatear la fecha de la compra
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
  };

  const isLoggedIn = !!localStorage.getItem('user');
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null; // Obtenemos el usuario desde localStorage

  useEffect(() => {
    if (isLoggedIn) {
      setTransactionId(`TRANS-${Date.now()}`); // Generar el ID de transacción único
    }
  }, [isLoggedIn]);

  const removeBookedItem = () => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = savedBookings.filter(item => item.id !== booking.id); // Filtramos el viaje comprado
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const handleCopyId = () => {
    if (transactionId) {
      navigator.clipboard.writeText(transactionId);
      alert("ID copiado al portapapeles.");
    }
  };
  const handleRedirect = () => {
    if (!isLoggedIn) {
      alert("Por favor, inicia sesión para completar tu compra.");
      return;
    }


    const savePurchasedTrip = (userId, tripData) => {
      const savedTrips = JSON.parse(localStorage.getItem(`purchasedTrips_${userId}`)) || [];
      savedTrips.push(tripData);
      localStorage.setItem(`purchasedTrips_${userId}`, JSON.stringify(savedTrips));
    };
    
  
    // Obtener el ID del usuario logueado
    const userId = user.id; // Asumimos que el objeto `user` tiene un `id`
  
    // Agregar el viaje a la lista de viajes comprados en localStorage del usuario
    const purchasedTrip = {
      name: booking.name,
      price: totalPrice, // El precio total de la compra
      duration: booking.duration,
      description: booking.description,
      image: booking.image, // Puedes guardar la imagen si lo deseas
    };
  
    // Recuperar las compras anteriores del usuario desde localStorage
    let purchasedTrips = JSON.parse(localStorage.getItem(`purchasedTrips_${userId}`)) || [];
  
    // Agregar el nuevo viaje comprado
    purchasedTrips.push(purchasedTrip);

    savePurchasedTrip(userId, purchasedTrip);
  
    // Guardar las compras actualizadas en localStorage bajo la clave del usuario
    localStorage.setItem(`purchasedTrips_${userId}`, JSON.stringify(purchasedTrips));
  
    removeBookedItem(); // Eliminar el viaje de las reservas locales
    navigate('/mis-viajes-comprados'); // Redirigir a la página de "Mis viajes comprados"
  };
  
  

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentProcessing(true);
    // Simulamos el proceso de pago con un pequeño retraso
    setTimeout(() => {
      setPaymentProcessing(false);
      alert('Pago simulado realizado con éxito. ¡Gracias por tu compra!');
    }, 2000);
  };

  if (!booking) {
    return <p>No se encontraron detalles de la compra.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">¡Compra Completada!</h1>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-primary">Resumen de tu compra</h2>
            </div>
            <div className="text-right text-gray-600">
              <p className="text-sm">Fecha de compra: {formatDate(purchaseDate)}</p>
            </div>
          </div>

          {isLoggedIn && user ? (
            <p><strong>Usuario:</strong> {user.name || user.email}</p> // Mostrar el nombre o email del usuario
          ) : (
            <p><strong>Usuario:</strong> Invitado</p> // Mostrar "Invitado" si no está logueado
          )}

          <p><strong>Paquete:</strong> {booking.name}</p>
          <p><strong>Cantidad de pasajes:</strong> {quantity}</p>
          <p><strong>Precio total: $</strong> {totalPrice ? totalPrice.toFixed(2) : 'N/A'} {booking.currency}</p>

          {isLoggedIn && transactionId ? (
            <p><strong>ID de transacción:</strong> {transactionId}</p>
          ) : (
            <p><strong>ID de transacción:</strong> (Solo disponible para usuarios registrados)</p>
          )}

          {/* Sección de Pago Simulado */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Método de Pago</h3>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm text-gray-700">Número de tarjeta</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="**** **** **** ****"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="cardExpiry" className="block text-sm text-gray-700">Fecha de expiración</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="MM/AA"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="cardCVC" className="block text-sm text-gray-700">CVC</label>
                  <input
                    type="text"
                    id="cardCVC"
                    name="cardCVC"
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="CVC (Código de Verificación de la Tarjeta)"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                disabled={paymentProcessing}
              >
                {paymentProcessing ? 'Procesando...' : 'Realizar Pago'}
              </button>
            </form>
          </div>

          <div className="flex justify-center mt-6 gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleCopyId}
                className="py-2 px-4 bg-[rgb(26,54,93)] text-white rounded-md hover:bg-[rgba(100, 128, 165, 0.71)]"
              >
                Copiar ID
              </button>
            ) : (
              <button
                disabled
                className="py-2 px-4 bg-gray-300 text-white rounded-md cursor-not-allowed"
              >
                Copiar ID (Solo disponible si estás logueado)
              </button>
            )}
            <button
              onClick={handleRedirect}
              className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Volver a mis viajes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPurchase;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(''); // Estado para el mensaje de la alerta
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtenemos el usuario guardado en localStorage
    const storedUser = localStorage.getItem(email);

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        login(user); // Logueamos al usuario en el contexto
        setAlertMessage('Inicio de sesión exitoso');
        setShowAlert(true); // Mostramos la alerta
        setTimeout(() => navigate('/'), 1500); // Redirigimos después de 1.5 segundos
      } else {
        setAlertMessage('Contraseña incorrecta');
        setShowAlert(true); // Mostramos la alerta
      }
    } else {
      setAlertMessage('Usuario no encontrado');
      setShowAlert(true); // Mostramos la alerta
    }
  };

  // Después de mostrar la alerta, la cerramos automáticamente después de 3 segundos
  React.useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(false), 3000); // Cerrar la alerta después de 3 segundos
    }
  }, [showAlert]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2c3e50] to-[#34495e] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl relative z-10">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-6">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
              Dirección de correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2980b9] focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2980b9] focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full py-3 bg-[#2980b9] text-white rounded-lg hover:bg-[#2980b9]/80 focus:outline-none transition-all duration-300 ease-in-out">
            Iniciar sesión
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="text-[#3498db] hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>

      {/* Alerta estilo toast en la parte superior */}
      {showAlert && (
  <div className="fixed top-0 left-0 w-full p-4 bg-gray-800 text-white text-center font-semibold shadow-lg transform transition-all duration-300 ease-in-out">
    {alertMessage}
  </div>
)}

    </div>
  );
};

export default LoginPage;

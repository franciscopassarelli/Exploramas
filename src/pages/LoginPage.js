import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { auth, provider } from '../firebase/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem(email);

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        login(user);
        setAlertMessage('Inicio de sesión exitoso');
        setShowAlert(true);
        setTimeout(() => navigate('/'), 1500);
      } else {
        setAlertMessage('Contraseña incorrecta');
        setShowAlert(true);
      }
    } else {
      setAlertMessage('Usuario no encontrado');
      setShowAlert(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      login({
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      setAlertMessage('Inicio de sesión con Google exitoso');
      setShowAlert(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error.message);
      setAlertMessage('Error al iniciar sesión con Google');
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2c3e50] to-[#34495e] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl relative z-10">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-6">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Dirección de correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-6 py-3 border border-gray-300 rounded-lg"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-6 py-3 border border-gray-300 rounded-lg"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full py-3 bg-[#2980b9] text-white rounded-lg hover:bg-[#2980b9]/80">
            Iniciar sesión
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-4 w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Iniciar sesión con Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="text-[#3498db] hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>

      {showAlert && (
        <div className="fixed top-0 left-0 w-full p-4 bg-gray-800 text-white text-center font-semibold shadow-lg">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default LoginPage;

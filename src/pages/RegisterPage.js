// src/pages/RegisterPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlertMessage("¡Las contraseñas no coinciden!");
      setShowAlert(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Podés usar updateProfile si querés pedirle nombre en otro input
      // await updateProfile(user, { displayName: 'Nombre del usuario' });

      const userData = {
        email: user.email,
        uid: user.uid,
        name: user.displayName || '',
        photoURL: user.photoURL || '',
      };

      login(userData);

      setAlertMessage('Registro exitoso');
      setShowAlert(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      setAlertMessage('Error al registrar: ' + error.message);
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
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-6">Crear una cuenta</h2>
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
              required
            />
          </div>

          <div className="mb-4">
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
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-6 py-3 border border-gray-300 rounded-lg"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#2980b9] text-white rounded-lg hover:bg-[#2980b9]/80"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-[#3498db] hover:underline">
            Inicia sesión aquí
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

export default RegisterPage;

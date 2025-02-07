import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // Importar el hook

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Nuevo estado para mostrar la modal
  const { user, logout } = useAuth(); // Obtener el usuario y logout desde el AuthContext
  const navigate = useNavigate();
  const location = useLocation(); // Obtenemos la ruta actual

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen); // Cambiar el estado del dropdown móvil
  };

  const handleLogout = () => {
    setShowModal(true); // Mostrar la modal de confirmación
  };

  const confirmLogout = () => {
    logout(); // Llamar al método logout del AuthContext
    navigate('/login'); // Redirigir a la página de login
    setShowModal(false); // Cerrar la modal después del logout
  };

  const cancelLogout = () => {
    setShowModal(false); // Cerrar la modal sin hacer nada
  };

  const isActiveLink = (path) => location.pathname === path; // Función para verificar si el link está activo

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className={`text-2xl font-heading font-bold ${isActiveLink('/') ? 'text-primary' : 'text-gray-600'} transition-colors duration-300`}
        >
          Explora+Más
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 focus:outline-none"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        <div className="hidden md:flex gap-6 items-center">
          <Link 
            to="/destinations" 
            className={`text-gray-600 hover:text-gray-800 transition-colors duration-300 ${isActiveLink('/destinations') ? 'font-semibold' : ''}`}
          >
            Destinos
            {isActiveLink('/destinations') && <span className="ml-2">✈️</span>}
          </Link>

          <Link 
            to="/packages" 
            className={`text-gray-600 hover:text-gray-800 transition-colors duration-300 ${isActiveLink('/packages') ? 'font-semibold' : ''}`}
          >
            Paquetes
            {isActiveLink('/packages') && <span className="ml-2">✈️</span>}
          </Link>

          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className={`text-gray-600 hover:text-gray-800 transition-colors duration-300 flex items-center gap-2 ${isDropdownOpen ? 'font-semibold' : ''}`}
            >
              Mis Viajes
              {isActiveLink('/mis-viajes') && <span className="ml-2">✈️</span>}
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 p-2 flex flex-col z-10">
                <Link 
                  to="/mis-viajes" 
                  className={`text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-200 ${isActiveLink('/mis-viajes') ? 'font-semibold' : ''}`}
                >
                  Mis Viajes
                  {isActiveLink('/mis-viajes') && <span className="ml-2">✈️</span>}
                </Link>
                <Link 
                  to="/mis-viajes-comprados" 
                  className={`text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-200 ${isActiveLink('/mis-viajes-comprados') ? 'font-semibold' : ''}`}
                >
                  Mis Viajes Comprados
                  {isActiveLink('/mis-viajes-comprados') && <span className="ml-2">✈️</span>}
                </Link>
              </div>
            )}
          </div>

          {user ? (
            <>
              <span className="text-gray-600">Hola, {user.name || user.email}</span>
              <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800 transition-colors duration-300">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">Iniciar sesión</Link>
              <Link to="/register" className="py-2 px-4 bg-[rgb(26,54,93)] text-white rounded-md hover:bg-[rgb(26,54,93,0.8)]">Registrarse</Link>
            </>
          )}
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg p-4 mt-2 transform transition-all duration-300 ease-in-out">
          <div className="flex flex-col gap-4">
            <Link 
              to="/destinations" 
              className={`text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-200 ${isActiveLink('/destinations') ? 'font-semibold' : ''}`}
            >
              Destinos
              {isActiveLink('/destinations') && <span className="ml-2">✈️</span>}
            </Link>

            <Link 
              to="/packages" 
              className={`text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-200 ${isActiveLink('/packages') ? 'font-semibold' : ''}`}
            >
              Paquetes
              {isActiveLink('/packages') && <span className="ml-2">✈️</span>}
            </Link>

            <div className="relative">
              <button 
                onClick={toggleMobileDropdown}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
              >
                Mis Viajes
                {isActiveLink('/mis-viajes') && <span className="ml-2">✈️</span>}
              </button>
              {isMobileDropdownOpen && (
                <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 p-2 flex flex-col z-10">
                  <Link 
                    to="/mis-viajes" 
                    className={`text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-200 ${isActiveLink('/mis-viajes') ? 'font-semibold' : ''}`}
                  >
                    Mis Viajes
                    {isActiveLink('/mis-viajes') && <span className="ml-2">✈️</span>}
                  </Link>
                  <Link 
                    to="/mis-viajes-comprados" 
                    className={`text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-200 ${isActiveLink('/mis-viajes-comprados') ? 'font-semibold' : ''}`}
                  >
                    Mis Viajes Comprados
                    {isActiveLink('/mis-viajes-comprados') && <span className="ml-2">✈️</span>}
                  </Link>
                </div>
              )}
            </div>

            {user ? (
              <>
                <span className="text-gray-600">Hola, {user.name || user.email}</span>
                <button onClick={handleLogout} className="w-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-200">Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link to="/login" className="w-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-200">Loguearse</Link>
                <Link to="/register" className="w-full py-2 px-4 bg-[rgb(26,54,93)] text-white rounded-md hover:bg-[rgb(26,54,93,0.8)]">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">¿Estás seguro de que deseas cerrar sesión?</h2>
            <div className="flex justify-between">
              <button onClick={confirmLogout} className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">Sí, cerrar sesión</button>
              <button onClick={cancelLogout} className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

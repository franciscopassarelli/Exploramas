import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"; 
import FeaturedDestinations from "../components/destinations/FeaturedDestinations"; 
import { Footer } from "../components/common/Footer"; 

const HomePage = () => {
  const [currentSection, setCurrentSection] = useState(0); 
  const [fade, setFade] = useState(true); 
  const [search, setSearch] = useState(""); 

  // Lista de destinos (sin API ni backend)
  const destinations = [
    "Playa del Carmen, México", 
    "Montañas de los Andes, Mendoza Argentina", 
    "Tokio Japón", 
    "París Francia", 
    "Barcelona España",
    "Bariloche, Argentina", 
    "Bali Indonesia",
    "Santorini Grecia",
    "Machu Picchu, Peru",
    "Salta y Jujuy, Argentina",
    "Mar del Plata, Argentina",
    "Ushuaia fin del mundo, Argentina",
    "Cordoba, Argentina Tour",
    "Auckland, Nueva Zelanda",
    "Miami Beach, Estados Unidos",
    "Cataratas del Iguzú, Argentina"
  ];

  // Filtrar destinos con base en la búsqueda, considerando las primeras 3 letras de cada palabra
  const filteredDestinations = destinations.filter(destination => {
    // Dividir el destino en palabras
    const words = destination.split(" ");
    // Verificar si alguna palabra comienza exactamente con las letras de la búsqueda (al menos 3 letras)
    return words.some(word => 
      word.toLowerCase().startsWith(search.toLowerCase())
    );
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setCurrentSection((prev) => (prev === 0 ? 1 : 0)); 
        setFade(true); 
      }, 500); 
    }, 8000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Sección de presentación */}
      <div className="relative h-[600px] sm:h-[500px] lg:h-[600px] flex items-center justify-center bg-cover bg-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')"
      }}>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 text-center text-white px-4 md:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate-fadeIn titulo-brillante">
  Descubre tu próxima aventura
</h1>

<p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto p-dorado">
  Explora los destinos más bellos del mundo con nuestros paquetes de viaje seleccionados
</p>

          {/* Barra de búsqueda con lupa dentro */}
          <div className="relative w-full sm:w-auto max-w-md mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar destinos"
              className="w-full px-6 py-3 pl-10 pr-4 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pastelBlue focus:ring-opacity-50 transition-all duration-300 ease-in-out 
                         border-2 border-gray-300 hover:border-gray-400 focus:border-[#FF7C5D] shadow-md"
            />
            {/* Lupa dentro del input */}
            <MagnifyingGlassIcon 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 transition-colors duration-200 hover:text-[#FF7C5D]" 
            />
          </div>

          {/* Mostrar destinos filtrados */}
          {search && (
  <div className="mt-6 text-white">
    <h3 className="font-semibold mb-4">Resultados de búsqueda:</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2">
      {filteredDestinations.length > 0 ? (
        filteredDestinations.map((destination, index) => (
          <div key={index} className="bg-[rgb(26,54,93)] text-white p-2 sm:p-3 rounded-md shadow-sm hover:shadow-md hover:scale-102 hover:bg-[rgb(26,54,93,0.8)] transition-all duration-150 ease-in-out">
            <p className="text-xs sm:text-sm font-semibold">{destination}</p>
          </div>
        ))
      ) : (
        <div className="text-lg">No se encontraron destinos.</div>
      )}
    </div>
  </div>
)}




        </div>
      </div>

      {/* Resto de las secciones */}
      <div className="py-16 text-center">
        <h2 className={`text-3xl font-bold text-gray-800 mb-6 transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
          {currentSection === 0 ? "¿Por qué elegirnos?" : "¿Cómo funciona?"}
        </h2>

        {/* Contenido de las tarjetas */}
        <div className="max-w-5xl mx-auto">
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-2000 ${fade ? "opacity-100" : "opacity-0"}`}>
            {currentSection === 0 ? (
              <>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Tarifas Exclusivas</h3>
                  <p className="text-gray-600">Obtén acceso a tarifas especiales y ofertas solo para miembros.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Reserva Flexible</h3>
                  <p className="text-gray-600">Disfruta de opciones de cancelación flexibles para tu tranquilidad.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Atención Personalizada</h3>
                  <p className="text-gray-600">Nuestro equipo está disponible para ayudarte en cada paso del proceso.</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Elige tu destino</h3>
                  <p className="text-gray-600">Explora nuestros destinos más populares y selecciona el que más te guste.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Reserva tu paquete</h3>
                  <p className="text-gray-600">Escoge el paquete que más te interese, ajusta las fechas y haz tu reserva.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Disfruta tu aventura</h3>
                  <p className="text-gray-600">Prepárate para vivir una experiencia inolvidable en tu destino seleccionado.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sección de destinos destacados */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <FeaturedDestinations />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;

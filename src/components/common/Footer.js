import { Link } from "react-router-dom";

export const Footer = ({ isAuthenticated }) => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-6 py-8">
        {/* Grid responsivo para el footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Sección "Explora+Más" */}
          <div className="flex flex-col justify-center items-center sm:items-start">
            <h3 className="text-xl font-semibold mb-4 text-center sm:text-left text-gray-300">Explora+Más</h3>
            <p className="text-sm text-center sm:text-left font-light">
              Tu compañero de confianza para descubrir el mundo y crear memorias inolvidables.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="flex flex-col justify-center items-center sm:items-start">
            <h4 className="font-semibold mb-4 text-center sm:text-left text-gray-300">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-center sm:text-left">
              <li><Link to="/" className="hover:text-secondary transition-colors">Inicio</Link></li>
              <li><Link to="/destinations" className="hover:text-secondary transition-colors">Destinos</Link></li>
              <li><Link to="/packages" className="hover:text-secondary transition-colors">Paquetes</Link></li>
              {/* Enlace de Admin con candado */}
              {!isAuthenticated && (
                <li>
                  <Link to="/login-admin" className="hover:text-secondary transition-colors flex items-center space-x-2">
                    <i className="fas fa-lock"></i> {/* Icono de candado */}
                    <span>Admin</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Información de Contacto */}
          <div className="flex flex-col justify-center items-center sm:items-start">
            <h4 className="font-semibold mb-4 text-center sm:text-left text-gray-300">Contacto</h4>
            <ul className="space-y-2 text-sm text-center sm:text-left">
              <li>Email: info@exploramas.com</li>
              <li>Teléfono: +1 234 567 890</li>
              <li>Dirección: Calle Principal 123</li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col justify-center items-center sm:items-start">
            <h4 className="font-semibold mb-4 text-center sm:text-left text-gray-300">Síguenos</h4>
            <div className="flex space-x-6 justify-center sm:justify-start">
              <button className="hover:text-secondary transition-colors">Facebook</button>
              <button className="hover:text-secondary transition-colors">Twitter</button>
              <button className="hover:text-secondary transition-colors">Instagram</button>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
          <p className="font-light">&copy; 2025 Explora+Más. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

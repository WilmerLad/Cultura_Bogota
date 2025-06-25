import React, { useState } from 'react';

const Menunav = ({ onLoginRegisterClick, onLogout, isLoggedIn, setCurrentPage, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 shadow-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">CulturaBog</div>

        {/* Botón hamburguesa (visible solo en móvil) */}
        <button
          className="text-white text-3xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Menú de navegación */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-6 text-white text-lg font-medium items-center">
            <li><button onClick={() => handleNavigation('landing')} className="hover:text-blue-600">Inicio</button></li>
            <li><button onClick={() => handleNavigation('explore')} className="hover:text-blue-600">Explorar</button></li>
            <li><button onClick={() => handleNavigation('recommendations')} className="hover:text-blue-600">Recomendaciones</button></li>
            <li><button onClick={() => handleNavigation('calendar')} className="hover:text-blue-600">Calendario</button></li>
            {isLoggedIn && (
              <li><button onClick={() => handleNavigation('profile')} className="hover:text-blue-600">Perfil</button></li>
            )}
            {isAdmin && (
              <>
                <li><button onClick={() => handleNavigation('addEvent')} className="hover:text-blue-600">+ Evento</button></li>
                <li><button onClick={() => handleNavigation('userManagement')} className="hover:text-blue-600">Usuarios</button></li>
              </>
            )}
          </ul>
        </nav>

        {/* Botón de sesión */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm shadow-md"
            >
              Cerrar Sesión
            </button>
          ) : (
            <button
              onClick={onLoginRegisterClick}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 text-sm shadow-md"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-2 text-white text-lg font-medium">
            <li><button onClick={() => handleNavigation('landing')} className="hover:text-blue-600">Inicio</button></li>
            <li><button onClick={() => handleNavigation('explore')} className="hover:text-blue-600">Explorar</button></li>
            <li><button onClick={() => handleNavigation('recommendations')} className="hover:text-blue-600">Recomendaciones</button></li>
            <li><button onClick={() => handleNavigation('calendar')} className="hover:text-blue-600">Calendario</button></li>
            {isLoggedIn && (
              <li><button onClick={() => handleNavigation('profile')} className="hover:text-blue-600">Perfil</button></li>
            )}
            {isAdmin && (
              <>
                <li><button onClick={() => handleNavigation('addEvent')} className="hover:text-blue-600">Agregar Evento</button></li>
                <li><button onClick={() => handleNavigation('userManagement')} className="hover:text-blue-600">Usuarios</button></li>
              </>
            )}
            <li>
              {isLoggedIn ? (
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm shadow-md"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <button
                  onClick={onLoginRegisterClick}
                  className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 text-sm shadow-md"
                >
                  Iniciar Sesión
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Menunav;

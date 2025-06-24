import React, { useState } from 'react';

const LoginForm = ({ onLogin, onShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-md mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
            required
          />
        </div>
        <div className="flex flex-col space-y-3 pt-4">
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            Iniciar Sesión
          </button>
          <p className="text-center text-gray-600 text-sm">
            ¿No tienes cuenta?{' '}
            <button type="button" onClick={onShowRegister} className="text-blue-600 hover:underline font-medium">
              Regístrate aquí
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
import React, { useState } from 'react';

const Formregistro = ({ onRegister, onShowLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    onRegister(name, email, password);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-md mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registrarse</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
            required
          />
        </div>
        <div className="flex flex-col space-y-3 pt-4">
          <button
            type="submit"
            className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
          >
            Registrarse
          </button>
          <p className="text-center text-gray-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <button type="button" onClick={onShowLogin} className="text-blue-600 hover:underline font-medium">
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Formregistro;
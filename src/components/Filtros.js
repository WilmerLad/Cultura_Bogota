import React from 'react';

const Filtros = ({ filters, onFilterChange }) => {
  const filterOptions = {
    type: ['Música', 'Teatro', 'Cine', 'Talleres', 'Ferias', 'Gastronomia', 'Deportes', 'Arte', 'Otros'],
    location: ['Chapinero','La Candelaria','Teusaquillo','Suba','Kennedy','Bosa','San Cristóbal','Tunjuelito','Fontibón'],
    date: ['Hoy', 'Esta semana', 'Este mes'],
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl mb-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Filtros</h3>
      {Object.keys(filterOptions).map((key) => (
        <div key={key} className="mb-4">
          <label htmlFor={key} className="block text-gray-700 text-sm font-medium mb-2 capitalize">
            {key === 'type' ? 'Tipo de evento' : key === 'location' ? 'Ubicación' : 'Fecha'}
          </label>
          <select
            id={key}
            name={key}
            value={filters[key]}
            onChange={onFilterChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
          >
            <option value="">Todos</option>
            {filterOptions[key].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default Filtros;
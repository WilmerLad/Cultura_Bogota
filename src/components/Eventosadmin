import React from 'react';

const Eventosadmin = ({ event, onSeeMore, onInterest, onEditEvent, onDeleteEvent, isAdmin }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-xl border border-gray-100">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{event.date} - {event.time}</p>
        <p className="text-sm text-gray-600 mb-4">{event.location}</p>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => onSeeMore(event.id)}
            className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Ver más
          </button>
          <button
            onClick={() => onInterest(event.id)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-md"
          >
            Me interesa / Guardar
          </button>
        </div>
        {isAdmin && (
          <div className="flex space-x-2 mt-3">
            <button
              onClick={() => onEditEvent(event.id)}
              className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium shadow-md"
            >
              Editar
            </button>
            <button
              onClick={() => onDeleteEvent(event.id)}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium shadow-md"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventosadmin;
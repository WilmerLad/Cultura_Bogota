import React from 'react';

const Detallesevento = ({ event, onClose }) => {
  if (!event) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h2>
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="text-gray-700 mb-2"><strong>Fecha:</strong> {event.date} - {event.time}</p>
        <p className="text-gray-700 mb-2"><strong>Localidad:</strong> {event.location}</p>
        <p className="text-gray-700 mb-4"><strong>Dirección:</strong> {event.address}</p>
        <p className="text-gray-800 mb-4">{event.description}</p>
      </div>
    </div>
  );
};

export default Detallesevento;
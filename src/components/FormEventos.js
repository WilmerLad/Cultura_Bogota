import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc,doc } from 'firebase/firestore';
import db from '../firebaseConfig';

const FormEventos = ({ eventToEdit, onSave, onCancel }) => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    image: '',
    location: '',
    address: '', // New field for exact address
    type: '',
  });

  useEffect(() => {
    if (eventToEdit) {
      setEventData(eventToEdit);
    } else {
      setEventData({
        title: '',
        date: '',
        time: '',
        description: '',
        image: '',
        location: '',
        address: '',
        type: '',
      });
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.title || !eventData.date) return;
  
    try {
      if (eventToEdit && eventToEdit.id) {
        // Editar evento existente
        const eventoRef = doc(db, 'Eventos', eventToEdit.id);
        await updateDoc(eventoRef, {
          ...eventData
        });
        console.log("Evento actualizado en Firebase ✅");
      } else {
        // Crear nuevo evento
        const eventosRef = collection(db, 'Eventos');
        await addDoc(eventosRef, eventData);
        console.log("Evento creado en Firebase ✅");
      }
  
      onSave && onSave(eventData);
    } catch (error) {
      console.error("Error al guardar evento:", error);
      alert("Hubo un error al guardar el evento.");
    }
  };
  

  const eventTypes = ['Música', 'Teatro', 'Cine', 'Talleres', 'Ferias', 'Gastronomia', 'Deportes', 'Arte', 'Otros'];
  const eventLocations = ['Chapinero','La Candelaria','Teusaquillo','Suba','Kennedy','Bosa','San Cristóbal','Tunjuelito','Fontibón'];
  
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-2xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {eventToEdit ? 'Editar Evento' : 'Agregar Nuevo Evento'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-gray-700 text-sm font-medium mb-2">
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-700 text-sm font-medium mb-2">
              Hora
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700 resize-none"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-700 text-sm font-medium mb-2">
            URL de la Imagen
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={eventData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-2">
            Localidad (General)
          </label>
          <select
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
            required
          >
            <option value="">Selecciona una localidad</option>
            {eventLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
            Dirección Exacta
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={eventData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
            placeholder="Ej: Cra 7 # 26-20"
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-gray-700 text-sm font-medium mb-2">
            Tipo de Evento
          </label>
          <select
            id="type"
            name="type"
            value={eventData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
            required
          >
            <option value="">Selecciona un tipo</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium shadow-md"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            {eventToEdit ? 'Guardar Cambios' : 'Agregar Evento'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEventos;
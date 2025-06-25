import React, { useState } from 'react';
import { doc, updateDoc, collection } from 'firebase/firestore';
import db from '../firebaseConfig';


const Perfil = ({ user, onLogout, onSaveInterests, isAdmin, onEditUser, isEditingOtherUser, onDeleteUser }) => {
  const [editingInterests, setEditingInterests] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(user.interests || []);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  const availableInterests = ['Música', 'Teatro', 'Cine', 'Talleres', 'Ferias', 'Deportes', 'Arte', 'Gastronomía'];

  const handleInterestChange = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSaveInterests = () => {
    onSaveInterests(selectedInterests);
    setEditingInterests(false);
  };

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveProfile = () => {
    onEditUser({ ...user, ...profileData });
    setEditingProfile(false);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-2xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditingOtherUser ? `Perfil de ${user.name}` : 'Mi Perfil'}
      </h2>
      <div className="mb-6 border-b pb-6 border-gray-200">
        {editingProfile ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
              />
            </div>
            {isAdmin && ( // Only admin can change other user's admin status
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  checked={profileData.isAdmin}
                  onChange={handleProfileChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">Es Administrador</label>
              </div>
            )}
            <div className="flex space-x-2">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => setEditingProfile(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors shadow-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-2"><strong>Nombre:</strong> {user.name}</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Email:</strong> {user.email}</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Tipo de usuario:</strong> {user.isAdmin ? 'Administrador' : 'Normal'}</p>
            {(isAdmin || !isEditingOtherUser) && ( // Admin can edit any profile, user can edit their own
              <button
                onClick={() => setEditingProfile(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
              >
                Editar Perfil
              </button>
            )}
          </>
        )}

        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Intereses Culturales</h3>
        {editingInterests ? (
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {availableInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestChange(interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedInterests.includes(interest)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveInterests}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                Guardar Intereses
              </button>
              <button
                onClick={() => setEditingInterests(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors shadow-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 mb-4">
              {user.interests && user.interests.length > 0
                ? user.interests.join(', ')
                : 'No has seleccionado intereses aún.'}
            </p>
            {(!isEditingOtherUser  && editingProfile) && ( // Only current user can edit their own interests
              <button
                onClick={() => setEditingInterests(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Editar Intereses
              </button>
            )}
          </div>
        )}
      </div>

      {!isEditingOtherUser && ( // Only show logout button for the current user's profile
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
        >
          Cerrar Sesión
        </button>
      )}
      {isAdmin && isEditingOtherUser && ( // Admin can delete other users
        <button
          onClick={() => onDeleteUser(user.id)}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md mt-4"
        >
          Eliminar Usuario
        </button>
      )}
    </div>
  );
};

export default Perfil;
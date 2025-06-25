import React from 'react';
import { doc,deleteDoc } from 'firebase/firestore';
import db from '../firebaseConfig';


const UserList = ({ users, onEditUser, onDeleteUser }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-4xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Nombre</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Rol</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{user.isAdmin ? 'Administrador' : 'Normal'}</td>
                <td className="py-3 px-4 text-sm flex space-x-2">
                  <button
                    onClick={() => onEditUser(user.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-xs font-medium shadow-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-medium shadow-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
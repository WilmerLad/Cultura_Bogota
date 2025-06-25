import React from 'react';

const Piedepagina = () => {
  const members = [
    "Wilmer Alexander Ladino Monje",
    "Estefania Correa Corrales",
    "Jonathan Leonardo Prieto Mancera",
    "Miguel Angel Cañón Rivera",
    "Luisa Fernanda Ascencio Alfaro",
    "Roberto Carlos Posada Diaz"
  ];

  return (
    <footer className="bg-gray-800 text-white p-6 mt-12 shadow-inner">
      <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold text-white">Proyecto de Cultura</h1>
        <h3 className="text-xl font-bold text-white">Desarrollado por:</h3>
        <ul className="list-none p-0 m-0 text-md flex flex-wrap justify-center gap-x-4 gap-y-2">
          {members.map((member, index) => (
            <li key={index} className="text-gray-300">
              {member}
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-6">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Piedepagina;
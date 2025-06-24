import React from 'react';

const Articulo = ({ onExploreClick }) => {
  return (

    <section className="h-96 min-h-[65vh] relative  bg-cover bg-center rounded-xl overflow-hidden shadow-lg" style={{ backgroundImage: 'url("https://bogota.gov.co/sites/default/files/2023-08/bogota_5.jpeg")' }}>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white p-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 drop-shadow-lg">¡Empieza a explorar!</h2>
        <p className="text-lg md:text-xl text-center mb-8 opacity-90">Encuentra los eventos que te mueven.</p>
        <button
          onClick={onExploreClick}
          className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl"
        >
          Explorar Eventos
        </button>
      </div>
    </section>
  );
};

export default Articulo;
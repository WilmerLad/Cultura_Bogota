// Importación de dependencias de React y componentes personalizados
import React, { useState, useEffect } from "react";
import EventCard from "./components/Eventosadmin";
import EventForm from "./components/FormEventos";
import CalendarView from "./components/Calendario";
import EventDetailModal from "./components/Detallesevento";
import EventFilter from "./components/Filtros";
import LandingHero from "./components/Articulo";
import UserProfile from "./components/Perfil";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/Formregistro";
import getEventos from "./Pack/eventos";
import getUsers from "./Pack/usuarios";
import UserList from "./components/UserList";
import LayoutFooter from "./components/Piedepagina";
import LayoutHeader from "./components/Menunav";
import { getStorage, setStorage } from "./Util/Almacenamiento";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from "./firebaseConfig";

// Componente principal de la aplicación
const App = () => {
  // Estado para gestionar la vista actual
  const [currentPage, setCurrentPage] = useState("landing"); // landing, explore, recommendations, profile, calendar, addEvent, editEvent, login, register, userManagement, editUserProfile
  // Estado para los filtros de búsqueda de eventos
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    date: "",
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return getStorage("currentUser") || null;
  });
  const [allEvents, setAllEvents] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  // Estados para edición de eventos y usuarios, y para ver detalle de un evento
  const [eventToEdit, setEventToEdit] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // For modal
  const [userToEdit, setUserToEdit] = useState(null); // For admin editing user profiles

  useEffect(() => {
    const cargarusuario = async () => {
      const usuariosfirebase = await getUsers();
      setAllUsers(usuariosfirebase);
    };
    cargarusuario();
  }, []);

  useEffect(() => {
    const cargarEventos = async () => {
      const eventosFirebase = await getEventos();
      setAllEvents(eventosFirebase); // carga el estado
    };

    cargarEventos();
  }, []);

  useEffect(() => {
    setStorage("currentUser", null);
  }, [null]);

  // Manejar cambio de filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  // Eventos ordenados por fecha (más recientes primero)
  const sortedEvents = [...allEvents].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB - dateA; // Newest to oldest
  });
  // aplicacion de filtros
  const filteredEvents = sortedEvents.filter((event) => {
    const matchesType = filters.type ? event.type === filters.type : true;
    const matchesLocation = filters.location
      ? event.location === filters.location
      : true;
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let matchesDate = true;
    if (filters.date === "Hoy") {
      matchesDate = eventDate.toDateString() === today.toDateString();
    } else if (filters.date === "Esta semana") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      matchesDate = eventDate >= startOfWeek && eventDate <= endOfWeek;
    } else if (filters.date === "Este mes") {
      matchesDate =
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear();
    }

    return matchesType && matchesLocation && matchesDate;
  });

  // Eventos recomendados según intereses del usuario
  const recommendedEvents = allEvents.filter(
    (event) =>
      currentUser &&
      currentUser.interests.some((interest) => event.type === interest)
  );

  const handleSeeMore = (id) => {
    const event = allEvents.find((e) => e.id === id);
    console.log(event.id);
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleInterest = (id) => {
    if (!currentUser) {
      alert("Por favor, inicia sesión para guardar eventos.");
      setCurrentPage("login");
      return;
    }
    const eventToSave = allEvents.find((event) => event.id === id);
    if (eventToSave && !currentUser.savedEvents.some((e) => e.id === id)) {
      setCurrentUser((prev) => ({
        ...prev,
        savedEvents: [
          ...prev.savedEvents,
          {
            id: eventToSave.id,
            title: eventToSave.title,
            date: eventToSave.date,
          },
        ],
      }));
      // Simulate interest count for recommendations
      const interestsCount = getStorage("userInterestsCount") || {};
      interestsCount[id] = (interestsCount[id] || 0) + 1;
      setStorage("userInterestsCount", interestsCount);
    }
  };

  const handleLogin = (email, password) => {
    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setCurrentPage("explore");
    } else {
      alert("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  const handleRegister = (name, email, password) => {
    if (allUsers.some((u) => u.email === email)) {
      alert("Este correo ya está registrado.");
      return;
    }
    const newUser = {
      name,
      email,
      password,
      isAdmin: false,
      interests: [],
      savedEvents: [],
    };
    setAllUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentPage("profile");
    alert("Registro exitoso. ¡Bienvenido!");
  };

  const handleLogout = () => {
    setCurrentUser(null); // Clear current user
    setCurrentPage("landing");
  };

  const handleSaveInterests = (newInterests) => {
    setCurrentUser((prev) => ({ ...prev, interests: newInterests }));
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id ? { ...u, interests: newInterests } : u
      )
    );
  };

  const handleAddEvent = (newEvent) => {
    setAllEvents((prev) => [...prev, { ...newEvent }]);
    setCurrentPage("explore");
  };

  const handleEditEvent = (id) => {
    const event = allEvents.find((e) => e.id === id);
    setEventToEdit(event);
    setCurrentPage("editEvent");
  };

  const handleUpdateEvent = (updatedEvent) => {
    setAllEvents((prev) =>
      prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    setEventToEdit(null);
    setCurrentPage("explore");
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        // Eliminar de Firestore
        const EventoRef = doc(db, "Eventos", id);
        await deleteDoc(EventoRef);

        // Eliminar del estado local
        setAllEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );

        // Opcional: actualizar el estado local
        setAllUsers((prevUsers) =>
          prevUsers.map((user) => ({
            ...user,
            savedEvents: user.savedEvents.filter(
              (savedEvent) => savedEvent.id !== id
            ),
          }))
        );

        alert("evento eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
        alert("Error al eliminar el evento");
      }
    }
  };

  const handleCancelForm = () => {
    setEventToEdit(null);
    setUserToEdit(null);
    setCurrentPage("explore");
  };

  const handleEditUserProfile = (userId) => {
    const user = allUsers.find((u) => u.id === userId);
    setUserToEdit(user);
    setCurrentPage("editUserProfile");
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const userRef = doc(db, "Users", updatedUser.id);
      await updateDoc(userRef, {
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        interests: updatedUser.interests || [],
        // Agrega aquí más campos si tienes otros
      });

      setAllUsers((prev) =>
        prev.map((u) =>
          u.id === updatedUser.id ? { ...u, ...updatedUser } : u
        )
      );

      if (currentUser && currentUser.id === updatedUser.id) {
        setCurrentUser((prev) => ({ ...prev, ...updatedUser }));
      }

      setUserToEdit(null);
      setCurrentPage(
        updatedUser.id === currentUser?.id ? "profile" : "userManagement"
      );
      alert("Usuario actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Hubo un error al actualizar el usuario.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        // Eliminar de Firestore
        const userRef = doc(db, "Users", userId);
        await deleteDoc(userRef);

        // Opcional: actualizar el estado local
        setAllUsers((prev) => prev.filter((user) => user.id !== userId));

        alert("Usuario eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        alert("Error al eliminar el usuario");
      }
    }
  };

  const isAdmin = currentUser && currentUser.isAdmin;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <LayoutHeader
        onLoginRegisterClick={() => setCurrentPage("login")}
        onLogout={handleLogout}
        isLoggedIn={!!currentUser}
        setCurrentPage={setCurrentPage}
        isAdmin={isAdmin}
      />

      <main className="container mx-auto p-6 flex-grow">
        {currentPage === "landing" && (
          <LandingHero onExploreClick={() => setCurrentPage("explore")} />
        )}

        {currentPage === "explore" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Explora Eventos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <EventFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSeeMore={handleSeeMore}
                      onInterest={handleInterest}
                      onEditEvent={handleEditEvent}
                      onDeleteEvent={handleDeleteEvent}
                      isAdmin={isAdmin}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-600 col-span-full">
                    No se encontraron eventos con los filtros seleccionados.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {currentPage === "recommendations" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Eventos Recomendados
            </h2>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Sugeridos para ti
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedEvents.length > 0 ? (
                  recommendedEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSeeMore={handleSeeMore}
                      onInterest={handleInterest}
                      onEditEvent={handleEditEvent}
                      onDeleteEvent={handleDeleteEvent}
                      isAdmin={isAdmin}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-600 col-span-full">
                    No hay recomendaciones basadas en tus intereses. ¡Inicia
                    sesión y actualiza tu perfil!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {currentPage === "profile" && currentUser && (
          <UserProfile
            user={currentUser}
            onLogout={handleLogout}
            onSaveInterests={handleSaveInterests}
            isAdmin={isAdmin}
            onEditUser={handleUpdateUser}
            isEditingOtherUser={false}
          />
        )}

        {currentPage === "calendar" && (
          <CalendarView
            events={allEvents}
            onFilterChange={(filter) => console.log(filter)}
          />
        )}

        {currentPage === "addEvent" && isAdmin && (
          <EventForm onSave={handleAddEvent} onCancel={handleCancelForm} />
        )}

        {currentPage === "editEvent" && isAdmin && eventToEdit && (
          <EventForm
            eventToEdit={eventToEdit}
            onSave={handleUpdateEvent}
            onCancel={handleCancelForm}
          />
        )}

        {currentPage === "login" && (
          <LoginForm
            onLogin={handleLogin}
            onShowRegister={() => setCurrentPage("register")}
          />
        )}

        {currentPage === "register" && (
          <RegisterForm
            onRegister={handleRegister}
            onShowLogin={() => setCurrentPage("login")}
          />
        )}

        {currentPage === "userManagement" && isAdmin && (
          <UserList
            users={allUsers}
            onEditUser={handleEditUserProfile}
            onDeleteUser={handleDeleteUser}
          />
        )}

        {currentPage === "editUserProfile" && isAdmin && userToEdit && (
          <UserProfile
            user={userToEdit}
            onLogout={handleLogout}
            onSaveInterests={handleSaveInterests}
            isAdmin={isAdmin}
            onEditUser={handleUpdateUser}
            isEditingOtherUser={true}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </main>

      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={handleCloseModal} />
      )}

      <LayoutFooter />
    </div>
  );
};

export default App;

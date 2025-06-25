
import { collection, getDocs } from "firebase/firestore";
import db from "../firebaseConfig"; 


// Esta función obtiene los eventos desde Firebase y los retorna
const getEventos = async () => {
  try {
    const eventRef = collection(db, "Eventos");
    const snapshot = await getDocs(eventRef);
    const eventos = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return eventos;
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return [];
  }
};

export default getEventos;

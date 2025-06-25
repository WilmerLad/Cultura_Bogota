
import { collection, getDocs } from "firebase/firestore";
import db from "../firebaseConfig"; 


// Esta función obtiene los usuarios desde Firebase y los retorna
const getUsers = async () => {
  try {
    const userRef = collection(db, "Users");
    const snapshot = await getDocs(userRef);
    const Usuarios = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return Usuarios;
  } catch (error) {
    console.error("Error al obtener informacion:", error);
    return [];
  }
};

export default getUsers;
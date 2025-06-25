import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Correcto (todo en minúscula)

//Configuración a database
const firebaseConfig = {
  apiKey: "AIzaSyAUd2D0fIv5RKmWW7v7A3KilCIeObyhji8",
  authDomain: "culturabog-e80db.firebaseapp.com",
  databaseURL: "https://culturabog-e80db-default-rtdb.firebaseio.com", // ✅ MUY IMPORTANTE
  projectId: "culturabog-e80db",
  storageBucket: "culturabog-e80db.appspot.com", // ✅ CORREGIDO (.appspot.com)
  messagingSenderId: "453708961295",
  appId: "1:453708961295:web:91c928b4fdaa2e6b87357a"
};

// Inicializacion Firebase
const app = initializeApp(firebaseConfig);

// Inicializacion y exporta la base de datos
const db = getFirestore(app);
export default db;

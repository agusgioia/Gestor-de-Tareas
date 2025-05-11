import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; //Funciones para las 3 
import { auth } from "../Services/firebase"; // Manejo de autenticacion y bdd de firebase

// Función para autenticar al usuario
export const authenticateUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password); // Llama a la funcion de Firebase con un instancia de la autenticacion, el mail y password ingresados
    console.log("✅ Usuario autenticado:", userCredential.user.uid);
    return userCredential.user; // Si la autenticación es exitosa, retorna el usuario
  } catch (error) {
    console.error("❌ Error de autenticación:", error.code, error.message); 
    throw error; // Maneja el error en el componente
  }
};

// Función para registrar un nuevo usuario 
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Crea un nuevo usuario con la instancia de autenticacion y los datos ingresados
    const user = userCredential.user; 
    console.log("✅ Usuario registrado en Firebase Auth:", user.uid);
    return user; // Si sale bien, retorna el usuario
  } catch (error) {
    console.error("❌ Error de registro:", error.code, error.message);
    throw error;
  }
};

// Función para cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth); // Cierra la sesión de la autenticación
    console.log("Usuario deslogueado con éxito");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};


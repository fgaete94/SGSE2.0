import { Rol } from './rol'; // Importa la interfaz Rol

export interface User {
  id: number;
  nombre: string;
  user: string; // Correo del usuario
  password: string;
  rol: Rol; // La propiedad rol es del tipo Rol, no string
  telefono: number;
}
import { Rol } from './rol'; // Importa la interfaz Rol

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  user: string; // user
  password: string;
  rol: Rol; // La propiedad rol es del tipo Rol, no string
  telefono: number;
  correo: string;
}
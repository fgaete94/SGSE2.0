import { Rol } from "./rol";

export interface User{
    id: number;
    nombre: string;
    user: string;
    password: string;
    rol: Rol;
    telefono: number;
}
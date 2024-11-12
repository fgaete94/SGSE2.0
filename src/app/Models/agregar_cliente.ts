import { Comuna } from "./comuna";

export interface agregarCliente{
    nombre: string;
    telefono: number; 
    direccion: string;
    comuna: Comuna;
    mail: string;
}
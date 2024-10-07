import { Comuna } from "./comuna";

export interface Cliente{
    id: number;
    nombre: string;
    telefono: number;
    direccion: string;
    comuna: Comuna;

}
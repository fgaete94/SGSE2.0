import { Comuna } from "./comuna";
import { Producto } from "./producto";


export interface actualizarPedido {

    direccion: string;
    comuna: Comuna;
    producto: Producto;
    cantidad: number;
    tel_contacto: number;
    update_at: Date;

}
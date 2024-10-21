import { Cliente } from "./cliente";
import { Comuna } from "./comuna";
import { Producto } from "./producto";

export interface AgregarPedido{
    direccion: string;
    comuna: Comuna;
    cliente: Cliente;
    repartidor: string;
    n_pedido: number;
    producto: Producto;
    cantidad: number;
    tel_contacto: number;
}
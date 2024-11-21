import { Cliente } from "./cliente";
import { Comuna } from "./comuna";
import { EstadoPedido } from "./estado_pedido";
import { Producto } from "./producto";
import { User } from "./user";

export interface Pedido{
    id: number;
    direccion: string;
    comuna: Comuna;
    cliente: string ;
    repartidor: string;
    n_pedido: number;
    producto: string;
    cantidad: number;
    tel_contacto: number;
    estado: string;
    delete_at: Date;

}
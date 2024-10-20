import { Cliente } from "./cliente";
import { Comuna } from "./comuna";
import { DetallePedido } from "./detalle_pedido";
import { Producto } from "./producto";
import { User } from "./user";

export interface Pedido{
    id: number;
    direccion: string;
    comuna: Comuna;
    cliente: Cliente ;
    repartidor: User;
    detalle_pedido: DetallePedido;
    n_pedido: number;
    producto: Producto;
    cantidad: number;
    tel_contacto: number;

}
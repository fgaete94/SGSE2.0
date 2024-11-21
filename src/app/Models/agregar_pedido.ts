import { Cliente } from "./cliente";
import { Comuna } from "./comuna";
import { EstadoPedido } from "./estado_pedido";
import { Producto } from "./producto";
import { User } from "./user";

export interface AgregarPedido{
    direccion: string;
    comuna: Comuna;
    cliente: Cliente;
    repartidor: User;
    //n_pedido: number;
    producto: Producto;
    cantidad: number;
    tel_contacto: number;
    estado: EstadoPedido;
}
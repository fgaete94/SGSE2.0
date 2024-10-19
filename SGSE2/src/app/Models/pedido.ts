import { Cliente } from "./cliente";
import { Comuna } from "./comuna";
import { DetallePedido } from "./detalle_pedido";
import { User } from "./user";

export interface Pedido{
    id: number;
    direccion: string;
    comuna: Comuna;
    cliente: Cliente ;
    usuario: User;
    detalle_pedido: DetallePedido;
    n_pedido: number;
}
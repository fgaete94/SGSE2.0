import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { actualizarEstado } from 'src/app/Models/actualiza_estado';
import { ModificarPedidoService } from 'src/app/services/pedidos/modificar-pedidos/modificar-pedido.service';

@Component({
  selector: 'app-entrega-pedido',
  templateUrl: './entrega-pedido.page.html',
  styleUrls: ['./entrega-pedido.page.scss'],
})
export class EntregaPedidoPage implements OnInit {

  photo!: string;
  pedidoId!: string;
  estadoActualizado: actualizarEstado = 
    {
      delivery: new Date(),
      estado: 'entregado'
    }
  
  
 
  

  constructor(private router: Router,
    private route: ActivatedRoute,
    private modPedido: ModificarPedidoService
  ) { }

  ngOnInit() {
    this.pedidoId = this.route.snapshot.paramMap.get('id')!;
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.photo = image.webPath as string;
  }

  confirmarEntrega() {
    this.modPedido.actualizarEstado(this.estadoActualizado, this.pedidoId).subscribe(
     
      response => {
        console.log('Estado del pedido actualizado:', response);
        // Implementa la lógica para manejar la respuesta exitosa
      },
      error => {
        console.error('Error actualizando el estado del pedido:', error);
        // Implementa la lógica para manejar el error
      }
    );
  }

  volver() {
    this.router.navigate(['/home']);
  }

}

import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { actualizarEstado } from 'src/app/Models/actualiza_estado';
import { ModificarPedidoService } from 'src/app/services/pedidos/modificar-pedidos/modificar-pedido.service';

@Component({
  selector: 'app-entrega-pedido',
  templateUrl: './entrega-pedido.page.html',
  styleUrls: ['./entrega-pedido.page.scss'],
})
export class EntregaPedidoPage implements OnInit {

  photo!: string;
  pedidoId!: number;
  estadoActualizado: actualizarEstado = 
    {
      delivery: new Date(),
      estado: 'Entregado'
    }
  utilsSvc: any;
  
  
 
  

  constructor(private router: Router,
    private route: ActivatedRoute,
    private modPedido: ModificarPedidoService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.pedidoId = Number(id);
        console.log('Pedido ID:', this.pedidoId);
      }
    });
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

   confirmarEntrega(estadoActualizado: actualizarEstado) {

    
    /*try{
      console.log(estadoActualizado);
      const response: HttpResponse<actualizarEstado> = await firstValueFrom(this.modPedido.actualizarEstado(estadoActualizado, this.pedidoId));
      console.log('Response:', response);

      this.utilsSvc.presentToast({
        message: 'Pedido Entregado exitosamente', 
        duration: 1500,
        color: 'primary',
        position: 'middle',
        icon: 'checkmark-done-outline'
      })
      this.router.navigate(['/home']);
    }
    catch (error) {
      console.error('Error:', error);*/
    
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
function firstValueFrom(arg0: Observable<HttpResponse<actualizarEstado>>): any {
  throw new Error('Function not implemented.');
}


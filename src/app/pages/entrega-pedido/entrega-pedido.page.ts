import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { actualizarEstado } from 'src/app/Models/actualiza_estado';
import { ModificarPedidoService } from 'src/app/services/pedidos/modificar-pedidos/modificar-pedido.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-entrega-pedido',
  templateUrl: './entrega-pedido.page.html',
  styleUrls: ['./entrega-pedido.page.scss'],
})
export class EntregaPedidoPage implements OnInit {

  currentLatitude!: number;
  currentLongitude!: number;

  photo!: string;
  pedidoId!: number;
  estadoActualizado: actualizarEstado = 
    {
      delivery_at: new Date(),
      estado: 'Entregado',
      photo: '',
      longitud: 0,
      latitud: 0
    }
  utilsSvc: any;
  
  
 
  

  constructor(private router: Router,
    private route: ActivatedRoute,
    private modPedido: ModificarPedidoService,
    private geolocation: Geolocation,
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

   confirmarEntrega() {
    console.log(this.photo);
    const estadoActualizado ={
      delivery_at: new Date(),
      estado: 'Entregado',
      photo: this.photo,
      longitud: this.currentLongitude,
      latitud: this.currentLatitude

    }

    
    this.modPedido.actualizarEstado(estadoActualizado, this.pedidoId).subscribe(
     
      response => {
        console.log('Estado del pedido actualizado:', response);
        // Implementa la lógica para manejar la respuesta exitosa
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error actualizando el estado del pedido:', error);
        // Implementa la lógica para manejar el error
      }
    );
  }

  // Función para convertir grados decimales a GMS
  decimalToDMS(lat: number, lng: number): { lat: string, lng: string } {
    const convert = (decimal: number) => {
      const degrees = Math.floor(decimal);
      const minutesNotTruncated = (decimal - degrees) * 60;
      const minutes = Math.floor(minutesNotTruncated);
      const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
      return `${degrees}°${minutes}'${seconds}"`;
    };

    const latDMS = convert(lat);
    const lngDMS = convert(lng);

    return { lat: latDMS, lng: lngDMS };
  }

  // Función para generar el enlace a Google Maps
  generateGoogleMapsLink(lat: number, lng: number): string {
    const { lat: latDMS, lng: lngDMS } = this.decimalToDMS(lat, lng);
    return `https://www.google.com/maps?q=${latDMS},${lngDMS}`;
  }

  guardarUbicacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLatitude = resp.coords.latitude;
      this.currentLongitude = resp.coords.longitude;

      console.log('Latitud:', this.currentLatitude, 'Longitud:', this.currentLongitude);

      // Convertir a GMS y generar enlace a Google Maps
      const googleMapsLink = this.generateGoogleMapsLink(this.currentLatitude, this.currentLongitude);
      console.log('Google Maps Link:', googleMapsLink);

      // Guardar la ubicación en el servidor en este punto
      
    }).catch((error) => {
      console.error('Error al obtener la ubicación', error);
    });
  }

  volver() {
    this.router.navigate(['/home']);
  }
  

}
function firstValueFrom(arg0: Observable<HttpResponse<actualizarEstado>>): any {
  throw new Error('Function not implemented.');
}

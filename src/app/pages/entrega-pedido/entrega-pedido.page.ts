import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { actualizarEstado } from 'src/app/Models/actualiza_estado';
import { ModificarPedidoService } from 'src/app/services/pedidos/modificar-pedidos/modificar-pedido.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entrega-pedido',
  templateUrl: './entrega-pedido.page.html',
  styleUrls: ['./entrega-pedido.page.scss'],
})
export class EntregaPedidoPage implements OnInit {
  private supabase = createClient('https://nfpulkphukfwoqsmpmaj.supabase.co', environment.API_KEY_SUPABASE);

  currentLatitude!: number;
  currentLongitude!: number;

  photo!: string;
  pedidoId!: number;
  googleMapsLink!: string;
  estadoActualizado: actualizarEstado =
    {
      delivery_at: new Date(),
      estado: 'Entregado',
      photo: '',
      longitud: 0,
      latitud: 0,
      ubicacion: '',
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
    this.guardarUbicacion();
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, // Cambiar a Base64 para subir el archivo
      source: CameraSource.Camera,
    });

    if (image.base64String) {
      // Convierte la base64 a un Blob
      const fileName = `pedido-${Date.now()}.jpg`;
      const blob = this.base64ToBlob(image.base64String, 'image/jpeg');

      // Sube la imagen a Supabase Storage
      const { data, error } = await this.supabase.storage
        .from('pedidos')
        .upload(fileName, blob);

      if (error) {
        console.error('Error al subir la imagen a Supabase Storage:', error.message);
        return;
      }

      // Obtén el enlace público de la imagen
      const { data: publicData } = this.supabase.storage
        .from('pedidos')
        .getPublicUrl(fileName);

      if (!publicData) {
        console.error('Error al obtener el enlace público.');
        return;
      }

      if (publicData.publicUrl) {
        this.photo = publicData.publicUrl; // Enlace público de la imagen
        console.log('Enlace público de la imagen:', this.photo);
      } else {
        console.error('No se pudo obtener el enlace público de la imagen.');
      }
    }
  }

  // Función para convertir base64 a Blob
  private base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  async confirmarEntrega() {
    await this.guardarUbicacion();
    console.log(this.currentLatitude, this.currentLongitude);

    console.log(this.photo);
    const estadoActualizado = {
      delivery_at: new Date(),
      estado: 'Entregado',
      photo: this.photo,
      longitud: this.currentLongitude,
      latitud: this.currentLatitude,
      ubicacion: this.googleMapsLink,

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



  // Función para generar el enlace a Google Maps
  generateGoogleMapsLink(lat: number, lng: number): string {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }

  guardarUbicacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLatitude = resp.coords.latitude;
      this.currentLongitude = resp.coords.longitude;

      console.log('Latitud:', this.currentLatitude, 'Longitud:', this.currentLongitude);

      // Generar enlace directamente con las coordenadas decimales
      this.googleMapsLink = this.generateGoogleMapsLink(this.currentLatitude, this.currentLongitude);
      console.log('Google Maps Link:', this.googleMapsLink);

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

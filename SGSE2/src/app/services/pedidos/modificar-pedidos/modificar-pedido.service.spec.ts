import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModificarPedidoService } from './modificar-pedido.service';
import { HttpClientModule } from '@angular/common/http';

describe('ModificarPedidoService', () => {
  let service: ModificarPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    service = TestBed.inject(ModificarPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

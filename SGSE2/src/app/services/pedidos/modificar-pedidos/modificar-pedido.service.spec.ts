import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModificarPedidoService } from './modificar-pedido.service';

describe('ModificarPedidoService', () => {
  let service: ModificarPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ModificarPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

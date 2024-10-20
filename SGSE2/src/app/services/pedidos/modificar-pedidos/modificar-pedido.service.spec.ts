import { TestBed } from '@angular/core/testing';

import { ModificarPedidoService } from './modificar-pedido.service';

describe('ModificarPedidoService', () => {
  let service: ModificarPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

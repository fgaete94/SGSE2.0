import { TestBed } from '@angular/core/testing';

import { ProductoService } from './producto.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

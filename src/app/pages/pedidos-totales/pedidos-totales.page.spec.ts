import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosTotalesPage } from './pedidos-totales.page';

describe('PedidosTotalesPage', () => {
  let component: PedidosTotalesPage;
  let fixture: ComponentFixture<PedidosTotalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosTotalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

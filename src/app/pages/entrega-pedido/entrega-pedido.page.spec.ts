import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntregaPedidoPage } from './entrega-pedido.page';

describe('EntregaPedidoPage', () => {
  let component: EntregaPedidoPage;
  let fixture: ComponentFixture<EntregaPedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

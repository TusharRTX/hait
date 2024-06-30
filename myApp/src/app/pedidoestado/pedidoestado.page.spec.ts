import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoestadoPage } from './pedidoestado.page';

describe('PedidoestadoPage', () => {
  let component: PedidoestadoPage;
  let fixture: ComponentFixture<PedidoestadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoestadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

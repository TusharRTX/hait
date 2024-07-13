import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoclientePage } from './pedidocliente.page';

describe('PedidoclientePage', () => {
  let component: PedidoclientePage;
  let fixture: ComponentFixture<PedidoclientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

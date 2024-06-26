import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompradorPage } from './comprador.page';

describe('CompradorPage', () => {
  let component: CompradorPage;
  let fixture: ComponentFixture<CompradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

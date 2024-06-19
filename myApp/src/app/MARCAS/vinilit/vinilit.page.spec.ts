import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vinilitPage } from './vinilit.page';

describe('vinilitPage', () => {
  let component: vinilitPage;
  let fixture: ComponentFixture<vinilitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(vinilitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

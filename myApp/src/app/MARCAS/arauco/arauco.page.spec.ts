import { ComponentFixture, TestBed } from '@angular/core/testing';
import { araucoPage } from './arauco.page';

describe('araucoPage', () => {
  let component: araucoPage;
  let fixture: ComponentFixture<araucoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(araucoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

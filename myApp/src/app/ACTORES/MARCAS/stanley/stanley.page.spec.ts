import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stanleyPage } from './stanley.page';

describe('stanleyPage', () => {
  let component: stanleyPage;
  let fixture: ComponentFixture<stanleyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(stanleyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

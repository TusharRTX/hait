import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TornillosPage } from './tornillos.page';

describe('TornillosPage', () => {
  let component: TornillosPage;
  let fixture: ComponentFixture<TornillosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TornillosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

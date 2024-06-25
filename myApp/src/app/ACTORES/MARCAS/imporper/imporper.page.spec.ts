import { ComponentFixture, TestBed } from '@angular/core/testing';
import { imporperPage } from './imporper.page';

describe('imporperPage', () => {
  let component: imporperPage;
  let fixture: ComponentFixture<imporperPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(imporperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

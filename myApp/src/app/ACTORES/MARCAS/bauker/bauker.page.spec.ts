import { ComponentFixture, TestBed } from '@angular/core/testing';
import { baukerPage } from './bauker.page';

describe('baukerPage', () => {
  let component: baukerPage;
  let fixture: ComponentFixture<baukerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(baukerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

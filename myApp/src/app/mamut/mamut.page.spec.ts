import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAMUTPage } from './mamut.page';

describe('MAMUTPage', () => {
  let component: MAMUTPage;
  let fixture: ComponentFixture<MAMUTPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MAMUTPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

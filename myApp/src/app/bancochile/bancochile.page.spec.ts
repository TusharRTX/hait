import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BancochilePage } from './bancochile.page';

describe('BancochilePage', () => {
  let component: BancochilePage;
  let fixture: ComponentFixture<BancochilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BancochilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

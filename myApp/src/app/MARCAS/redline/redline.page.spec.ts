import { ComponentFixture, TestBed } from '@angular/core/testing';
import { redlinePage } from './redline.page';

describe('redlinePage', () => {
  let component: redlinePage;
  let fixture: ComponentFixture<redlinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(redlinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

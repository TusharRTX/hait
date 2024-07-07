import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessvoucherPage } from './successvoucher.page';

describe('SuccessvoucherPage', () => {
  let component: SuccessvoucherPage;
  let fixture: ComponentFixture<SuccessvoucherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessvoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

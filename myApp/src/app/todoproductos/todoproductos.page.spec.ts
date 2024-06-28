import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoproductosPage } from './todoproductos.page';

describe('TodoproductosPage', () => {
  let component: TodoproductosPage;
  let fixture: ComponentFixture<TodoproductosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { AutenticacionService } from './autenticacion.service';

describe('AutenticacionService', () => {
  let service: AutenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('el valor correcto de returnVal', () => {
    
    const expectedValue = true;

  
    service.Autenticacion(expectedValue);
    const actualValue = service.returnVal();

    expect(actualValue).toBe(expectedValue);
  });

  it('el valor correcto después de cambiar el estado de autenticación', () => {
    const initialValue = false;
    const expectedValue = true;

    service.Autenticacion(initialValue);
    const valueBeforeChange = service.returnVal();

    service.Autenticacion(expectedValue);
    const valueAfterChange = service.returnVal();

    expect(valueBeforeChange).toBe(initialValue);
    expect(valueAfterChange).toBe(expectedValue);
  });
});

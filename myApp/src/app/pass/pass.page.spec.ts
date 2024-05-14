import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PassPage } from './pass.page';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { of } from 'rxjs';

describe('PassPage', () => {
  let component: PassPage;
  let fixture: ComponentFixture<PassPage>;
  let djangoApiSpy: jasmine.SpyObj<DjangoapiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DjangoapiService', ['getViaje']);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HttpClientModule, IonicStorageModule.forRoot()],
      declarations: [PassPage],
      providers: [{ provide: DjangoapiService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(PassPage);
    component = fixture.componentInstance;
    djangoApiSpy = TestBed.inject(DjangoapiService) as jasmine.SpyObj<DjangoapiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cargas Viaje', () => {
    // Arrange
    const fakeViajeData = [{}];
    djangoApiSpy.getViaje.and.returnValue(of(fakeViajeData));

    // Act
    component.cargaViaje();

    // Assert
    expect(djangoApiSpy.getViaje).toHaveBeenCalled();
    expect(component.viaje).toEqual(fakeViajeData);
  });
});

import { TestBed, fakeAsync } from '@angular/core/testing';
import { DjangoapiService } from './djangoapi.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('DjangoapiService', () => {
  let service: DjangoapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HttpClientModule, IonicStorageModule.forRoot(), HttpClientTestingModule]
    });
    service = TestBed.inject(DjangoapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Prueva de viaje', fakeAsync(() => {
    const emptyViajeData = {
      patente: 'TAV1234',
      hora: '16:00',
      costo: '1500',
      capacidad: '3',
      destino: 'MI CASA',
      duenno: 'jean',
      correo: 'je.huansha@duocuc.cl',
      url_imagen: 'https://media.discordapp.net/attachments/794639293145808927/1176205976471339038/tushar3.png?ex=656e062d&is=655b912d&hm=e47ec4cc4a54a09bbb031a0ea1ecb711e44944f9e9c292269007635daa645275&=&format=webp&width=556&height=556'
    };

    let response: any = null;
    let errorResponse: any = null;

    service.crearviaje(emptyViajeData).subscribe(
      (res) => {
        response = res;
      },
      (error) => {
        errorResponse = error;
      }
    );
    expect(response).toBeNull();
    
  }));
});

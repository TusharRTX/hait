
import { AnimationController, IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DjangoapiService } from '../conexion/djangoapi.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let djangoApiService: DjangoapiService;

  
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(),HttpClientModule,IonicStorageModule.forRoot()],
      providers: [DjangoapiService]
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    djangoApiService = TestBed.inject(DjangoapiService);
    
    spyOn(djangoApiService, 'sumar').and.returnValue(9);

  
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('doSumar() OK', () => {
    component.entrada.numero1=4;
    component.entrada.numero2=5;
    component.doSumar();
    expect(component.mensaje).toBe("La suma es: 9");
  });  

  it('prueba de login', () => {
    const users = [
      { id: 0, user: 'tushar', password: '1234' },
      { id: 1, user: 'jean', password: 'jota' },
    ];

    spyOn(djangoApiService, 'getUser').and.returnValue(of(users));
    component.ngOnInit();
    expect(component.usuarios).toEqual(users);
  });
  

  it('Prueba de rol pasajero', () => {
    component.credentials = { username: 'tushar', password: '1234' };

    component.users = [
      { user: 'tushar', password: '1234', role: 'pasajero' },
      
    ];
    component.entrar();
    console.log('loginerror:', component.loginerror);
    console.log('error:', component.error);
    expect(component.loginerror).toBeFalsy();
    
   
  });


  it('Prueba rol conductor', () => {
    component.credentials = { username: 'tushar', password: '1234' };

    component.users = [
      { user: 'tushar', password: '1234', role: 'conductor' },
      
    ];
    component.entrar();
    console.log('loginerror:', component.loginerror);
    console.log('error:', component.error);
    expect(component.loginerror).toBeFalsy();
    
   
  });



  
});
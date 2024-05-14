import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BienvenidaPage } from './bienvenida.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { DjangoapiService } from '../conexion/djangoapi.service';

describe('BienvenidaPage', () => {
  let component: BienvenidaPage;
  let fixture: ComponentFixture<BienvenidaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(),HttpClientModule,IonicStorageModule.forRoot(),RouterTestingModule],
      declarations: [BienvenidaPage],
      providers: [DjangoapiService]
    }).compileComponents();
    fixture = TestBed.createComponent(BienvenidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Prueba Credencials', () => {
    // Set test credentials
    const testCredentials = {
      username: '',
      // Add other required properties based on your implementation
    };

    // Assign test credentials to component
    component.credentials = testCredentials;

    // Trigger change detection
    fixture.detectChanges();

    // Get the rendered welcome message
    const welcomeMessage = fixture.nativeElement.querySelector('.texto-esquina-superior-derecha').textContent.trim();

    // Assert that the welcome message contains the test username
    expect(welcomeMessage).toContain(testCredentials.username);
  });
});

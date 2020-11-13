import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterCompanyLogoPage } from './register-company-logo.page';

describe('RegisterCompanyLogoPage', () => {
  let component: RegisterCompanyLogoPage;
  let fixture: ComponentFixture<RegisterCompanyLogoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCompanyLogoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterCompanyLogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

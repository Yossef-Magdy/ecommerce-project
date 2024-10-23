import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarLoginComponent } from './dashboar-login.component';

describe('DashboarLoginComponent', () => {
  let component: DashboarLoginComponent;
  let fixture: ComponentFixture<DashboarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboarLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

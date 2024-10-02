import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlHeaderComponent } from './control-header.component';

describe('ControlHeaderComponent', () => {
  let component: ControlHeaderComponent;
  let fixture: ComponentFixture<ControlHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

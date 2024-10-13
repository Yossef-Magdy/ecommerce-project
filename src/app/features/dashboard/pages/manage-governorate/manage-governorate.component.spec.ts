import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGovernorateComponent } from './manage-governorate.component';

describe('ManageGovernorateComponent', () => {
  let component: ManageGovernorateComponent;
  let fixture: ComponentFixture<ManageGovernorateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGovernorateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageGovernorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

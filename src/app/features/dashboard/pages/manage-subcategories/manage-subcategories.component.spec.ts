import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubcategoriesComponent } from './manage-subcategories.component';

describe('ManageSubcategoriesComponent', () => {
  let component: ManageSubcategoriesComponent;
  let fixture: ComponentFixture<ManageSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubcategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

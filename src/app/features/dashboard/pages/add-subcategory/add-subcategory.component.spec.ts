import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubcategoryComponent } from './add-subcategory.component';

describe('AddSubcategoryComponent', () => {
  let component: AddSubcategoryComponent;
  let fixture: ComponentFixture<AddSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

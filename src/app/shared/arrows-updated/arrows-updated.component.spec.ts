import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowsUpdatedComponent } from './arrows-updated.component';

describe('ArrowsUpdatedComponent', () => {
  let component: ArrowsUpdatedComponent;
  let fixture: ComponentFixture<ArrowsUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowsUpdatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrowsUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

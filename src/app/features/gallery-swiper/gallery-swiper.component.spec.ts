import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySwiperComponent } from './gallery-swiper.component';

describe('GallerySwiperComponent', () => {
  let component: GallerySwiperComponent;
  let fixture: ComponentFixture<GallerySwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GallerySwiperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GallerySwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

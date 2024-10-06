import { Component, HostListener, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-swiper',
  standalone: true,
  templateUrl: './gallery-swiper.component.html',
  styleUrls: ['./gallery-swiper.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GallerySwiperComponent {
  // Default direction is set to vertical
  direction: 'horizontal' | 'vertical' = 'vertical';
  swiperStyle: any = {};  // Store styles dynamically

  @Input() images!: any[];

  constructor() {
    this.updateDirectionBasedOnScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateDirectionBasedOnScreenSize();
  }

  // Update Swiper direction and styles based on screen width
  updateDirectionBasedOnScreenSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 768) {
      // Set vertical view for large screens
      this.direction = 'vertical';
      this.swiperStyle = { width: '200px', height: '500px' };
    } else {
      // Set horizontal view for smaller screens
      this.direction = 'horizontal';
      this.swiperStyle = { width: '90%', height: '100px', position: 'static', overflow: 'hidden'};
    }
  }
}

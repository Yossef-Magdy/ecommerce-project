import { Component, HostListener, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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

  images = [
    { id: 1, src: "assets/1.jpg" },
    { id: 2, src: "assets/2.jpg" },
    { id: 3, src: "assets/3.jpg" },
    { id: 4, src: "assets/4.jpg" },
    { id: 5, src: "assets/5.jpg" },
    { id: 6, src: "assets/1.jpg" },
  ];

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

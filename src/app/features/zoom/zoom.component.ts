import { Component, Input } from '@angular/core';
import { GallerySwiperComponent } from '../product-details/gallery-swiper/gallery-swiper.component';

@Component({
  selector: 'app-zoom',
  standalone: true,
  imports: [GallerySwiperComponent],
  templateUrl: './zoom.component.html',
  styleUrl: './zoom.component.css',
})
export class ZoomComponent {
  @Input() images!: any;
}

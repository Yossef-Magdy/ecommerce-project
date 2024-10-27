import { Component, Input } from '@angular/core';
import { GallerySwiperComponent } from '../gallery-swiper/gallery-swiper.component';

@Component({
  selector: 'app-zoom',
  standalone: true,
  imports: [GallerySwiperComponent],
  templateUrl: './zoom.component.html',
  styleUrl: './zoom.component.css',
})
export class ZoomComponent {
  @Input() images!: any;

  ngOnInit(){
    if (!this.images || !Array.isArray(this.images) || this.images.length === 0) {
      console.error('No images available for the zoom component.');
      return;
    }
  }
  
}

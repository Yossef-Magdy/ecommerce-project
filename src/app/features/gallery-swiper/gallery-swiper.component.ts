import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery-swiper',
  standalone: true,
  imports: [],
  templateUrl: './gallery-swiper.component.html',
  styleUrl: './gallery-swiper.component.css'
})
export class GallerySwiperComponent {
  images = [
    {"id": 1,
      "src": "assets/1.jpg" 
    },
    {"id": 2,
      "src": "assets/2.jpg" 
    },
    {"id": 3,
      "src": "assets/3.jpg" 
    },
    {"id": 4,
      "src": "assets/4.jpg" 
    },
    {"id": 5,
      "src": "assets/5.jpg" 
    },
    {"id": 6,
      "src": "assets/6.jpg" 
    },
    {"id": 1,
      "src": "assets/1.jpg" 
    },
  ]

}

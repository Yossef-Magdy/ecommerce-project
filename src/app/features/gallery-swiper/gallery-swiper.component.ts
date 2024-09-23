import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';


@Component({
  selector: 'app-gallery-swiper',
  standalone: true,
  imports: [],
  templateUrl: './gallery-swiper.component.html',
  styleUrl: './gallery-swiper.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

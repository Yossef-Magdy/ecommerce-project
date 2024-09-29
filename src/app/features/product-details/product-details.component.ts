import { Component, EventEmitter, Output} from '@angular/core';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { GallerySwiperComponent } from './gallery-swiper/gallery-swiper.component';
import { RouterLink } from '@angular/router';
import { SizeChartComponent } from '../../core/auth/components/label/size-chart/size-chart.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ZoomComponent } from './zoom/zoom.component';
import { RightDrawerComponent } from '../../shared/right-drawer/right-drawer.component';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    StarRatingComponent,
    ButtonComponent,
    GallerySwiperComponent,
    RouterLink,
    SizeChartComponent,
    ProductCardComponent,
    ZoomComponent,
    RightDrawerComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  cartItems: CartItem[] = [];
  quantity: number = 1;
  @Output() addedToCartProduct = new EventEmitter<any>();
  isAdded = false;
  data = {
    id: 1,
    stock: 5,
    slug: 'slug',
    name: 'T-Shirt',
    description: 'desc',
    price: 190,
    images: [
      'assets/1.jpg',
      'assets/2.jpg',
      'assets/3.jpg',
      'assets/4.jpg',
      'assets/5.jpg',
    ],
    colors: ['red', 'black', 'grey', 'beige'],
    sizes : ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviews: 76,
  };
  

  constructor(private cartService: CartService){}

  onAddToCart() {
    this.cartService.addToCart(this.data, this.quantity);
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
      this.cartService.updateQuantity(this.data.id, this.quantity);
    }
  }

  increaseQuantity() {
    if (this.quantity < this.data.stock) {
      this.quantity++;
      this.cartService.updateQuantity(this.data.id, this.quantity);
    }
  }

  ngOnInit(){
    // const routeId = this.activatedRoute.snapshot.params['id'];
    // this.productRequestsService
    //   .getProductDetails(routeId)
    //   .subscribe((product: any) => {
    //     this.data = product;
    //     this.quantity = this.cartService.getQuantity(this.data.id);
    //   });

      this.cartService.getItems().subscribe((items) => {
        this.cartItems = items;
      });
  }


}

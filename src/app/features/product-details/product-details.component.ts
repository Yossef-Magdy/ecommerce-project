import { Component, EventEmitter, Output} from '@angular/core';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { GallerySwiperComponent } from './gallery-swiper/gallery-swiper.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SizeChartComponent } from './size-chart/size-chart.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ZoomComponent } from './zoom/zoom.component';
import { RightDrawerComponent } from '../../shared/right-drawer/right-drawer.component';
import { CartItem, CartService } from '../../services/cart.service';
import { IProduct, IProductDetail } from '../../data-interfaces';
import { ProductDetailsService } from './product-details.service';

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
  data !: IProduct;
  cartItems: CartItem[] = [];
  quantity: number = 1;
  colors: string[] = [];
  sizes: string[] = [];


  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute, private productDetails: ProductDetailsService){}

  onAddToCart() {
    this.cartService.addToCart(this.data, this.quantity);
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
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
    const routeSlug = this.activatedRoute.snapshot.params['slug'];
    this.productDetails
      .getProductById(routeSlug)
      .subscribe((product: any) => {
        
        this.data = product.data;
        this.quantity = this.cartService.getQuantity(this.data.id);

        console.log(this.data.images);
        
        this.colors = [... new Set(this.data.details.map((detail: IProductDetail) => detail.color))];
        this.sizes = [... new Set(this.data.details.map((detail: IProductDetail) => detail.size))];
      });

      this.cartService.getItems().subscribe((items) => {
        this.cartItems = items;
      });
  }


}

import { Component, EventEmitter, Output } from '@angular/core';
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
import { initFlowbite } from 'flowbite';
import { ProductReviewsComponent } from "./product-reviews/product-reviews.component";
import { NgFor, NgIf } from '@angular/common';

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
    ProductReviewsComponent,
    NgFor,
    NgIf
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

  selectedColor: string | null = null;
  selectedSize: string | null = null;
  selectedPrice: number = 0;
  availableSizes: string[] = [];
  availableColors: string[] = [];
  selectedStock: number = 0;  // Add stock

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productDetails: ProductDetailsService
  ) {}

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
    if (this.quantity < this.selectedStock) {  // Check with stock
      this.quantity++;
      this.cartService.updateQuantity(this.data.id, this.quantity);
    }
  }

  ngOnInit() {
    const routeSlug = this.activatedRoute.snapshot.params['slug'];
    this.productDetails
      .getProductById(routeSlug)
      .subscribe((product: any) => {
        this.data = product.data;
        this.quantity = this.cartService.getQuantity(this.data.id);

        this.colors = [
          ...new Set(this.data.details.map((detail: IProductDetail) => detail.color)),
        ];
        this.sizes = [
          ...new Set(this.data.details.map((detail: IProductDetail) => detail.size)),
        ];

        this.selectedColor = this.colors[0];
        this.availableSizes = this.getSizesByColor(this.selectedColor);
        this.selectedSize = this.availableSizes[0];
        this.updatePrice();  // Initialize price
      });

    this.cartService.getItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  ngAfterViewInit() {
    initFlowbite();
  }

  // Get available sizes based on selected color
  getSizesByColor(color: string): string[] {
    return this.data.details
      .filter((detail: IProductDetail) => detail.color === color)
      .map((detail: IProductDetail) => detail.size);
  }

  // Get available colors based on selected size
  getColorsBySize(size: string): string[] {
    return this.data.details
      .filter((detail: IProductDetail) => detail.size === size)
      .map((detail: IProductDetail) => detail.color);
  }

  // Handle color selection
  onColorSelect(color: string) {
    this.selectedColor = color;
    this.availableSizes = this.getSizesByColor(color);

    // Reset size if it's not available for the selected color
    if (!this.availableSizes.includes(this.selectedSize!)) {
      this.selectedSize = null;
    }

    this.updatePrice();
  }

  // Handle size selection
  onSizeSelect(size: string) {
    this.selectedSize = size;
    this.availableColors = this.getColorsBySize(size);

    // Reset color if it's not available for the selected size
    if (!this.availableColors.includes(this.selectedColor!)) {
      this.selectedColor = null;
    }

    this.updatePrice();
  }

  // Update price and stock based on the selected color and size
  updatePrice() {
    const selectedDetail = this.data.details.find(
      (detail: IProductDetail) =>
        detail.color === this.selectedColor && detail.size === this.selectedSize
    );

    if (selectedDetail) {
      this.selectedPrice = selectedDetail.price;
      this.selectedStock = selectedDetail.stock;  // Update the stock
    } else {
      this.selectedPrice = 0;
      this.selectedStock = 0;
    }
  }
}

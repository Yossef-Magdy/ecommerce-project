import { Component, EventEmitter, Output } from '@angular/core';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { GallerySwiperComponent } from './gallery-swiper/gallery-swiper.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SizeChartComponent } from './size-chart/size-chart.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ZoomComponent } from './zoom/zoom.component';
import { RightDrawerComponent } from '../../shared/right-drawer/right-drawer.component';
import { CartItem, CartService } from '../../services/cart.service';
import { IProduct, IProductDetail } from '../../data-interfaces';
import { ProductDetailsService } from './product-details.service';
import { initFlowbite } from 'flowbite';
import { ProductReviewsComponent } from "./product-reviews/product-reviews.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RecentlyViewedServiceService } from '../../services/recently-viewed-service.service';
import { ToastService } from '../../core/services/toast.service';
import { AllProductsService } from '../collection/all-products.service';
import { MyCurrencyPipe } from '../../pipes/my-currency.pipe';

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
    NgIf,
    NgClass,
    MyCurrencyPipe
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
  discountPrice: number | null = null;
  selectedProductDetailId!: number;

  recentlyViewedProducts: IProduct[] = [];

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productDetails: ProductDetailsService,
    private recentlyViewedService: RecentlyViewedServiceService,
    private router: Router,
    private toastService: ToastService,
    private allProductsService: AllProductsService,
  ) {}

  onAddToCart() {
    if (this.selectedColor && this.selectedSize && this.quantity > 0) {
      if (this.quantity <= this.selectedStock) {
        this.toastService.showToast("Product is added successfully", "success");
        const cartItem: CartItem = {
          productDetailId: this.selectedProductDetailId,
          productSlug:this.data.slug,
          coverImg: this.data.cover_image,
          name: this.data.name,
          color: this.selectedColor,
          size: this.selectedSize,
          price: this.selectedPrice,
          priceAfterDiscount: this.discountPrice,
          stock: this.selectedStock,
          quantity: this.quantity,
        };

        this.cartService.addToCart(cartItem);
      } else {
        this.toastService.showToast("Not enough stock available", 'error')
      }
    } else {
      this.toastService.showToast("select a valid color and size", 'error')
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartService.updateQuantity(this.data.id, this.quantity);
    }
  }

  increaseQuantity() {
    if (this.quantity < this.selectedStock) {  
      this.quantity++;
      this.cartService.updateQuantity(this.data.id, this.quantity);
    }
  }

  getProduct(){
    let routeSlug = this.activatedRoute.snapshot.params['slug'];
    this.activatedRoute.params.subscribe((url:any) => {
      routeSlug = url.slug;
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
        this.updatePrice();

        // console.log("colors",this.availableColors, "sizes", this.availableSizes);

        this.recentlyViewedService.addToRecentlyViewed(this.data); // Add product to recently viewed
        this.loadRecentlyViewedProducts(); // Load recently viewed products

        setTimeout(() => {
          initFlowbite();
        }, 1000);
      });


    this.cartService.getItems().subscribe((items) => {
      this.cartItems = items;
    });
    });
    console.log("slug",routeSlug);
  }

  ngOnInit() {
    this.getProduct();
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
      this.selectedProductDetailId = selectedDetail.product_detail_id;
      if (this.data.discount_value){
          this.discountPrice = this.allProductsService.calculateDiscount(this.data.discount_type, this.data.discount_value, this.selectedPrice);
      }

    } 
    else {
      // user didn't change default details selection
      this.selectedPrice = 0;
      this.selectedStock = 0;
      if (this.data.discount_value){
        this.discountPrice = this.allProductsService.calculateDiscount(this.data.discount_type, this.data.discount_value, this.data.price);
      }
    }
  }
  
  loadRecentlyViewedProducts() {
    this.recentlyViewedProducts = this.recentlyViewedService.loadRecentlyViewed();
  }

  clearRecentlyViewed() {
    this.recentlyViewedService.clearRecentlyViewed();
    this.recentlyViewedProducts = [];
  }
}

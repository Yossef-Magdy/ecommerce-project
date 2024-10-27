import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PaymentService } from './services/payment.service';
import { CartService } from '../../services/cart.service';
import { AddressService } from '../profile/address.service';
import { GovernorateService } from '../profile/governorate.service';
import { AddressFormComponent } from "./address-form/address-form.component";
import { CurrencyPipe, DecimalPipe, NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../core/auth/services/auth.service';
import { MyCurrencyPipe } from '../../pipes/my-currency.pipe';
import { CouponService } from '../dashboard/services/coupon.service';
import { FireworksComponent } from "./fireworks/fireworks.component";
import { UserService } from '../profile/user.service';
import { ToastService } from '../../core/services/toast.service';
import { OrderService } from '../order-success/service/order.service';


declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, AddressFormComponent,NgIf ,NgClass, DecimalPipe, CurrencyPipe, MyCurrencyPipe, FireworksComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
[x: string]: any;
  isUserLoggedIn: boolean = true;
  userEmail: string = 'user@gmail.com';
  dropdownVisible: boolean = false;
  paymentMethod: string = 'credit-card';
  showBillingAddress: boolean = false;
  selectedBillingOption: string = 'same';
  orderSummary!: any;
  items !:any[];
  totalPrice :number = 0;
  subTotalPrice: number = 0;
  savedAddresses !: any[];
  isAddressFormSubmitted: boolean = false;
  shipping_detail_id!: number;
  user: any;
  shippingFee: number = 0;
  validCoupon: boolean = false;
  coupon!: any;
  totalDiscounts : number = 0;
  cartEmpty: boolean = true;

  constructor(private router: Router, private paymentService: PaymentService, private cartService: CartService, private addressService: AddressService, private authService: AuthService, private governerateService: GovernorateService, private couponService: CouponService, private userService: UserService, private toastService: ToastService, private orderService: OrderService) {}

  onAddressFormSubmit(submitted: boolean) {
    if (submitted) {
      this.isAddressFormSubmitted = true; // Show the next section after form submission
          //Check for address that newly added
      this.addressService.getAddresses().subscribe(addresses =>{
        this.savedAddresses = addresses.data;
        this.shipping_detail_id = addresses.data[0].id;
        this.getShippingCustomFee(addresses.data[0].governorate);
      })
    }
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onPaymentMethodChange(method: string) {
    this.paymentMethod = method;
    this.showBillingAddress = method === 'wallets';

    if (method === 'credit-card' || method === 'cod') {
      this.showBillingAddress = false;
      this.selectedBillingOption = 'same';
    }

  }
  onShippingOptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.showBillingAddress = !target.checked;
    }
  }

  onLogout() {
    this.cartService.getItems().subscribe((res)=>{
      if (res.length) this.cartEmpty = false;
    });

    //checks if the cart empty don't send request
    if (!this.cartEmpty){
      this.userService.sendCartItems().subscribe({
        next: (response) => {
        },
        error: (err) => {
          console.error("Error sending cart items", err);
        }
      });
      this.cartService.clearItems();
    }
    this.isUserLoggedIn = false;
    this.authService.logout();
  }

  // Payment methods
  STRIPE_PUBLISHABLE_KEY = 'pk_test_51QAMOHK0H3MHKtq78x5KWPHhFMCP2JK8uAWmkn2F7I6YpaNpV1R7dayKEgNDoXumdureLwRx4gSAs1hNPd2vwNoT00PZqzHu5F';
  stripe = Stripe(this.STRIPE_PUBLISHABLE_KEY);
  card: any; // Card instance
  isLoading: boolean = false; // Loading state for payment

  ngOnInit() {
    //get user data
    this.authService.checkUser().subscribe((res:any) => {
      if (res){
        this.user = res;
      }
      else{
        this.router.navigate(['/auth/login']);
      }
    });

    //get items from cart
    this.cartService.getItems().subscribe(items =>{
      if (items.length){
        this.orderSummary = items;
        this.items = [];
        for (let item of this.orderSummary){
          this.items.push({
            product_detail_id: item.productDetailId,
            quantity: item.quantity,
          });

          // if there is discount on product itself
          if (item.priceAfterDiscount){
            this.subTotalPrice += (item.priceAfterDiscount * item.quantity);
          }
          else{
            this.subTotalPrice += (item.price * item.quantity);
          }
        }
      }
      else{
        this.router.navigate(['/']);
      }
    });

    //Check for addresses
    this.addressService.getAddresses().subscribe(addresses =>{
      this.savedAddresses = addresses.data;
      
      if(addresses.data.length){
        this.shipping_detail_id = addresses.data[0].id;
        this.getShippingCustomFee(addresses.data[0].governorate);
      }
    })
    
    // Initialize Stripe.js
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  getShippingCustomFee(governorate: string): any{
    this.governerateService.getGovernorates().subscribe(govs => {
      const fee = govs.data.filter((g: any) => g.name === governorate)[0].fee;
      this.shippingFee = fee;
      this.totalPrice = Number(this.subTotalPrice) + Number(fee);
    })
  }
  

  async pay(event: Event) {
    // Prevent form from submitting
    event.preventDefault();
    this.isLoading = true;

    // Process payment
    switch(this.paymentMethod) {
      case 'credit-card':
        this.stripePayment(this.items);
        break;
      case 'cod':
        this.codPayment(this.items);
        break;
    }
  }


  private async stripePayment(items: Array<object>) {
    const { token, error } = await this.stripe.createToken(this.card);
    if (error) {
      this.toastService.showToast(error.message, 'error');
      console.error('Error creating token:', error);
      this.isLoading = false;
      return;
    }

    const order = {
      items: this.items,
      shipping_detail_id: this.shipping_detail_id, 
      coupon: this.validCoupon? this.coupon.coupon_code : null, // If coupon is applied !
      payment_method: 'stripe',
      stripeToken: token.id, // From Stripe API in front end
      currency: 'egp', // Currency of payment
    };

    this.paymentService.order(order).subscribe(
      
      (response: any) => {
        if (response.success) {          
          this.toastService.showToast('Payment successful!', 'success');
          this.isLoading = false;
          this.navigateAfterDelay(response);
          // Link recet response.charge.receipt_url for customer
        } else {
          console.error('Payment failed:', response.message);
          this.toastService.showToast('Payment failed: ' + response.message, 'error');
          this.isLoading = false;
        }
      },
      (err) => {
        console.error('Error processing payment:', err);
        this.toastService.showToast(err.error.message, 'error');
        this.isLoading = false;
      }
    );
  }

  private async codPayment(items: Array<object>) {
    const order = {
      items: items,
      shipping_detail_id: this.shipping_detail_id, // Hardcoded shipping detail ID
      coupon: this.validCoupon? this.coupon.coupon_code : null, // If coupon is applied !
      payment_method: 'cod',
      currency: 'egp',
    };

    this.paymentService.order(order).subscribe(
      (response: any) => {
        if (response.success) {
          this.orderService.setOrderData(response.data);
          this.toastService.showToast('Payment successful!', 'success');
          this.isLoading = false;
          this.navigateAfterDelay(response);
          // Link recet response.charge.receipt_url for customer
        } else {
          console.error('Payment failed:', response.message);
          this.toastService.showToast('Payment failed: ' + response.message, 'error');
          this.isLoading = false;
        }
      },
      (err) => {
        console.error('Error processing payment:', err);
        this.toastService.showToast(err.error.message, 'error');
        this.isLoading = false;
      }
    );
  }

  //get selected address
  onAddressChange(id:number, governorate:string){
    this.shipping_detail_id = id;
    this.getShippingCustomFee(governorate);
  }

  //check if coupon exists
  checkCoupon(coupon_code:string){
    this.couponService.getCouponByCode(coupon_code).subscribe(
      (res : any)=>{
        if (res && Object.keys(res).length && res.data.status !== 'expired'){
            this.toastService.showToast("Valid coupon", 'success');
            this.coupon = res.data;
            this.validCoupon = true;
            if (res.data.discount_type === 'fixed'){
              this.totalDiscounts += Number(res.data.discount_value);
              this.totalPrice = Number(this.totalPrice) - Number(res.data.discount_value);
            }
            else if (res.data.discount_type === 'percentage'){
              this.totalDiscounts += Number(res.data.discount_value) * Number(this.subTotalPrice);
            }
          coupon_code = '';
        }else {
          this.validCoupon = false; // Reset to false if not valid
          this.coupon = null; // Optionally clear coupon data
          this.toastService.showToast("Invalid coupon", 'error');
        }
      }, 
      (error) => {
        this.validCoupon = false; // Reset to false on error
        this.coupon = null; // Optionally clear coupon data
        console.error("Error fetching coupon", error);
      }
    );
  }

  // navigate to home after payment done successfully
  navigateAfterDelay(order: any) {
    setTimeout(() => {
      this.orderService.setOrderData(order);
      this.cartService.clearItems();
      this.router.navigate(['/success-order']); 
    }, 1000);
  }
}

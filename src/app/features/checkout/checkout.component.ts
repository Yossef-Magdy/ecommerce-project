import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PaymentService } from './services/payment.service';
import { CartService } from '../../services/cart.service';
import { AddressService } from '../profile/address.service';
import { GovernorateService } from '../profile/governorate.service';


declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  isUserLoggedIn: boolean = true;
  userEmail: string = 'user@gmail.com';
  dropdownVisible: boolean = false;
  paymentMethod: string = 'credit-card';
  showBillingAddress: boolean = false;
  selectedBillingOption: string = 'same';
  orderSummary!: any;
  items !:any[];
  totalPrice :number = 0;
  savedAddresses !: any[];
  governorates: any;

  constructor(private router: Router, private paymentService: PaymentService, private cartService: CartService, private addressService: AddressService, private governorateService: GovernorateService) {}

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

    // Message Error
    this.paymentStatus = '';
    this.errorMessage = false;
  }
  onShippingOptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.showBillingAddress = !target.checked;
    }
  }

  onBillingOptionChange(option: string) {
    this.selectedBillingOption = option;

    this.showBillingAddress = option === 'different';
  }

  onLogout() {
    this.isUserLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }

  // Payment methods
  STRIPE_PUBLISHABLE_KEY = 'pk_test_51Q8SaRAYDkqV8OSb7CBmUOUII185BHQ98c7m36pxUrm8S6KZCbThC7oukcr2ihfQIzpLq1btA19H4Si0EvgFIMqK00Jif1q77f';
  stripe = Stripe(this.STRIPE_PUBLISHABLE_KEY);
  card: any; // Card instance
  paymentStatus: string = '';
  errorMessage: boolean = false;
  isLoading: boolean = false; // Loading state for payment

  ngOnInit() {

    //get items from cart
    this.cartService.getItems().subscribe(items =>{
      this.orderSummary = items;
      this.items = [];
      for (let item of this.orderSummary){
        this.items.push({
          product_detail_id: item.productDetailId,
          quantity: item.quantity,
        });
        this.totalPrice += (item.price * item.quantity);
      }
    });

    //Check for addresses
    this.addressService.getAddresses().subscribe(addresses =>{
      console.log("address", addresses.data);
      this.savedAddresses = addresses.data;
    })

    //Get stored governerates 
    this.governorateService.getGovernorates().subscribe((res: any) => {
      this.governorates = res.data;
      console.log(this.governorates);
    });
    
    // Initialize Stripe.js
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  async pay(event: Event) {
    // Prevent form from submitting
    event.preventDefault();
    this.isLoading = true;
    this.paymentStatus = '';

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

  private generateRandomToken(length: number): string {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) =>
      ('0' + byte.toString(16)).slice(-2)
    ).join('');
  }

  private async stripePayment(items: Array<object>) {
    const { token, error } = await this.stripe.createToken(this.card);
    if (error) {
      console.error('Error creating token:', error);
      this.paymentStatus = error.message;
      this.isLoading = false;
      this.errorMessage = true;
      return;
    }

    const order = {
      token: this.generateRandomToken(6), // Radnomly generated token
      items: this.items,
      shipping_detail_id: 1, // Hardcoded shipping detail ID
      coupon: null, // If coupon is applied !
      payment_method: 'stripe',
      stripeToken: token.id, // From Stripe API in front end
      currency: 'egp', // Currency of payment
    };

    this.paymentService.order(order).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Payment successful:', response);
          this.paymentStatus = 'Payment successful!';
          this.isLoading = false;
          this.errorMessage = false;
          // Link recet response.charge.receipt_url for customer
        } else {
          console.error('Payment failed:', response.message);
          this.paymentStatus = 'Payment failed: ' + response.message;
          this.isLoading = false;
          this.errorMessage = true;
        }
      },
      (err) => {
        console.error('Error processing payment:', err);
        this.paymentStatus = err.error.message;
        this.isLoading = false;
        this.errorMessage = true;
      }
    );
  }
  private async codPayment(items: Array<object>) {
    const order = {
      token: this.generateRandomToken(6), // Radnomly generated token
      items: items,
      shipping_detail_id: 1, // Hardcoded shipping detail ID
      coupon: null, // If coupon is applied !
      payment_method: 'cod',
      currency: 'egp', // Currency of payment
    };

    this.paymentService.order(order).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Payment successful:', response);
          this.paymentStatus = 'Payment successful!';
          this.isLoading = false;
          this.errorMessage = false;
          // Link recet response.charge.receipt_url for customer
        } else {
          console.error('Payment failed:', response.message);
          this.paymentStatus = 'Payment failed: ' + response.message;
          this.isLoading = false;
          this.errorMessage = true;
        }
      },
      (err) => {
        console.error('Error processing payment:', err);
        this.paymentStatus = err.error.message;
        this.isLoading = false;
        this.errorMessage = true;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PaymentService } from './services/payment.service';
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
  paymentMethod: string = '';
  showBillingAddress: boolean = false;
  selectedBillingOption: string = 'same';

  // Payment
  stripe = Stripe(
    'pk_test_51Q8SaRAYDkqV8OSb7CBmUOUII185BHQ98c7m36pxUrm8S6KZCbThC7oukcr2ihfQIzpLq1btA19H4Si0EvgFIMqK00Jif1q77f'
  );
  card: any;
  paymentStatus: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private paymentService: PaymentService) {}

  ngOnInit() {
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  async pay(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.paymentStatus = '';

    const { token, error } = await this.stripe.createToken(this.card);
    if (error) {
      console.error('Error creating token:', error);
      this.paymentStatus = error.message;
      this.isLoading = false;
      return;
    }

    const order = {
      token: this.generateRandomToken(6), // Radnomly generated token
      items: [
        {
          product_detail_id: 1, // Hardcoded product detail ID
          quantity: 1,
        },
      ],
      shipping_detail_id: 1,
      coupon: null,
      payment_method: 'stripe',
      stripeToken: token.id, // From Stripe API in front end
      currency: 'egp',
    };

    this.paymentService.order(order).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Payment successful:', response.charge);
          this.paymentStatus = 'Payment successful!';
          this.isLoading = false;
          // Link recet response.charge.receipt_url for customer
        } else {
          console.error('Payment failed:', response.message);
          this.paymentStatus = 'Payment failed: ' + response.message;
          this.isLoading = false;
        }
      },
      (err) => {
        console.error('Error processing payment:', err);
        this.paymentStatus = err.error.message;
        this.isLoading = false;
      }
    );
  }
  private generateRandomToken(length: number): string {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) =>
      ('0' + byte.toString(16)).slice(-2)
    ).join('');
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

  onBillingOptionChange(option: string) {
    this.selectedBillingOption = option;

    this.showBillingAddress = option === 'different';
  }

  onLogout() {
    this.isUserLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }
}

import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-fireworks',
  standalone: true,
  imports: [NgIf],
  templateUrl: './fireworks.component.html',
  styleUrl: './fireworks.component.css'
})
export class FireworksComponent {
  isVisible = false;
  subscription: Subscription | undefined;

  ngOnInit(){
    this.startInterval();
  }

  startInterval() {
    // Show the component for 2 seconds using RxJS interval
    const timerObservable = timer(100); 

    this.subscription = timerObservable.subscribe(() => {
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
      }, 5000); // Hide after 5 seconds

      // Unsubscribe immediately after execution since we only need it once
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    });
  }

  // You should clean up the subscription when the component is destroyed
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

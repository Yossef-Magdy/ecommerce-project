import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  constructor(private toastService: ToastService) {}

  message: string = '';
  type: "success" | "error" = "success";
  isVisible: boolean = false;

  ngOnInit() {
    this.toastService.isVisible.subscribe((result: boolean) => {
      this.isVisible = result;
    });
    this.toastService.message.subscribe((result: string) => {
      this.message = result;
    });
    this.toastService.type.subscribe((result: "success" | "error") => {
      this.type = result;
    });
  }
}

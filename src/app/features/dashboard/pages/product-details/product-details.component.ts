import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { FormControl, FormGroup } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { ReactiveFormsModule } from '@angular/forms';
import { initModals } from 'flowbite';
import { ProductDetailsService } from '../../services/product-details.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [LabelComponent, BlackButtonComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product?: any;
  currentDetails?: any;
  detailsForm = new FormGroup({
    id: new FormControl(-1),
    color: new FormControl(''),
    size: new FormControl(''),
    material: new FormControl(''),
    stock: new FormControl(0),
    price: new FormControl(0)
  });

  constructor(private activatedRoute: ActivatedRoute, 
    private productService: ProductService,
    private productDetailsService: ProductDetailsService,
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productService.getProduct(id).subscribe((result: any) => {
      this.product = result.data;
      setTimeout(() => {
        initModals();
      }, 50);
    });
  }

  selectDetails(details: any) {
    this.currentDetails = details;
  }

  updateForm() {
    this.detailsForm.patchValue({
      id: this.currentDetails.product_detail_id,
      color: this.currentDetails.color,
      size: this.currentDetails.size,
      material: this.currentDetails.material,
      stock: this.currentDetails.stock,
      price: this.currentDetails.price,
    });
  }

  clearForm() {
    this.detailsForm.reset();
  }

  addDetails() {
    const data: any = {
      product_id: this.product.id,
      color: this.detailsForm.controls['color'].value,
      size: this.detailsForm.controls['size'].value,
      material: this.detailsForm.controls['material'].value,
      stock: this.detailsForm.controls['stock'].value,
    };
    if (this.detailsForm.controls['price'].value) {
      data.price = this.detailsForm.controls['price'].value;
    } 
    this.productDetailsService.addProductDetails(data).subscribe((response: any) => {
      const data = response.data;
      this.product.details.push(data);
    });
  }

  updateDetails() {
    const id = this.currentDetails.product_detail_id;
    this.productDetailsService.updateProductDetail(this.detailsForm.value, id).subscribe((response: any) => {
      const data = response.data;
      this.product.details = this.product.details.map((detail: any) => {
        if (data.id == detail.product_detail_id) {
          return {
            product_detail_id: data.id,   
            product_id: data.product_id, 
            color: data.color,
            material: data.material,
            price: data.price,
            size: data.size,
            stock: data.stock,
          };
        } 
        return detail;
      });
    });
  }

  removeDetails() {
    const id = this.currentDetails.product_detail_id;
    this.productDetailsService.deleteProductDetail(id).subscribe((result: boolean) => {
      if (result) {
        this.product.details = this.product.details.filter((detail: any) => id != detail.product_detail_id);
      }
    });
  }

}

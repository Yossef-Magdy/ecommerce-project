import { Component } from '@angular/core';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, BlackButtonComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(private productService: ProductService) {}

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    coverImage: new FormControl(''),
  });
  message?: string;
  isErrorMessage?: boolean;
  fileToUpload: any;
  imageUrl: any;

  get name() {
    return this.productForm.controls['name'];
  }

  get price() {
    return this.productForm.controls['price'];
  }

  get description() {
    return this.productForm.controls['description'];
  }

  get coverImage() {
    return this.productForm.controls['coverImage'];
  }

  
  handleFileInput(event: any) {
    const file: FileList = event.target.files;
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  submit() {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      return;
    }
    const data: FormData = new FormData();
    data.append('name', this.name.value || '');
    data.append('price', this.price.value || '0');
    data.append('description', this.description.value || '');
    data.append('cover_image', this.fileToUpload);
    this.productService.addProduct(data).subscribe((response: any) => {
      if (response.message) {
        this.isErrorMessage = false;
        this.message = response.message;
      } else {
        this.isErrorMessage = true;
        const key = Object.keys(response)[0];
        this.message = response[key][0];
      }
    });
  }
}

import { Component } from '@angular/core';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ProductService } from '../../services/product.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryService } from '../../services/category.service';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, BlackButtonComponent, NgSelectModule, RxReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    categories: new FormControl([]),
    cover_image: new FormControl(),
  });
  categories?: any = [{
    id: -1,
    name: 'no category',
  }];
  message?: string;
  isErrorMessage?: boolean;
  fileToUpload: any;
  imageUrl: any;

  ngOnInit() {
    this.categoryService.getCategories().subscribe((result: any) => {
      this.categories = result.data;
    });
  }

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
    return this.productForm.controls['cover_image'];
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
    const data = this.productForm.value;
    if (!this.coverImage.value) {
      delete data.cover_image;
    }
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

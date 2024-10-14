import { Component, ElementRef, ViewChild } from '@angular/core';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ProductService } from '../../services/product.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryService } from '../../services/category.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, BlackButtonComponent, NgSelectModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(private productService: ProductService, private categoryService: CategoryService, private renderer: Renderer2) {}

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    categories: new FormControl([]),    
  });
  fileToUpload: any;
  imageUrl: any;
  @ViewChild('cover_image') coverImage: any;
  categories?: any;

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

  get productCategories() {
    return this.productForm.controls['categories'];
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
    const data = new FormData();
    data.append('name', this.name.value || '');
    data.append('price', this.price.value || '');
    data.append('description', this.description.value || '');
    data.append('categories', JSON.stringify(this.productCategories.value));
    if (this.fileToUpload) {
      data.append('cover_image', this.fileToUpload);
    }
    this.productService.addProduct(data).subscribe((result: boolean) => {
      if (result) {
        this.productForm.reset();
        this.fileToUpload = null;
        this.imageUrl = null;
        this.renderer.setProperty(this.coverImage.nativeElement, 'value', '');
      }
    });
  }
}

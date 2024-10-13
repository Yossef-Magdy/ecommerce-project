import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { PaginationComponent } from "../../../../shared/pagination/pagination.component";
import { PaginationService } from '../../../../shared/pagination/services/pagination.service';
import { initModals } from 'flowbite';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { CategoryService } from '../../services/category.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [ReactiveFormsModule, BlackButtonComponent, ButtonComponent, LabelComponent, PaginationComponent, RxReactiveFormsModule, NgSelectModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent {
  constructor(private productService: ProductService, private paginationService: PaginationService, private categoryService: CategoryService) {}

  productForm = new FormGroup({
    id: new FormControl(-1),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    cover_image: new FormControl(),
    categories: new FormControl([]),
  });

  message?: string;
  isErrorMessage?: boolean;
  products?: any = [];
  currentProduct: any;
  fileToUpload: any;
  imageUrl: any;
  oldImageUrl: any;

  categories?: any = [{
    id: -1,
    name: 'no category',
  }];

  from: number = 0;
  to: number = 0;
  total: number = 0;
  currentPage: number = 1;
  prev?: any;
  next?: any;

  ngOnInit() {
    this.productService.getProducts().subscribe((result: any) => {
      this.products = result.data;
      this.currentPage = result.meta.current_page;
      this.from = result.meta.from;
      this.to = result.meta.to;
      this.total = result.meta.total;
      this.prev = result.links.prev;
      this.next = result.links.next;
      setTimeout(() => {
        initModals();
      }, 50);
    });
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


  load = (url: any) => {
    if (url) {
      this.paginationService.load(url).subscribe((result: any) => {
        this.products = result.data;
        this.currentPage = result.meta.current_page;
        this.from = result.meta.from;
        this.to = result.meta.to;
        this.prev = result.links.prev;
        this.next = result.links.next;
        setTimeout(() => {
          initModals();
        }, 50);
      });
    }
  }


  selectProduct(product: any) {
    this.currentProduct = product;
    this.oldImageUrl = product.cover_image;
    this.imageUrl = null;
  }

  updateForm() {
    if (this.currentProduct) {
      this.productForm.patchValue({
        id: this.currentProduct.id,
        name: this.currentProduct.name,
        description: this.currentProduct.description,
        price: this.currentProduct.price,
        cover_image: null,
        categories: this.currentProduct.categories.map((category: any) => category.id),
      });
    }
  }

  updateProduct() {
    const id = this.currentProduct.id;
    const data = this.productForm.value;
    if (!this.coverImage.value) {
      delete data.cover_image;
    } else {
      data.cover_image = data.cover_image[0];
    }
    console.log(data);
    this.productService.updateProduct(data, id).subscribe((response) => {
      console.log(response);
    })
  }

  removeProduct() {
    const id = this.currentProduct.id;
    this.productService.deleteProduct(id).subscribe((response) => {
      console.log(response);
    })
  }
}

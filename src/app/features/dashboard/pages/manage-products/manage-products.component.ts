import { Component, ViewChild } from '@angular/core';
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
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [ReactiveFormsModule, BlackButtonComponent, ButtonComponent, LabelComponent, PaginationComponent, RxReactiveFormsModule, NgSelectModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent {
  constructor(private productService: ProductService, 
    private paginationService: PaginationService, 
    private categoryService: CategoryService,
    private renderer: Renderer2
  ) {}

  productForm = new FormGroup({
    id: new FormControl(-1),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    categories: new FormControl([]),
  });

  message?: string;
  isErrorMessage?: boolean;
  products?: any = [];
  currentProduct: any;
  fileToUpload: any;
  imageUrl: any;
  oldImageUrl: any;
  @ViewChild('cover_image') coverImage: any;

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
      this.buildPagination(result);
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


  load = (url: any) => {
    if (url) {
      this.paginationService.load(url).subscribe((result: any) => {
        this.products = result.data;
        this.buildPagination(result);
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
        categories: this.currentProduct.categories.map((category: any) => category.id),
      });
    }
  }

  updateProduct() {
    const id = this.currentProduct.id;
    const data = new FormData();
    data.append('name', this.name.value || '');
    data.append('price', this.price.value || '');
    data.append('description', this.description.value || '');
    data.append('categories', JSON.stringify(this.productCategories.value));
    data.append('_method', 'put');
    if (this.fileToUpload) {
      data.append('cover_image', this.fileToUpload);
    }
    this.productService.updateProduct(data, id).subscribe((response: any) => {
      const data = response.data;
      this.products = this.products.map((product: any) => product.id == data.id ? data : product);
      this.productForm.reset();
        this.fileToUpload = null;
        this.imageUrl = null;
        this.renderer.setProperty(this.coverImage.nativeElement, 'value', '');
    })


  }

  removeProduct() {
    const id = this.currentProduct.id;
    this.productService.deleteProduct(id).subscribe((response) => {
      this.productService.getProducts().subscribe((result: any) => {
        this.products = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
    })
  }

  buildPagination(data: any) {
    this.currentPage = data.meta.current_page;
    this.from = data.meta.from;
    this.to = data.meta.to;
    this.total = data.meta.total;
    this.prev = data.links.prev;
    this.next = data.links.next;
  }
}

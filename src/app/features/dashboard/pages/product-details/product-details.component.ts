import { Component, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { ReactiveFormsModule } from '@angular/forms';
import { initModals } from 'flowbite';
import { ProductDetailsService } from '../../services/product-details.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoriesService } from '../../../home/categories.service';
import { DiscountService } from '../../services/discount.service';
import { MyCurrencyPipe } from '../../../../pipes/my-currency.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [LabelComponent, BlackButtonComponent, ButtonComponent, ReactiveFormsModule, NgSelectModule, MyCurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product?: any;
  currentDetails?: any;
  detailsForm: FormGroup;
  coverImageFile: any;
  coverImageUrl: any;
  productImagesFiles: any;
  productImagesUrls: any = [];
  @ViewChild('cover_image') coverImage: any;
  @ViewChild('product_images') productImages: any;
  productForm: FormGroup;
  discountForm: FormGroup;
  categories?: any = [{
    id: -1,
    name: 'no category',
  }];

  constructor(private activatedRoute: ActivatedRoute, 
    private productService: ProductService,
    private productDetailsService: ProductDetailsService,
    private categoryService: CategoriesService,
    private renderer: Renderer2,
    private discountService: DiscountService
  ) {
    this.detailsForm = new FormGroup({
      id: new FormControl(-1),
      color: new FormControl(''),
      size: new FormControl(''),
      material: new FormControl(''),
      stock: new FormControl(0),
      price: new FormControl(0)
    });
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl([]),
    });
    this.discountForm = new FormGroup({
      status: new FormControl(''),
      type: new FormControl('fixed'),
      value: new FormControl(0, [Validators.min(0), this.invalidPercent()]),
      expiry_date: new FormControl(),
    });
    this.discountType?.valueChanges.subscribe(() => {
      this.discountValue.updateValueAndValidity();
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productService.getProduct(id).subscribe((result: any) => {
      this.product = result.data;
      setTimeout(() => {
        initModals();
      }, 50);
    });
    this.categoryService.getAllCategories().subscribe((result: any) => {
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

  get discountStatus() {
    return this.discountForm.controls['status'];
  }

  get discountType() {
    if (this.discountForm) {
      return this.discountForm.controls['type'];
    }
    return null;
  }

  get discountValue() {
    return this.discountForm.controls['value'];
  }

  get expiryDate() {
    return this.discountForm.controls['expiry_date'];
  }

  invalidPercent(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.discountType?.value != 'fixed' && control.value > 100) {
        return { invalidPercent: true };
      }
      return null;
    }
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
      this.product.stock += +data.stock;
    });
  }

  addDiscount() {
    const data = this.discountForm.value;
    data['product_id'] = this.product.id;
    if (!this.expiryDate.value) {
      delete data.expiry_date;
    }
    if (!this.discountStatus.value) {
      delete data.status;
    }
    this.discountService.addDiscount(data).subscribe((response: any) => {
      this.product.discount = response.data;
      setTimeout(() => {
        initModals();
      }, 50);
    })
  }

  fillDiscountForm() {
    const discount = this.product.discount;
    console.log(discount);
    this.discountForm.patchValue({
      status: discount.status,
      type: discount.type,
      value: discount.value,
      expiry_date: discount.expiry_date,
    });
  }

  updateDiscount() {
    const id = this.product.discount.id;
    const data = this.discountForm.value;
    data['product_id'] = this.product.id;
    this.discountService.updateDiscount(data, id).subscribe((response: any) => {
      if (response) {
        this.product.discount = response.data;
      }
    });
  }

  removeDiscount() {
    const id = this.product.discount.id;
    this.discountService.deleteDiscount(id).subscribe((response: any) => {
      if (response) {
        this.product.discount = null;
        setTimeout(() => {
          initModals();
        }, 50);
      }
    });
  }

  handleCoverImage(event: any) {
    const file: FileList = event.target.files;
    this.coverImageFile = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.coverImageUrl = reader.result;
    }
    reader.readAsDataURL(this.coverImageFile);
  }

  handleProductImages(event: any) {
    const files: FileList = event.target.files;
    this.productImagesFiles = Array.from(files);
    this.productImagesUrls = [];
    for (const file of this.productImagesFiles) {
      let reader = new FileReader();
      reader.onload = () => {
        this.productImagesUrls.push(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }

  resetProductForm() {
    this.productForm.patchValue({
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      categories: this.product.categories.map((category: any) => category.id),
    });
    this.coverImageFile = null;
    this.coverImageUrl = null;
    this.productImagesFiles = null;
    this.productImagesUrls = null;
    this.renderer.setProperty(this.coverImage.nativeElement, 'value', '');
    this.renderer.setProperty(this.productImages.nativeElement, 'value', '');

  }

  updateProduct() {
    const id = this.product.id;
    const data = new FormData();
    data.append('name', this.name.value || '');
    data.append('price', this.price.value || '');
    data.append('description', this.description.value || '');
    data.append('categories', JSON.stringify(this.productCategories.value));
    data.append('_method', 'put');
    if (this.coverImageFile) {
      data.append('cover_image', this.coverImageFile);
    }
    if (this.productImagesFiles) {
      for (let image of this.productImagesFiles) {
        data.append('product_images[]', image);
      }
    }
    this.productService.updateProduct(data, id).subscribe((response: any) => {
      const data = response.data;
      for (let key of Object.keys(this.product)) {
        if (data[key]) {
          this.product[key] = data[key];
        }
      }
    })
  }

  updateDetails() {
    const id = this.currentDetails.product_detail_id;
    this.productDetailsService.updateProductDetail(this.detailsForm.value, id).subscribe((response: any) => {
      const data = response.data;
      this.product.details = this.product.details.map((detail: any) => {
        if (data.id == detail.product_detail_id) {
          this.product.stock -= +detail.stock;
          this.product.stock += +data.stock;
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

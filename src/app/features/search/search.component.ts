import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { debounceTime, isEmpty, of, Subject, switchMap, takeUntil } from 'rxjs';
import { NgFor } from '@angular/common';
import { AllProductsService } from '../collection/all-products.service';
import { MyCurrencyPipe } from '../../pipes/my-currency.pipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, NgFor, MyCurrencyPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  products:any[] = [];
  type!: string;
  query!: string;
  searched: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private searchService: SearchService, private router: Router, private activatedRoute: ActivatedRoute, private allProducts: AllProductsService ){}

  searchForm = new FormGroup({
    productName : new FormControl(''),
  });


  ngOnInit(){
    this.activatedRoute.queryParams.pipe(
      switchMap((params: any) => {
        if (Object.entries(params).length !== 0){
          this.searched = true;
        }
        
        if (!params?.query){
          return of ({'data': []});
        }
        return this.searchService.searchByProduct(params?.query);
      }),
      takeUntil(this.destroy$),debounceTime(500)
    )
    .subscribe((res) => {
      this.products = res.data;

      this.products.forEach((product) => {
        product.current_image = product.cover_image;
        if (product.discount_value){
          product.priceAfterDiscount = this.allProducts.calculateDiscount(product.discount_type, product.discount_value, product.price);
        }
        else{
          product.discount_value = 0;
        }
      });

    });
  }

  onSearch(query:any){
    this.router.navigate(['/search'], {queryParams : { type: 'product', query: query } });
  }


  changeImage(card: any, newImage: string) {
    card.current_image = newImage;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sortProducts(event: Event) {
    const target = event.target as HTMLSelectElement;
    const order = target.value;

    if (order === 'asc') {
      this.products.sort((a, b) => a.price - b.price); // Sort from low to high
    } else if (order === 'desc') {
      this.products.sort((a, b) => b.price - a.price); // Sort from high to low
    }
  }
}

import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  products!:any;
  type!: string;
  query!: string;

  constructor(private searchService: SearchService, private router: Router, private activatedRoute: ActivatedRoute ){}

  searchForm = new FormGroup({
    productName : new FormControl(''),
  });

  onSearch(query:any){
    this.router.navigate(['/search'], {queryParams : { type: 'product', query: query } });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.type = params['type'];
      this.query = params['query'];
  
      if (this.query && this.type) {
        this.getSearchResults();
      }
    });

  }

  ngOnInit(){
  }

  getSearchResults() {
    this.searchService.searchByProduct(this.query!).subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
        
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }



}

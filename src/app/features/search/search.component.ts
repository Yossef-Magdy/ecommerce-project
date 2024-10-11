import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  products!:any;

  constructor(private searchService: SearchService ){}
    searchForm = new FormGroup({
    productName : new FormControl(''),
  });

  onSubmit(){}
  ngOnInit(){
    this.searchService.searchByCategory('women').subscribe((response) => {
      // this.products = response;
      console.log(response);
      // document.querySelector('.loader_section')?.classList.add('d-none');
    });
  }

}

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { GovernorateService } from '../../services/governorate.service';
import { initModals } from 'flowbite';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { PaginationComponent } from "../../../../shared/pagination/pagination.component";
import { PaginationService } from '../../../../shared/pagination/services/pagination.service';
@Component({
  selector: 'app-manage-governorate',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, BlackButtonComponent, ButtonComponent, PaginationComponent],
  templateUrl: './manage-governorate.component.html',
  styleUrl: './manage-governorate.component.css'
})
export class ManageGovernorateComponent {
  governorates?: any = [];
  currentGovernorate: any;

  governorateForm = new FormGroup({
    id: new FormControl(-1),
    name: new FormControl(''),
    fee: new FormControl(0, [Validators.min(0)]),
  });
  from: number = 0;
  to: number = 0;
  total: number = 0;
  currentPage: number = 1;
  prev?: any;
  next?: any;

  constructor(private governorateService: GovernorateService, private paginationService: PaginationService) {}

  ngOnInit() {
    this.governorateService.getGovernorates().subscribe((result: any) => {
      this.governorates = result.data;
      this.buildPagination(result);
      setTimeout(() => {
        initModals();
      }, 50);
    });
  }

  load = (url: any) => {
    if (url) {
      this.paginationService.load(url).subscribe((result: any) => {
        this.governorates = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
    }
  }

  selectGovernorate(governorate: any) {
    this.currentGovernorate = governorate;
  }

  updateForm() {
    if (this.currentGovernorate) {
      this.governorateForm.patchValue({
        id: this.currentGovernorate.id,
        name: this.currentGovernorate.name,
        fee: this.currentGovernorate.fee,
      });
    }
  }

  updateGovernorate() {
    const id = this.currentGovernorate.id;
    this.governorateService.updateGovernorate(this.governorateForm.value, id).subscribe((response: any) => {
      const data = response.data;
      this.governorates = this.governorates.map((governorate: any) => governorate.id == data.id ? data : governorate);
    })
  }

  removeGovernorate() {
    const id = this.currentGovernorate.id;
    this.governorateService.deleteGovernorate(id).subscribe((response) => {
      this.governorateService.getGovernorates().subscribe((result: any) => {
        this.governorates = result.data;
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

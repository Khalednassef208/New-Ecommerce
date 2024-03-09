import { Component, OnInit } from '@angular/core';
import { CategoryItem } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryList: CategoryItem[] = [];
  isLoading: boolean = true;

  constructor(private _ProductService: ProductService) { }
  ngOnInit(): void {
    this._ProductService.getAllCategories().subscribe({
      next: Response => {
        console.log(Response);
        this.categoryList = Response.data;
        console.log(this.categoryList);
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

}

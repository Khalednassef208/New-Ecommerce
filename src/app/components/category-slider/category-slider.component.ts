import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryItem } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css']
})
export class CategorySliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 6
      }
    },
    nav: true
  };
  categoryList: CategoryItem[] = [];
  constructor(private _ProductService: ProductService) { }

  ngOnInit(): void {
    this._ProductService.getAllCategories().subscribe({
      next: response => {
        this.categoryList = response.data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

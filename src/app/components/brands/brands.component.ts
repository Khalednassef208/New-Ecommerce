import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  BrandList: Brand[] = [];
  isLoading: boolean = true;
  constructor(private _ProductService: ProductService) { }


  ngOnInit(): void {
    this._ProductService.getAllBrands().subscribe({
      next: res => {
        this.BrandList = res.data;
        console.log(this.BrandList);
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

}

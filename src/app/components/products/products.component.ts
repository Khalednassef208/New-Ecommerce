import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: Product[] = [];
  title: string = '';
  isLoading: boolean = true;

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._ProductService.getAllProducts().subscribe({
      next: response => {
        console.log(response);
        this.productList = response.data;
        console.log(this.productList);
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (response: any) => {
        console.log(response);
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        this.toastr.success(response.message, '',
          {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
      },
      error: err => {
        console.log(err);

      }
    });
  }


}

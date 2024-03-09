import { Products } from './../../interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartId: string = '';
  numOfCartItem: number = 0;
  totalprice: number = 0;
  productList: any[] = [];
  errorMessage: string = '';

  constructor(private _CartService: CartService) { }

  ngOnInit(): void {
    this.getLoggedUserData();
  }

  getLoggedUserData() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response: any) => {
        this.cartId = response.data._id;
        this.numOfCartItem = response.numOfCartItems;
        this.totalprice = response.data.totalCartPrice;
        this.productList = response.data.products;
        console.log(response);
        console.log(this.productList);
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(err);

      }
    });
  }

  removeProductFromCart(productId: string) {
    this._CartService.removeProductById(productId).subscribe({
      next: (response: any) => {
        this.numOfCartItem = response.numOfCartItems;
        this.totalprice = response.data.totalCartPrice;
        this.productList = response.data.products;
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        console.log(response);

      },
      error: err => {
        console.log(err);
      }

    });
  }
  updateProductCount(productId: string, count: number) {
    this._CartService.updateProductCount(productId, count).subscribe({
      next: (response: any) => {
        this.numOfCartItem = response.numOfCartItems;
        this.totalprice = response.data.totalCartPrice;
        this.productList = response.data.products;
        console.log(response);

      },
      error: err => {
        console.log(err);
      }

    });
  }
  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (response: any) => {
        this.numOfCartItem = 0;
        this.totalprice = 0;
        this.productList = [];
        this.errorMessage = 'not found any product';
        console.log(response);

      },
      error: err => {
        console.log(err);
      }

    });
  }

}

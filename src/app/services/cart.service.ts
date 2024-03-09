import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  numOfCartItems = new BehaviorSubject(0);

  baseUrl: string = 'https://ecommerce.routemisr.com';
  headers = {
    token: localStorage.getItem('userToken') || ''
  };

  constructor(private _HttpClient: HttpClient) {
    this.getLoggedUserCart().subscribe({
      next: (response: any) => {
        this.numOfCartItems.next(response.numOfCartItems);
        console.log(response);

      },
      error: err => {
        return console.log(err);
      },

    });
  }


  addProductToCart(productId: string) {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,
      { productId: productId },
      { headers: this.headers }
    );
  }
  getLoggedUserCart() {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`,
      { headers: this.headers }
    );
  }
  removeProductById(productId: string) {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`,
      { headers: this.headers }
    );
  }
  updateProductCount(productId: string, count: number) {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${productId}`,
      { count: count },
      { headers: this.headers }
    );
  }
  clearCart() {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/`,
      { headers: this.headers }
    );
  }
}

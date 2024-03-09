import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class WishListService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  headers = {
    token: localStorage.getItem('userToken') || ''
  };

  constructor(private _HttpClient: HttpClient) { }

  addProductToWishList(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,
      { productId: productId },
      { headers: this.headers }
    );
  }

  getProductToWishList(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`,
      { headers: this.headers }
    );
  }

  removeProductFromWishList(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${productId}`,
      { headers: this.headers },
    );
  }

}

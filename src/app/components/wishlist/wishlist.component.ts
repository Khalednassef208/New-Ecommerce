import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  productList: Product[] = [];
  wishList: string[] = [];
  constructor(
    private _WishListService: WishListService,
    private _CartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._WishListService.getProductToWishList().subscribe({
      next: (response) => {
        console.log(response);
        this.productList = response.data;
        const newData = response.data.map((item: any) => item._id);
        this.wishList = newData;
      }
    });
  };
  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (response: any) => {
        console.log(response);
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        this.toastr.success('It has been successfully added. 🛺', '',
          {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: 2000
          });
      },
      error: err => {
        console.log(err);

      }
    });
  }

  removeProductFromWishlist(productId: string) {
    this._WishListService.removeProductFromWishList(productId).subscribe({
      next: (response) => {
        console.log(response);

        //1)way 1
        // const newData = response.data.map((item: any) => item._id);
        // this.wishList = newData;
        // this._WishListService.getProductToWishList().subscribe({
        //   next: (response) => {
        //     this.productList = response.data;
        //   }
        // });




        //2)way 2
        this.wishList = response.data;
        const newProductData = this.productList.filter((item: any) => this.wishList.includes(item._id));
        this.productList = newProductData;
      },
      error: (err) => {
        console.log(err);

      }
    });
  }
}

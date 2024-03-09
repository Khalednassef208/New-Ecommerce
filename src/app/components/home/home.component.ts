import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productId: string = '';
  term: string = '';
  // isLoading: boolean = true;
  appear: boolean = false;
  productList: Product[] = [];
  wishList: string[] = [];
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishListService: WishListService
  ) { }
  ngOnInit(): void {


    this.getProduct();

    this._WishListService.getProductToWishList().subscribe({
      next: (response) => {
        console.log(response);
        // this.wishList = response.data;
        const newData = response.data.map((item: any) => item._id);
        this.wishList = newData;
      }

    });
  }

  getProduct() {
    this._ProductService.getAllProducts().subscribe({
      next: response => {
        // this.isLoading = false;
        this.productList = response.data;
        console.log(this.productList);
      },
      error: err => {
        // this.isLoading = false;
        console.log(err);

      }
    });
  }
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
  addProductToWishList(productId: string) {
    this._WishListService.addProductToWishList(productId).subscribe({
      next: (response: any) => {

        console.log(response);
        this.wishList = response.data;
        // this.appear = true;
        // console.log(this.wishList);
        this.toastr.success("It has been successfully added.💖", '',
          {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: 2000
          });
      },
      error: err => {
        console.log(err);
        // this.appear = true;
      }
    });
  }
  removeProductFromWishList(productId: string) {
    this._WishListService.removeProductFromWishList(productId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.wishList = response.data;
        // this.appear = false;
        this.toastr.success("It has been successfully removed.🖤", '',
          {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: 2000
          });
      },
      error: err => {
        console.log(err);
        // this.appear = false;
      }
    });
  }
}

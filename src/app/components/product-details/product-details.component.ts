import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
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
        items: 1
      },
    },
    nav: true
  };
  isLoading: boolean = true;
  productItem: any;
  productId: string = '';
  wishList: string[] = [];

  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishListService: WishListService
  ) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {

      this.productId = params['id'];
    });

    this._ProductService.getProductById(this.productId).subscribe({
      next: response => {
        this.productItem = response.data;
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        console.log(err);
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

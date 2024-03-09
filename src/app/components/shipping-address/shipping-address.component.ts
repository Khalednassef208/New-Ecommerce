import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent {
  cartId: string = '';
  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required]),
  });

  constructor(private _PaymentService: PaymentService, private _ActivatedRoute: ActivatedRoute) { }

  submitShippingAddress(dataForm: FormGroup) {
    console.log(dataForm.value);
    this._ActivatedRoute.params.subscribe(params => {
      this.cartId = params['id'];
      console.log(params);
    });
    this._PaymentService.checkOut(this.cartId, dataForm.value).subscribe({
      next: (response: any) => {
        window.location.href = response.session.url;
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

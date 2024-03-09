import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(
    private _ForgotPasswordService: ForgotPasswordService,
    private _Router: Router
  ) { }


  forgotPass: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });


  forgotPassword(): void {
    let forgotValue = this.forgotPass.value;
    this._ForgotPasswordService.forgotPassword(this.forgotPass).subscribe({
      next: (response) => {
        console.log(response);
        this._Router.navigate(['/resetCode']);
      },
      error: (err) => {
        console.log(err);

      }
    });
  }
}

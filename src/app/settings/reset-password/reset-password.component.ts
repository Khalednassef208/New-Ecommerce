import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPass: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,25}$/)])
  });
  constructor(
    private _ForgotPasswordService: ForgotPasswordService,
    private _Router: Router

  ) { }

  resetPassword() {
    let newpass = this.resetPass.value;
    this._ForgotPasswordService.resetPassword(newpass).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('userToken', response.token);
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err.error.message);

      }
    });
  }
}

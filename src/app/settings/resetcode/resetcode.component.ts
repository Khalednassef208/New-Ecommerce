import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-resetcode',
  templateUrl: './resetcode.component.html',
  styleUrls: ['./resetcode.component.css']
})
export class ResetcodeComponent {

  constructor(
    private _ForgotPasswordService: ForgotPasswordService,
    private _Router: Router
  ) { }

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  });

  resetCode() {
    let resetCodeValue = this.verifyCode.value;
    this._ForgotPasswordService.verifyResetCode(resetCodeValue).subscribe({
      next: (response) => {
        console.log(response);
        this._Router.navigate(['/resetPassword']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}

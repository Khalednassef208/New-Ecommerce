import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  constructor(private _HttpClient: HttpClient) { }

  forgotPassword(email: FormGroup) {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, email);
  }
  verifyResetCode(resetCode: FormGroup) {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, resetCode);
  }
  resetPassword(resetPassword: FormGroup) {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/resetPassword`, resetPassword);
  }
}

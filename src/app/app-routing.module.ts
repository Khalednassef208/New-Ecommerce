import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetPasswordComponent } from './settings/forget-password/forget-password.component';
import { ResetcodeComponent } from './settings/resetcode/resetcode.component';
import { ResetPasswordComponent } from './settings/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: 'forgotPassword', component: ForgetPasswordComponent, title: 'Forgot Password' },
  { path: 'resetCode', component: ResetcodeComponent, title: 'Reset Code' },
  { path: 'resetPassword', component: ResetPasswordComponent, title: 'Reset Password' },
  { path: 'home', canActivate: [authGuard], component: HomeComponent, title: 'home' },
  { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent, title: 'Wish list' },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule)
  },
  { path: 'allorders', canActivate: [authGuard], component: AllordersComponent, title: 'allorders' },
  { path: 'shippingAddress/:id', canActivate: [authGuard], component: ShippingAddressComponent, title: 'shippingAddress' },
  { path: 'proudectdetails/:id', canActivate: [authGuard], component: ProductDetailsComponent, title: 'proudectdetails' },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent, title: 'products' },
  { path: 'categories', canActivate: [authGuard], component: CategoriesComponent, title: 'categories' },
  { path: 'brands', canActivate: [authGuard], component: BrandsComponent, title: 'brands' },
  { path: 'cart', canActivate: [authGuard], component: CartComponent, title: 'cart' },
  { path: '**', component: NotfoundComponent, title: 'notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

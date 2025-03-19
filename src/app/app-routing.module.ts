import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AboutComponent } from './about/about.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },  
  { path: 'sign-in', component: LoginComponent },   
  { path: 'register', component: RegisterComponent },
  { path: 'about-us',component:AboutComponent },
  { path:'product-detail/:id',component:ProductDetailComponent }, 

  { path: 'add-product', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'edit-product/:id', component: ProductFormComponent, canActivate: [authGuard] }, // ✅ Fixes edit-product route

  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

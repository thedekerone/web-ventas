import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/features/auth/login/login.component';
import { SignupComponent } from 'src/app/features/auth/signup/signup.component';
import { PublicGuard } from 'src/app/auth/helpers/public.guards';

const routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PublicGuard],
    data: {
      title: "Noticias"
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [PublicGuard],
    data: {
      title: "Noticias"
    }
  }
];

@NgModule({
  declarations: [
    LoginComponent,SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    LoginComponent,SignupComponent
  ],
  providers : []
})
export class AuthModule {
}
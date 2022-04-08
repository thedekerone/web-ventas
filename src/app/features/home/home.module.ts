import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/features/home/home.component';
import { AuthGuard } from 'src/app/auth/helpers/auth.guards';
import { ProgramComponent } from './program/program.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

const routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Home"
    }
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    ProgramComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    HomeComponent,
    ProgramComponent
  ],
  providers : []
})
export class HomeModule {}
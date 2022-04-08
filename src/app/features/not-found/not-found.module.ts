import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from 'src/app/features/not-found/not-found.component';
import { PublicGuard } from 'src/app/auth/helpers/public.guards';

const routes = [
  {
    path: '',
    component: NotFoundComponent,
    canActivate: [],
    data: {
      title: "No Disponible"
    }
  }
];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    NotFoundComponent
  ],
  providers : []
})
export class NotFoundModule {
}
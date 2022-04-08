import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/helpers/auth.guards';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canActivate: [],
  },
  {
    path: "auth",
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [],
  },
  {
    path: "programs",
    loadChildren: () => import('./features/programs/programs.module').then(m => m.ProgramsModule),
    canActivate: [],
  },
  {
    path: "**",
    loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule),
    canActivate: [],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

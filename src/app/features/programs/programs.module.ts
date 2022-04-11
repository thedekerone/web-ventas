import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LandingPageComponent } from "src/app/features/programs/landing-page/landing-page.component";
import { AuthGuard } from "src/app/auth/helpers/auth.guards";
import { MembershipComponent } from "./membership/membership.component";
import { NgSelect2Module } from "ng-select2";
import { SelectLocalidadesComponent } from "../select-localidades/select-localidades.component";

const routes = [
  {
    path: ":id/membership",
    component: MembershipComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Afiliate",
    },
  },
  {
    path: ":id",
    component: LandingPageComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Programs",
    },
  },
];

@NgModule({
  declarations: [
    LandingPageComponent,
    MembershipComponent,
    SelectLocalidadesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    RouterModule.forChild(routes),
  ],
  exports: [LandingPageComponent, MembershipComponent],
  providers: [],
})
export class ProgramsModule {}

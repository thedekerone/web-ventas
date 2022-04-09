import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { LandingPageComponent } from "src/app/features/programs/landing-page/landing-page.component";
import { AuthGuard } from "src/app/auth/helpers/auth.guards";
import { MembershipComponent } from "./membership/membership.component";
import { NgSelect2Module } from "ng-select2";

const routes = [
  {
    path: "membership",
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
  declarations: [LandingPageComponent, MembershipComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelect2Module,
    RouterModule.forChild(routes),
  ],
  exports: [LandingPageComponent, MembershipComponent],
  providers: [],
})
export class ProgramsModule {}

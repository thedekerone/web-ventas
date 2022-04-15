import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LandingPageComponent } from "src/app/features/programs/landing-page/landing-page.component";
import { AuthGuard } from "src/app/auth/helpers/auth.guards";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MembershipComponent } from "./membership/membership.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SelectLocalidadesComponent } from "../select-localidades/select-localidades.component";
import { InputComponent } from "src/app/layout/form/input/input.component";
import { NgSelect2Module } from "ng-select2";
import { OnlyDateDirective } from "src/app/only-date.directive";
import { NgxMaskModule } from "ngx-mask";

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
    OnlyDateDirective,
    InputComponent,
    SelectLocalidadesComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxMaskModule.forRoot(),

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgSelect2Module,
    RouterModule.forChild(routes),
  ],
  exports: [LandingPageComponent, MembershipComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class ProgramsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from './widgets/widgets.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WidgetsModule
  ],
  exports: [
    WidgetsModule
  ]
})
export class CoreModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoEditPageRoutingModule } from './empleado-edit-routing.module';

import { EmpleadoEditPage } from './empleado-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EmpleadoEditPageRoutingModule
  ],
  declarations: [EmpleadoEditPage]
})
export class EmpleadoEditPageModule {}

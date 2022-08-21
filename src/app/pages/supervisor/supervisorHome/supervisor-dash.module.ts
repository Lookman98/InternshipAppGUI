import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorDashPageRoutingModule } from './supervisor-dash-routing.module';

import { SupervisorDashPage } from './supervisor-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorDashPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SupervisorDashPage]
})
export class SupervisorDashPageModule {}

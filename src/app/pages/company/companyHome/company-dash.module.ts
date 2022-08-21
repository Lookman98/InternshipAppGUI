import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyDashPageRoutingModule } from './company-dash-routing.module';

import { CompanyDashPage } from './company-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyDashPageRoutingModule
  ],
  declarations: [CompanyDashPage]
})
export class CompanyDashPageModule {}

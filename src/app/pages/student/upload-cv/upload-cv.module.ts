import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadCVPageRoutingModule } from './upload-cv-routing.module';

import { UploadCVPage } from './upload-cv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UploadCVPageRoutingModule
  ],
  declarations: [UploadCVPage]
})
export class UploadCVPageModule {}

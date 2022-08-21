import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadCVPage } from './upload-cv.page';

const routes: Routes = [
  {
    path: '',
    component: UploadCVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadCVPageRoutingModule {}

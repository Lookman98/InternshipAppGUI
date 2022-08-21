import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'student-dash',
    loadChildren: () => import('./pages/student/studentHome/student-dash.module').then( m => m.StudentDashPageModule)
  },
  {
    path: 'company-dash',
    loadChildren: () => import('./pages/company/companyHome/company-dash.module').then( m => m.CompanyDashPageModule)
  },
  {
    // path: 'admin-dash/:id',
    path: 'admin-dash',
    loadChildren: () => import('./pages/administrator/adminHome/admin-dash.module').then( m => m.AdminDashPageModule)
  },
  {
    path: 'supervisor-dash',
    loadChildren: () => import('./pages/supervisor/supervisorHome/supervisor-dash.module').then( m => m.SupervisorDashPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

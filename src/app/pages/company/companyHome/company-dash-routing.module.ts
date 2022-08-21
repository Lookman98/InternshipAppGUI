import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyDashPage } from './company-dash.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyDashPage,
    children: [
        {
    path: 'feed',
    loadChildren: () => import('../companyHome/companyNavigationPage/feed/feed.module').then( m => m.FeedPageModule)
        },
        {
    path: 'messages',
    loadChildren: () => import('../companyHome/companyNavigationPage/messages/messages.module').then( m => m.MessagesPageModule)
        },
        {
    path: 'notifications',
    loadChildren: () => import('../companyHome/companyNavigationPage/notifications/notifications.module').then( m => m.NotificationsPageModule)
       },
       {
    path: 'settings',
    loadChildren: () => import('../companyHome/companyNavigationPage/settings/settings.module').then( m => m.SettingsPageModule)
       },
       {
        path: 'add-job',
        loadChildren: () => import('../add-job/add-job.module').then( m => m.AddJobPageModule)
      }
      
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyDashPageRoutingModule {}

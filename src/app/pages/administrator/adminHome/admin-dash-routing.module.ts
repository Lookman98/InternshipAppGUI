import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashPage } from './admin-dash.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashPage,
    children: [

     {
    // path: 'feed/:id',
    path: 'feed',
    loadChildren: () => import('../adminHome/adminNavigationPage/feed/feed.module').then( m => m.FeedPageModule),
     },
     {
    path: 'messages',
    loadChildren: () => import('../adminHome/adminNavigationPage/messages/messages.module').then( m => m.MessagesPageModule)
     },
     {
    path: 'notifications',
    loadChildren: () => import('../adminHome/adminNavigationPage/notifications/notifications.module').then( m => m.NotificationsPageModule)
     },
     {
    path: 'settings',
    loadChildren: () => import('../adminHome/adminNavigationPage/settings/settings.module').then( m => m.SettingsPageModule)
    }
  ]
},
{
  path: 'user-info',
  loadChildren: () => import('./adminNavigationPage/user-info/user-info.module').then( m => m.UserInfoPageModule)
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashPageRoutingModule {}

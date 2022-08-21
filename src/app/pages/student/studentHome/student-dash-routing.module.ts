import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDashPage } from './student-dash.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDashPage,
    children: [
       {
    path: 'feed',
    loadChildren: () => import('../studentHome/studentNavigationPage/feed/feed.module').then(
       m => m.FeedPageModule
       )
       },
       {
    path: 'messages',
    loadChildren: () => import('../studentHome/studentNavigationPage/messages/messages.module').then(
       m => m.MessagesPageModule
       )
       },
       {
    path: 'notifications',
    loadChildren: () => import('../studentHome/studentNavigationPage/notifications/notifications.module').then(
       m => m.NotificationsPageModule
       )
       },
       {
    path: 'settings',
    loadChildren: () => import('../studentHome/studentNavigationPage/settings/settings.module').then( 
      m => m.SettingsPageModule
      )
      },
      {
         path: 'upload-cv',
         loadChildren: () => import('../upload-cv/upload-cv.module').then( m => m.UploadCVPageModule)
       }
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashPageRoutingModule {}

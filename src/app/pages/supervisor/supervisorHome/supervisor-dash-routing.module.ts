import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorDashPage } from './supervisor-dash.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorDashPage,
    children:[
  
    {
    path: 'feed',
    loadChildren: () => import('../supervisorHome/supervisorNavigationPage/feed/feed.module').then( m => m.FeedPageModule)
    },
    {
    path: 'messages',
    loadChildren: () => import('../supervisorHome/supervisorNavigationPage/messages/messages.module').then( m => m.MessagesPageModule)
    },
    {
    path: 'notifications',
    loadChildren: () => import('../supervisorHome/supervisorNavigationPage/notifications/notifications.module').then( m => m.NotificationsPageModule)
    },
    {
    path: 'settings',
    loadChildren: () => import('../supervisorHome/supervisorNavigationPage/settings/settings.module').then( m => m.SettingsPageModule)
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorDashPageRoutingModule {}

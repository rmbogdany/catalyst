import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
	  path: '',
	  redirectTo: '/tabs/calendar',
	  pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
	children: [
		{ path: 'calendar', loadChildren: () => import('../calendar/calendar.module').then( m => m.CalendarPageModule)},
		{ path: 'map', loadChildren: () => import('../map/map.module').then( m => m.MapPageModule)},
		{ path: 'notes', loadChildren: () => import('../notes/notes.module').then( m => m.NotesPageModule)},
		{ path: 'goals', loadChildren: () => import('../goals/goals.module').then( m => m.GoalsPageModule)},
		{ path: 'events', loadChildren: () => import('../events/events.module').then( m => m.EventsPageModule)}
	]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}


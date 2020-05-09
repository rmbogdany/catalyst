import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},
  {
    path: 'new-cal-event-modal',
    loadChildren: () => import('./modals/new-cal-event-modal/new-cal-event-modal.module').then( m => m.NewCalEventModalPageModule)
  },
  {
    path: 'new-event-modal',
    loadChildren: () => import('./modals/new-event-modal/new-event-modal.module').then( m => m.NewEventModalPageModule)
  },
  {
    path: 'edit-event-modal',
    loadChildren: () => import('./modals/edit-event-modal/edit-event-modal.module').then( m => m.EditEventModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCalEventModalPage } from './new-cal-event-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewCalEventModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCalEventModalPageRoutingModule {}

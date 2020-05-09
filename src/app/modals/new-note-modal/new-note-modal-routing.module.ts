import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewNoteModalPage } from './new-note-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewNoteModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewNoteModalPageRoutingModule {}

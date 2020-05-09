import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewNoteModalPageRoutingModule } from './new-note-modal-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewNoteModalPage } from './new-note-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    IonicModule,
    NewNoteModalPageRoutingModule
  ],
  declarations: []
})
export class NewNoteModalPageModule {}


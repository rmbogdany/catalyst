import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EditNoteModalPageRoutingModule } from './edit-note-modal-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditNoteModalPage } from './edit-note-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	ReactiveFormsModule,
    EditNoteModalPageRoutingModule
  ],
  declarations: []
})
export class EditNoteModalPageModule {}

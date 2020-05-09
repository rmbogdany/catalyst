import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotesPageRoutingModule } from './notes-routing.module';
import { NotesPage } from './notes.page';
import { NewNoteModalPage } from '../../modals/new-note-modal/new-note-modal.page';
import { EditNoteModalPage } from '../../modals/edit-note-modal/edit-note-modal.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    IonicModule,
    NotesPageRoutingModule
  ],
  declarations: [NotesPage, NewNoteModalPage, EditNoteModalPage],
  entryComponents: [NewNoteModalPage, EditNoteModalPage]
})
export class NotesPageModule {}

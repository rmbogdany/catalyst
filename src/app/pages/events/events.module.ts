import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EditEventModalPage } from '../../modals/edit-event-modal/edit-event-modal.page';
import { EventsPageRoutingModule } from './events-routing.module';
import { NewEventModalPage } from '../../modals/new-event-modal/new-event-modal.page';
import { EventsPage } from './events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule
  ],
  declarations: [EventsPage, NewEventModalPage, EditEventModalPage],
  entryComponents: [NewEventModalPage, EditEventModalPage]
})
export class EventsPageModule {}

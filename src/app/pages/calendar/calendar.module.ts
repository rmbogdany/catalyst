import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarModule } from 'ion2-calendar';
import { CalendarPage } from './calendar.page';
import { NewCalEventModalPage } from '../../modals/new-cal-event-modal/new-cal-event-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
	CalendarModule
  ],
  declarations: [CalendarPage, NewCalEventModalPage],
  entryComponents: [NewCalEventModalPage]
})
export class CalendarPageModule {}

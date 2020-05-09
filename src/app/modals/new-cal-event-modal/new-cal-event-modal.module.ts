import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCalEventModalPageRoutingModule } from './new-cal-event-modal-routing.module';

import { NewCalEventModalPage } from './new-cal-event-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCalEventModalPageRoutingModule
  ],
  declarations: []
})
export class NewCalEventModalPageModule {}

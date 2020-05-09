import { Component, NgZone, OnInit } from '@angular/core';
import { EventManagerService } from '../../event-manager.service';
import { AlertController, ModalController } from '@ionic/angular';
import { NewEventModalPage } from '../../modals/new-event-modal/new-event-modal.page';
import { EditEventModalPage } from '../../modals/edit-event-modal/edit-event-modal.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
	public events = [];
	
	constructor(public alertController: AlertController, private _ngZone: NgZone, private eventManagerService: EventManagerService, public modalController: ModalController) {

	}

	ngOnInit() {
		this.updateEvents();
	}
	
	ionViewWillEnter() {
		this.updateEvents();
	}
	
	getTodaysEvents(todo){
		return this.eventManagerService.getEvents(todo);
	}
	
	async openModal() {
		//Open modal to add a new event
        const modal = await this.modalController.create({
			component: NewEventModalPage,
			componentProps: {
				category: 'hi'
			},
			backdropDismiss: false
        });
        modal.onWillDismiss().then(dataReturned => {
			this.updateEvents();
        });
        return await modal.present().then(_ => {
			
        });
    }
	
	async openModalDetails(elem) {
		//Open modal to edit event
        const modal = await this.modalController.create({
			component: EditEventModalPage,
			componentProps: {
				idx: elem.currentTarget.id
			},
			backdropDismiss: false
        });
        modal.onWillDismiss().then(dataReturned => {
			this.updateEvents();
        });
        return await modal.present().then(_ => {
			
        });
    }
	
	updateEvents(){
		this.events = this.eventManagerService.getEventTitles();
	}
}
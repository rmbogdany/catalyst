import { Component, NgZone, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventManagerService } from '../../event-manager.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

declare var google;

@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.page.html',
  styleUrls: ['./edit-event-modal.page.scss'],
})
export class EditEventModalPage implements OnInit {
	@Input() public idx: string;
	GoogleAutocomplete: any;
	autocomplete: any;
	autocompleteItems: any;
	public myStartDate: string;
	public myEndDate: string;
	public placeId: string;
	public myLoc: string;
	private beforeNotify = 0;
	private notify = 0;
	private accum = 0;

	constructor(private modalController: ModalController, private localNotifications: LocalNotifications, private _ngZone: NgZone, private eventManagerService: EventManagerService) { 
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
		this.myLoc = '';
		this.placeId = '';
	}

	ngOnInit() {
		//Initializes the given event to be edited
		var evt = this.eventManagerService.getEvent(this.idx);
		(document.getElementById('title') as HTMLInputElement).value = evt['title'];
		(document.getElementById('myLoc') as HTMLInputElement).value = evt['location'][0];
		var check = (document.getElementById('check') as HTMLInputElement);
		if(evt['notify'] == 1){
			check.checked = true;
		}
		this.myLoc = evt['location'][0];
		this.placeId = evt['location'][1];
		this.accum = evt['uniqueID'];
		this.myStartDate = new Date(evt['start_date']).toISOString();
		this.myEndDate = new Date(evt['end_date']).toISOString();
		if(evt['location'][0] != ''){
			this.autocompleteItems = [];
			this.myLoc = evt['location'][0];
			this.placeId = evt['location'][1];
			document.getElementById('search').style.display = 'none';	
		}
	}
	
	changeReminder(elem){
		//Add or change a calendar reminder
		if(!elem.target.checked){
			this.notify = 1;
		}
		else{
			this.notify = 0;
		}
	}
	
	updateSearchResults(){
		//Updates the search results after searching
		if (this.autocomplete.input == '') {
			this.autocompleteItems = [];
			return;
		}
		this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },(predictions, status) => {
			this.autocompleteItems = [];
			this._ngZone.run(() => {
				predictions.forEach((prediction) => {
					this.autocompleteItems.push(prediction);
				});
			});
		});
	}

	selectSearchResult(item){
		//Adds the choosen location to the event
		this.autocompleteItems = [];
		this.myLoc = item.description;
		this.placeId = item.place_id;
		document.getElementById('search').style.display = 'none';
	}
	
	search(){
		document.getElementById('search').style.display = 'block';
	}
	
	async closeModal(){
		await this.modalController.dismiss();
	}
	
	async closeModalDelete(){
		//Closes the edit event modal and deletes event
		this.eventManagerService.deleteEvent(this.idx);
		this.localNotifications.cancel([this.accum]);
		await this.modalController.dismiss();
	}
	
	async closeModalSave(){
		//Closes the edit event modal and saves data
		var loc = (document.getElementById('myLoc') as HTMLInputElement).textContent;
		var start = (document.getElementById('start') as HTMLInputElement).value;
		var end = (document.getElementById('end') as HTMLInputElement).value;
		var title = (document.getElementById('title') as HTMLInputElement).value;
		var date = new Date(start);
		var newStart = new Date(date.getTime() - 1000 * 60 * 30);
		if(this.notify != this.beforeNotify && this.notify == 1){
			this.localNotifications.schedule({
				id: this.accum,
				title: title,
				text: '30 minutes until it starts',
				trigger: {at: newStart},
				led: 'FF0000',
				sound: null
			});
		}
		else if(this.notify != this.beforeNotify && this.notify == 0){
			this.localNotifications.cancel([this.accum]);
		}
		this.eventManagerService.updateEvents(title, start, end, loc, this.placeId, this.idx, this.notify);
		await this.modalController.dismiss();
	}
}
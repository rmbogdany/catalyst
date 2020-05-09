import { Component, NgZone, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventManagerService } from '../../event-manager.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

declare var google;

@Component({
  selector: 'app-new-cal-event-modal',
  templateUrl: './new-cal-event-modal.page.html',
  styleUrls: ['./new-cal-event-modal.page.scss'],
})
export class NewCalEventModalPage implements OnInit {
	@Input() public category: string;
	GoogleAutocomplete: any;
	autocomplete: any;
	autocompleteItems: any;
	public myStartDate: string;
	public myEndDate: string;
	public placeId: string;
	public myLoc: string;
	private notify = 0;
	
	constructor(private modalController: ModalController, private localNotifications: LocalNotifications, private _ngZone: NgZone, private eventManagerService: EventManagerService) {
		this.myStartDate = new Date().toISOString();
		this.myEndDate = new Date().toISOString();
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
		this.myLoc = '';
		this.placeId = '';
	}

	ngOnInit() {
	}

	changeReminder(elem){
		//changes the reminder of the new event
		if(!elem.target.checked){
			this.notify = 1;
		}
		else{
			this.notify = 0;
		}
	}

	updateSearchResults(){
		//Updates the search result
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
		//Saves the choosen search result
		this.autocompleteItems = [];
		this.myLoc = item.description;
		this.placeId = item.place_id;
		document.getElementById('search').style.display = 'none';
	}
	
	search(){
		document.getElementById('search').style.display = 'block';
	}
	
	async closeModal(){
		//Closes modal
		await this.modalController.dismiss(this.category);
	}
	
	async closeModalSave(){
		//Closes modal and saves new calendar event
		var loc = (document.getElementById('myLoc') as HTMLInputElement).textContent;
		var start = (document.getElementById('start') as HTMLInputElement).value;
		var end = (document.getElementById('end') as HTMLInputElement).value;
		var title = (document.getElementById('title') as HTMLInputElement).value;
		var date = new Date(start);
		var newStart = new Date(date.getTime() - 1000 * 60 * 30);
		var idNum = 0;
		idNum = this.eventManagerService.addEvents(title, start, end, loc, this.placeId, this.notify);
		if(this.notify){
			this.localNotifications.schedule({
				id: idNum,
				title: title,
				text: '30 minutes until it starts',
				trigger: {at: newStart},
				led: 'FF0000',
				sound: null
			});
		}
		await this.modalController.dismiss(this.category);
	}
}

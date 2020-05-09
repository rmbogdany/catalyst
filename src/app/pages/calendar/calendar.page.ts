import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { EventManagerService } from '../../event-manager.service';
import { GoalManagerService } from '../../goal-manager.service';
import { NotesManagerService } from '../../notes-manager.service';
import { AlertController, ModalController } from '@ionic/angular';
import { NewCalEventModalPage } from '../../modals/new-cal-event-modal/new-cal-event-modal.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarPage implements OnInit {
	date: string;
	type: 'string';
	currDate: string;
	public events: [string, string][];
	public goals: string[];
	public todoList: string[];
	
	constructor(public alertController: AlertController, private _ngZone: NgZone, private notesManagerService: NotesManagerService, private eventManagerService: EventManagerService, private goalManagerService: GoalManagerService, public modalController: ModalController) { 
		this.currDate = new Date().toDateString();
	}
	
	ngOnInit() {
		this.updateDate();
	}
	
	ionViewWillEnter(){
		this.updateDate();
		document.getElementsByClassName('title')[0].children[1].innerHTML = '&larr;';
		document.getElementsByClassName('title')[0].children[2].innerHTML = '&rarr;';
	}
	
	deleteDailyNote(i){
		//Deletes a daily note
		this.notesManagerService.deleteDailyNote(this.currDate, i);
		this.updateDate();
	}
	
	async addDaily(){
		//Add a daily todo item to a day
		const addEventAlert = await this.alertController.create(
            {
                header: 'Add a Daily Todo',
                message: 'Enter your item',
                inputs: [
                    {
                        type: 'text',
                        name: 'newEventItem',
                        placeholder: 'New Item'
                    }	
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'OK',
                        handler: (inputData) => {
                            let todo;
                            if (inputData.newEventItem) {
                                todo = inputData.newEventItem.trim();
                                if (todo !== '') {
                                    // Why are we wrapping this into NgZone.run function?
                                    this._ngZone.run(() => {
                                        // Use TodoService to add a new item
										this.notesManagerService.addDailyNote(this.currDate, todo);
										this.updateDate();
                                    });
                                } else {
                                    console.log('The input string is empty.');
                                }
                            } else {
                                console.log('The input string is not set.');
                            }
                            return todo;
                        }
                    }
                ]
            });
        await addEventAlert.present();
	}
	
	getGoals(){
		//Changes to the goals page on the calendar
		document.getElementById('eventsCal').style.display = 'none';
		document.getElementById('goalsCal').style.display = 'block';
		document.getElementById('todoCal').style.display = 'none';
		document.getElementById('goalButt').style.borderBottom = "1px solid black";
		document.getElementById('listButt').style.borderBottom = "0px solid black";
	}
	
	getTodo(){
		//Changes to the todo list page on the calendar
		document.getElementById('eventsCal').style.display = 'none';
		document.getElementById('goalsCal').style.display = 'none';
		document.getElementById('todoCal').style.display = 'block';
		document.getElementById('goalButt').style.borderBottom = "0px solid black";
		document.getElementById('listButt').style.borderBottom = "1px solid black";
	}
	
	getEvents(){
		//Changes to the event page on the calendar
		document.getElementById('eventsCal').style.display = 'block';
		document.getElementById('goalsCal').style.display = 'none';
		document.getElementById('todoCal').style.display = 'none';
		document.getElementById('goalButt').style.borderBottom = "0px solid black";
		document.getElementById('listButt').style.borderBottom = "0px solid black";
	}
	
	updateDate(){
		//Updates the date when a new one is selected
		this.todoList = this.notesManagerService.getDailyNotes(this.currDate);
		this.goals = this.goalManagerService.getDailyGoals();
		this.events = this.eventManagerService.getEvents(this.currDate);
		document.getElementById('date1').innerText = this.currDate.split(' ')[2];
		document.getElementById('day').innerText = this.currDate.split(' ')[0];
		if(this.events.length == 0){
			document.getElementById('holder').style.display = "block";
		}
		else{
			document.getElementById('holder').style.display = "none";
		}
	}
	
	onChange($event) {
		//Changes the current date selected on calendar
		this.currDate = $event._d.toDateString();
		this.updateDate();
	}
	
	async openModal() {
		//Opens modal to add a new event
        const modal = await this.modalController.create({
			component: NewCalEventModalPage,
			componentProps: {
				category: 'hi'
			},
			backdropDismiss: false
        });
        modal.onWillDismiss().then(dataReturned => {
			this.updateDate();
        });
        return await modal.present().then(_ => {
			
        });
    }
}
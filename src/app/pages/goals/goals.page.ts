import { Component, NgZone, OnInit } from '@angular/core';
import { GoalManagerService } from '../../goal-manager.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
	public goals: string[];
	public daily: string[];
	public goalCat: string[];
	public goalHolder = {};
	
	constructor( public alertController: AlertController, private _ngZone: NgZone, private goalManagerService: GoalManagerService ) { }

	ngOnInit() {
		this.updateGoals();
	}
	
	getGoalHolder(ex){
		return this.goalHolder[ex];
	}
	
	updateGoals(){
		//Updates the goals
		this.goalCat = this.goalManagerService.getGoalCats();
		for(var i = 0; i < this.goalCat.length; i++){
			this.goalHolder[this.goalCat[i]] = this.goalManagerService.getCustomGoals(this.goalCat[i]);
		}
		this.goals = this.goalManagerService.getGoals();
		this.daily = this.goalManagerService.getDailyGoals();
	}
	
	deleteGoal(idx){
		this.goalManagerService.deleteGoal(idx);
	}
	
	deleteDailyGoal(idx){
		this.goalManagerService.deleteDailyGoal(idx);
	}
	
	deleteGoalCat(i){
		this.goalManagerService.removeGoalCat(i);
	}
	
	deleteCustomGoal(cat, i){
		this.goalManagerService.removeCustomGoal(cat, i);
	}
	
	async addCustomGoal(goal){
		//Add custom goal alert
		const addEventAlert = await this.alertController.create(
            {
                header: 'Add a Goal',
                message: 'Enter your goal',
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
										this.goalManagerService.addCustomGoal(goal, todo);
										this.updateGoals();
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
	
	async addDailyGoal(){
		//add daily goal alert
		const addEventAlert = await this.alertController.create(
            {
                header: 'Add a Daily Goal',
                message: 'Enter your goal',
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
										this.goalManagerService.addDailyGoal(todo);
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
	
	async presentAddNewGoalCat(){
		//Add new goal category alert
		const addEventAlert = await this.alertController.create(
            {
                header: 'Add a Goal Category',
                message: 'Enter your category name',
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
										for (var i = 0; i < this.goalCat.length; i++) {
											if (this.goalCat[i] === todo) {
												alert('This category already exists.');
												return false;
											}
										}
										this.goalManagerService.addGoalCat(todo);
										this.updateGoals();
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
	
	async addGoal(){
		//Add new long term goal alert
		const addEventAlert = await this.alertController.create(
            {
                header: 'Add a Long-term Goal',
                message: 'Enter your goal',
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
										this.goalManagerService.addGoal(todo);
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
  
  	async presentAddNewGoal() {
		//Add new goal alert
        const addEventAlert = await this.alertController.create(
            {
                header: 'Add an Goal',
                message: 'Enter your goal',
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
										this.goalManagerService.addGoal(todo);
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
}
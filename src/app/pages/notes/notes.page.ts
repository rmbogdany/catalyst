import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NotesManagerService } from '../../notes-manager.service';
import { NewNoteModalPage } from '../../modals/new-note-modal/new-note-modal.page';
import { EditNoteModalPage } from '../../modals/edit-note-modal/edit-note-modal.page';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NotesPage implements OnInit {
	public notesCategories: { cat: string; drop: boolean; }[];

	reorderCategoriesIsDisabled = true;
	constructor(public alertController: AlertController, private _ngZone: NgZone, private notesManagerService: NotesManagerService, public modalController: ModalController) { }

	ngOnInit() {
		this.notesCategories = this.notesManagerService.getCategories();
	}
	
	async openModal(cat) {
		//Opens modal to create a new note
        const modal = await this.modalController.create({
			component: NewNoteModalPage,
			componentProps: {
				category: cat
			},
			backdropDismiss: false
        });
        modal.onWillDismiss().then(dataReturned => {
			var cat = dataReturned.data;
			this.openListsNew(cat);
        });
        return await modal.present();
    }
	
	deleteCat(i){
		//Deletes a note category
		this.notesManagerService.deleteCategory(i);
		this.notesCategories = this.notesManagerService.getCategories();
	}
	
	async openModalDetails(elem) {
		//Opens modal to edit a note
		if(elem.srcElement.className.includes('note')){
			const modal = await this.modalController.create({
				component: EditNoteModalPage,
				componentProps: {
					category: elem.currentTarget.id,
					idx: elem.srcElement.className.split(' ')[1]			
				},
				backdropDismiss: false
			});
			modal.onWillDismiss().then(dataReturned => {
				var cat = dataReturned.data;
				this.openListsNew(cat);
			});
			return await modal.present();
		}
    }

	openLists(i) {
		//Opens the notes for a given category
		if(document.getElementById(i).style.display == "none" || document.getElementById(i).style.display == ""){
			document.getElementById(i).style.display = "block";
			document.getElementById(i+'down').style.display = "inline-block";
			document.getElementById(i+'forward').style.display = "none";
			let temp  = document.getElementById(i);
			var notes = this.notesManagerService.getNotes(i);
			var html = '';
			for(var x in notes){
				//Appends the divs to display each note
				html += '<div class="testDivCssClass '+x+' note" id="'+notes[x].title+'" style="border-color:'+notes[x].color+'">';
				html += '<h5 class="note '+x+'">'+notes[x].title+'</h5>';
				if(notes[x].type == 'note'){
					for(var y = 0; y < notes[x].content.length; y++){
						html += '<p class="note '+x+'">'+notes[x].content[y][0]+'</p>';
					}
				}
				else{
					html += '<ul role="listbox" tabindex="0" aria-label="email list">';
					for(var y = 0; y < notes[x].content.length; y++){
						html += '<li class="note '+x+'" tabindex="-1" role="option" aria-checked="false"><input tabindex="-1" id="'+y+'" class="'+notes[x].title+' '+x+' note" onclick="return false;" type="checkbox" ' + notes[x].content[y][1] + '><label class="note '+x+'" for="check1">&nbsp;&nbsp;&nbsp;&nbsp;'+notes[x].content[y][0]+'</label>';
					}
					html += '</ul>';
				}
				html += '</div>';
			}
			html += '';
			temp.innerHTML = html;
		}
		else{
			document.getElementById(i).style.display = "none";
			document.getElementById(i+'forward').style.display = "inline-block";
			document.getElementById(i+'down').style.display = "none";
		}
	}

	openListsNew(i) {
		//After creating a new note opens the notes for a given category
		document.getElementById(i).style.display = "block";
		document.getElementById(i+'down').style.display = "inline-block";
		document.getElementById(i+'forward').style.display = "none";
		let temp  = document.getElementById(i);
		var notes = this.notesManagerService.getNotes(i);
		var html = '';
		for(var x in notes){
			//Appends divs to display notes
			html += '<div class="testDivCssClass '+x+' note" id="'+notes[x].title+'" style="border-color:'+notes[x].color+'">';
				html += '<h5 class="note '+x+'">'+notes[x].title+'</h5>';
			if(notes[x].type == 'note'){
				for(var y = 0; y < notes[x].content.length; y++){
					html += '<p class="note '+x+'">'+notes[x].content[y][0]+'</p>';
				}
			}
			else{
				html += '<ul role="listbox" tabindex="0" aria-label="email list">';
				for(var y = 0; y < notes[x].content.length; y++){
					html += '<li class="note '+x+'" tabindex="-1" role="option" aria-checked="false"><input tabindex="-1" id="'+y+'" class="'+notes[x].title+' '+x+' note" onclick="return false;" type="checkbox" ' + notes[x].content[y][1] + '><label class="note '+x+'" for="check1">&nbsp;&nbsp;&nbsp;&nbsp;'+notes[x].content[y][0]+'</label>';
				}
				html += '</ul>';
			}
			html += '</div>';
		}
		html += '';
		temp.innerHTML = html;
	}
	
	toggleCategoriesReorder() {
		//Allows the categories to reorder
		this.reorderCategoriesIsDisabled = !this.reorderCategoriesIsDisabled;
	}
	
	reorderItems(indexes) {
		//Reorders the categories
		console.log('About to rearrange to-do items');
		console.log(indexes);
		const element = this.notesCategories[indexes.detail.from];
		this.notesCategories.splice(indexes.detail.from, 1);
		this.notesCategories.splice(indexes.detail.to, 0, element);
		indexes.detail.complete();
	}

	async presentAddNewEvent() {
		//Adds a new note alert
        const addEventAlert = await this.alertController.create(
            {
                header: 'Add a Note Category',
                message: 'Enter your category',
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
										for (var i = 0; i < this.notesCategories.length; i++) {
											if (this.notesCategories[i].cat === todo) {
												alert('This category already exists.');
												return false;
											}
										}
										this.notesManagerService.addCategory(todo);
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


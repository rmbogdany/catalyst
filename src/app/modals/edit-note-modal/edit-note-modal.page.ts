import { Component, OnInit, Input, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotesManagerService } from '../../notes-manager.service';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.page.html',
  styleUrls: ['./edit-note-modal.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditNoteModalPage implements OnInit {
	@Input() public category: string;
	@Input() public idx: string;
	
	public myForm: FormGroup;
	private itemCount: number = 1;
	@ViewChildren('items') things: QueryList<any>;
	public first:number;
	public boxes: [string,string][];
	public type: string;
	private myInput: any;
	private color = '#000000';
	
	constructor(private modalController: ModalController, private notesManagerService: NotesManagerService, private formBuilder: FormBuilder) {
		this.myForm = formBuilder.group({

		});	
		this.first = 0;
		this.boxes = [];
	}
	
	ngOnInit() {
		//Initializes the note modal with current note
		var note = this.notesManagerService.getNote(this.category, this.idx);
		this.type = note.type;
		if(note.color != '#000000'){
			document.getElementById(note.color).style.border = "2px solid black";
		}
		this.color = note.color;
		if(note.type == 'list'){
			document.getElementById('list').style.display = 'block';
			var title = (document.getElementById('title') as HTMLInputElement).value = note.title;
			for(var i = 0; i < note.content.length; i++){
				this.itemCount++;
				this.myForm.addControl('item' + this.itemCount, new FormControl(note.content[i][0], Validators.required));
				this.boxes.push(note.content[i]);
			}
		}
		else{
			document.getElementById('note').style.display = 'block';
			var title = (document.getElementById('titleN') as HTMLInputElement).value = note.title;
			this.myInput = note.content[0][0];
		}
	}
	
	changeColor(elem, evt){
		//Changes the notes color
		var dots = document.getElementsByClassName('dot');
		for(var i = 0; i < dots.length; i++){
			(dots[i] as HTMLElement).style.border = '0px solid black';
		}
		evt.currentTarget.style.border = "2px solid black";
		this.color = evt.currentTarget.id;
	}
	
	public ngForCallback() {
		//Initializes the checkboxes in the notes
		if(this.first == 0){
			var b = document.getElementsByClassName('box');
			for( var i = 0; i < b.length; i++){
				if(this.boxes[i][1] == 'checked'){
					(b[i] as HTMLInputElement).checked = true;
				}
			}
		}
		this.first += 1;
	}
	
	async closeModalDelete() {
		//Closes modal and deletes given note
		this.notesManagerService.deleteNote(this.category, this.idx);
		await this.modalController.dismiss(this.category);
	}
	
	async closeModalSave() {
		//Closes modal and saves the given note
		if(this.type == 'list'){
			var boxes = document.getElementsByClassName('box');
			var content = [];
			var i = 0;
			for(var x in this.myForm.controls){
				content.push([this.myForm.controls[x].value, ((boxes[i]as HTMLInputElement).checked)?'checked':''])
				i+=1;
			}
			var title = (document.getElementById('title') as HTMLInputElement).value;
			this.notesManagerService.updateNote(this.category, this.idx, title, content, this.color);
			await this.modalController.dismiss(this.category);
		}
		else{
			var title = (document.getElementById('titleN') as HTMLInputElement).value;
			var content1 = [[this.myInput, '']];
			if(title != ''){
				this.notesManagerService.updateNote(this.category, this.idx, title, content1, this.color);
				await this.modalController.dismiss(this.category);
			}
		}
	}
	
	async closeModal() {
		await this.modalController.dismiss(this.category);
	}
	
	addControl(){
		//Adds a list item 
		this.itemCount++;
		this.myForm.addControl('item' + this.itemCount, new FormControl('', Validators.required));
	}
	
	removeControl(control){
		//Removes a list item
		this.myForm.removeControl(control.key);
	}
}


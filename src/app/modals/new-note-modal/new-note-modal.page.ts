import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotesManagerService } from '../../notes-manager.service';

@Component({
  selector: 'app-new-note-modal',
  templateUrl: './new-note-modal.page.html',
  styleUrls: ['./new-note-modal.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewNoteModalPage implements OnInit {
	@Input() public category: string;
	
	public myForm: FormGroup;
	private itemCount: number = 1;
	private type: string;
	private myInput: any;
	private color = '#000000';
	
	constructor(private modalController: ModalController, private notesManagerService: NotesManagerService, private formBuilder: FormBuilder) {
		this.myForm = formBuilder.group({
			item1: ['', Validators.required]
		});		
		this.type = 'note';
	}
	
	ngOnInit() {
		document.getElementById('note').style.display = "block";
	}
	
	changeToList(){
		//Changes to list type
		document.getElementById('list3').style.display = "block";
		document.getElementById('note').style.display = "none";
		document.getElementById('titleH').innerHTML = "New List";
		this.type = 'list';
	}
	
	changeColor(elem, evt){
		//Changes the color of this note
		var dots = document.getElementsByClassName('dot');
		for(var i = 0; i < dots.length; i++){
			(dots[i] as HTMLElement).style.border = '0px solid black';
		}
		evt.currentTarget.style.border = "2px solid black";
		this.color = evt.currentTarget.id;
	}
	
	changeToNote(){
		//Changes to note type
		document.getElementById('list3').style.display = "none";
		document.getElementById('note').style.display = "block";
		document.getElementById('titleH').innerHTML = "New Note";
		this.type = 'note';
	}
	
	async closeModalSave() {
		//Closes modal and saves the note
		if(this.type == "list"){
			var boxes = document.getElementsByClassName('box');
			var content = [];
			var i = 0;
			for(var x in this.myForm.controls){
				content.push([this.myForm.controls[x].value, ((boxes[i]as HTMLInputElement).checked)?'checked':''])
				i+=1;
			}
			var title = (document.getElementById('titleL') as HTMLInputElement).value;
			if(title != ''){
				this.notesManagerService.addNote(this.category, title, 'list', content, this.color);
				await this.modalController.dismiss(this.category);
			}
		}
		else{
			var title = (document.getElementById('titleN') as HTMLInputElement).value;
			var content1 = [[this.myInput, '']];
			if(title != ''){
				this.notesManagerService.addNote(this.category, title, 'note', content1, this.color);
				await this.modalController.dismiss(this.category);
			}
		}
	}
	
	async closeModal() {
		await this.modalController.dismiss(this.category);
	}
	
	addControl(){
		//Adds list item
		this.itemCount++;
		this.myForm.addControl('item' + this.itemCount, new FormControl('', Validators.required));
	}
	
	removeControl(control){
		//Removes list item
		this.myForm.removeControl(control.key);
	}
}

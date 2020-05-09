import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesManagerService {
	public notesCategories = [{cat: 'School', drop: false}, {cat: 'Work', drop: false}];
	public notes:any = {'School': [{title: 'Homework', type: 'list', color: '#54991E', content: [['2 hours of history', 'checked']]},
							   {title: 'Project', type: 'list', color: '#54991E', content: [['Project 3', ''], ['Lab 5', '']]},
							   {title: 'Labs', type: 'note', color: '#54991E', content: [['Project4', ''], ['Lab 6', '']]}],
					    'Work': [{title: 'Homework', type: 'list', color: '#54991E', content: [['2 hours of history', 'checked']]}]
						};
	public dailyNotes = {"Mon May 04 2020": [ "Grocery Shop", "Study for Final", "Workout" ], 
						 "Tue May 05 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Wed May 06 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Thu May 07 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Fri May 08 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Sat May 09 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Sun May 10 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Mon May 11 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Tue May 12 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Wed May 13 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Thu May 14 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Fri May 15 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Sat May 16 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Sun May 17 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Mon May 18 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Tue May 19 2020": [ "Grocery Shop", "Study for Final", "Workout" ],
						 "Wed May 20 2020": [ "Grocery Shop", "Study for Final", "Workout" ]};
	
	constructor() {

	}
	
	public getDailyNotes(key){
		//Gets the daily notes
		return this.dailyNotes[key];
	}
	
	public addDailyNote(key, item){
		//Adds a daily note
		if(!(key in this.dailyNotes)){
			this.dailyNotes[key] = [item];
		}
		else{
			this.dailyNotes[key].push(item);
		}
	}
	
	public deleteDailyNote(cat, idx){
		//Deletes a daily note
		this.dailyNotes[cat].splice(idx, 1);
	}
	
	public getCategories() {
		//Gets all note categories
		return this.notesCategories;
    }
	
	public deleteNote(cat, idx){
		//Deletes a specific note
		this.notes[cat].splice(idx, 1);
	}
	
	public deleteCategory(cat){
		//Deletes a note category
		var rm = this.notesCategories[cat].cat;
		this.notesCategories.splice(cat, 1);
		delete this.notes.rm;
	}
	
	public addCategory(key: string) {
		//Add a note category
		this.notesCategories.push({cat: key, drop: false})
		this.notes[key] = []
    }
	
	public getNotes(key) {
		//Gets all the notes for a category
		return this.notes[key];
    }
	
	public getNotesTitles(key) {
		//Gets all note categories
		var temp = this.notes[key];
		var arr = [];
		for(var i = 0; i < temp.length; i++){
			arr.push(temp[i].title);
		}
		return arr;
    }
	
	public getNote(key, idx) {
		//Gets a specific note
		return this.notes[key][idx];
    }
	
	public addNote(key, title, type, content, color) {
		//Adds a note
		this.notes[key].push({title: title, type: type, color: color, content: content})
    }
	
	public updateNote(key, idx, title, content, color) {
		//Updates a specific note
		this.notes[key][idx].content = content;
		this.notes[key][idx].title = title;
		this.notes[key][idx].color = color;
    }	
}
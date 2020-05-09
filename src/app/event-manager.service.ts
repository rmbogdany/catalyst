import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {
	public events = {"Mon May 04 2020": [{ 'title': "Final Exam", 'start_date': "2020-05-04T17:48:57.147Z", 'end_date': "2020-05-04T17:48:57.147Z", 'location': [ "Albany, NY, USA", "ChIJS_tPzDQK3okRxCjnoBJjoeE" ], 'uniqueID': 0, 'notify':0}],
					 "Tue May 05 2020": [{ 'title': "Rebecca's Birthday Party", 'start_date': "2020-05-05T17:48:57.147Z", 'end_date': "2020-05-05T17:48:57.147Z", 'location': [ "Rochester, NY, USA", "ChIJU7MUlgWz1okRHuYlQfwfAFo" ], 'uniqueID': 1, 'notify':0}],
					 "Wed May 06 2020": [{ 'title': "Graduation Party", 'start_date': "2020-05-06T17:48:57.147Z", 'end_date': "2020-05-06T17:48:57.147Z", 'location': [ "Rochester Institute of Technology, Lomb Memorial Drive, Rochester, NY, USA", "ChIJVX4UOmBM0YkRAyzi1R6zfr4" ], 'uniqueID': 2, 'notify':0}],
					 "Thu May 07 2020": [{ 'title': "Pickup From Airport", 'start_date': "2020-05-07T17:48:57.147Z", 'end_date': "2020-05-07T17:48:57.147Z", 'location': [ "", "" ], 'uniqueID': 3, 'notify':0}],
					 "Fri May 08 2020": [{ 'title': "Graduation", 'start_date': "2020-05-08T17:48:57.147Z", 'end_date': "2020-05-08T17:48:57.147Z", 'location': [ "", "" ], 'uniqueID': 4, 'notify':0}],
					 "Sat May 09 2020": [{ 'title': "Go Home", 'start_date': "2020-05-09T17:48:57.147Z", 'end_date': "2020-05-09T17:48:57.147Z", 'location': [ "", "" ], 'uniqueID': 5, 'notify':0}],
					 "Sun May 10 2020": [{ 'title': "Lunch out", 'start_date': "2020-05-10T17:48:57.147Z", 'end_date': "2020-05-10T17:48:57.147Z", 'location': [ "", "" ], 'uniqueID': 6, 'notify':0}],
					 "Mon May 11 2020": [{ 'title': "Dad's Birthday", 'start_date': "2020-05-11T17:48:57.147Z", 'end_date': "2020-05-11T17:48:57.147Z", 'location': [ "", "" ], 'uniqueID': 7, 'notify':0}],
					 "Tue May 12 2020": [{ 'title': "Mom's Birthday", 'start_date': "2020-05-12T17:48:57.147Z", 'end_date': "2020-05-12T17:48:57.147Z", 'location': [ "", "" ], 'uniqueID': 8, 'notify':0}],
					 "Wed May 13 2020": [{ 'title': "Move to Boston", 'start_date': "2020-05-12T17:48:57.147Z", 'end_date': "2020-05-12T17:48:57.147Z", 'location': [ "", "" ], 'uniqueID': 9, 'notify':0}]};
	public accum = 10;
	
	constructor() { }
	
	public getEvent(uniqueID){
		//Returns a specific event
		var keys1 = Object.keys(this.events);
		for(var i = 0; i < keys1.length; i++){
			for(var x = 0; x < this.events[keys1[i]].length; x++){
				if(this.events[keys1[i]][x]['uniqueID'] == uniqueID){
					return this.events[keys1[i]][x];
				}
			}
		}
	}
	
	public deleteEvent(uniqueId){
		//Deletes a specific event
		var keys1 = Object.keys(this.events);
		for(var i = 0; i < keys1.length; i++){
			for(var x = 0; x < this.events[keys1[i]].length; x++){
				if(this.events[keys1[i]][x]['uniqueID'] == uniqueId){
					this.events[keys1[i]].splice(x, 1);
				}
			}
		}
	}
	
	public getEvents(key) {
		//Gets all events, formats them to display
		if(key in this.events){
			var temp = [];
			var len = this.events[key].length;
			for(var i = 0; i < len; i++){
				temp.push(this.events[key][i]);
			}
			var finalarr = [];
			for(var i = 0; i < temp.length; i++){
				var d = new Date(temp[i].start_date);
				var timeValue;
				var hours = d.getHours();
				if (hours > 0 && hours <= 12) {
					timeValue= "" + hours;
				} else if (hours > 12) {
				  timeValue= "" + (hours - 12);
				} else if (hours == 0) {
				  timeValue= "12";
				}
				 
				timeValue += (d.getMinutes()<10)? ':0' + d.getMinutes() : ':' + d.getMinutes();
				timeValue += (hours >= 12) ? " P.M." : " A.M.";
				finalarr.push([timeValue, temp[i].title, temp[i]['uniqueID']]);
			}
			return finalarr;
		}
		else{
			return [];
		}
    }
	
	public addEvents(title, start, end, loc, placeId, notify) {
		//Adds a specific event to the list of events
		var key = new Date(start).toDateString();
		if(!(key in this.events)){
			this.events[key] = [{'title': title, 'start_date': start, 'end_date': end, 'location': [loc, placeId], 'uniqueID': this.accum, 'notify':notify}];
		}
		else{
			for(var i = 0; i < this.events[key].length; i++){
				if(new Date(this.events[key][i]['start_date']) > new Date(start)){
					var item = {'title': title, 'start_date': start, 'end_date': end, 'location': [loc, placeId], 'uniqueID': this.accum, 'notify':notify};
					this.events[key].splice( i, 0, item );
					return this.accum - 1;
				}
			}
			this.events[key].push({'title': title, 'start_date': start, 'end_date': end, 'location': [loc, placeId], 'uniqueID': this.accum, 'notify':notify});
		}
		this.accum += 1;
		return this.accum - 1;
    }
	
	public updateEvents(title, start, end, loc, placeId, uniqueID, notify) {
		//Updates a specific event
		var keys = Object.keys(this.events);
		for(var i = 0; i < keys.length; i++){
			for(var x = 0; x < this.events[keys[i]].length; x++){
				if(this.events[keys[i]][x]['uniqueID'] == uniqueID){
					this.events[keys[i]].splice(x, 1);
				}
			}
		}
		var key = new Date(start).toDateString();
		if(!(key in this.events)){
			this.events[key] = [{'title': title, 'start_date': start, 'end_date': end, 'location': [loc, placeId], 'uniqueID': uniqueID, 'notify':notify}];
		}
		else{
			for(var i = 0; i < this.events[key].length; i++){
				if(new Date(this.events[key][i]['start_date']) > new Date(start)){
					var item = {'title': title, 'start_date': start, 'end_date': end, 'location': [loc, placeId], 'uniqueID': uniqueID, 'notify':notify};
					this.events[key].splice( i, 0, item );
					return this.accum - 1;
				}
			}
			this.events[key].push({'title': title, 'start_date': start, 'end_date': end, 'location': [loc, placeId], 'uniqueID': uniqueID, 'notify':notify});
		}
    }
	
	public getEventTitles(){
		//Gets all the event titles
		var keys = Object.keys(this.events);
		var newKeys = [];
		for(let entry of keys){
			newKeys.push(new Date(entry));
		}
		newKeys = newKeys.sort((a, b) => a - b);
		var temp = [];
		var d = new Date();
		d.setHours(0,0,0,0);
		for(let entry of newKeys){
			if(entry >= d){
				if(this.events[entry.toDateString()].length != 0){
					temp.push(entry.toDateString());
				}
			}
		}
		return temp;
	}
	
	public getAllEvents() {
		//Gets all the events
		var temp = [];
		var keys = Object.keys(this.events);
		for(var i = 0, len = keys.length; i < len; i++){
			var objLen = this.events[keys[i]].length;
			for(var x = 0; x < objLen; x++){
				temp.push(this.events[keys[i]][x]);
			}		
		}
		return temp;
    }
}
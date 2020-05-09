import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoalManagerService {
	public goals = ["Save $1000", "Plan Wedding"];
	public daily = ["Drink 8 glass of water","Workout for 30 minutes"];
	public goalCategories = ["Wedding"];
	public customGoals = {"Wedding": ["Save Money"]};
	
	constructor() { }
	
	addGoal(key){
		//Add long term Goal
		this.goals.push(key);
	}
	
	getGoals(){
		//Gets all long term goals
		return this.goals;
	}
	
	deleteGoal(idx){
		//Deletes a specific long term goal
		this.goals.splice(idx, 1);
	}
	
	addDailyGoal(key){
		//Adds a daily goal
		this.daily.push(key);
	}
	
	getDailyGoals(){
		//Gets the Daily Goals
		return this.daily;
	}
	
	deleteDailyGoal(idx){
		//Deletes a daily goal
		this.daily.splice(idx, 1);
	}
	
	getGoalCats(){
		//Returns all the custom goals
		return this.goalCategories;
	}
	
	getCustomGoals(key){
		//Gets specific custom goals
		if(!(key in this.customGoals)){
			return [];
		}
		else{
			return this.customGoals[key];
		}
	}
	
	addGoalCat(key){
		//Adds a custom goal category
		this.goalCategories.push(key);
	}
	
	removeGoalCat(idx){
		//Removes a custom goal category
		this.goalCategories.splice(idx, 1);
	}
	
	addCustomGoal(key, item){
		//Adds a custom goal to the given category
		if(!(key in this.customGoals)){
			this.customGoals[key] = [item];
		}
		else{
			this.customGoals[key].push(item);
		}
	}
	
	removeCustomGoal(key, idx){
		//Removes a specific custom goal
		this.customGoals[key].splice(idx,1);
	}
}
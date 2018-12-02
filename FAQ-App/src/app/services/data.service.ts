import { Injectable } from '@angular/core';
import { Question } from '../models/Question'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  questions:Question[];

  constructor() { 
    // this.questions = [
    //   {
    //     text:'What is your Name ?',
    //     answer:'My name is Sushilkumar.',
    //     hide:true
    //   },
    //   {
    //     text:'What is your Favorite Food ?',
    //     answer:'My favorite food is Biryani.',
    //     hide:true
    //   },
    //   {
    //     text:'What is your Favorite Language ?',
    //     answer:'My favorite language is PHP.',
    //     hide:true
    //   }
    // ];
  }

  getQuestions(){

    if(localStorage.getItem('questions') === null){
      this.questions = [];
    }else{
      this.questions = JSON.parse(localStorage.getItem('questions'));
    }

    return this.questions;
  }

    // Add Questions to Local
  addQuestion(question:Question){
    this.questions.unshift(question);

    // Init Var
    let questions;

    if(localStorage.getItem('questions') === null){
      questions = [];
      // Push new question
      questions.unshift(question);
      // Set new array to Local 
      localStorage.setItem('questions',JSON.stringify(questions));
    }else{
      questions = JSON.parse(localStorage.getItem('questions'));
      // Push new question
      questions.unshift(question);
      // Set new array to Local 
      localStorage.setItem('questions',JSON.stringify(questions));
    }

  }

  removeQuestion(question){
    for(let i = 0; i < this.questions.length; i++){
      if(question == this.questions[i]){
        this.questions.splice(i,1);  
        localStorage.setItem('questions',JSON.stringify(this.questions));
      }
    }
  }
}

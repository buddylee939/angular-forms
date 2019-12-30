import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-max-template',
  templateUrl: './max-template.component.html',
  styleUrls: ['./max-template.component.scss']
})
export class MaxTemplateComponent implements OnInit {
  // this 'views the f form and passes it to the local variable signupform, of type ngform
  // static - True to resolve query results before change detection runs
  // When static is not provided, uses query results to determine the timing of query
  // resolution. If any query results are inside a nested view (such as *ngIf),
  // the query is resolved after change detection runs. Otherwise, it is resolved before
  // change detection runs.
  @ViewChild('f', {static: false}) signupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  constructor() { }

  ngOnInit() {
  }

  // onSubmit() {
  //   console.log(this.signupForm.value);
  // }
  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
}

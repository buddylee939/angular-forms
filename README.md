# ORDER OF TASKS TO DO WHEN CREATING A NEW TEMPLATE FORM

- You'll build this form in small steps:

- Create the Hero model class.
- Create the component that controls the form.
- Create a template with the initial form layout.
- Bind data properties to each form control using the ngModel two-way data-binding syntax.
- Add a name attribute to each form-input control.
- Add custom CSS to provide visual feedback.
- Show and hide validation-error messages.
- Handle form submission with ngSubmit.
- Disable the form’s Submit button until the form is valid.

# FROM THE ANGULAR WEBSITE TUTORIAL - TEMPLATE FORMS

- https://angular.io/guide/forms
- ng generate class Hero
- ng g c heroes
- ng g cl Hero
- update hero.ts


```
export class Hero {

  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) {  }

}
```

- ng generate component HeroForm
- update hero-form.comp.ts

```
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}

```

- update hero.comp.html

```
<div class="container">
  <h1>Hero Form</h1>
  <form>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" required>
    </div>

    <div class="form-group">
      <label for="alterEgo">Alter Ego</label>
      <input type="text" class="form-control" id="alterEgo">
    </div>
    <div class="form-group">
      <label for="power">Hero Power</label>
      <select class="form-control" id="power" required>
        <option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">Submit</button>

  </form>
</div>

```

- UPDATE THE FORM WITH 2 Way Binding (the diagnostic displays the data)

```
<div class="container">
  <h1>Hero Form</h1>
  <form #heroForm="ngForm">
    {{diagnostic}}
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name"
             required
             [(ngModel)]="model.name" name="name">
    </div>

    <div class="form-group">
      <label for="alterEgo">Alter Ego</label>
      <input type="text"  class="form-control" id="alterEgo"
             [(ngModel)]="model.alterEgo" name="alterEgo">
    </div>

    <div class="form-group">
      <label for="power">Hero Power</label>
      <select class="form-control"  id="power"
              required
              [(ngModel)]="model.power" name="power">
        <option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">Submit</button>

  </form>
</div>
```

- Track control state and validity with ngModel
- to see the current classes set on the input, update the name input field with a #spy variable

```
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name"
             required
             [(ngModel)]="model.name" name="name" #spy>
             <br>TODO: remove this: {{spy.className}}
    </div>
```

- update hero-form.comp.scss to update with errors

```
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```

- displaying the error message when the input isn't valid

```
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name"
             required
             [(ngModel)]="model.name" name="name"
             #name="ngModel" #spy>
             <br>TODO: remove this: {{spy.className}}
      <div [hidden]="name.valid || name.pristine"
           class="alert alert-danger">
        Name is required
      </div>
            </div>
```

- update the submit button

```
<button type="button" class="btn btn-default" (click)="newHero()">New Hero</button>
```

- add to the hero-form.comp.ts

```
newHero() {
  this.model = new Hero(42, '', '');
}
```

- refresh and add a new hero, the form emptys and the validation appears
- to update all the validation fields, we need the form reset

```
<button type="button" class="btn btn-default" (click)="newHero(); heroForm.reset()">New Hero</button>
```

- update the form, to submit the form

```
<form (ngSubmit)="onSubmit()" #heroForm="ngForm">
```

- update the button fi form is invallid

```
<button type="submit" class="btn btn-success" [disabled]="!heroForm.form.valid">Submit</button>
```

- hiding the form when submitted
- add a div around the form

```
<div [hidden]="submitted">
  <h1>Hero Form</h1>
  <form (ngSubmit)="onSubmit()" #heroForm="ngForm">

     <!-- ... all of the form ... -->

  </form>
</div>
```

- add a div below the 'hidden' form div, to display once the form has been submitted

```
<div [hidden]="!submitted">
  <h2>You submitted the following:</h2>
  <div class="row">
    <div class="col-xs-3">Name</div>
    <div class="col-xs-9">{{ model.name }}</div>
  </div>
  <div class="row">
    <div class="col-xs-3">Alter Ego</div>
    <div class="col-xs-9">{{ model.alterEgo }}</div>
  </div>
  <div class="row">
    <div class="col-xs-3">Power</div>
    <div class="col-xs-9">{{ model.power }}</div>
  </div>
  <br>
  <button class="btn btn-primary" (click)="submitted=false">Edit</button>
</div>
```

## END OF ANGULAR SITE - TEMPLATE FORMS

# ANGULAR FORMS TUTORIALS - YOUTUBE

## TEMPLATE DRIVEN FORMS - TDF

- ng new angular-forms
- using bootstrap 4, 
- update index.html with

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularForms</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
  <app-root></app-root>
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
</html>

```

- create ng g c shared/navbar
- update navbar.html with

```
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>

```

- add: forms module to app.module.ts

```
import { FormsModule } from '@angular/forms';
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
```

- create: ng g c components/tdf
- update tdf.comp.ts

```
export class TdfComponent implements OnInit {
  topics = ['Angular', 'React', 'Vue'];

  constructor() { }

  ngOnInit() {
  }

}
```

- update tdf.comp.html

```
<div class="container-fluid">
  <h1>Bootcamp Enrollment Form</h1>
  <form #userForm="ngForm" >

    {{ userForm.value | json }}

    <div ngModelGroup="address">
      <div class="form-group">
        <label for="">Street</label>
        <input type="text" class="form-control" name="street" ngModel>
      </div>
      <div class="form-group">
        <label for="">City</label>
        <input type="text" class="form-control" name="city" ngModel>
      </div>
      <div class="form-group">
        <label for="">State</label>
        <input type="text" class="form-control" name="state" ngModel>
      </div>
      <div class="form-group">
        <label for="">Postal Code</label>
        <input type="text" class="form-control" name="postalCode" ngModel>
      </div>
    </div>

    <div class="form-group">
      <label for="">Name</label>
      <input type="text" class="form-control" ngModel name="username">
    </div>
    <div class="form-group">
      <label for="">Email</label>
      <input type="email" class="form-control" ngModel name="email">
    </div>
    <div class="form-group">
      <label for="">Phone</label>
      <input type="tel" class="form-control" ngModel name="phone">
    </div>
    <div class="form-group">
      <select  class="custom-select" ngModel name="topic">
        <option selected>I am interested in</option>
        <option *ngFor="let topic of topics">{{ topic }}</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="">Time Preference</label>
      <div class="form-check">
        <input type="radio" class="form-check-input" name="timePreference" value="morning" ngModel>
        <label for="" class="form-check-label">Morning (9AM - 12PM)</label>
      </div>
      <div class="form-check">
        <input type="radio" class="form-check-input" name="timePreference" value="evening" ngModel>
        <label for="" class="form-check-label">Evening (5PM - 8PM)</label>
      </div>
    </div>
    <div class="form-check mb-3">
      <input type="checkbox" class="form-check-input" ngModel name="subscribe">
      <label for="" class="form-check-label">
        Send me promotional offers
      </label>
    </div>
    <button class="btn btn-primary" type="submit">Submit Form</button>
  </form>
</div>

```

- BINDING THE FORM TO A DATA MODEL
- in terminal: ng g cl User
- update user.ts

```
export class User {
  constructor(
    public name: string,
    public email: string,
    public phone: number,
    public topic: string,
    public timePreference: string,
    public subscribe: boolean
  ) {}
}

for car class I did:

export class Car {
  carName: string;
  engine: string;
  // Constructor
  // (accepts a value so you can initialize engine)
  constructor(
    carName: string,
    engine: string) {
      this.carName = carName;
      this.engine = engine;
  }
}
```

- update tdf.comp.ts

```
  userModel = new User(
    'Rob',
    'rob@example.com',
    5555555555,
    '',
    'morning',
    true
  );
```

- update the tdf.comp.html to use the data binding

```
<div class="container-fluid">
  <h1>Bootcamp Enrollment Form</h1>
  <form #userForm="ngForm" >

    {{ userForm.value | json }}
    <hr>
    {{ userModel | json }}
    <hr>
    <div ngModelGroup="address">
      <div class="form-group">
        <label for="">Street</label>
        <input type="text" class="form-control" name="street" ngModel>
      </div>
      <div class="form-group">
        <label for="">City</label>
        <input type="text" class="form-control" name="city" ngModel>
      </div>
      <div class="form-group">
        <label for="">State</label>
        <input type="text" class="form-control" name="state" ngModel>
      </div>
      <div class="form-group">
        <label for="">Postal Code</label>
        <input type="text" class="form-control" name="postalCode" ngModel>
      </div>
    </div>

    <div class="form-group">
      <label for="">Name</label>
      <input type="text" class="form-control" [ngModel]="userModel.name" name="username">
    </div>
    <div class="form-group">
      <label for="">Email</label>
      <input type="email" class="form-control" [ngModel]="userModel.email" name="email">
    </div>
    <div class="form-group">
      <label for="">Phone</label>
      <input type="tel" class="form-control" [ngModel]="userModel.phone" name="phone">
    </div>
    <div class="form-group">
      <select  class="custom-select" [ngModel]="userModel.topic" name="topic">
        <option value="">I am interested in</option>
        <option *ngFor="let topic of topics">{{ topic }}</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="">Time Preference</label>
      <div class="form-check">
        <input type="radio" class="form-check-input" name="timePreference" value="morning" [ngModel]="userModel.timePreference">
        <label for="" class="form-check-label">Morning (9AM - 12PM)</label>
      </div>
      <div class="form-check">
        <input type="radio" class="form-check-input" name="timePreference" value="evening" [ngModel]="userModel.timePreference">
        <label for="" class="form-check-label">Evening (5PM - 8PM)</label>
      </div>
    </div>
    <div class="form-check mb-3">
      <input type="checkbox" class="form-check-input" [ngModel]="userModel.subscribe" name="subscribe">
      <label for="" class="form-check-label">
        Send me promotional offers
      </label>
    </div>
    <button class="btn btn-primary" type="submit">Submit Form</button>
  </form>
</div>

```

- but that is not 2 way binding, to do 2 way we need to use the [(ngModel)] option
- update the tdf.comp.html form

```
<div class="container-fluid">
  <h1>Bootcamp Enrollment Form</h1>
  <form #userForm="ngForm" >

    {{ userForm.value | json }}
    <hr>
    {{ userModel | json }}
    <hr>
    <div ngModelGroup="address">
      <div class="form-group">
        <label for="">Street</label>
        <input type="text" class="form-control" name="street" ngModel>
      </div>
      <div class="form-group">
        <label for="">City</label>
        <input type="text" class="form-control" name="city" ngModel>
      </div>
      <div class="form-group">
        <label for="">State</label>
        <input type="text" class="form-control" name="state" ngModel>
      </div>
      <div class="form-group">
        <label for="">Postal Code</label>
        <input type="text" class="form-control" name="postalCode" ngModel>
      </div>
    </div>

    <div class="form-group">
      <label for="">Name</label>
      <input type="text" class="form-control" [(ngModel)]="userModel.name" name="username">
    </div>
    <div class="form-group">
      <label for="">Email</label>
      <input type="email" class="form-control" [(ngModel)]="userModel.email" name="email">
    </div>
    <div class="form-group">
      <label for="">Phone</label>
      <input type="tel" class="form-control" [(ngModel)]="userModel.phone" name="phone">
    </div>
    <div class="form-group">
      <select  class="custom-select" [(ngModel)]="userModel.topic" name="topic">
        <option value="">I am interested in</option>
        <option *ngFor="let topic of topics">{{ topic }}</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="">Time Preference</label>
      <div class="form-check">
        <input type="radio" class="form-check-input" name="timePreference" value="morning" [(ngModel)]="userModel.timePreference">
        <label for="" class="form-check-label">Morning (9AM - 12PM)</label>
      </div>
      <div class="form-check">
        <input type="radio" class="form-check-input" name="timePreference" value="evening" [(ngModel)]="userModel.timePreference">
        <label for="" class="form-check-label">Evening (5PM - 8PM)</label>
      </div>
    </div>
    <div class="form-check mb-3">
      <input type="checkbox" class="form-check-input" [(ngModel)]="userModel.subscribe" name="subscribe">
      <label for="" class="form-check-label">
        Send me promotional offers
      </label>
    </div>
    <button class="btn btn-primary" type="submit">Submit Form</button>
  </form>
</div>

```

### TRACKSING STATE AND VALIDITY

- THE STATES OF THE FORM INPUTS

```
the control has been visited: ng-touched ng-untouched
the controls value has changed: ng-dirty ng-pristine
the controls value is valid: ng-valid ng-invalid
```

- update the name field in the form, to see these 'states' in action

```
    <div class="form-group">
      <label for="">Name</label>
      <input #name required type="text" class="form-control" [(ngModel)]="userModel.name" name="username">
    {{ name.className }}
    </div>    
```

- to have accesss to 'name.touched' we need to do #name="ngModel"

```
    <div class="form-group">
      <label for="">Name</label>
      <input #name="ngModel" required type="text" class="form-control" [(ngModel)]="userModel.name" name="username">
      <!-- {{ name.className }} -->
      {{ name.touched }}
    </div>
```

### VALIDATION AND VISUAL FEEDBACK

- update the name field in the form with the is-invalid class, while testing if the input field is valid or not

```
    <div class="form-group">
      <label for="">Name</label>
      <input [class.is-invalid]="name.invalid && name.touched" #name="ngModel" required type="text" class="form-control" [(ngModel)]="userModel.name" name="username">
      <!-- {{ name.className }} -->
      {{ name.touched }}
    </div>
```

- refresh the page, click on the input field and delete the name, it should turn red, the name.touched, is so when the form first loads, if the fields are empty they don't display red for being 'invalid'
- ADDING A SIMPLE VALIDATION TO A PHONE NUMBER FIELD
- update the phone input in the form

```
    <div class="form-group">
      <label for="">Phone</label>
      <input #phone="ngModel" pattern="^\d{10}$" [class.is-invalid]="phone.invalid && phone.touched" type="tel" class="form-control" [(ngModel)]="userModel.phone" name="phone">
    </div>
```

- DISPLAYING ERROR MESSAGES SO THAT THE USER KNOWS WHAT TO CORRECT
- displaying with the class
- update the phone field with:

```
    <div class="form-group">
      <label for="">Phone</label>
      <input #phone="ngModel" required pattern="^\d{10}$" [class.is-invalid]="phone.invalid && phone.touched" type="tel" class="form-control" [(ngModel)]="userModel.phone" name="phone">
      <small class="text-danger" [class.d-none]="phone.valid || phone.untouched">Phone number is required and must be 10 digits.</small>
    </div>
```

- using ngIf based on the error to display the proper message
- update the form field

```
    <div class="form-group">
      <label for="">Phone</label>
      <input #phone="ngModel" required pattern="^\d{10}$" [class.is-invalid]="phone.invalid && phone.touched" type="tel" class="form-control" [(ngModel)]="userModel.phone" name="phone">
      <!-- <small class="text-danger" [class.d-none]="phone.valid || phone.untouched">Phone number is required and must be 10 digits.</small> -->
      <div *ngIf="phone.errors && (phone.invalid || phone.touched)">
        <small class="text-danger" *ngIf="phone.errors.required">Phone number is required</small>
        <small class="text-danger" *ngIf="phone.errors.pattern">Phone number must be 10 digits</small>
      </div>
    </div>
```

- VALIDATION FOR SELECT CONTROLS
- update the select in the form

```
    <div class="form-group">
      <select required #topic="ngModel" [class.is-invalid]="topic.invalid && topic.touched" class="custom-select" [(ngModel)]="userModel.topic" name="topic">
        <option value="">I am interested in</option>
        <option *ngFor="let topic of topics">{{ topic }}</option>
      </select>
      <small class="text-danger" [class.d-none]="topic.valid || topic.untouched">Please chose a topic</small>
    </div>
```

- this works because the value is set to '', and in the .ts file the value is set to '', an empty string, but if we do this, when the info comes from an api it might be set to 'default', so if we set the values to 'default' it will not work, so we need to create a custom validation
- update the user in the .ts file

```
  userModel = new User(
    'Rob',
    'rob@example.com',
    5555555555,
    'default',
    'morning',
    true
  );
```

- and the select in the form

```
<option value="default">I am interested in</option>
```

- update tdf.comp.ts

```
export class TdfComponent implements OnInit {
  topics = ['Angular', 'React', 'Vue'];
  topicHasError = true;

  userModel = new User(
    'Rob',
    'rob@example.com',
    5555555555,
    'default',
    'morning',
    true
  );

  constructor() { }

  ngOnInit() {
  }

  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

}
```

- update the select in the form

```
    <div class="form-group">
      <select (blur)="validateTopic(topic.value)" (change)="validateTopic(topic.value)" #topic="ngModel" [class.is-invalid]="topicHasError && topic.touched" class="custom-select" [(ngModel)]="userModel.topic" name="topic">
        <option value="default">I am interested in</option>
        <option *ngFor="let topic of topics">{{ topic }}</option>
      </select>
      <small class="text-danger" [class.d-none]="!topicHasError || topic.untouched">Please chose a topic</small>
    </div>
```

- FORM VALIDATION, disabling the submit button unless form is valid

```
    <button [disabled]="userForm.form.invalid || topicHasError" class="btn btn-primary" type="submit" >Submit Form</button>
```

- SUBMIT FORM DATA to EXPRESS
- update the form in tdf.comp.html

```
<form #userForm="ngForm" novalidate (ngSubmit)="onSubmit()">
```

- and update tdf.comp.ts

```
  onSubmit() {
    console.log(this.userModel);
  }
```

- refresh and test, it should send to console the form
- to send using a service
- in terminal: ng g s enrollment
- update enrollment.service.ts

```
import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  API_URL = 'http://localhost:3000/enroll';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  enroll(user: User) {
    console.log('This is in service ' + user);
    return this.http.post<any>(this.API_URL, user, this.httpOptions);
  }
}

```

- update app.module.ts

```
import { HttpClientModule } from '@angular/common/http';
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
```

- update tdf.comp.ts

```
import { EnrollmentService } from './../../enrollment.service';
import { User } from './../../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tdf',
  templateUrl: './tdf.component.html',
  styleUrls: ['./tdf.component.scss']
})
export class TdfComponent implements OnInit {
  topics = ['Angular', 'React', 'Vue'];
  topicHasError = true;

  userModel = new User(
    'Rob',
    'rob@example.com',
    5555555555,
    'default',
    'morning',
    true
  );

  constructor(
    private enrollService: EnrollmentService
  ) { }

  ngOnInit() {
  }

  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit() {
    // console.log(this.userModel);
    this.enrollService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success', data),
        error => console.error('Error', error)
      );
  }

}

```

- in terminal: mkdir backend
- express angular-forms
- npm install --save body-parser cors
- npm install --save-dev nodemon
- update app.js

```
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

```

- update routes/index.js

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/enroll', function(req, res, next) {
  console.log(req.body);
  res.send({'Status':'User Created'});
});
module.exports = router;
```

- refresh angular and submit the form
- in the express console we should see

```
OPTIONS /enroll 204 0.272 ms - 0
{ name: 'Pep',
  email: 'pep@example.com',
  phone: '7865548617',
  topic: 'Angular',
  timePreference: 'evening',
  subscribe: false }
POST /enroll 200 1.315 ms - 25
```

- HIDING THE FORM AFTER SUBMISSION
- update tdf.comp.ts with the 'submitted' variable

```
export class TdfComponent implements OnInit {
  topics = ['Angular', 'React', 'Vue'];
  topicHasError = true;
  submitted = false;

  userModel = new User(
    'Rob',
    'rob@example.com',
    5555555555,
    'default',
    'morning',
    true
  );

  constructor(
    private enrollService: EnrollmentService
  ) { }

  ngOnInit() {
  }

  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit() {
    // console.log(this.userModel);
    this.submitted = true;
    this.enrollService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success', data),
        error => console.error('Error', error)
      );
  }

}
```

- update tdf.comp.html

```
  <h1>Bootcamp Enrollment Form</h1>
  <div class="alert alert-success" *ngIf="submitted">
    <p>User Created. Thanks!!!</p>
  </div>
  <form #userForm="ngForm" *ngIf="!submitted" novalidate (ngSubmit)="onSubmit()">
```

- ERROR HANDLING
- update enrollment.service with catch and throw errors

```
import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  API_URL = 'http://localhost:3000/enroll';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  enroll(user: User) {
    console.log('This is in service ' + user);
    return this.http.post<any>(this.API_URL, user, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
```

- update tdf.comp.ts to receive the error

```
  topics = ['Angular', 'React', 'Vue'];
  topicHasError = true;
  submitted = false;
  errorMsg = '';

  onSubmit() {
    // console.log(this.userModel);
    this.submitted = true;
    this.enrollService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success', data),
        error => this.errorMsg = error.statusText
      );
  }
```

- update tdf.comp.html to display the error

```
<div class="container-fluid mb-5">
  <h1>Bootcamp Enrollment Form</h1>
  <div class="alert alert-danger" *ngIf="errorMsg">
    {{ errorMsg }}
  </div>
```

- update the express server response

```
router.post('/enroll', function(req, res, next) {
  console.log(req.body);
  res.status(401);
  res.send({'Status':'User Created'});
});
module
```

<hr>

# REACTIVE FORMS

## FROM YOUTUBE ANGULAR FORMS - CODEVOLUTION

- notes on reactive forms

```
code and the logic resides in the component class
no two way binding
well suited for complex scenarios
dynamic form fields - like adding extra phone numbers
custom validation - like for passwords
dynamic validation - like if user wants to subscribe then the email field appears
unit test 
reactive forms require more code and a bit more complex
```

- in terminal: ng g c components/reactive
- add the route to app-routing.module

```
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cars' },
  { path: 'cars', component: CarsListComponent },
  { path: 'car/new', component: CarNewComponent },
  { path: 'tdf', component: TdfComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: 'hero', component: HeroFormComponent },
];
```

- add the link to the navbar


```
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" routerLink="/">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" routerLink="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/tdf">Template Forms</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/reactive">Reactive Forms</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/cars">Cars</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/hero">Hero</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
```

- in reactive.comp.html create the basic form

```
<div class="container-fluid">
  <h2>Registration Form</h2>
  <form action="">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" name="" id="username" class="form-control">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="" class="form-control">
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" name="" class="form-control">
    </div>
    <button class="btn btn-primary" type="submit">Register</button>
  </form>
</div>
```

- update app.module.ts

```
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
```

- IN REACTIVE THE 'FORM GROUP' is the whole form and the 'FORM CONTROL' is each individual field
- ADD THE FORM GROUP AND FORM CONTROLS TO THE .TS and the .HTML
- update reactive.comp.ts file

```
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {
  registrationForm = new FormGroup({
    userName: new FormControl('Pep'),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  constructor() { }

  ngOnInit() {
  }

}
```

- update reactive.comp.html

```
<div class="container-fluid">
  <h2>Registration Form</h2>
  <form [formGroup]="registrationForm">
    <div class="form-group">
      <label for="username">Username</label>
      <input
        formControlName="userName"
        type="text"
        name=""
        id="username"
        class="form-control">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        formControlName="password"
        type="password"
        id="password"
        name=""
        class="form-control">
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        formControlName="confirmPassword"
        type="password"
        id="confirmPassword"
        name=""
        class="form-control">
    </div>
    <button class="btn btn-primary" type="submit">Register</button>
  </form>
  {{ registrationForm.value | json }}
</div>
```

- ADDING AN ADDRESS FORM GROUP TO THE REGISTRATION FORM GROUP
- update the reactive.comp.html

```
<div class="container-fluid">
  <h2>Registration Form</h2>
  {{ registrationForm.value | json }}
  <form [formGroup]="registrationForm">
    <div class="form-group">
      <label for="username">Username</label>
      <input
        formControlName="userName"
        type="text"
        name=""
        id="username"
        class="form-control">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        formControlName="password"
        type="password"
        id="password"
        name=""
        class="form-control">
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        formControlName="confirmPassword"
        type="password"
        id="confirmPassword"
        name=""
        class="form-control">
    </div>
    <div formGroupName="address">
      <div class="form-group">
        <label for="city">City</label>
        <input
          formControlName="city"
          type="text"
          class="form-control"
          id="city">
      </div>
      <div class="form-group">
        <label for="state">State</label>
        <input
          formControlName="state"
          type="text"
          class="form-control"
          id="state">
      </div>
      <div class="form-group">
        <label for="postalCode">Postal Code</label>
        <input
          formControlName="postalCode"
          type="text"
          class="form-control"
          id="postalCode">
      </div>
    </div>
    <button class="btn btn-primary" type="submit">Register</button>
  </form>

</div>

```

- update reactive.comp.ts

```
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {
  registrationForm = new FormGroup({
    userName: new FormControl('Pep'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  });
  constructor() { }

  ngOnInit() {
  }

}
```

- ADDING CONTROL VALUES, FORM API CALLS
- add a button to the form, below the register submit

```
    <button
      (click)="loadApiData()"
      class="btn btn-secondary ml-2"
      type="button">Load API Data</button>
```

- update reactive.comp.ts and create the loadApiData method

```
  loadApiData() {
    this.registrationForm.setValue({
      userName: 'Bruce',
      password: 'asdf',
      confirmPassword: 'asdf',
      address: {
        city: 'Miami',
        state: 'FL',
        postalCode: '33123'
      }
    });
  }
```

- click the button and it should load the data using the 'setValue' method
- to populate all except the address fields, update the loadApiData method in the reactive.comp.ts to use a 'patchValue' method, because the 'setValue' method requires all the fields that the original from group has

```

  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'asdf',
      confirmPassword: 'asdf'
    });
  }
```

- USING FORM BUILDERS
- how to refactor the code to a form builder
- update the code in reactive.comp.ts

```
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {
  constructor(
    private fb: FormBuilder
    ) { }

  registrationForm = this.fb.group({
    userName: ['Pep'],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });

  ngOnInit() {
  }

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Pep'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  // loadApiData() {
  //   this.registrationForm.setValue({
  //     userName: 'Bruce',
  //     password: 'asdf',
  //     confirmPassword: 'asdf',
  //     address: {
  //       city: 'Miami',
  //       state: 'FL',
  //       postalCode: '33123'
  //     }
  //   });
  // }

  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'asdf',
      confirmPassword: 'asdf'
    });
  }

}
```

- ADDING VALIDATION
- reactive uses the same STATE and VALIDITY as in template forms
- in reactive forms, the validation is done in the component class instead of the templates(HTML)
- 3 steps:

```
1) apply the validation rule to a form control
2) provide visual feedback for the validation
3) display the appropriate error message for the validation
```

- 1) APPLYING THE VALIDATION
- update reactive.comp.ts username with validators

```
  registrationForm = this.fb.group({
    userName: ['Pep', Validators.required],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });
```

- 2) PROVIDE VISUAL FEEDBACK
- update reactive.comp.html name input to test for the validity

```
      <input
        [class.is-invalid]="registrationForm.get('userName').invalid && registrationForm.get('userName').touched"
        formControlName="userName"
        type="text"
        name=""
        id="username"
        class="form-control">
```

- refresh and erase the name and leave the input box, it should turn red
- 3) DISPLAY ERROR MESSAGES
- update the div holding the name input in the reactive.comp.html

```
    <div class="form-group">
      <label for="username">Username</label>
      <input
        [class.is-invalid]="registrationForm.get('userName').invalid && registrationForm.get('userName').touched"
        formControlName="userName"
        type="text"
        name=""
        id="username"
        class="form-control">
      <small
        [class.d-none]="registrationForm.get('userName').valid ||
                         registrationForm.get('userName').untouched"
        class="text-danger">Username is required.</small>
    </div>
```

- to add more than 1 validator to a form control
- update reactive.comp.ts username

```
  registrationForm = this.fb.group({
    userName: ['Pep', [Validators.required, Validators.minLength(3)]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });
```

- update reactive.comp.html

```
    <div class="form-group">
      <label for="username">Username</label>
      <input
        [class.is-invalid]="registrationForm.get('userName').invalid && registrationForm.get('userName').touched"
        formControlName="userName"
        type="text"
        name=""
        id="username"
        class="form-control">
      <div *ngIf="registrationForm.get('userName').invalid &&
                   registrationForm.get('userName').touched">
          <small
            *ngIf="registrationForm.get('userName').errors?.required"
            class="text-danger">Username is required</small>
          <small
            *ngIf="registrationForm.get('userName').errors?.minlength"
            class="text-danger">Username must be at least 3 characters</small>
      </div>
    </div>
```

- currently 'registrationForm.get...' is being used a lot, we can create a getter to make the code simpler
- in reactive.comp.ts add the username getter

```
export class ReactiveComponent implements OnInit {

  get userName() {
    return this.registrationForm.get('userName');
  }

  constructor(
    private fb: FormBuilder
    ) { }
```

- and update reactive.comp.html

```
    <div class="form-group">
      <label for="username">Username</label>
      <input
        [class.is-invalid]="userName.invalid &&
                            userName.touched"
        formControlName="userName"
        type="text"
        name=""
        id="username"
        class="form-control">
      <div *ngIf="userName.invalid &&
                   userName.touched">
          <small
            *ngIf="userName.errors?.required"
            class="text-danger">Username is required</small>
          <small
            *ngIf="userName.errors?.minlength"
            class="text-danger">Username must be at least 3 characters</small>
      </div>
    </div>
```

### CUSTOM VALIDATORS

- example if username = admin
- create the file: shared/user-name.validator.ts

```
import { AbstractControl } from '@angular/forms';

// if it fails, it returns an object of type string and the value is of type any,
// if validation passes, it returns null
export function forbiddenNameValidator(control: AbstractControl): {[key: string]: any} | null {
  // this tests to see if the value passed in == admin
  const forbidden = /admin/.test(control.value);
  // if it fails, it sends back the value that was passed in, if not then null
  return forbidden ? { forbiddenName: {value: control.value}} : null;
}

```

- update username in reactive.comp.ts to use the forbidden validator

```
import { forbiddenNameValidator } from 'src/app/shared/user-name.validator';
  registrationForm = this.fb.group({
    userName: ['Pep', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });
```

- update the reactive.comp.html

```
    <div class="form-group">
      <label for="username">Username</label>
      <input
        [class.is-invalid]="userName.invalid &&
                            userName.touched"
        formControlName="userName"
        type="text"
        name=""
        id="username"
        class="form-control">
      <div *ngIf="userName.invalid &&
                   userName.touched">
          <small
            *ngIf="userName.errors?.required"
            class="text-danger">Username is required</small>
          <small
            *ngIf="userName.errors?.minlength"
            class="text-danger">Username must be at least 3 characters</small>
            <small
            *ngIf="userName.errors?.forbiddenName"
            class="text-danger">{{userName.errors?.forbiddenName.value}} Username not allowed</small>
      </div>
    </div>
```

- refresh and test out 'admin' should say not allowed
- to allow the forbidden function to test other words, update: user-name.validator.ts

```
import { AbstractControl, ValidatorFn } from '@angular/forms';

// if it fails, it returns an object of type string and the value is of type any,
// if validation passes, it returns null
// export function forbiddenNameValidator(control: AbstractControl): {[key: string]: any} | null {
//   // this tests to see if the value passed in == admin
//   const forbidden = /admin/.test(control.value);
//   // if it fails, it sends back the value that was passed in, if not then null
//   return forbidden ? { forbiddenName: {value: control.value}} : null;
// }


// this is so we can make a generic test, not only for admin, but maybe password
export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? { forbiddenName: {value: control.value}} : null;
}
```

- update reactive.comp.ts to accept a parameter

```
  registrationForm = this.fb.group({
    userName: ['Pep', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });
```

- reactive.comp.html stays the same

### CROSS FIELD VALIDATION

- checking password and confirmPassword fields
- create the file: shared/password.validator.ts

```
import { AbstractControl } from '@angular/forms';

//  here the 'control' = registrationForm group, not the individual password or confirm password fields, its the whole group
export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  // this checks to see if the user has typed in the fields, because without it
  // as soon as the user starts typing the password, the confirm already displays an error
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  // tests to see that both password and confirmpassword are there, and if the values match
  // if it doesnt then misMatch is true, if it does then null
  return password && confirmPassword && password.value !== confirmPassword.value ?
    { misMatch: true } :
    null;
}

```

- update reactive.comp.ts

```
import { PasswordValidator } from 'src/app/shared/password.validator';
  registrationForm = this.fb.group({
    userName: ['Pep', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  }, { validator: PasswordValidator });

```

- update reactive.comp.html

```
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        [class.is-invalid]="registrationForm.errors?.misMatch"
        formControlName="confirmPassword"
        type="password"
        id="confirmPassword"
        name=""
        class="form-control">
        <small
          *ngIf="registrationForm.errors?.misMatch"
          class="text-danger">
          Passwords no not match
        </small>
    </div>
```

### CONDITIONAL VALIDATION

- checkbox if user wants promotional info, email field is required, if not then it is not required
- update the form on reactive.comp.html, below username field

```
    <div class="form-group">
      <label for="email">Email</label>
      <input
        formControlName="email"
        type="email"
        class="form-control"
        id="email">
    </div>
    <div class="form-check mb-3">
      <input type="checkbox" class="form-check-input" formControlName="subscribe" id="subscribe">
      <label for="subscribe" class="form-check-label">
        Send me promotional offers
      </label>
    </div>
```

- update the form group in reactive.comp.ts with the 2 new fields

```
  registrationForm = this.fb.group({
    userName: ['Pep', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
    email: [''],
    subscribe: [false],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  }, { validator: PasswordValidator });
```

- move the form group in the ngOnInt block, create a registrationForm of FormGroup, and add this. to the form group
- then get the value changes of the checkbox, if checked then set validators on the email field, if not clear validators
- then finally update value and validity method of email field

```
  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['Pep', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })
    }, { validator: PasswordValidator });

    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }
```

- and add the email getter, final code should be

```
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/shared/user-name.validator';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {
  registrationForm: FormGroup;

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  constructor(
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['Pep', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })
    }, { validator: PasswordValidator });

    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Pep'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  // loadApiData() {
  //   this.registrationForm.setValue({
  //     userName: 'Bruce',
  //     password: 'asdf',
  //     confirmPassword: 'asdf',
  //     address: {
  //       city: 'Miami',
  //       state: 'FL',
  //       postalCode: '33123'
  //     }
  //   });
  // }

  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'asdf',
      confirmPassword: 'asdf'
    });
  }

}

```

- update reactive.comp.html

```
    <div class="form-group">
      <label for="email">Email</label>
      <input
        [class.is-invalid]="email.invalid && email.touched"
        formControlName="email"
        type="email"
        class="form-control"
        id="email">
        <small
          [class.d-none]="email.valid || email.untouched"
          class="text-danger">
          Email is required
        </small>
    </div>
    <div class="form-check mb-3">
      <input type="checkbox" class="form-check-input" formControlName="subscribe" id="subscribe">
      <label for="subscribe" class="form-check-label">
        Send me promotional offers
      </label>
    </div>
```

### DYNAMIC FORM CONTROLS

- the duplicating steps are (we can duplicate an entire form group, like address)

```
1) import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms'; - import formarray
2) define the form array in the form group: alternateEmails: this.fb.array([])
3) create a getter:   get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }
4) create the method to push either a form control or a form group:   addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }  
5) in the html, add the form array name directive:         <div
          formArrayName="alternateEmails"
6) add the ngFor to iterate  the structure directive: *ngFor="let email of alternateEmails.controls; let i = index">

The steps are shown below       
```

- adding multiple fields based on a button click
- in reactive.comp.ts add a getter for alternate emails, and an alternateEmails method to push the emails to the form control

```
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }  
```

- update the form group with a form array for alternate emails

```
  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['Pep', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    }, { validator: PasswordValidator });

    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }
```

- add the button to the html and a div for the input with an ngFor

```
    <div class="form-group">
      <label for="email">Email</label>
      <button
        type="button"
        class="btn btn-secondary btn-sm m-2"
        (click)="addAlternateEmail()"
        >Add e-mail</button>
      <input
        [class.is-invalid]="email.invalid && email.touched"
        formControlName="email"
        type="email"
        class="form-control"
        id="email">
        <small
          [class.d-none]="email.valid || email.untouched"
          class="text-danger">
          Email is required
        </small>
        <div
          formArrayName="alternateEmails"
          *ngFor="let email of alternateEmails.controls; let i = index">
          <input
            type="email"
            class="form-control my-1"
            [formControlName]="i">
        </div>
    </div>
```

- the final code for reactive.comp.ts for dynamic forms

```
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/shared/user-name.validator';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {
  registrationForm: FormGroup;

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  constructor(
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['Pep', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    }, { validator: PasswordValidator });

    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Pep'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  // loadApiData() {
  //   this.registrationForm.setValue({
  //     userName: 'Bruce',
  //     password: 'asdf',
  //     confirmPassword: 'asdf',
  //     address: {
  //       city: 'Miami',
  //       state: 'FL',
  //       postalCode: '33123'
  //     }
  //   });
  // }

  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'asdf',
      confirmPassword: 'asdf'
    });
  }

}

```

- refresh and add different email

### SUBMITTING THE FORM DATA

- update the form tag in the reactive.comp.html with an onsubmit method

```
<form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
```

- in reactive.comp.ts create the onsubmit method

```
  onSubmit() {
    console.log(this.registrationForm.value);
  }
```

- in terminal: ng g s registration
- update the service

```
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  API_URL = 'http://localhost:3000/registration';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  register(userData) {
    console.log('This is in register service ' + userData);
    return this.http.post<any>(this.API_URL, userData, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}

```

- in reactive.comp.ts update the on submit method

```
  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
    ) { }
  onSubmit() {
    // console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log('Success', response),
        error => console.log('Error', error)
      );
  }    
```

- update the button in the reactive.comp.html

```
    <button 
      [disabled]="!registrationForm.valid"
      class="btn btn-primary" 
      type="submit">Register</button>
```

- update backend/routes/index.js

```
router.post('/registration', function(req, res, next) {
  console.log(req.body);
  // res.status(401);
  res.send({'Status':'User Created'});
});
```

- refresh and create a new registration, it should all work

#### FINISH CODE EVOLUTION REACTIVE FORMS

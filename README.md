# ANGULAR FORMS - TEMPLATE AND REACTIVE

## LINKS 

1. [Template Forms from Angular.io](#templateAngular)
1. [Template Forms - YOUTUBE - CODEVOLUTION](#templateCodevolution)
1. [Template Forms - Angular course - Max S.](#templateMaxS)
1. [Reactive Forms - Angular course - Max S.](#reactiveMaxS)
1. [Reactive Forms - YOUTUBE - CODEVOLUTION](#reactiveCodevolution)
1. [Reactive Forms from Angular.io](#reactiveAngular)
1. [Existing Validators for forms, from angular.io](#existingValidators)

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

# <a name="templateAngular"></a> TEMPLATE FORMS FROM ANGULAR.IO

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
 
# <a name="templateCodevolution"></a> Template Forms - YOUTUBE - CODEVOLUTION

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

### THE END TEMPLATE FORM - YOUTUBE CODEVOLUTION

# <a name="templateMaxS"></a> Template Forms - Angular course - Max S.

- start with a basic form in max-template.comp.html
- angular forms don't have an 'action' because in regular html, the 'action' sends the form to the server, but we are using angular to submit the form, and doing it the ngSubmit angular way, so i can pass through its state and validity checks

```
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form>
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" class="form-control">
          </div>
          <button class="btn btn-default" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input type="email" id="email" class="form-control">
          </div>
        </div>
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select id="secret" class="form-control">
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>

```

- make sure app.module.ts has the: formsmodule
- right now angular doesn't know what inputs the form has or what to do with them, it knows there is a form, but not the fields
- to let angular know we have to add ngModel to the fields and the name of the control
- as such

```
<input
  type="text"
  id="username"
  class="form-control"
  ngModel
  name="username">
```              

- update the form with ngModel and name for all the fields

```
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form>
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              ngModel
              name="username">
          </div>
          <button class="btn btn-default" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              ngModel
              name="email">
          </div>
        </div>
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select
            id="secret"
            class="form-control"
            ngModel
            name="secret">
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>

```

- now to make the form submittable, to see what the value of the fields are:
- update the form tag on the .comp.html file

```
<form (ngSubmit)="onSubmit()">
```

- add the onSubmit to the comp.ts file

```
  onSubmit() {
    console.log('Submitted');
  }
```

- refresh and test the submit button, we should see 'submitted' in the console
- now to see the 'form object' to see what is actually in the form, update the form tag with a 'local' variable reference

```
<form #f (ngSubmit)="onSubmit(f)">
```

- update the comp.ts onSubmit to receive the f element

```
  onSubmit(form: HTMLFontElement) {
    console.log(form);
  }
```

- but that passes the whole form object, we only need to see the value of the fields
- so update the form tag on the .comp.html

```
<form #f="ngForm" (ngSubmit)="onSubmit(f)">
```

- update the onsubmit method on the comp.ts file

```
  onSubmit(form: NgForm) {
    console.log(form);
  }
```

- refresh and see everything that it sends, the ng Object with lots of properties
- to see the values, update the onsubmit

```
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
```

- refresh and now we should see the individual fields
- USING VIEWCHILD TO PASS TEH DATA FROM THE FORM TO THE ON SUBMIT
- update comp.html

```
<form #f="ngForm" (ngSubmit)="onSubmit()">
```

- update the comp.ts file

```
export class MaxTemplateComponent implements OnInit {
  // this 'views the f form and passes it to the local variable signupform, of type ngform
  // static - True to resolve query results before change detection runs
  // When static is not provided, uses query results to determine the timing of query
  // resolution. If any query results are inside a nested view (such as *ngIf),
  // the query is resolved after change detection runs. Otherwise, it is resolved before
  // change detection runs.
  @ViewChild('f', {static: false}) signupForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }
}
```

### ADDING VALIDATION to TEMPLATE FORMS

```
Which Validators do ship with Angular? 

Check out the Validators class: [https://angular.io/api/forms/Validators](https://angular.io/api/forms/Validators) - these are all built-in validators, though that are the methods which actually get executed (and which you later can add when using the reactive approach).

For the template-driven approach, you need the directives. You can find out their names, by searching for "validator" in the official docs: [https://angular.io/api?type=directive](https://angular.io/api?type=directive) - everything marked with "D" is a directive and can be added to your template.

Additionally, you might also want to enable HTML5 validation (by default, Angular disables it). You can do so by adding the ngNativeValidate  to a control in your template.
```

- from the angular site

```
class Validators {
  static min(min: number): ValidatorFn
  static max(max: number): ValidatorFn
  static required(control: AbstractControl): ValidationErrors | null
  static requiredTrue(control: AbstractControl): ValidationErrors | null
  static email(control: AbstractControl): ValidationErrors | null
  static minLength(minLength: number): ValidatorFn
  static maxLength(maxLength: number): ValidatorFn
  static pattern(pattern: string | RegExp): ValidatorFn
  static nullValidator(control: AbstractControl): ValidationErrors | null
  static compose(validators: ValidatorFn[]): ValidatorFn | null
  static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn | null
}
```

- update the username and email with required and email validators in the comp.html

```
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              ngModel
              name="username"
              required>
          </div>
          <button class="btn btn-default" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              ngModel
              name="email"
              required
              email>
          </div>
        </div>
```

- if you add f.status on the html we can see the status of the code as we fill in the fields

```
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      {{ f.status }}
```

- USING THE FORM STATE
- the state is based on the valid/invalid, touched/untouched, pristine/dirty of the fields
- update the button to be disabled if not valid

```
        <button
          class="btn btn-primary"
          type="submit"
          [disabled]="!f.valid">Submit</button>
```

- to put the border around the field using css instead of the [class.is-invalid]
- add to the .comp.scss file

```
input.ng-invalid.ng-touched {
  border: 1px solid red;
}

```

- refresh and if you click on an input field and tab out of it, the border appears
- ADDING THE VALIDATION ERROR TEXT
- update the html input email field, with an #email local variable with ngModel
- then in the span tag we can check if that #email field is valid or not

```
  <div class="form-group">
    <label for="email">Mail</label>
    <input
      type="email"
      id="email"
      class="form-control"
      ngModel
      name="email"
      required
      email
      #email="ngModel">
      <span
        *ngIf="!email.valid && email.touched"
        class="text-danger">
        Please enter a valid email
      </span>
  </div>
```

- SET DEFAULT VALUES with property binding
- add to the comp.ts a variable assigned to pet

```
  defaultQuestion = 'pet';
  constructor() { }
```

- update the select in the comp.html with ngmodel to receive that default value

```
<div class="form-group">
  <label for="secret">Secret Questions</label>
  <select
    id="secret"
    class="form-control"
    [ngModel]="defaultQuestion"
    name="secret">
    <option value="pet">Your first Pet?</option>
    <option value="teacher">Your first teacher?</option>
  </select>
</div>
```

- USING 2 WAY BINDING IN CASE WE WANT TO DISPLAY WHAT THE USER HAS ENTERED
- add an answer variable in the comp.ts

```
  defaultQuestion = 'pet';
  answer = '';
  constructor() { }
```

- update the html with a textarea so the user can enter an answer, and display their answer as they are typing it

```
<div class="form-group">
  <textarea
    name="questionAnswer"
    rows="3"
    [(ngModel)]="answer"
    class="form-control"></textarea>
</div>
<p>Your reply: {{ answer }}</p>
```

- THE 3 WAYS OF BINDING: 

```
1) no binding, just telling angular that the input is a form control
2) 1 way binding, to pre-set values on the form
3) 2 way binding, where we dispaly on the form what the user is entering
```

### GROUPING FORM CONTROLS

- breaking up a form into groups: name, address, socials etc.
- group the fields you want into their own div and add an ngModelGroup with a variable, and add #userData="ngModelGroup" so we can check the state and validity of the group as a whole

```
        <div
          id="user-data"
          ngModelGroup="userData"
          #userData="ngModelGroup"
          >
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              ngModel
              name="username"
              required>
          </div>
          <button class="btn btn-default" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              ngModel
              name="email"
              required
              email
              #email="ngModel">
              <span
                *ngIf="!email.valid && email.touched"
                class="text-danger">
                Please enter a valid email
              </span>
          </div>
```

- when you submit form, it will be grouped as such

```
secret: "pet", 
questionAnswer: "Piper"
userData: 
  username: "buddylee939"
  email: "buddylee939@hotmail.com"
```

### HANDLING RADIO BUTTONS

- add to the comp.ts a genders array

```
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
```

- update the comp.html to display them, ngfor loops through the options we set in the comp.ts, name="radio buttons share the same name so we set it to gender", ngmodel links the name with the form, [value] dynamically adds the value with the current gender, then {{gender}} passes the variable to the label to display to the user

```
  <div
    *ngFor="let gender of genders"
    class="radio">
    <label>
      <input
        type="radio"
        name="gender"
        ngModel
        [value]="gender">
        {{ gender }}
    </label>
  </div>
```

### SETTING AND PATCHING VALUES TO THE FORM TO REPLICATE AN API CALL

- USING SET VALUE, overrides all controls, erases anything set before, needs all the fields
- in the comp.ts, create the suggested name method

```
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    });
  }
```

- add a button with click to target the suggest user name method

```
  <button
    (click)="suggestUserName()"
    class="btn btn-secondary"
    type="button"
    >Suggest an Username</button>
```

- USING PATCH VALUE, only overrides the values you want to override
- update the comp.ts

```
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
```

- refresh and test it out

### USING FORM DATA

- displaying the user data on the form when submitted
- add a div with the user data in the comp.html

```
<div class="row" *ngIf="!submitted">....
  </div>
  <hr>
  <div class="row" *ngIf="submitted">
    <div class="col-xs-12">
      <h3>Your Data</h3>
      <p>Username: {{ user.username }}</p>
      <p>Mail: {{ user.email }}</p>
      <p>Secret Question: Your first {{ user.secretQuestion }}</p>
      <p>Answer: {{ user.answer }}</p>
      <p>Gender: {{ user.gender }}</p>
    </div>
  </div>
</div>
```

- update the comp.ts with a user object, the fields don't need to match the name from the name fields on the form since it is a new user object
- update the onsubmit method to set these user object values based on the values passed from the form
- and finally it resets the form

```
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

    onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
```

- update the on sub

#### THE END ANGULAR COURSE TEMPLATE FORMS - MAX S.

<hr>

# REACTIVE FORMS

<hr>  

# <a name="reactiveMaxS"></a> Reactive Forms - Angular Course - Max S.

- add to app.module.ts: reactiveformsmodule
- using the max-reactive component
- add the form to .comp.html

```
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            class="form-control">
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            class="form-control">
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              [value]="gender">{{ gender }}
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

- add the form group and form controls, based on the html form inputs to the comp.ts file

```
export class MaxReactiveComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null),
      gender: new FormControl('male')
    });
  }

}
```

- syncing the ts with the html
- update comp.html giving the form a formgroup based on the name we chose in the .ts file,
- add formcontrolname to each input field, based on the names we chose in the .ts file

```
<div class="container">
  <div class="row">
    <div>
      {{ signupForm.value | json }} <br>
      {{ signupForm.status }} <br>
      {{ signupForm.get('email').status }}
    </div>
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            formControlName="username"
            class="form-control">
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            formControlName="email"
            class="form-control">
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              formControlName="gender"
              [value]="gender"> {{ gender }}
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>

```

- refresh, now we see male as the default

### SUBMITTING THE FORM

- update the form tag with ngsubmit and an onsubmit method

```
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
```

- create the on submit method in the comp.ts file

```
  onSubmit() {
    console.log(this.signupForm.value);
  }
```

- ADDING VALIDATION
- update the createForm method in the .comp.ts file

```
  createForm() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl('male')
    });
  }
```

- DISPLAYING THE ERROR MESSAGES
- update the comp.html to add the error fields to the username and the overall signup form

```
  <div class="form-group">
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      formControlName="username"
      class="form-control">
      <span
        *ngIf="!signupForm.get('username').valid &&
                signupForm.get('username').touched"
        class="text-danger">
        Please enter a valid username
      </span>
  </div>
  ...
  ...
  <div
    *ngIf="!signupForm.valid && signupForm.touched"
    class="text-danger">
    Please enter all the required fields.
  </div>  
```

- update the comp.scss to add a border to the invalid fields

```
input.ng-invalid.ng-touched {
  border: 1px solid red;
}

```

### GROUPING FORM CONTROLS

- in the comp.ts file, update the create form method to put username and password in its own group

```
  createForm() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl('male')
    });
  }

```

- update the comp.html, wrap the username and email with a div and give it the formGroupName of userdata, that we assigned in the comp.ts
- update the validations to reflect the nested layer

```
    <div>
      {{ signupForm.value | json }} <br>
      {{ signupForm.status }} <br>
      {{ signupForm.get('userData.email').status }}
    </div>
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div formGroupName="userData">
          <div class="form-group">
            <label for="username">Username</label>
            <input
            type="text"
            id="username"
            formControlName="username"
            class="form-control">
            <span
            *ngIf="!signupForm.get('userData.username').valid &&
            signupForm.get('userData.username').touched"
            class="text-danger">
            Please enter a valid username
          </span>
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
          type="text"
          id="email"
          formControlName="email"
          class="form-control">
        </div>
      </div>
```

### USING FORM ARRAYS FOR DYNAMIC FIELDS

- create a hobbies getter as formarray
- add the hobbies form array to the signup form, and create an onAddHobby method to push the array controls to the form array in the comp.ts


```
export class MaxReactiveComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  get hobbies() {
    return this.signupForm.get('hobbies') as FormArray;
  }

  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    this.hobbies.push(control);
  }
}

```  

- add the button and input form to the comp.html 

```
<div>
  <h4>Enter Your Hobbies</h4>
  <button
    (click)="onAddHobby()"
    class="btn btn-warning btn-sm"
    type="button">
    Add Hobby
  </button>
  <br>
</div>

  <div
    formArrayName="hobbies"
    class="form-group"
    *ngFor="let hobbyControl of hobbies.controls; let i = index">
    <input
      [formControlName]="i"
      class="form-control"
      type="text">
  </div>
```

### CREATING CUSTOM VALIDATORS

- update comp.ts, create a local array forbiddenUsernames
- create the forbiddenNames method, checking the indexof -1 means that the name entered does exist in the search
- add the this.forbiddenNames.bind(this) to the username, the .bind(this) means the class, without it there is an error because it doesn't know what this referes to

```
export class MaxReactiveComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  get hobbies() {
    return this.signupForm.get('hobbies') as FormArray;
  }

  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    this.hobbies.push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {nameIsForbidden: true};
    }
    return null;
  }
}
```

- ADDING THE ERROR CODE BASED ON THE CUSTOM ERROR
- update the comp.html

```
        <div formGroupName="userData">
          <div class="form-group">
            <label for="username">Username</label>
            <input
            type="text"
            id="username"
            formControlName="username"
            class="form-control">
            <span
              *ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched"
              class="text-danger">
              <span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">This name is invalid!</span>
              <span *ngIf="signupForm.get('userData.username').errors['required']">This field is required!</span>
            </span>
        </div>
```

### CUSTOM ASYNC VALIDATOR

- in case it needs to check with a server to verify the email or some other field
- add forbidden emails method 
- update the signupform.email to use the validator

```
  createForm() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
  }
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({emailIsForbidden: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
```

- update the comp.html email field

```
  <div class="form-group">
    <label for="email">email</label>
    <input
      type="text"
      id="email"
      formControlName="email"
      class="form-control">
    <span
      *ngIf="!signupForm.get('userData.email').valid && signupForm.get('userData.email').touched"
      class="help-block">Please enter a valid email!</span>
  </div>
```          

- refresh, in email type: test@test.com and it should return in 1.5 seconds as invalid

### REACTING TO STATUS OR VALUE CHANGES and SETTING AND PATCHING VALUES

- update the createform method

```
  createForm() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
    this.signupForm.setValue({
      userData: {
        username: 'Max',
        email: 'max@test.com'
      },
      gender: 'male',
      hobbies: []
    });
    this.signupForm.patchValue({
      userData: {
        username: 'Anna',
      }
    });
  }
```

### RESETTING THE FORM AFTER SUBMITTING

- update the onsubmit method in the comp.ts

```
 onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }
```

### HE DOESNT SHOW IN THESE VIDEOS HOW TO USE FORM BUILDERS

#### THE END ANGULAR COURSE - FROM MAX S.

<hr>  

# <a name="reactiveCodevolution"></a> Reactive Forms - YOUTUBE - CODEVOLUTION

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

# <a name="reactiveAngular"></a> REACTIVE FORMS FROM ANGULAR.IO

- update app.module.ts, add reactiveforms

```
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
```

- ng generate component NameEditor
- create a form control in name-editor.comp.ts

```
export class NameEditorComponent implements OnInit {
  name = new FormControl('');

  constructor() { }

  ngOnInit() {
  }

}
```

- update the name.comp.html

```
<div class="container">
  <div>
    {{name.value | json}}
  </div>
  <label>
    Name:
    <input type="text" [formControl]="name">
  </label>
</div>

```

- add a method in name=editor.comp.ts

```
updateName() {
  this.name.setValue('Nancy');
}
```

- update the name-editor.comp.html with a button to simulate an api call

```
<p>
  <button (click)="updateName()">Update Name</button>
</p>
```

- final html

```
<div class="container">
  <div>
    {{name.value | json}}
  </div>
  <label>
    Name:
    <input type="text" [formControl]="name">
  </label>
  <p>
    Value: {{ name.value }}
  </p>
  <p>
    <button (click)="updateName()">Update Name</button>
  </p>
</div>
```

- CREATING A FORM GROUP
- update name-edito.comp.ts

```
export class NameEditorComponent implements OnInit {
  name = new FormControl('');

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
```

- update the html

```
  <h2>Profile Form</h2>
  {{ profileForm.value | json}}
  <div>
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">

      <label>
        First Name:
        <input type="text" formControlName="firstName">
      </label>
      <br>
      <label>
        Last Name:
        <input type="text" formControlName="lastName">
      </label>

    </form>
  </div>
```

- create the onSubmit method in the comp.ts

```
onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
}
```

### Creating nested form groups

- update name.comp.ts

```
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });
```

- update the html

```
<div class="container">
  <div>
    {{name.value | json}}
  </div>
  <label>
    Name:
    <input type="text" [formControl]="name">
  </label>
  <p>
    Value: {{ name.value }}
  </p>
  <p>
    <button (click)="updateName()">Update Name</button>
  </p>
  <h2>Profile Form</h2>
  {{ profileForm.value | json}}
  <div>
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">

      <label>
        First Name:
        <input type="text" formControlName="firstName">
      </label>
      <br>
      <label>
        Last Name:
        <input type="text" formControlName="lastName">
      </label>
      <br>
      <div formGroupName="address">
        <h3>Address</h3>

        <label>
          Street:
          <input type="text" formControlName="street">
        </label>

        <label>
          City:
          <input type="text" formControlName="city">
        </label>

        <label>
          State:
          <input type="text" formControlName="state">
        </label>

        <label>
          Zip Code:
          <input type="text" formControlName="zip">
        </label>
      </div>
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>
  </div>
</div><!--  container -->

```

- USING SETVALUE AND PATCHVALUE
- add the update profile name-editor.comp.ts

```
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }
```

- update the html

```
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>
      <p>
        <button (click)="updateProfile()">Update Profile</button>
      </p>
```

## Generating form controls with FormBuilder

```
The FormBuilder service has three methods: control(), group(), and array(). These are factory methods for generating instances in your component classes including form controls, form groups, and form arrays.
```

- add to name-editor.comp.ts the form builder to the constructor

```
constructor(private fb: FormBuilder) { }
```

- add a registration form to the html

```
<div class="container">
  <h2>Registration Form</h2>
  {{ registrationForm.value | json}}
  <div>
    <form [formGroup]="registrationForm" (ngSubmit)="onSubmitRegistration()">

      <label>
        First Name:
        <input type="text" formControlName="firstName">
      </label>
      <br>
      <label>
        Last Name:
        <input type="text" formControlName="lastName">
      </label>
      <br>
      <div formGroupName="address">
        <h3>Address</h3>

        <label>
          Street:
          <input type="text" formControlName="street">
        </label>

        <label>
          City:
          <input type="text" formControlName="city">
        </label>

        <label>
          State:
          <input type="text" formControlName="state">
        </label>

        <label>
          Zip Code:
          <input type="text" formControlName="zip">
        </label>
      </div>
      <button type="submit" [disabled]="!registrationForm.valid">Submit</button>
    </form>
  </div>
</div><!--  container -->

```

- update the comp.ts with the form builder

```
  // using form builders, form group, nested form group
  registrationForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });
  constructor(private fb: FormBuilder) { }
  onSubmitRegistration() {
    // TODO: Use EventEmitter with form value
    console.log(this.registrationForm.value);
  }
```

## Simple form validation

- update the registration form in the comp.ts

```
registrationForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: [''],
  address: this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  }),
});
```

- update the name in the registration form in the html

```
<input type="text" formControlName="firstName" required>
```

- show the form status on the form to see

```
<p>
  Form Status: {{ registrationForm.status }}
</p>
```

## Dynamic controls using form arrays

- update the registration form to include an 'aliases' array, update the comp.ts file

```
  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });
```

- add a getter for the form array for the registration form in the comp.ts file

```
  get aliases() {
    return this.registrationForm.get('aliases') as FormArray;
  }
```

- create a method to add the array to the registration form

```
addAlias() {
  this.aliases.push(this.fb.control(''));
}
```

- add the form array aliases to the .comp.html file

```
<div formArrayName="aliases">
  <h3>Aliases</h3> <button (click)="addAlias()">Add Alias</button>

  <div *ngFor="let address of aliases.controls; let i=index">
    <!-- The repeated alias template -->
    <label>
      Alias:
      <input type="text" [formControlName]="i">
    </label>
  </div>
</div>
```

### FINISHED ABNUGLAR REACTIVE FORMS

# <a name="existingValidators"></a> VALIDATORS THAT EXIST
## [from this website](https://angular.io/api/forms/Validators#email)
```
class Validators {
  static min(min: number): ValidatorFn
  static max(max: number): ValidatorFn
  static required(control: AbstractControl): ValidationErrors | null
  static requiredTrue(control: AbstractControl): ValidationErrors | null
  static email(control: AbstractControl): ValidationErrors | null
  static minLength(minLength: number): ValidatorFn
  static maxLength(maxLength: number): ValidatorFn
  static pattern(pattern: string | RegExp): ValidatorFn
  static nullValidator(control: AbstractControl): ValidationErrors | null
  static compose(validators: ValidatorFn[]): ValidatorFn | null
  static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn | null
}
```

### Adding custom validation to template driven forms

- create a file shared/forbidden-name.directive.ts

```
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Input, Directive } from '@angular/core';
import { forbiddenNameValidator } from './user-name.validator';

@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})

export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
                              : null;
  }
}
```

- create the file shared/forbidden-name.validator.ts 

```
import { AbstractControl, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
```

- add to comp.ts

```
firstName: ['', [Validators.required, forbiddenNameValidator(/bob/i)]],
```
- or add to template form

```
<input id="name" name="name" class="form-control"
      required minlength="4" appForbiddenName="bob"
      [(ngModel)]="hero.name" #name="ngModel" >
```

### CONTROL STATUS CSS CLASSES

```
.ng-valid
.ng-invalid
.ng-pending
.ng-pristine
.ng-dirty
.ng-untouched
.ng-touched
```


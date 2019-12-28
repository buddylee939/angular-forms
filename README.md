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

## REACTIVE FORMS

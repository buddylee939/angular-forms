import { RegistrationService } from './../../registration.service';
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
    private fb: FormBuilder,
    private registrationService: RegistrationService
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

  onSubmit() {
    // console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log('Success', response),
        error => console.log('Error', error)
      );
  }
}

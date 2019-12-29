import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/user-name.validator';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.scss']
})
export class NameEditorComponent implements OnInit {
  // using form controls
  name = new FormControl('');

  // using form groups, form controls and nested form groups
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

  constructor(private fb: FormBuilder) { }

  get aliases() {
    return this.registrationForm.get('aliases') as FormArray;
  }

  // using form builders, form group, nested form group
  registrationForm = this.fb.group({
    firstName: ['', [Validators.required, forbiddenNameValidator(/bob/i)]],
    lastName: [''],
    email: ['', Validators.email],
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

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  ngOnInit() {
  }

  updateName() {
    this.name.setValue('Nancy');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  onSubmitRegistration() {
    // TODO: Use EventEmitter with form value
    console.log(this.registrationForm.value);
  }
}

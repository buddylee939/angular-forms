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
  submitted = false;
  errorMsg = '';

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
        error => this.errorMsg = error.statusText
      );
  }

}

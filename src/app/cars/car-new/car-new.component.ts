import { Car } from './../car';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.scss']
})
export class CarNewComponent implements OnInit {

  userCar = new Car(
    '',
    ''
  );
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    // this.userCar.carName = form.value.carName;
    // this.userCar.engine = form.value.engine;
    console.log(this.userCar);
  }
}

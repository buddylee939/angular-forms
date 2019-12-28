import { Car } from './../car';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
  cars: Car[] = [
    { carName: 'Volvo', engine: 'V6'},
    { carName: 'Lexus', engine: 'V8'},
    { carName: 'Jaguar', engine: 'V12'},

  ];
  // hondaAccord = new Car('V6');

  constructor() { }

  ngOnInit() {
  }

}

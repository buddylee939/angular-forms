import { CarNewComponent } from './cars/car-new/car-new.component';
import { TdfComponent } from './components/tdf/tdf.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsListComponent } from './cars/cars-list/cars-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cars' },
  { path: 'cars', component: CarsListComponent },
  { path: 'car/new', component: CarNewComponent },
  { path: 'tdf', component: TdfComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

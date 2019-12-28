import { ReactiveComponent } from './components/reactive/reactive.component';
import { CarNewComponent } from './cars/car-new/car-new.component';
import { TdfComponent } from './components/tdf/tdf.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsListComponent } from './cars/cars-list/cars-list.component';
import { HeroFormComponent } from './heroes/hero-form/hero-form.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cars' },
  { path: 'cars', component: CarsListComponent },
  { path: 'car/new', component: CarNewComponent },
  { path: 'tdf', component: TdfComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: 'hero', component: HeroFormComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

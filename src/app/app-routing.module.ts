import { MaxReactiveComponent } from './components/max-reactive/max-reactive.component';
import { MaxTemplateComponent } from './components/max-template/max-template.component';
import { ReactiveComponent } from './components/reactive/reactive.component';
import { CarNewComponent } from './cars/car-new/car-new.component';
import { TdfComponent } from './components/tdf/tdf.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsListComponent } from './cars/cars-list/cars-list.component';
import { HeroFormComponent } from './heroes/hero-form/hero-form.component';
import { NameEditorComponent } from './name-editor/name-editor.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cars' },
  { path: 'name', component: NameEditorComponent },
  { path: 'cars', component: CarsListComponent },
  { path: 'cars', component: CarsListComponent },
  { path: 'car/new', component: CarNewComponent },
  { path: 'tdf', component: TdfComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: 'maxt', component: MaxTemplateComponent },
  { path: 'maxr', component: MaxReactiveComponent },
  { path: 'hero', component: HeroFormComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

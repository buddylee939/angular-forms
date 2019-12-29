import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TdfComponent } from './components/tdf/tdf.component';
import { CarsListComponent } from './cars/cars-list/cars-list.component';
import { CarNewComponent } from './cars/car-new/car-new.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroFormComponent } from './heroes/hero-form/hero-form.component';
import { ReactiveComponent } from './components/reactive/reactive.component';
import { NameEditorComponent } from './name-editor/name-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TdfComponent,
    CarsListComponent,
    CarNewComponent,
    HeroesComponent,
    HeroFormComponent,
    ReactiveComponent,
    NameEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

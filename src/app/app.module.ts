import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

@NgModule({
  declarations: [
    HomeComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }

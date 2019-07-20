import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './pages/app.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    NavbarComponent,
    WeatherCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AutocompleteLibModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'home/:name/:id', component: HomeComponent },
      { path: 'favorites', component: FavoritesComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

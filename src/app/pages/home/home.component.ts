import { Component, OnInit, OnChanges } from '@angular/core';
import { WhetherService } from 'src/app/services/whether.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  keyword = 'name';
  autoCompleteData = [];
  selectedLocation : {key: number; name: string} = { key: 215854, name: 'Tel Aviv' };
  selectedLocationData = [];
  fiveDayForecastData = [];
  favourite: boolean;
  
  constructor(private whetherService : WhetherService) { 
    this.selectEvent(this.selectedLocation);
  }

  onChangeSearch(value: string) {
    this.whetherService.search(value).subscribe(res => {
      this.autoCompleteData = res.map((item) => {
        return {
          key : item.Key,
          name: item.LocalizedName
        }
      })
    });
  }

  selectEvent(item) {
    this.selectedLocation = item;
    this.whetherService.getCurrentWhether(item.key).subscribe(res => {
      this.selectedLocation = item;
      this.selectedLocationData = res.map((weather) => {
        return {
          name: item.name,
          temp: weather.Temperature,
          whetherText: weather.WeatherText,
        }
      })
    })
    this.fiveDaysForecast(this.selectedLocation);
    this.checkFavorite();
  }

  addToFavorite() {
    if(localStorage.getItem('favouriteLocations') === null) {
      let favoriteLocations = []
      favoriteLocations.push(this.selectedLocation)
      localStorage.setItem('favouriteLocations', JSON.stringify(favoriteLocations));
      this.checkFavorite();
    } else {
      let previousLocations = JSON.parse(localStorage.getItem('favouriteLocations'))
      previousLocations.filter(res => res.name === this.selectedLocation.name).length > 0 ? 
        alert('Item alrady selected') : previousLocations.push(this.selectedLocation);
      localStorage.setItem('favouriteLocations', JSON.stringify(previousLocations));
      this.checkFavorite();
    }
  }

  removefromFavourites(){
    if(localStorage.getItem('favouriteLocations') != null) {
      let favoriteLocations = JSON.parse(localStorage.getItem('favouriteLocations'))
      let newLocations = favoriteLocations.filter(res => res.name != this.selectedLocation.name);
      localStorage.setItem('favouriteLocations', JSON.stringify(newLocations));
      this.checkFavorite();
    }
  }

  fiveDaysForecast(item) {
    this.whetherService.get5DayForecast(item.key).subscribe(res => {
      this.fiveDayForecastData = res['DailyForecasts']
      console.log(this.fiveDayForecastData);
    })
  }

  getDay(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(date);
    return days[d.getDay()];
  }

  checkFavorite() {
    if(localStorage.getItem('favouriteLocations') != null) {
      let favoriteLocations = JSON.parse(localStorage.getItem('favouriteLocations'))
      this.favourite = favoriteLocations.filter(res => res.name === this.selectedLocation.name).length > 0 ? 
        true: false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { WhetherService } from 'src/app/services/whether.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  keyword = 'name';
  autoCompleteData = [];
  selectedLocation : {key: number; name: string};
  selectedLocationData = [];
  
  
  constructor(private whetherService : WhetherService) { 
    let favoriteLocations = []
    localStorage.setItem('favouriteLocations', JSON.stringify(favoriteLocations));
  }

  ngOnInit() {
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
    // this.whetherService.getCurrentWhether(item.key).subscribe(res => {
    //   this.selectedLocation = item;
    //   this.selectedLocationData = res.map((weather) => {
    //     return {
    //       name: item.name,
    //       temp: weather.Temperature,
    //       whetherText: weather.WeatherText,
    //     }
    //   })
    //   console.log(this.selectedLocationData)
    // })
    console.log(item);
  }

  addToFavorite() {
    let previousLocations = JSON.parse(localStorage.getItem('favouriteLocations'))
    if(this.selectedLocation != null) {
      previousLocations.filter(res => res.name === this.selectedLocation.name).length > 0 ? 
        alert('Item alrady selected') : previousLocations.push(this.selectedLocation);
      localStorage.setItem('favouriteLocations', JSON.stringify(previousLocations));
      this.selectedLocation = null;
      console.log(JSON.parse(localStorage.getItem('favouriteLocations')))
    }
    else {
      alert('location not selected');
    }
  }
}

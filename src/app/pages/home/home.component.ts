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
  currentLocationData = [];

  constructor(private whetherService : WhetherService) { }

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
    this.whetherService.getCurrentWhether(item.key).subscribe(res => {
      console.log(res)
      this.currentLocationData = res.map((weather) => {
        return {
          name: item.name,
          temp: weather.Temperature,
          whetherText: weather.WeatherText,
          favoruite: false
        }
      })
      console.log(this.currentLocationData)
    })
    console.log(item);
  }

}

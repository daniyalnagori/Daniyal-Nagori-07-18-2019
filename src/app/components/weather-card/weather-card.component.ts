import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WhetherService } from 'src/app/services/whether.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnChanges {
  @Input() locationKey: number;
  @Input() name: string;

  weatherData = [];
  constructor(private weatherService: WhetherService) { }

  ngOnChanges() {
    this.getWhetherDataOfFavourite();
  }
  getWhetherDataOfFavourite() {
    if (this.locationKey != undefined) {
      this.weatherService.getCurrentWhether(this.locationKey).subscribe(res => {
        this.weatherData = res;
      })
    }
  }
}

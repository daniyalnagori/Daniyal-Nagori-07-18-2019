import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WhetherService {
  urlLocations: string = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete'
  urlCurrentCondition: string = 'https://dataservice.accuweather.com/currentconditions/v1'
  url5DayForecast: string = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'
  apiKey: string = 'ewEK4IDkvj5AXAdzTRQspDijWAANl1IR'

  constructor(private http: Http) { }

  search(query: string) {
    if (query === ' ' || query === '') {
      return this.http.get(`${this.urlLocations}?apikey=${this.apiKey}&q=Tel Aviv`).pipe(map(res => res.json()));
    }
    return this.http.get(`${this.urlLocations}?apikey=${this.apiKey}&q=${query}`).pipe(map(res => res.json()));
  }

  getCurrentWhether(locationKey: number) {
    return this.http.get(`${this.urlCurrentCondition}/${locationKey}?apikey=${this.apiKey}`).pipe(map(res => res.json()));
  }

  get5DayForecast(locationKey: number) {
    return this.http.get(`${this.url5DayForecast}/${locationKey}?apikey=${this.apiKey}&metric=true`).pipe(map(res => res.json()));
  }
}

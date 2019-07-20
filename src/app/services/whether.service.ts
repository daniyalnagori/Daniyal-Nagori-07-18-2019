import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WhetherService {
  urlLocations: string = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
  urlCurrentCondition: string = 'http://dataservice.accuweather.com/currentconditions/v1'
  url5DayForecast: string = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
  apiKey: string = 'kxTOlJKmtuoQ1myMTxpKECq1GYA6sUdM&q'
  apikey2: string = 'O7Wi8ODZGSi2XVA7sMQOxXpJ5Cf7beRZ'

  constructor(private http: Http) { }

  search(query: string) {
    if (query === ' ' || query === '') {
      return this.http.get(`${this.urlLocations}?apikey=${this.apiKey}=Tel Aviv`).pipe(map(res => res.json()));
    }
    return this.http.get(`${this.urlLocations}?apikey=${this.apiKey}=${query}`).pipe(map(res => res.json()));
  }

  getCurrentWhether(locationKey: number) {
    return this.http.get(`${this.urlCurrentCondition}/${locationKey}?apikey=${this.apikey2}`).pipe(map(res => res.json()));
  }

  get5DayForecast(locationKey: number) {
    return this.http.get(`${this.url5DayForecast}/${locationKey}?apikey=${this.apikey2}&metric=true`).pipe(map(res => res.json()));
  }
}

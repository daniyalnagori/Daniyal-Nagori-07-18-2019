import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WhetherService {
  urlLocations : string = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
  urlCurrentCondition : string = 'http://dataservice.accuweather.com/currentconditions/v1'
  apiKey : string = 'kxTOlJKmtuoQ1myMTxpKECq1GYA6sUdM&q'
  apikey2 : string = 'OwCiWquM19JQzDKvsH8uE4CmJE924Ah5'

  constructor(private http: Http) { }

  search(query: string) {
    return this.http.get(`${this.urlLocations}?apikey=${this.apiKey}=${query}`).pipe(map(res => res.json()));
  }

  getCurrentWhether(locationKey: number) {
    return this.http.get(`${this.urlCurrentCondition}/${locationKey}?apikey=${this.apikey2}`).pipe(map(res => res.json()));
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Locations} from '../model/Locations';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private baseUri = environment.locationHost;
  // private localStorageName = 'locations';

  constructor(private http: HttpClient) {
  }

  getLocationsForCompany(companyId: string): Observable<Locations[]> {
    const fullUri = this.baseUri + '/location/' + companyId;
    return this.http.get<Locations[]>(fullUri);
  }
}

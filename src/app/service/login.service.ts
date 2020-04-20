import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse} from '@angular/common/http';
import { BehaviorSubject , Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginResponse } from '../model/LoginResponse';
import { User } from '../model/User';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<LoginResponse>;
  public currentUser: Observable<LoginResponse>;
  private baseUri = environment.loginHost;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserLoggedIn(): LoginResponse {
    // get this from localstorage or memcache
    // problem with memcache or redis is the issue
    // of latency on network calls
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUri}/authenticate`, { username, password })
        .pipe(map(user => {
            // for debug only
          if ( !user.error ) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.currentUserSubject.next(user);
          return user;
        }));
  }

  register(user: User) {
    return this.http.post(`${this.baseUri}`, user);
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}


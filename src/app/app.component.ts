import { Component } from '@angular/core';
import { LoginResponse } from './model/LoginResponse';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Amakhosi';
  currentUser: LoginResponse;

  constructor(
    private router: Router,
    private authenticationService: LoginService
  ) {
    this.authenticationService.currentUser.subscribe (
      (x) => (this.currentUser = x)
    );
    console.log(this.currentUser);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

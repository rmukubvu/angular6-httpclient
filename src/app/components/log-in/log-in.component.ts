import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginResponse } from 'src/app/model/LoginResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  failedLogin = false;
  loginError = ' ';
  submitted = false;
  // returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.loginService.currentUserLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.loginService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          if ( !data.error ) {
            this.router.navigate(['/home']);
          } else {
            this.failedLogin = true;
            this.loginError = data.response;
          }
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}

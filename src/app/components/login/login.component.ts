import { first } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService, AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    // private formBuilder: FormBuilder,
    // private route: ActivatedRoute,
    // private router: Router,
    // private readonly authService: AuthService,
    // private readonly alertService: AlertService
  ) { }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });

    // reset login status
    // this.authService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    // this.submitted = true;

    // // stop here if form is invalid
    // if (this.loginForm.invalid) { return; }

    // this.loading = true;
    // this.authService.login(this.form.username.value, this.form.password.value)
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     this.router.navigate([this.returnUrl]);
    //   },
    //   error => {
    //     this.alertService.error(error),
    //     this.loading = false;
    //   }
    // );
  }

  // convenience getter for easy access to form fields
  // get form() { return this.loginForm.controls; }
}

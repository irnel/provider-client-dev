import { first, startWith, map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services';
import { Roles } from './../../helpers/enum-roles';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  emailError: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private readonly toast: SnotifyService,
    private readonly authService: AuthService
  ) {

    const user = this.authService.currentUserValue;

    // redirect to specific dashboard if already logged in
    if (user) {
      user.roles.forEach(rol => {
        if (rol === Roles.Admin) {
          // redirect to admin dashboard
        } else if (rol === Roles.Provider) {
          this.router.navigate(['/provider-dashboard/workspace']);
        } else {
          // redirect to cashier dashboard
        }
      });
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // validate email
    this.form.email.valueChanges.pipe(
      startWith(''),
      map(() => {
        let error = '';
        if (this.form.email.hasError('required')) {
          error = 'email is required';
        }

        if (this.form.email.hasError('email')) {
          error = 'invalid email';
        }

        return error;
      })
    ).subscribe(error => this.emailError = error);
  }

  get form() { return this.loginForm.controls; }

  login() {
    // Mark the control as dirty
    if (this.loginForm.invalid) {
      this.form.email.markAsDirty();
      this.form.password.markAsDirty();

      return;
    }

    this.loading = true;
    this.authService.login(
      this.form.email.value,
      this.form.password.value, true).subscribe(validLogin => {
        if (validLogin) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.toast.error('Incorrect username and password.', '', {
            backdrop: 0.2,
            closeOnClick: true,
            pauseOnHover: true,
            showProgressBar: false,
            timeout: 2500
          });

          this.loading = false;
        }
      });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}

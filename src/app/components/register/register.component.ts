import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { startWith, map } from 'rxjs/operators';

import { SnotifyService } from 'ng-snotify';
import { UserService, AuthService } from '../../services';
import { Config } from '../../infrastructure';
import { User } from '../../models';
import { Roles } from '../../helpers/enum-roles';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  regExName = Config.regex[0]; // pattern for names
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  existEmail = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly toast: SnotifyService
  ) {

    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regExName)]
      )],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regExName)]
      )],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email]
      )],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)]
      )],
      passwordConfirmation: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    // validate First Name
    this.form.firstName.valueChanges.pipe(
      startWith(''),
      map(() => {
        let error = '';
        if (this.form.firstName.hasError('required')) {
          error = 'first name is required';
        }

        if (this.form.firstName.hasError('pattern')) {
          error = 'character not allowed';
        }

        return error;
      })
    ).subscribe(error => this.firstNameError = error);

    // validate Last Name
    this.form.lastName.valueChanges.pipe(
      startWith(''),
      map(() => {
        let error = '';
        if (this.form.lastName.hasError('required')) {
          error = 'last name is required';
        }

        if (this.form.lastName.hasError('pattern')) {
          error = 'character not allowed';
        }

        return error;
      })
    ).subscribe(error => this.lastNameError = error);

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

  get form() { return this.registerForm.controls; }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.controls.password.value === formGroup.controls.passwordConfirmation.value
      ? null : { passwordMismatch: true };
  }

  createAccount() {
    this.loading = true;
    // Mark the control as dirty
    if (this.registerForm.invalid) {
      this.form.firstName.markAsDirty();
      this.form.lastName.markAsDirty();
      this.form.email.markAsDirty();
      this.form.password.markAsDirty();
      this.form.passwordConfirmation.markAsDirty();

      if (this.registerForm.hasError('passwordMismatch')) {
        this.showErrorMessage(
          'Passwords do not match', 'Validation error', 1500);
      }

      this.loading = false;
      return;
    }

    this.userService.isEmailTaken(this.form.email.value).subscribe(exist => {
      // if not exist exist email, create account
      if (!exist) {
        const user: User = {
          firstName: this.form.firstName.value,
          lastName: this.form.lastName.value,
          email: this.form.email.value,
          password: this.form.password.value,
          roles: [Roles.Provider],
          emailVerified: false,
          token: ''
        };

        this.userService.createAccount(user).then(() => {
          this.showSuccessMessage('user created', '', 1500);
          this.router.navigate(['/auth/login']);
        }).catch(error => {
          this.showErrorMessage(error, '', 1500);
        });
      } else {
        this.showErrorMessage('Email already in use.', '', 1500);
        this.loading = false;

        return;
      }
    });
  }

  showSuccessMessage(message: string, title: string, time: number) {
    this.toast.success(message, title, {
      backdrop: 0.2,
      closeOnClick: true,
      pauseOnHover: true,
      showProgressBar: false,
      timeout: time
    });
  }

  showErrorMessage(message: string, title: string, time: number) {
    this.toast.error(message, title, {
      backdrop: 0.2,
      closeOnClick: true,
      pauseOnHover: true,
      showProgressBar: false,
      timeout: time
    });
  }
}

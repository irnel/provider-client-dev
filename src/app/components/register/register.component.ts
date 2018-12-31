import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { first, startWith, map } from 'rxjs/operators';

import { SnotifyService } from 'ng-snotify';
import { AuthService, UserService } from './../../services';
import { Config } from './../../infrastructure';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  regEx = Config.regex[0];
  firstNameError: string;
  lastNameError: string;
  emailError: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly toast: SnotifyService,
    private readonly authService: AuthService,
    private readonly userService: UserService
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
        Validators.pattern(this.regEx)]
      )],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx)]
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

      return;
    }

    this.loading = true;
    this.userService.createAccount(
      this.form.firstName.value,
      this.form.lastName.value,
      this.form.email.value,
      this.form.password.value
    ).pipe(first()).subscribe(
      () => {
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.showErrorMessage(error, '', 2000);
        this.loading = false;
      }
    );
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

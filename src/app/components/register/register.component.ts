import { first } from 'rxjs/operators';

import { AuthService, UserService } from './../../services';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly toast: ToastrService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {

    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.toast.overlayContainer = this.toastContainer;

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirmation: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
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
        this.showErrorMessage('Passwords do not match', 1500);
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
        this.showSuccessMessage('your account was created successfully', 2000);
        this.router.navigate(['/login']);
      },
      error => {
        this.showErrorMessage(error, 2000);
        this.loading = false;
      }
    );
  }

  showSuccessMessage(message: string, time: number) {
    this.toast.success(message, '', {
      tapToDismiss: true,
      timeOut: time
    });
  }

  showErrorMessage(message: string, time: number) {
    this.toast.error(message, '', {
      tapToDismiss: true,
      timeOut: time
    });
  }
}

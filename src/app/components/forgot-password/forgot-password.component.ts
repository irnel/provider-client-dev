import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SnotifyService } from 'ng-snotify';
import { AuthService } from './../../services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly toast: SnotifyService,
    private readonly authService: AuthService
  ) {

    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  get form() { return this.forgotPasswordForm.controls; }

  send() {
    this.toast.success(
      'An email has been sent to your account.',
      '', {
        backdrop: 0.2,
        closeOnClick: true,
        pauseOnHover: true,
        showProgressBar: false,
        position: 'centerCenter',
        timeout: 3000,
      });

      this.router.navigate(['/auth/login']);
  }
}

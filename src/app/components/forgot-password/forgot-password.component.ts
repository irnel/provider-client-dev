import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  forgotPasswordForm: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly toast: ToastrService,
    private readonly authService: AuthService
  ) {

    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.toast.overlayContainer = this.toastContainer;

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  get form() { return this.forgotPasswordForm.controls; }

  send() {
    this.toast.success('email send');
  }

}

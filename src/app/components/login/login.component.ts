import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { first } from 'rxjs/operators';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
    private toast: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    // Put toasts in a specific div
    this.toast.overlayContainer = this.toastContainer;

    this.loginForm = this.formBuilder.group({
      'username': [null, Validators.email],
      'password': [null, Validators.minLength(6)]
    });


    // this.authService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {

    if (this.loginForm.invalid) { return; }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.toast.error(error, '', {
            tapToDismiss: true,
            timeOut: 1500
          });
          this.loading = false;
        }
      );
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
}

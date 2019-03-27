import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { startWith, map, tap } from 'rxjs/operators';

import { Config } from './../../../../../infrastructure';
import { Provider, Cashier } from '../../../../../models';
import { ProviderService, CashierService, NotificationService, AuthService } from '../../../../../services';
import { Roles } from '../../../../../helpers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-cashier-workspace',
  templateUrl: './edit-cashier-workspace.component.html',
  styleUrls: ['./edit-cashier-workspace.component.scss']
})
export class EditCashierWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  title: string;
  edit: boolean;
  msg: string;

  regEx = Config.regex[0];
  nameError: string;
  emailError: string;

  observer$: Observable<any>;
  provider: Provider;
  userId: string;
  providerId: string; // to navigation
  cashier: Cashier;
  waiting = true;
  loading = false;
  mode: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private readonly providerService: ProviderService,
    private readonly cashierService: CashierService,
    private readonly authService: AuthService,
    private readonly notification: NotificationService
    ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx)]
      )],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email]
      )]
    });

     // Change Form values
     this.route.data.subscribe(data => {
      this.providerId = this.route.snapshot.params['providerId'];
      this.mode = data.mode;

      this.authService.isAdmin
        ? this.userId = this.route.snapshot.params['userId']
        : this.userId = this.authService.currentUserValue.uid;

      if (data.mode === 'edit') {
        this.edit = true;
        this.title = 'Edit Cashier';

        // update form if mode is edit
        const cashierId = this.route.snapshot.params['cashierId'];
        this.observer$ = this.cashierService.getCashierData(this.providerId, cashierId).pipe(
          tap(cashier => {
            this.cashier = cashier;
            this.editForm.patchValue(cashier);
          })
        );

      } else {
        // mode create
        this.edit = false;
        this.title = 'Create Cashier';

        this.observer$ = this.providerService.getProviderData(this.userId, this.providerId)
          .pipe(tap(provider => this.provider = provider)
        );
      }
    });

    // validate name
    this.form.name.valueChanges.pipe(
      startWith(''),
      map(() => {
        let error = '';
        if (this.form.name.hasError('required')) {
          error = 'name is required';
        }

        if (this.form.name.hasError('pattern')) {
          error = 'only letters and numbers are allowed';
        }

        return error;
      })
    ).subscribe(error => this.nameError = error );

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

  get form() { return this.editForm.controls; }

  redirectToHome() {
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });
  }

  redirectToCashierWorkspace() {
    this.notification.SuccessMessage(this.msg, '', 2500);

    this.ngZone.run(() => {
      this.router.navigate([
        `/provider-dashboard/workspace/providers/${this.providerId}/cashiers`
      ]);
    });
  }

  cancel() {
    this.ngZone.run(() => {
      this.router.navigate([
        `/provider-dashboard/workspace/providers/${this.providerId}/cashiers`
      ]);
    });
  }

  editCashier() {
    this.loading = true;
    // Mark the control as dirty
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();
      this.form.email.markAsDirty();
      this.loading = false;

      return;
    }

    if (!this.edit) {
      this.msg = 'New cashier created';

      const data: Cashier = {
        name: this.form.name.value,
        email: this.form.email.value,
        providerName: this.provider.name,
        providerId: this.provider.id,
        role: [Roles.Cashier]
      };

      // create cashier
      this.cashierService.create(data).then(() => {
        this.redirectToCashierWorkspace();
      })
      .catch(error => {
        this.notification.ErrorMessage(error.message, '', 2500);
        this.loading = false;
      });

    } else {
      this.msg = 'cashier edited';

      this.cashier.name = this.form.name.value;
      this.cashier.email = this.form.email.value;

      this.cashierService.update(this.cashier).then(() => {
        this.redirectToCashierWorkspace();
      })
      .catch(error => {
        this.notification.ErrorMessage(error.message, '', 2500);
        this.loading = false;
      });
    }
  }
}

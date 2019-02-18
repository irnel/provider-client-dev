import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { startWith, map, tap } from 'rxjs/operators';

import { Config } from './../../../../../infrastructure';
import { Provider, Cashier } from '../../../../../models';
import { ProviderService, CashierService, NotificationService } from '../../../../../services';
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

  regEx = Config.regex[0];
  nameError: string;
  emailError: string;

  observer$: Observable<any>;
  provider: Provider;
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
      this.providerId = this.route.snapshot.params['id'];
      this.mode = data.mode;

      if (data.mode === 'edit') {
        this.edit = true;
        this.title = 'Edit Cashier';

        // update form if mode is edit
        const cashierId = this.route.snapshot.params['cashierId'];
        this.observer$ = this.cashierService.getCashierById(cashierId).pipe(
          tap(cashier => {
            this.cashier = cashier;
            this.editForm.patchValue(cashier);
          })
        );

      } else {
        // mode create
        this.edit = false;
        this.title = 'Create Cashier';

        this.observer$ = this.providerService.getProviderById(this.providerId)
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
    this.ngZone.run(() => {
      this.router.navigate([
        `/provider-dashboard/workspace/providers/${this.providerId}/cashiers`
      ]);
    });
  }

  cancel() {
    this.redirectToCashierWorkspace();
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
      const data: Cashier = {
        name: this.form.name.value,
        email: this.form.email.value,
        providerName: this.provider.name,
        providerId: this.provider.id,
        role: [Roles.Cashier]
      };

      // create cashier
      this.cashierService.create(data).then(() => {
        this.notification.SuccessMessage('cashier created', '', 2500);
        this.redirectToCashierWorkspace();
      })
      .catch(error => {
        this.loading = false;
        this.notification.ErrorMessage(error.message, '', 2500);
      });

    } else {

    }
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';

import { Config } from './../../../../../infrastructure';
import { Provider, PROVIDERS_DATA } from '../../../../../helpers';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-edit-cashier-workspace',
  templateUrl: './edit-cashier-workspace.component.html',
  styleUrls: ['./edit-cashier-workspace.component.scss']
})
export class EditCashierWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  providerFormControl: any;
  title: string;
  edit: boolean;

  regEx = Config.regex[0];
  nameError: string;
  emailError: string;

  providers: Provider[] = PROVIDERS_DATA;
  currentProvider: Provider;
  providerNotFound = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly toast: SnotifyService
    ) {
      // Change Form values
    this.route.data.subscribe(data => {
      if (data.mode === 'edit') {
        this.edit = true;
        this.title = 'Edit Cashier';

      } else {
        this.edit = false;
        this.title = 'Create Cashier';

      }
    });
    }

  ngOnInit() {
    const providerId = +this.route.snapshot.params['id'];
    this.currentProvider = this.providers.find(p => p.id === providerId);

    this.editForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx)]
      )],
      providerName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx)]
      )],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email]
      )]
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

  MarkAsDirty() {
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();
      this.form.providerName.markAsDirty();
      this.form.email.markAsDirty();

      return;
    }
  }

  private redirectToCashierWorkspace() {
    this.router.navigate([
      `/provider-dashboard/workspace/providers/${this.currentProvider.id}/cashiers`
    ]);
  }

  cancel() {
    this.redirectToCashierWorkspace();
  }

  editCashier() {
    // Mark the control as dirty
    this.MarkAsDirty();

    if (!this.edit) {

    } else {

    }
  }

  private elementFilter(value: string): Provider[] {
    const filterValue = value.toLowerCase();

    return this.providers.filter(provider =>
      provider.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  showErrorMessage(title: string, body: string, timeOut: number) {
    this.toast.error(body, title, {
      timeout: timeOut,
      backdrop: 0.2,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
  }
}

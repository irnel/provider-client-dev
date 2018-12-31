import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  filteredProviders: Observable<Provider[]>;
  currentProviders: Provider[];
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

    // provider list
    this.providerFormControl = this.form.providerName;
    this.form.providerName.valueChanges.pipe(
      startWith(''),
      map(name => {
        return name ? this.elementFilter(name) : this.providers.slice();
      })
    ).subscribe(list => this.currentProviders = list);

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

  foundMatchValidator() {
    // search match with input value from provider list
    const foundMatch = this.currentProviders.find(item => {
      return item.name === this.form.providerName.value;
    });

    if (!foundMatch && this.form.providerName.value !== '') {
      this.showErrorMessage(
        'Validation error',
        'Select a cashier from the list.', 2500
      );

      return;
    }
  }

  private redirectToCashierWorkspace() {
    this.router.navigate(['/provider-dashboard/workspace/cashiers']);
  }

  cancel() {
    this.redirectToCashierWorkspace();
  }

  editCashier() {
    // Mark the control as dirty
    this.MarkAsDirty();
    // match value provider
    this.foundMatchValidator();

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

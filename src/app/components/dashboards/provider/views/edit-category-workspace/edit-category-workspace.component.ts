import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { SnotifyService } from 'ng-snotify';
import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll';
import { Provider, Category, PROVIDERS_DATA } from './../../../../../helpers';
import { Config } from './../../../../../infrastructure';
import { stringify } from 'querystring';



@Component({
  selector: 'app-edit-category-workspace',
  templateUrl: './edit-category-workspace.component.html',
  styleUrls: ['./edit-category-workspace.component.scss']
})
export class EditCategoryWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  providerFormControl: any;
  edit: boolean;
  title: string;
  msg: string;
  nameError: string;
  regEx: string = Config.regex[0];
  regEx1: string = Config.regex[1];

  providers: Provider[] = PROVIDERS_DATA;
  currentProvider: Provider;
  mode: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly toast: SnotifyService,
  ) {
    // Change Form values
    this.route.data.subscribe(data => {
      this.mode = data.mode;

      if (data.mode === 'edit') {
        this.edit = true;
        this.title = 'Edit Category';

      } else {
        this.edit = false;
        this.title = 'Create Category';

      }
    });
  }

  ngOnInit() {
    // find provider by url params
    const providerId = +this.route.snapshot.params['id'];
    this.currentProvider = this.providers.find(p => p.id === providerId);

    // create controls
    this.editForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx)]
      )],
      image: ['', Validators.nullValidator],
      description: ['',  Validators.pattern(this.regEx1)]
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
  }

  get form() { return this.editForm.controls; }

  MarkAsDirty() {
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();

      return;
    }
  }

  redirectToHome() {
    this.router.navigate(['provider-dashboard/workspace/home']);
  }

  redirectToCategoryWorkspace() {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.currentProvider.id}/categories`]);
  }

  cancel() {
    this.redirectToCategoryWorkspace();
  }

  editCategory() {
    // Mark the control as dirty
    this.MarkAsDirty();

    if (!this.edit) {
      this.msg = 'New category created';

    } else {
      this.msg = 'Category edited';

    }

    this.showSuccessMessage(this.msg, 2000);
    this.redirectToCategoryWorkspace();
  }

  showSuccessMessage(body: string, timeOut: number) {
    this.toast.success(body, '', {
      timeout: timeOut,
      showProgressBar: false,

    });
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

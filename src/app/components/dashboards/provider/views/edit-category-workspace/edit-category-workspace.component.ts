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



@Component({
  selector: 'app-edit-category-workspace',
  templateUrl: './edit-category-workspace.component.html',
  styleUrls: ['./edit-category-workspace.component.scss']
})
export class EditCategoryWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  edit: boolean;
  title: string;
  regEx: string = Config.regex[0];
  regEx1: string = Config.regex[1];

  providers: Provider[] = PROVIDERS_DATA;
  filteredProviders: Observable<Provider[]>;
  currentProviders: Provider[];
  providerNotFound = false;

  providerName: any;
  nameError = 'required';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly toast: SnotifyService,
    private readonly pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) {
    // Change Form values
    this.route.data.subscribe(data => {
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
    this.editForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx)]
      )],
      providerName: ['', Validators.compose([
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

    // provider list
    this.providerName = this.form.providerName;
    this.form.providerName.valueChanges.pipe(
      startWith(''),
      map(name => {
        return name ? this.elementFilter(name) : this.providers.slice();
      }
    )).subscribe(list => this.currentProviders = list);
  }

  get form() { return this.editForm.controls; }

  MarkAsDirty() {
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();
      this.form.providerName.markAsDirty();

      // scroll behavior
      if (this.form.name.errors || this.form.providerName.errors) {
        this.goToTop();
      }

      if (this.form.description.hasError('pattern')) {
        this.showErrorMessage(
          'Invalid description',
          'Character not allowed. ' +
          'Only letters and numbers are allowed', 2500
        );
      }

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
        'Invalid provider',
        'Select a provider from the list.', 2500
      );

      this.goToTop();

      return;
    }
  }

  private redirectCategoryWorkspace() {
    this.router.navigate(['/provider-dashboard/workspace/categories']);
  }

  cancel() {
    this.redirectCategoryWorkspace();
  }

  editCategory() {
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
      provider.name.toLowerCase().indexOf(filterValue) === 0);
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

  // scroll behavior
  goToTop() {
    const scroll: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#header');
    this.pageScrollService.start(scroll);
  }
}

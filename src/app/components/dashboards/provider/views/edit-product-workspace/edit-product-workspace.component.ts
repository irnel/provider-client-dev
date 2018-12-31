import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { startWith, map } from 'rxjs/operators';
import { SnotifyService } from 'ng-snotify';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll';

import { Config } from './../../../../../infrastructure';
import { Provider, PROVIDERS_DATA, Category, CATEGORY_DATA } from '../../../../../helpers';

@Component({
  selector: 'app-edit-product-workspace',
  templateUrl: './edit-product-workspace.component.html',
  styleUrls: ['./edit-product-workspace.component.scss']
})
export class EditProductWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  nameFormControl: any;
  providerFormControl: any;
  categoryFormControl: any;
  title: string;

  regEx = Config.regex[0];
  regEx1 = Config.regex[1];
  regEx2 = Config.regex[2];
  edit: boolean;
  nameError: string;
  priceError: string;

  providers: Provider [] = PROVIDERS_DATA;
  categories: Category [] = CATEGORY_DATA;
  currentProviders: Provider [];
  currentCategories: Category [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly toast: SnotifyService,
    private readonly pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) {
    // Change Form values
    this.route.data.subscribe(data => {
      if (data.mode === 'edit') {
        this.edit = true;
        this.title = 'Edit Product';
      } else {
        this.edit = false;
        this.title = 'Create Product';
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
      categoryName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx)]
      )],
      price: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx2)]
      )],
      image: ['', Validators.nullValidator],
      description: ['', Validators.pattern(this.regEx1)]
    });

    // validate name
    this.nameFormControl = this.form.name;
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
    ).subscribe(error => this.nameError = error);

    // provider list
    this.providerFormControl = this.form.providerName;
    this.form.providerName.valueChanges.pipe(
      startWith(''),
      map(name => {
        return name ? this.providerFilter(name) : this.providers.slice();
      })
    ).subscribe(list => this.currentProviders = list);

    // category list
    this.categoryFormControl = this.form.categoryName;
    this.form.categoryName.valueChanges.pipe(
      startWith(''),
      map(name => {
        return name ? this.categoryFilter(name) : this.categories.slice();
      })
    ).subscribe(list => this.currentCategories = list);

    // validate price
    this.form.price.valueChanges.pipe(
      startWith(''),
      map(() => {
        let error = '';
        if (this.form.price.hasError('required')) {
          error = 'price is required';
        }

        if (this.form.price.hasError('pattern')) {
          error = 'invalid number format';
        }

        return error;
      })
    ).subscribe(error => this.priceError = error);

  }

  get form() { return this.editForm.controls; }

  private providerFilter(value: string) {
    const filterValue = value.toLowerCase();

    return this.providers.filter(provider =>
      provider.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private categoryFilter(value: string) {
    const filterValue = value.toLowerCase();

    return this.categories.filter(category =>
      category.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  MarkAsDirty() {
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();
      this.form.providerName.markAsDirty();
      this.form.categoryName.markAsDirty();
      this.form.price.markAsDirty();

      // scroll behavior
      if (this.form.name.errors || this.form.providerName.errors
        || this.form.categoryName.errors || this.form.price) {

        this.goToTop();
      }

      return;
    }
  }

  foundMatchValidator() {
    // search match with input value from provider list
    const matchProvider = this.currentProviders.find(item => {
      return item.name === this.form.providerName.value;
    });

    if (!matchProvider && this.form.providerName.value !== '') {
      this.showErrorMessage(
        'Validation error',
        'Select a provider from the list.', 2500
      );

      this.goToTop();

      return;
    }

    // search match with input value from category list
    const matchCategory = this.currentCategories.find(item => {
      return item.name === this.form.categoryName.value;
    });

    if (!matchCategory && this.form.categoryName.value !== '') {
      this.showErrorMessage(
        'Validation error',
        'Select a category from the list.', 2500
      );

      this.goToTop();

      return;
    }
  }

  redirectProductWorkSpace() {
    this.router.navigate(['/provider-dashboard/workspace/products']);
  }

  cancel() {
    this.redirectProductWorkSpace();
  }

  editProduct() {
    // Mark the control as dirty
    this.MarkAsDirty();
    // match value provider
    this.foundMatchValidator();

    if (!this.edit) {

    } else {

    }
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

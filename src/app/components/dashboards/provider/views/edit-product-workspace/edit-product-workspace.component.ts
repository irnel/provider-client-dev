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
  currentProvider: Provider;
  currentCategory: Category;
  provId: number;
  catId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly toast: SnotifyService
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
    this.provId = +this.route.snapshot.params['id'];
    this.catId = +this.route.snapshot.params['catId'];

    this.currentProvider = this.providers.find(p => p.id === this.provId);
    this.currentCategory = this.categories.find(c => c.id === this.catId);

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

  MarkAsDirty() {
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();
      this.form.providerName.markAsDirty();
      this.form.categoryName.markAsDirty();
      this.form.price.markAsDirty();

      return;
    }
  }

  redirectToProductWorkSpace() {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.provId}/categories/${this.catId}/products`
    ]);
  }

  cancel() {
    this.redirectToProductWorkSpace();
  }

  editProduct() {
    // Mark the control as dirty
    this.MarkAsDirty();

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
}

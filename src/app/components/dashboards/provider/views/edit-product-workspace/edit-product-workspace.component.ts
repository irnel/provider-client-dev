import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Config } from './../../../../../infrastructure';
import { Provider, PROVIDERS_DATA, Category, CATEGORY_DATA } from '../../../../../helpers';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product-workspace',
  templateUrl: './edit-product-workspace.component.html',
  styleUrls: ['./edit-product-workspace.component.scss']
})
export class EditProductWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  providerFormControl: any;
  categoryFormControl: any;
  title: string;

  regEx = Config.regex[0];
  nameError: string;

  providers: Provider [] = PROVIDERS_DATA;
  categories: Category [] = CATEGORY_DATA;
  currentProviders: Provider [];
  currentCategories: Category [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    // Change Form values
    this.route.data.subscribe(data => {
      if (data.mode === 'edit') {
        this.title = 'Edit Product';
      } else {
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

      return;
    }
  }
}

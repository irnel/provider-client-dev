import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';


import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll';
import { NotificationService, CategoryService, FileService } from '../../../../../services';
import { FileInfo } from './../../../../../helpers';
import { Provider, Category } from '../../../../../models';
import { Config } from './../../../../../infrastructure';
import { ProviderService } from '../../../../../services/provider/provider.service';

@Component({
  selector: 'app-edit-category-workspace',
  templateUrl: './edit-category-workspace.component.html',
  styleUrls: ['./edit-category-workspace.component.scss']
})
export class EditCategoryWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  edit: boolean;
  title: string;
  msg: string;
  nameError: string;
  regEx: string = Config.regex[0];
  regEx1: string = Config.regex[1];

  selectedFiles: FileInfo [] = [];
  observer$: Observable<any>;
  allPercentage: Observable<number>;
  category: Category;
  provider: Provider;
  providerId: string;
  mode: string;
  loading = false;
  waiting = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private readonly notification: NotificationService,
    private readonly categoryService: CategoryService,
    private readonly providerService: ProviderService,
    private readonly fileService: FileService
  ) {

  }

  ngOnInit() {
    // create controls
    this.editForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regEx)]
      )],
      description: ['',  Validators.nullValidator]
    });

    // Change Form values
    this.route.data.subscribe(data => {
      // find provider by url params
     this.providerId = this.route.snapshot.params['id'];
      this.mode = data.mode;

      if (data.mode === 'edit') {
        this.edit = true;
        this.title = 'Edit Category';

        const catId = this.route.snapshot.params['catId'];
        this.observer$ = this.categoryService.getCategoryById(catId)
          .pipe(
            tap(category => {
              this.category = category;
              this.editForm.patchValue(category);
            })
          );

      } else {
        this.edit = false;
        this.title = 'Create Category';

        this.observer$ = this.providerService.getProviderById(this.providerId)
          .pipe(tap(provider => this.provider = provider));
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
  }

  get form() { return this.editForm.controls; }

  redirectToHome() {
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });
  }

  redirectToCategoryWorkspace() {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/categories`]);
    });

    this.notification.SuccessMessage('New category created', '', 2500);
  }

  cancel() {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/categories`]);
    });
  }

  async editCategory() {
    this.loading = true;
    // Mark the control as dirty
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();
      this.loading = false;

      return;
    }

    if (!this.edit) {
      const data: Category = {
        name: this.form.name.value,
        description: this.form.description.value,
        providerName: this.provider.name,
        providerId: this.provider.id,
        url: ''
      };

      // create category
      await this.categoryService.create(data).then(
        async (category) => {
          this.category = category;
        })
        .catch(error => {
          this.notification.ErrorMessage(error.message, '', 2500);
          this.loading = false;

          return;
        });

      // redirect to provider workspace if not upload images
      if (this.selectedFiles.length === 0) {
        this.redirectToCategoryWorkspace();
      }

      this.allPercentage = this.fileService.upload(this.selectedFiles, this.category);
       // complete operation
       this.allPercentage.subscribe(progress => {
        if (progress === 100) {
          this.redirectToCategoryWorkspace();
        }
      });
    } else {
      this.msg = 'Category edited';

    }

  }

  // receive files from file-input-component
  onSelectedFiles(files: FileInfo []) {
    let principal = false;

    files.forEach(f => {
      f.modelType = 'categories';
      f.markAsPrincipal ? principal = true : principal = false;
    });

    // mark as principal first element
    if (!principal) {
      files[0].markAsPrincipal = true;
    }

    this.selectedFiles = files;
  }
}

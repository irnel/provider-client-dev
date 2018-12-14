import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';

import { Provider, Category, PROVIDERS_DATA } from './../../../../../helpers';
import { Config } from './../../../../../infrastructure';


@Component({
  selector: 'app-edit-category-workspace',
  templateUrl: './edit-category-workspace.component.html',
  styleUrls: ['./edit-category-workspace.component.scss']
})
export class EditCategoryWorkspaceComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  editForm: FormGroup;
  edit: boolean;
  title: string;
  regEx: string = Config.regex[0];
  regEx1: string = Config.regex[1];

  providers: Provider[] = PROVIDERS_DATA;
  filteredProviders: Observable<Provider[]>;
  currentProviders: Provider[];

  providerNotFound = true;
  inputProvider: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly toast: ToastrService
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
    this.toast.overlayContainer = this.toastContainer;

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
      description: ['', Validators.pattern(this.regEx1)]
    });

    this.inputProvider = this.form.providerName;

    this.form.providerName.valueChanges
      .pipe(
        startWith(''),
        map(name => {
          if (name) {
            this.providerNotFound = false;
            return this.elementFilter(name);
          } else {
            this.providerNotFound = true;
            return this.providers.slice();
          }
        }
      ))
      .subscribe(
        list => this.currentProviders = list
      );
  }

  get form() { return this.editForm.controls; }

  MarkAsDirty() {
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();
      this.form.providerName.markAsDirty();

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

  showSuccessMessage(message: string, time: number) {
    this.toast.success(message, '', {
      tapToDismiss: true,
      timeOut: time
    });
  }

  showErrorMessage(message: string, time: number) {
    this.toast.error(message, '', {
      tapToDismiss: true,
      timeOut: time
    });
  }


}

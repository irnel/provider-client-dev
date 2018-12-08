import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Provider, PROVIDERS_DATA } from './../../../../../helpers';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-category-workspace',
  templateUrl: './edit-category-workspace.component.html',
  styleUrls: ['./edit-category-workspace.component.scss']
})
export class EditCategoryWorkspaceComponent implements OnInit {
  editForm: FormGroup;
  edit: boolean;
  title: string;

  providers: Provider[] = PROVIDERS_DATA;
  filteredProviders: Observable<Provider[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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
      name: ['', Validators.required],
      providerName: ['', Validators.nullValidator],
      image: ['', Validators.nullValidator],
      description: ['', Validators.nullValidator]
    });

    this.filteredProviders = this.form.providerName.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this.elementFilter(name) : this.providers.slice())
      );
  }

  get form() { return this.editForm.controls; }

  MarkAsDirty() {
    if (this.editForm.invalid) {
      this.form.name.markAsDirty();

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


}

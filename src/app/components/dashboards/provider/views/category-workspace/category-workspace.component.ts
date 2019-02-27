import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';

import { Config } from '../../../../../infrastructure';
import { Category } from '../../../../../models';
import { CategoryService, NotificationService } from '../../../../../services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-category-workspace',
  templateUrl: './category-workspace.component.html',
  styleUrls: ['./category-workspace.component.scss']
})
export class CategoryWorkspaceComponent implements OnInit {
  columnsToDisplay: string[] = ['image', 'name', 'provider', 'description', 'operation'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('frame') frame: ElementRef;

  categories: Category [];
  observer$: Observable<any>;
  providerId: string;
  maxChar: number = Config.maxChar;
  pageSizeOptions: number[] = Config.pageSizeOptions;
  state = 'waiting';
  deleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private categoryService: CategoryService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.providerId = this.route.snapshot.params['id'];
    this.observer$ = this.categoryService.getAllCategoriesByProviderId(this.providerId);
    this.observer$.subscribe(
      categories => {
        this.categories = categories;
        this.dataSource = new MatTableDataSource(this.categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.state = 'finished';
      },
      error => {
        this.state = 'failed';
        this.notification.ErrorMessage(error.message, '', 2500);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

  redirectToHome() {
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });

  }

  redirectToEditCategory(catId: number) {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/categories/${catId}/edit`
      ]);
    });
  }

  redirectToCategoryDetails(catId: number) {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/categories/${catId}/details`
      ]);
    });
  }

  deleteCategory(id) {
    this.deleting = true;
    this.categoryService.delete(id).then(() => {
      this.notification.SuccessMessage('removed category', '', 2500);
      this.deleting = false;
    })
    .catch(error => {
      this.notification.ErrorMessage(error.message, '', 2500);
      this.deleting = false;
    });
  }
}

import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Config } from '../../../../../infrastructure';
import { Category, Provider, CATEGORY_DATA, PROVIDERS_DATA } from '../../../../../helpers';

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

  categories = CATEGORY_DATA;
  maxChar: number = Config.maxChar;
  pageSizeOptions: number[] = Config.pageSizeOptions;

  currentProvider: Provider;
  providers: Provider [] = PROVIDERS_DATA;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.categories);
  }

  ngOnInit() {
    const providerId = +this.route.snapshot.params['id'];
    this.currentProvider = this.providers.find(p => p.id === providerId);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

  redirectToEditCategory(catId: number) {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.currentProvider.id}/categories/${catId}/edit`
    ]);
  }

  redirectToCategoryDetails(catId: number) {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.currentProvider.id}/categories/${catId}/details`
    ]);
  }

  test() {
    console.log('click');
  }

}

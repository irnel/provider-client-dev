import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Config } from '../../../../../infrastructure';
import { Category, CATEGORY_DATA } from '../../../../../helpers';

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

  constructor(
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.categories);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

  redirectToEditCategory(id: number) {
    this.router.navigate([`provider-dashboard/workspace/categories/${id}/edit`]);
  }

}

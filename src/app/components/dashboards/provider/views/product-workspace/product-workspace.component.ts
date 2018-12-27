import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Product, PRODUCT_DATA } from '../../../../../helpers';
import { Config } from '../../../../../infrastructure/config';

@Component({
  selector: 'app-product-workspace',
  templateUrl: './product-workspace.component.html',
  styleUrls: ['./product-workspace.component.scss']
})
export class ProductWorkspaceComponent implements OnInit {
  displayedColumns: string[] = [
    'image', 'name', 'provider', 'category', 'price', 'description', 'operation'
  ];

  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  products = PRODUCT_DATA;
  maxChar = Config.maxChar;
  pageSizeOptions = Config.pageSizeOptions;

  constructor(
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToEditProduct(id: number) {
    this.router.navigate([`provider-dashboard/workspace/products/${id}/edit`]);
  }
}

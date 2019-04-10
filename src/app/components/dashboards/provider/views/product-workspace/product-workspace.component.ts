import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Product, Category, Provider, PRODUCT_DATA, CATEGORY_DATA, PROVIDERS_DATA } from '../../../../../helpers';
import { Config } from '../../../../../infrastructure';

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

  providers: Provider [] = PROVIDERS_DATA;
  categories: Category [] = CATEGORY_DATA;
  products: Product [] = PRODUCT_DATA;
  currentProduct: Product;

  provId: number;
  catId: number;

  maxChar = Config.maxChar;
  pageSizeOptions = Config.pageSizeOptions;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnInit() {
    this.provId = +this.route.snapshot.params['id'];
    this.catId = +this.route.snapshot.params['catId'];

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToHome() {
    this.router.navigate(['provider-dashboard/workspace/home']);
  }

  redirectToEditProduct(prodId: number) {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.provId}/categories/${this.catId}/products/${prodId}/edit`
    ]);
  }

  redirectToProductDetails(prodId: number) {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.provId}/categories/${this.catId}/products/${prodId}/details`
    ]);
  }
}

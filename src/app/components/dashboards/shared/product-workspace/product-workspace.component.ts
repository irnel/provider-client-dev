import { Component, OnInit, ViewChild, NgZone, Renderer2, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Product } from '../../../../models';
import { Config } from '../../../../infrastructure';
import { ProductService, NotificationService, AuthService } from '../../../../services';
import { Observable } from 'rxjs';

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
  @ViewChild('frame') frame: ElementRef;

  products: Product [] = [];
  observer$: Observable<any>;
  maxChar = Config.maxChar;
  pageSizeOptions = Config.pageSizeOptions;
  userId: string;
  providerId: string;
  categoryId: string;
  isAdmin: boolean;
  deleting = false;
  state = 'waiting';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private readonly productService: ProductService,
    private readonly authService: AuthService,
    private readonly notification: NotificationService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    if (this.isAdmin) {
      this.userId = this.route.snapshot.params['userId'];
    }

    this.providerId = this.route.snapshot.params['providerId'];
    this.categoryId = this.route.snapshot.params['catId'];

    this.observer$ = this.productService.getAllProductsData(this.providerId, this.categoryId);
    this.observer$.subscribe(
      products => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
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
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToAdminHome() {
    this.ngZone.run(() => {
      this.router.navigate(['admin-dashboard/workspace/home']);
    });
  }

  redirectToProviderHome() {
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });
  }

  redirectToEditProduct(productId) {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/` +
        `${this.providerId}/categories/${this.categoryId}/products/${productId}/edit`
      ]);
    });
  }

  redirectToProductDetails(productId) {
    this.ngZone.run(() => {
      const url = this.isAdmin
        ? `admin-dashboard/workspace/users/${this.userId}/providers/` +
          `${this.providerId}/categories/${this.categoryId}/products/${productId}/details`
        : `provider-dashboard/workspace/providers/` +
          `${this.providerId}/categories/${this.categoryId}/products/${productId}/details`;

      this.router.navigate([url]);
    });
  }

  deleteProduct(product) {
    this.deleting = true;
    this.productService.delete(product).then(() => {
      this.notification.SuccessMessage('removed provider', '', 2500);
      this.deleting = false;
    })
    .catch(error => {
      this.notification.ErrorMessage(error.message, '', 2500);
      this.deleting = false;
    });
  }
}

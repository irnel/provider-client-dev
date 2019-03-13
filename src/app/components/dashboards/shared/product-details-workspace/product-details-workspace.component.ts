import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../models';
import { ProductService, NotificationService, AuthService } from '../../../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details-workspace',
  templateUrl: './product-details-workspace.component.html',
  styleUrls: ['./product-details-workspace.component.scss']
})
export class ProductDetailsWorkspaceComponent implements OnInit {
  product: Product;
  observer$: Observable<any>;
  userId: string;
  providerId: string;
  categoryId: string;
  isAdmin: boolean;
  state = 'waiting';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private readonly productService: ProductService,
    private readonly authService: AuthService,
    private readonly notification: NotificationService
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    if (this.isAdmin) {
      this.userId = this.route.snapshot.params['userId'];
    }

    this.providerId = this.route.snapshot.params['providerId'];
    this.categoryId = this.route.snapshot.params['catId'];
    const productId = this.route.snapshot.params['prodId'];

    this.observer$ = this.productService.getProductById(productId);
    this.observer$.subscribe(
      product => {
        this.product = product;
        this.state = 'finished';
      },
      error => {
        this.state = 'failed';
        this.notification.ErrorMessage(error.message, '', 2500);
      }
    );
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

  redirectToProviderWorkspace() {
    this.ngZone.run(() => {
      const url = this.isAdmin
        ? `admin-dashboard/workspace/users/${this.userId}/providers`
        : `provider-dashboard/workspace/providers`;

      this.router.navigate([url]);
    });
  }

  redirectToCategoryWorkspace() {
    this.ngZone.run(() => {
      const url = this.isAdmin
        ? `admin-dashboard/workspace/users/${this.userId}/providers/${this.providerId}/categories`
        : `provider-dashboard/workspace/providers/${this.providerId}/categories`;

      this.router.navigate([url]);
    });
  }

  redirectToProductWorkSpace() {
    this.ngZone.run(() => {
      const url = this.isAdmin
        ? `admin-dashboard/workspace/users/${this.userId}/providers/` +
          `${this.providerId}/categories/${this.categoryId}/products`
        : `provider-dashboard/workspace/providers/` +
          `${this.providerId}/categories/${this.categoryId}/products`;

      this.router.navigate([url]);
    });
  }
}

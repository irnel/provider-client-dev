import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../../models';
import { ProductService, NotificationService } from '../../../../../services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details-workspace',
  templateUrl: './product-details-workspace.component.html',
  styleUrls: ['./product-details-workspace.component.scss']
})
export class ProductDetailsWorkspaceComponent implements OnInit {
  product: Product;
  observer$: Observable<any>;
  providerId: string;
  categoryId: string;
  state = 'waiting';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private readonly productService: ProductService,
    private readonly notification: NotificationService
  ) { }

  ngOnInit() {
    this.providerId = this.route.snapshot.params['id'];
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

  redirectToHome() {
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });
  }

  redirectToProviderWorkspace() {
    this.ngZone.run(() => {
      this.router.navigate([`provider-dashboard/workspace/providers`]);
    });
  }

  redirectToCategoryWorkspace() {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/categories`
      ]);
    });
  }

  redirectToProductWorkSpace() {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/` +
        `${this.providerId}/categories/${this.categoryId}/products`
      ]);
    });
  }
}

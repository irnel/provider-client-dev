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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private readonly productService: ProductService
  ) { }

  ngOnInit() {
    this.providerId = this.route.snapshot.params['id'];
    this.categoryId = this.route.snapshot.params['catId'];
    const productId = this.route.snapshot.params['prodId'];

    this.observer$ = this.productService.getProductById(productId)
      .pipe(tap(product => this.product = product));
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

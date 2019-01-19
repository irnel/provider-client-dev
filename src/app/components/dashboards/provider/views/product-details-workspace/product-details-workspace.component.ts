import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Provider, Product, Category, PROVIDERS_DATA, CATEGORY_DATA, PRODUCT_DATA } from '../../../../../helpers';

@Component({
  selector: 'app-product-details-workspace',
  templateUrl: './product-details-workspace.component.html',
  styleUrls: ['./product-details-workspace.component.scss']
})
export class ProductDetailsWorkspaceComponent implements OnInit {

  providers: Provider [] = PROVIDERS_DATA;
  categories: Category [] = CATEGORY_DATA;
  products: Product [] = PRODUCT_DATA;

  currentProduct: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const prodId = +this.route.snapshot.params['prodId'];
    this.currentProduct = this.products.find(p => p.id === prodId);
  }

  redirectToHome() {
    this.router.navigate(['provider-dashboard/workspace/home']);
  }

}

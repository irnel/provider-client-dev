import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Provider, Category, PROVIDERS_DATA, CATEGORY_DATA } from '../../../../../helpers';


@Component({
  selector: 'app-category-details-workspace',
  templateUrl: './category-details-workspace.component.html',
  styleUrls: ['./category-details-workspace.component.scss']
})
export class CategoryDetailsWorkspaceComponent implements OnInit {

  providers: Provider [] = PROVIDERS_DATA;
  categories: Category [] = CATEGORY_DATA;

  currentProvider: Provider;
  currentCategory: Category;
  provId: number;
  catId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.provId = +this.route.snapshot.params['id'];
    this.catId = +this.route.snapshot.params['catId'];

    this.currentProvider = this.providers.find(p => p.id === this.provId);
    this.currentCategory = this.categories.find(c => c.id === this.catId);
  }

  redirectToHome() {
    this.router.navigate(['provider-dashboard/workspace/home']);
  }

  redirectToProductWorkspace() {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.provId}/categories/${this.catId}/products`
    ]);
  }

  redirectToEditProduct() {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.provId}/categories/${this.catId}/products/create`
    ]);
  }

}

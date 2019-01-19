import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Provider, PROVIDERS_DATA } from '../../../../../helpers';

@Component({
  selector: 'app-provider-details-workspace',
  templateUrl: './provider-details-workspace.component.html',
  styleUrls: ['./provider-details-workspace.component.scss']
})
export class ProviderDetailsWorkspaceComponent implements OnInit {
  currentProvider: Provider;
  providers: Provider [] = PROVIDERS_DATA;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    const providerId = +this.route.snapshot.params['id'];
    this.currentProvider = this.providers.find(p => p.id === providerId);
  }

  redirectToHome() {
    this.router.navigate(['provider-dashboard/workspace/home']);
  }

  redirectToCategoryWorkspace() {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.currentProvider.id}/categories`
    ]);
  }

  redirectToEditCategory() {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.currentProvider.id}/categories/create`
    ]);
  }

  redirectToCashierWorkspace() {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.currentProvider.id}/cashiers`
    ]);
  }

  redirectToEditCashier() {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.currentProvider.id}/cashiers/create`
    ]);
  }

}

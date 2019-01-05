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

  redirectToCategoryWorkspace() {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.currentProvider.id}/categories`]);
  }

  // redirect to create category path
  redirectToEditCategory() {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.currentProvider.id}/categories/create`]);
  }

}

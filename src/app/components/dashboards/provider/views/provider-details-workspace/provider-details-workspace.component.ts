import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Provider } from '../../../../../models';
import { ProviderService, NotificationService } from '../../../../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-provider-details-workspace',
  templateUrl: './provider-details-workspace.component.html',
  styleUrls: ['./provider-details-workspace.component.scss']
})
export class ProviderDetailsWorkspaceComponent implements OnInit {
  provider: Provider;
  providerId: string;
  observer$: Observable<any>;
  state = 'waiting';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private readonly providerService: ProviderService,
    private readonly notification: NotificationService
  ) {}

  ngOnInit() {
    this.providerId = this.route.snapshot.params['id'];
    this.observer$ = this.providerService.getProviderById(this.providerId);
    this.observer$.subscribe(
      provider => {
        this.provider = provider;
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

  redirectToCategoryWorkspace() {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/categories`
      ]);
    });
  }

  redirectToEditCategory() {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/categories/create`
      ]);
    });
  }

  redirectToCashierWorkspace() {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/cashiers`
      ]);
    });
  }

  redirectToEditCashier() {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/cashiers/create`
      ]);
    });
  }
}

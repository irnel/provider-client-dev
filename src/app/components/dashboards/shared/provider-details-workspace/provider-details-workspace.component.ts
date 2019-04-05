import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Provider } from '../../../../models';
import { ProviderService, NotificationService, AuthService } from '../../../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-provider-details-workspace',
  templateUrl: './provider-details-workspace.component.html',
  styleUrls: ['./provider-details-workspace.component.scss']
})
export class ProviderDetailsWorkspaceComponent implements OnInit {
  provider: Provider;
  userId: string;
  providerId: string;
  isAdmin: boolean;
  observer$: Observable<any>;
  state = 'waiting';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private readonly providerService: ProviderService,
    private readonly authService: AuthService,
    private readonly notification: NotificationService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    this.isAdmin
      ? this.userId = this.route.snapshot.params['userId']
      : this.userId = this.authService.currentUserValue.uid;

    this.providerId = this.route.snapshot.params['providerId'];
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

  redirectToProviderHome() {
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });
  }

  redirectToAdminHome() {
    this.ngZone.run(() => {
      this.router.navigate(['admin-dashboard/workspace/home']);
    });
  }

  redirectToCategoryWorkspace() {
    this.ngZone.run(() => {
      const url = this.authService.isAdmin
        ? `admin-dashboard/workspace/users/${this.userId}/providers/${this.providerId}/categories`
        : `provider-dashboard/workspace/providers/${this.providerId}/categories`;

        this.router.navigate([url]);
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
      const url = this.authService.isAdmin
        ? `admin-dashboard/workspace/users/${this.userId}/providers/${this.providerId}/cashiers`
        : `provider-dashboard/workspace/providers/${this.providerId}/cashiers`;

      this.router.navigate([url]);
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

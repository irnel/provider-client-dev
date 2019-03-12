import { Observable } from 'rxjs';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Provider, Category } from '../../../../models';
import { CategoryService, NotificationService, AuthService } from './../../../../services';

@Component({
  selector: 'app-category-details-workspace',
  templateUrl: './category-details-workspace.component.html',
  styleUrls: ['./category-details-workspace.component.scss']
})
export class CategoryDetailsWorkspaceComponent implements OnInit {
  userId: string;
  providerId: string;
  categoryId: string;
  isAdmin: boolean;
  category: Category;
  observer$: Observable<any>;
  state = 'waiting';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private readonly categoryService: CategoryService,
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
    this.observer$ = this.categoryService.getCategoryById(this.categoryId);
    this.observer$.subscribe(
      category => {
        this.category = category;
        this.state = 'waiting';
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

  redirectToProductWorkspace() {
    this.ngZone.run(() => {
      const url = this.isAdmin
        ? `admin-dashboard/workspace/users/${this.userId}/providers/` +
          `${this.providerId}/categories/${this.categoryId}/products`
        : `provider-dashboard/workspace/providers/` +
          `${this.providerId}/categories/${this.categoryId}/products`;

      this.router.navigate([url]);
    });
  }

  redirectToEditProduct() {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/categories/${this.category.id}/products/create`
      ]);
    });
  }
}

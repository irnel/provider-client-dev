import { Observable } from 'rxjs';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Provider, Category } from '../../../../../models';
import { CategoryService, NotificationService } from './../../../../../services';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-category-details-workspace',
  templateUrl: './category-details-workspace.component.html',
  styleUrls: ['./category-details-workspace.component.scss']
})
export class CategoryDetailsWorkspaceComponent implements OnInit {
  providerId: string;
  categoryId: string;
  category: Category;
  observer$: Observable<any>;
  state = 'waiting';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private readonly categoryService: CategoryService,
    private readonly notification: NotificationService
  ) { }

  ngOnInit() {
    this.providerId = this.route.snapshot.params['id'];
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

  redirectToHome() {
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });
  }

  redirectToProductWorkspace() {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/` +
        `${this.providerId}/categories/${this.categoryId}/products`
      ]);
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

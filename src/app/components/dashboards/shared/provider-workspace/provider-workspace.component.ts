import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';

import { Config } from '../../../../infrastructure';
import { ProviderService, AuthService, NotificationService } from '../../../../services';
import { Provider } from '../../../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-provider-workspace',
  templateUrl: './provider-workspace.component.html',
  styleUrls: ['./provider-workspace.component.scss']
})
export class ProviderWorkspaceComponent implements OnInit {
  public columnsToDisplay: string [] = ['image', 'name', 'address', 'description', 'operation'];
  public dataSource: MatTableDataSource<Provider>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('frame') frame: ElementRef;

  providers: Provider [];
  observer$: Observable<any>;
  maxChar: number = Config.maxChar;
  pageSizeOptions: number[] = Config.pageSizeOptions;
  isAdmin: boolean;
  userId: string;
  deleting = false;
  state = 'waiting';

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly providerService: ProviderService,
    private readonly notification: NotificationService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    this.isAdmin
      ? this.userId = this.route.snapshot.params['userId']
      : this.userId = this.authService.currentUserValue.uid;

    this.observer$ = this.providerService.getAllProviderByUserId(this.userId);
    this.observer$.subscribe(
      providers => {
        this.providers = providers;
        this.dataSource = new MatTableDataSource(providers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.state = 'finished';
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

  // redirect to edit provider
  redirectToEditProvider(id: string) {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${id}/edit`]);
    });
  }

  // redirect to provider details
  redirectToProviderDetails(providerId: string) {
    this.ngZone.run(() => {
      const url = this.isAdmin
        ? `admin-dashboard/workspace/users/${this.userId}/providers/${providerId}/details`
        : `provider-dashboard/workspace/providers/${providerId}/details`;

      this.router.navigate([url]);
    });
  }

  // apply filter to data table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

  deleteProvider(id) {
    this.deleting = true;
    this.providerService.delete(id).then(() => {
      this.notification.SuccessMessage('removed provider', '', 2500);
      this.deleting = false;
    })
    .catch(error => {
      this.notification.ErrorMessage(error.message, '', 2500);
      this.deleting = false;
    });
  }
}

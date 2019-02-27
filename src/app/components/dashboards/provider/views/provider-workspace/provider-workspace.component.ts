import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, NgZone, Renderer2, ElementRef } from '@angular/core';

import { Config } from '../../../../../infrastructure';
import { ProviderService, AuthService, NotificationService } from '../../../../../services';
import { Provider } from '../../../../../models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-provider-workspace',
  templateUrl: './provider-workspace.component.html',
  styleUrls: ['./provider-workspace.component.scss']
})
export class ProviderWorkspaceComponent implements OnInit {
  columnsToDisplay: string [] = ['image', 'name', 'address', 'description', 'operation'];
  dataSource: MatTableDataSource<Provider>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('frame') frame: ElementRef;

  providers: Provider [];
  observer$: Observable<any>;
  maxChar: number = Config.maxChar;
  pageSizeOptions: number[] = Config.pageSizeOptions;
  deleting = false;
  state = 'waiting';

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private readonly authService: AuthService,
    private readonly providerService: ProviderService,
    private readonly notification: NotificationService
  ) {}

  ngOnInit() {
    const userId = this.authService.currentUserValue.uid;
    this.observer$ = this.providerService.getAllProviderByUserId(userId);
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

  redirectToHome() {
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
  redirectToProviderDetails(id: string) {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${id}/details`]);
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

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Config } from '../../../../../infrastructure';
import { Provider, Cashier } from '../../../../../models';
import {  } from 'src/app/services';
import { CashierService, NotificationService } from '../../../../../services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-cashier-workspace',
  templateUrl: './cashier-workspace.component.html',
  styleUrls: ['./cashier-workspace.component.scss']
})
export class CashierWorkspaceComponent implements OnInit {
  columnsToDisplay: string[] = ['name', 'email', 'provider', 'operation'];
  dataSource: MatTableDataSource<Cashier>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSizeOptions: number[] = Config.pageSizeOptions;
  observer$: Observable<any>;
  cashiers: Cashier [] = [];
  providerId: string;
  deleting = false;
  state = 'waiting';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private readonly cashierService: CashierService,
    private readonly notification: NotificationService
  ) {}

  ngOnInit() {
    this.providerId = this.route.snapshot.params['id'];
    this.observer$ = this.cashierService.getAllCashiersByProviderId(this.providerId);
    this.observer$.subscribe(
      cashiers => {
        this.cashiers = cashiers;
        this.dataSource = new MatTableDataSource(this.cashiers);
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

  redirectToHome() {
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });
  }

  redirectToEditCashier(id: number) {
    this.ngZone.run(() => {
      this.router.navigate([
        `provider-dashboard/workspace/providers/${this.providerId}/cashiers/${id}/edit`
      ]);
    });
  }

  deleteCashier(id) {
    this.deleting = true;
    this.cashierService.delete(id).then(() => {
      this.notification.SuccessMessage('cashier removed', '', 2500);
      this.deleting = false;
    })
    .catch(error => {
      this.notification.ErrorMessage(error.message, '', 2500);
      this.deleting = false;
    });
  }
}

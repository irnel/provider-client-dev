import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Order } from '../../../../models';
import { Config } from '../../../../infrastructure';
import { OrderState } from '../../../../helpers';
import { OrderService, NotificationService, AuthService } from '../../../../services';

@Component({
  selector: 'app-order-workspace',
  templateUrl: './order-workspace.component.html',
  styleUrls: ['./order-workspace.component.scss']
})
export class OrderWorkspaceComponent implements OnInit {
  public columnsToDisplay = ['createdDate', 'pickupTime', 'provider', 'paid', 'status'];
  public dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSizeOptions = Config.pageSizeOptions;
  orderState = OrderState.Pending;
  userId: string;
  providerId: string;
  isAdmin: boolean;
  orders: Order [];
  observer$: Observable<any>;
  message: string;
  state = 'waiting';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly ngZone: NgZone,
    private readonly authService: AuthService,
    private readonly orderService: OrderService,
    private readonly notification: NotificationService
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    if (this.isAdmin) {
      this.userId = this.route.snapshot.params['userId'];
    }

    this.providerId = this.route.snapshot.params['providerId'];
    this.observer$ = this.orderService.getAllOrdersByProviderId(this.providerId);
    this.observer$.subscribe(
      orders => {
        this.orders = orders;
        this.dataSource = new MatTableDataSource(this.orders);
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
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToHome() {
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });
  }

}
